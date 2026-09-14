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

## Driver index

`drivers.js` contains all 22 drivers on Formula 1's 2026 driver page, their
nationality and local flag, team, racing number, and the exact team hero
colors/gradient sampled on September 14, 2026.

To update the displayed podium, change only the `podium` array at the bottom of
`drivers.js`. Use the object key for each driver, such as `"oscar-piastri"` or
`"max-verstappen"`. The name, flag, team, number, and panel gradient all update
from the index.

For a live update in the browser console, use:

```js
setCooldownRoomPodium(["max-verstappen", "oscar-piastri", "lando-norris"]);
```

The circular flag SVGs in `assets/flags/` are vendored from the MIT-licensed
[HatScripts circle-flags](https://github.com/HatScripts/circle-flags) collection;
its license is included alongside the assets.
