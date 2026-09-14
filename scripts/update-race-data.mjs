import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { constructorIds, driverIds } from "./f1-mappings.mjs";

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const calendarPath = join(projectRoot, "data", "2026-races.json");
const currentEventPath = join(projectRoot, "data", "current-event.json");
const runtimeEventPath = join(projectRoot, "data", "current-event.js");
const asOfDate = process.env.F1_AS_OF_DATE ?? new Date().toISOString().slice(0, 10);
const apiRoot = "https://api.jolpi.ca/ergast/f1";

function mapId(map, sourceId, label) {
  const internalId = map[sourceId];

  if (!internalId) {
    throw new Error(`Unknown ${label} ID from Jolpica: ${sourceId}`);
  }

  return internalId;
}

function parsePoints(value, label) {
  const points = Number(value);

  if (!Number.isFinite(points)) {
    throw new Error(`Invalid points for ${label}: ${value}`);
  }

  return points;
}

async function fetchJson(url) {
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const response = await fetch(url, {
      headers: { "user-agent": "f1-cooldown-room/1.0" },
    });

    if (response.ok) return response.json();

    if (attempt === 3 || response.status !== 429) {
      throw new Error(`Jolpica returned ${response.status} for ${url}`);
    }

    const retryAfter = Number(response.headers.get("retry-after")) || attempt * 2;
    await new Promise((resolve) => setTimeout(resolve, retryAfter * 1000));
  }

  throw new Error(`Unable to retrieve ${url}`);
}

async function findLatestCompletedRace(calendar) {
  const eligibleRaces = calendar.races
    .filter((race) => race.endDate <= asOfDate)
    .sort((a, b) => b.round - a.round);

  for (const race of eligibleRaces) {
    const url = `${apiRoot}/${calendar.season}/${race.round}/results.json`;
    const payload = await fetchJson(url);
    const result = payload.MRData?.RaceTable?.Races?.[0];

    if (result?.Results?.length) return { catalogRace: race, result };
  }

  throw new Error(`No completed Grand Prix was available by ${asOfDate}`);
}

function readStandingsList(payload, kind, season, round) {
  const list = payload.MRData?.StandingsTable?.StandingsLists?.[0];

  if (!list) throw new Error(`No ${kind} standings were returned`);
  if (Number(list.season) !== season || Number(list.round) !== round) {
    throw new Error(
      `${kind} standings are for ${list.season}/${list.round}, expected ${season}/${round}`,
    );
  }

  return list;
}

function renderRuntimeEvent(currentEvent) {
  const serializedEvent = JSON.stringify(currentEvent, null, 2)
    .split("\n")
    .map((line, index) => (index === 0 ? line : `  ${line}`))
    .join("\n");

  return `(function exposeCurrentEvent() {
  const currentEvent = ${serializedEvent};

  currentEvent.podium = Object.freeze(currentEvent.podium);
  currentEvent.driverStandings.forEach(Object.freeze);
  currentEvent.constructorStandings.forEach(Object.freeze);
  currentEvent.driverStandings = Object.freeze(currentEvent.driverStandings);
  currentEvent.constructorStandings = Object.freeze(
    currentEvent.constructorStandings,
  );
  window.F1_CURRENT_EVENT = Object.freeze(currentEvent);
})();
`;
}

async function writeIfChanged(path, content) {
  const previous = await readFile(path, "utf8").catch(() => "");

  if (previous === content) return false;

  await writeFile(path, content);
  return true;
}

const calendar = JSON.parse(await readFile(calendarPath, "utf8"));
const { catalogRace, result } = await findLatestCompletedRace(calendar);
const season = calendar.season;
const round = catalogRace.round;

if (Number(result.season) !== season || Number(result.round) !== round) {
  throw new Error("Grand Prix result does not match the selected calendar round");
}

const podium = result.Results
  .filter(({ position }) => Number(position) <= 3)
  .sort((a, b) => Number(a.position) - Number(b.position))
  .map(({ Driver }) => mapId(driverIds, Driver.driverId, "driver"));

if (podium.length !== 3 || new Set(podium).size !== 3) {
  throw new Error(`Round ${round} did not return a complete Grand Prix podium`);
}

const driverStandingsUrl = `${apiRoot}/${season}/${round}/driverstandings.json`;
const constructorStandingsUrl = `${apiRoot}/${season}/${round}/constructorstandings.json`;
const [driverPayload, constructorPayload] = await Promise.all([
  fetchJson(driverStandingsUrl),
  fetchJson(constructorStandingsUrl),
]);
const driverList = readStandingsList(
  driverPayload,
  "driver",
  season,
  round,
);
const constructorList = readStandingsList(
  constructorPayload,
  "constructor",
  season,
  round,
);

const driverStandings = driverList.DriverStandings.slice(0, 10).map(
  ({ Driver, points }) => ({
    driver: mapId(driverIds, Driver.driverId, "driver"),
    points: parsePoints(points, Driver.driverId),
  }),
);
const constructorStandings = constructorList.ConstructorStandings.map(
  ({ Constructor, points }) => ({
    team: mapId(constructorIds, Constructor.constructorId, "constructor"),
    points: parsePoints(points, Constructor.constructorId),
  }),
);

if (driverStandings.length !== 10) {
  throw new Error("Expected the top 10 driver standings");
}
if (constructorStandings.length !== Object.keys(constructorIds).length) {
  throw new Error("Constructor standings do not match the configured 2026 grid");
}

catalogRace.podium = podium;
const currentEvent = {
  season,
  round,
  location: catalogRace.displayLocation,
  dateLabel: catalogRace.dateLabel,
  podium,
  driverStandings,
  constructorStandings,
};
const calendarChanged = await writeIfChanged(
  calendarPath,
  `${JSON.stringify(calendar, null, 2)}\n`,
);
const eventChanged = await writeIfChanged(
  currentEventPath,
  `${JSON.stringify(currentEvent, null, 2)}\n`,
);
const runtimeChanged = await writeIfChanged(
  runtimeEventPath,
  renderRuntimeEvent(currentEvent),
);

console.log(
  calendarChanged || eventChanged || runtimeChanged
    ? `Updated the site to round ${round}: ${catalogRace.displayLocation}`
    : `Round ${round} is already current: ${catalogRace.displayLocation}`,
);
