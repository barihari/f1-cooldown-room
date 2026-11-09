(function exposeCurrentEvent() {
  const currentEvent = {
    "season": 2026,
    "round": 20,
    "location": "Brazil",
    "dateLabel": "Nov. 6-8. 2026.",
    "podium": [
      "lando-norris",
      "max-verstappen",
      "isack-hadjar"
    ],
    "driverStandings": [
      {
        "driver": "kimi-antonelli",
        "points": 390
      },
      {
        "driver": "max-verstappen",
        "points": 279
      },
      {
        "driver": "george-russell",
        "points": 262
      },
      {
        "driver": "lewis-hamilton",
        "points": 261
      },
      {
        "driver": "charles-leclerc",
        "points": 249
      },
      {
        "driver": "lando-norris",
        "points": 246
      },
      {
        "driver": "oscar-piastri",
        "points": 152
      },
      {
        "driver": "isack-hadjar",
        "points": 122
      },
      {
        "driver": "liam-lawson",
        "points": 89
      },
      {
        "driver": "pierre-gasly",
        "points": 42
      }
    ],
    "constructorStandings": [
      {
        "team": "mercedes",
        "points": 652
      },
      {
        "team": "ferrari",
        "points": 510
      },
      {
        "team": "redBullRacing",
        "points": 415
      },
      {
        "team": "mclaren",
        "points": 398
      },
      {
        "team": "racingBulls",
        "points": 114
      },
      {
        "team": "alpine",
        "points": 69
      },
      {
        "team": "haas",
        "points": 31
      },
      {
        "team": "audi",
        "points": 28
      },
      {
        "team": "williams",
        "points": 12
      },
      {
        "team": "astonMartin",
        "points": 7
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
