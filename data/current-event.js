(function exposeCurrentEvent() {
  const currentEvent = {
    "season": 2026,
    "round": 15,
    "location": "Azerbaijan",
    "dateLabel": "Sept. 24-26. 2026.",
    "podium": [
      "george-russell",
      "max-verstappen",
      "isack-hadjar"
    ],
    "driverStandings": [
      {
        "driver": "kimi-antonelli",
        "points": 302
      },
      {
        "driver": "george-russell",
        "points": 236
      },
      {
        "driver": "lewis-hamilton",
        "points": 199
      },
      {
        "driver": "lando-norris",
        "points": 186
      },
      {
        "driver": "charles-leclerc",
        "points": 179
      },
      {
        "driver": "max-verstappen",
        "points": 163
      },
      {
        "driver": "oscar-piastri",
        "points": 120
      },
      {
        "driver": "isack-hadjar",
        "points": 86
      },
      {
        "driver": "liam-lawson",
        "points": 59
      },
      {
        "driver": "pierre-gasly",
        "points": 41
      }
    ],
    "constructorStandings": [
      {
        "team": "mercedes",
        "points": 538
      },
      {
        "team": "ferrari",
        "points": 378
      },
      {
        "team": "mclaren",
        "points": 306
      },
      {
        "team": "redBullRacing",
        "points": 263
      },
      {
        "team": "racingBulls",
        "points": 83
      },
      {
        "team": "alpine",
        "points": 68
      },
      {
        "team": "haas",
        "points": 27
      },
      {
        "team": "audi",
        "points": 17
      },
      {
        "team": "williams",
        "points": 12
      },
      {
        "team": "astonMartin",
        "points": 3
      },
      {
        "team": "cadillac",
        "points": 0
      }
    ]
  };

  currentEvent.podium = Object.freeze(currentEvent.podium);
  currentEvent.driverStandings.forEach(Object.freeze);
  currentEvent.constructorStandings.forEach(Object.freeze);
  currentEvent.driverStandings = Object.freeze(currentEvent.driverStandings);
  currentEvent.constructorStandings = Object.freeze(
    currentEvent.constructorStandings,
  );
  window.F1_CURRENT_EVENT = Object.freeze(currentEvent);
})();
