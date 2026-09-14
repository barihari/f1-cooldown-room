import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { constructorIds, driverIds } from "./f1-mappings.mjs";

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const calendar = JSON.parse(
  await readFile(join(projectRoot, "data", "2026-races.json"), "utf8"),
);
const currentEvent = JSON.parse(
  await readFile(join(projectRoot, "data", "current-event.json"), "utf8"),
);
const knownDrivers = new Set(Object.values(driverIds));
const knownConstructors = new Set(Object.values(constructorIds));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(calendar.season === 2026, "The calendar must describe the 2026 season");
assert(calendar.races.length === 23, "The 2026 calendar must contain 23 races");

calendar.races.forEach((race, index) => {
  assert(race.round === index + 1, `Missing or out-of-order round ${index + 1}`);
  assert(
    Boolean(race.officialLocation),
    `Round ${race.round} has no official location`,
  );
  assert(
    Boolean(race.displayLocation),
    `Round ${race.round} has no display location`,
  );
  assert(
    /^2026-\d{2}-\d{2}$/.test(race.startDate) &&
      /^2026-\d{2}-\d{2}$/.test(race.endDate),
    `Round ${race.round} has an invalid date`,
  );
  assert(race.startDate <= race.endDate, `Round ${race.round} dates are reversed`);
  assert(Boolean(race.dateLabel), `Round ${race.round} has no date label`);

  if (race.podium) {
    assert(race.podium.length === 3, `Round ${race.round} needs three podium drivers`);
    assert(new Set(race.podium).size === 3, `Round ${race.round} repeats a podium driver`);
    race.podium.forEach((driver) => {
      assert(knownDrivers.has(driver), `Round ${race.round} has unknown driver ${driver}`);
    });
  }
});

const activeRace = calendar.races.find(
  ({ round }) => round === currentEvent.round,
);
assert(activeRace, `Current round ${currentEvent.round} is not in the calendar`);
assert(currentEvent.season === calendar.season, "Current season does not match calendar");
assert(
  currentEvent.location === activeRace.displayLocation,
  "Current location is not editorial data",
);
assert(currentEvent.dateLabel === activeRace.dateLabel, "Current date is not editorial data");
assert(
  JSON.stringify(currentEvent.podium) === JSON.stringify(activeRace.podium),
  "Current podium does not match its backlog entry",
);
assert(currentEvent.driverStandings.length === 10, "Current driver table needs 10 rows");
assert(
  currentEvent.constructorStandings.length === knownConstructors.size,
  "Current constructor table does not match the grid",
);
currentEvent.driverStandings.forEach(({ driver, points }) => {
  assert(knownDrivers.has(driver), `Unknown current driver ${driver}`);
  assert(Number.isFinite(points), `Invalid points for ${driver}`);
});
currentEvent.constructorStandings.forEach(({ team, points }) => {
  assert(knownConstructors.has(team), `Unknown current constructor ${team}`);
  assert(Number.isFinite(points), `Invalid points for ${team}`);
});

console.log(
  `Validated ${calendar.races.length} races and current round ${currentEvent.round}`,
);
