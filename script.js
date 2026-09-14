const body = document.body;
const root = document.documentElement;
const panel = document.querySelector("#driver-panel");
const panelFirstName = document.querySelector("#driver-first-name");
const panelLastName = document.querySelector("#driver-last-name");
const panelMeta = document.querySelector("#driver-meta");
const panelFlag = document.querySelector("#driver-flag");
const panelCountry = document.querySelector("#driver-country");
const panelTeam = document.querySelector("#driver-team");
const panelNumber = document.querySelector("#driver-number");
const panelStandings = document.querySelector("#driver-standings");
const panelStandingsList = document.querySelector("#driver-standings-list");
const standingButtons = [...document.querySelectorAll(".standings-nav__item")];
const driverButtons = [...document.querySelectorAll("[data-driver-slot]")];
const { drivers, teams, podium, driverStandings, constructorStandings } =
  window.F1_2026;
const transitionDuration = Number.parseFloat(
  getComputedStyle(root).getPropertyValue("--transition-duration"),
);

let activeButton = null;
let phase = "closed";
let transitionTimer = null;

function renderStandings(entries, getName) {
  const rows = entries.map((entry, index) => {
    const row = document.createElement("li");
    const position = document.createElement("span");
    const name = document.createElement("span");
    const score = document.createElement("span");
    const scoreValue = document.createElement("span");
    const scoreLabel = document.createElement("span");

    row.className = "driver-panel__standings-row";
    name.className = "driver-panel__standings-name";
    score.className = "driver-panel__standings-points";
    scoreLabel.className = "driver-panel__standings-points-label";

    position.textContent = String(index + 1);
    name.textContent = getName(entry);
    scoreValue.textContent = String(entry.points);
    scoreLabel.textContent = "PTS";
    score.append(scoreValue, scoreLabel);
    row.append(position, name, score);
    return row;
  });

  panelStandingsList.replaceChildren(...rows);
}

function renderDriverStandings() {
  renderStandings(driverStandings, ({ driver: driverId }) => {
    const driver = drivers[driverId];
    return `${driver.firstName} ${driver.lastName}`;
  });
}

function renderConstructorStandings() {
  renderStandings(
    constructorStandings,
    ({ team: teamId }) => teams[teamId].name,
  );
}

function showDriver(driverId) {
  const driver = drivers[driverId];
  const team = teams[driver.team];

  panelFirstName.textContent = driver.firstName;
  panelLastName.textContent = driver.lastName;
  panelCountry.textContent = driver.country;
  panelTeam.textContent = team.name;
  panelNumber.textContent = driver.number;
  panelFlag.src = driver.flag;
  panelMeta.hidden = false;
  panelStandings.hidden = true;
  delete panel.dataset.panelMode;
  panel.style.setProperty("--team-color", team.color);
  panel.style.setProperty("--team-surface", team.surface);
}

function showStandings(title) {
  const isDriverStandings = title === "Drivers";

  panelFirstName.textContent = title;
  panelLastName.textContent = "Standings";
  panelMeta.hidden = true;
  panelStandings.hidden = false;
  panel.dataset.panelMode = isDriverStandings
    ? "standings-list"
    : "constructors-list";
  panelStandings.setAttribute(
    "aria-label",
    isDriverStandings ? "Top ten drivers" : "Constructor standings",
  );
  if (isDriverStandings) {
    renderDriverStandings();
  } else {
    renderConstructorStandings();
  }
  panel.style.setProperty("--team-color", "#38383f");
  panel.style.setProperty("--team-surface", "#15151e");
}

function showPanel(button) {
  if (button.dataset.driver) {
    showDriver(button.dataset.driver);
    return;
  }

  showStandings(button.dataset.standingsPanel);
}

function assignPodium(driverIds) {
  if (!Array.isArray(driverIds) || driverIds.length !== driverButtons.length) {
    throw new Error(
      `The podium needs exactly ${driverButtons.length} drivers.`,
    );
  }

  driverButtons.forEach((button, index) => {
    const driverId = driverIds[index];
    const driver = drivers[driverId];

    if (!driver) {
      throw new Error(`Unknown 2026 F1 driver: ${driverId}`);
    }

    button.dataset.driver = driverId;
    button.setAttribute(
      "aria-label",
      `${button.dataset.position}: ${driver.firstName} ${driver.lastName}`,
    );
  });

  if (activeButton) showPanel(activeButton);
}

assignPodium(podium);

function positionSplitAt(button) {
  const buttonRect = button.getBoundingClientRect();
  const panelHalfWidth = panel.offsetWidth / 2;
  const buttonCenter = buttonRect.left + buttonRect.width / 2;
  const splitAxis = Math.min(
    Math.max(buttonCenter, panelHalfWidth),
    root.clientWidth - panelHalfWidth,
  );

  root.style.setProperty("--split-axis", `${splitAxis}px`);
}

function finishTransition(callback) {
  window.clearTimeout(transitionTimer);
  transitionTimer = window.setTimeout(callback, transitionDuration);
}

function closePanel({ openNext = null, restoreFocus = false } = {}) {
  if (!activeButton) return;

  const previousButton = activeButton;
  activeButton = null;
  phase = "closing";
  body.classList.remove("is-open");
  body.classList.add("is-transitioning");
  panel.setAttribute("aria-hidden", "true");
  standingButtons.forEach((button) =>
    button.setAttribute("aria-expanded", "false"),
  );

  finishTransition(() => {
    phase = "closed";
    body.classList.remove("is-transitioning");

    if (openNext) {
      openPanel(openNext);
      return;
    }

    if (restoreFocus) previousButton.focus();
  });
}

function openPanel(button) {
  if (activeButton === button) {
    closePanel();
    return;
  }

  if (phase === "opening" || phase === "closing") return;

  if (activeButton) {
    closePanel({ openNext: button });
    return;
  }

  activeButton = button;
  phase = "opening";
  positionSplitAt(button);
  showPanel(button);

  panel.setAttribute("aria-hidden", "false");

  standingButtons.forEach((item) => {
    item.setAttribute("aria-expanded", String(item === button));
  });

  body.classList.add("is-open");
  body.classList.add("is-transitioning");

  finishTransition(() => {
    phase = "open";
    body.classList.remove("is-transitioning");
  });
}

standingButtons.forEach((button) => {
  button.addEventListener("click", () => openPanel(button));
});

document.addEventListener("click", (event) => {
  if (!activeButton) return;
  if (!(event.target instanceof Element)) return;
  if (event.target.closest(".standings-nav__item")) return;

  closePanel();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closePanel({ restoreFocus: true });
});

window.addEventListener("resize", () => {
  if (activeButton) positionSplitAt(activeButton);
});

window.setCooldownRoomPodium = assignPodium;
