# F1 Cooldown Room interaction prototype

A dependency-free prototype of the split-page menu interaction from The Physics Room, reduced to the behavior needed for a Formula One podium concept.

## Run locally

Open `index.html` directly, or serve the folder with any static web server:

```sh
python3 -m http.server 4173
```

Then visit `http://localhost:4173`.

## Interaction

- Select podium position 1–3 to split the homepage and reveal its driver.
- Selecting a different position closes the current split before opening the new one.
- Select the active item again or press <kbd>Escape</kbd> to close it.

## Race data

The changing race data is split into three files:

- `data/2026-races.json` is the editorial calendar. It contains the 23 short
  location names, weekend dates, exact display labels, and a podium backlog.
- `data/current-event.json` is the generated snapshot used for inspection and
  validation.
- `data/current-event.js` is the browser-ready version of that snapshot.

The calendar names and dates are maintained by hand from the official Formula
One calendar. Each round keeps both the official location and the preferred
display location, such as `Spain` → `Madrid` and
`Barcelona-Catalunya` → `Barcelona`. The updater matches by season and round,
and never replaces the display wording with API-provided wording.

`scripts/update-race-data.mjs` checks the latest calendar round whose weekend
has ended, retrieves only that Grand Prix result plus its round-specific driver
and constructor standings from Jolpica, validates that all three datasets match,
and updates the generated files. Sprint and qualifying results are never used.

Run an update and validation locally with:

```sh
node scripts/update-race-data.mjs
node scripts/validate-race-data.mjs
```

The scheduled GitHub Action checks at 10:17 a.m. Eastern on Sunday and Monday.
Sunday catches Grand Prix races held on Saturday, while Monday catches the usual
Sunday races. It commits only when the sporting data has changed and can also be
run manually from the Actions tab. A push to `main` triggers the connected
Vercel production deployment.

## Driver index

`drivers.js` contains all 22 drivers on Formula 1's 2026 driver page, their
nationality and local flag, team, racing number, and the exact team hero
colors/gradient sampled on September 14, 2026. The generated podium uses these
stable internal IDs so the name, flag, team, number, and panel gradient update
together.

For a temporary podium preview in the browser console, use:

```js
setCooldownRoomPodium(["max-verstappen", "oscar-piastri", "lando-norris"]);
```

The circular flag SVGs in `assets/flags/` are vendored from the MIT-licensed
[HatScripts circle-flags](https://github.com/HatScripts/circle-flags) collection;
its license is included alongside the assets.
