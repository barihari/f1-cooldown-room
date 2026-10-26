(function exposeCurrentEvent() {
  const currentEvent = {
    "season": 2026,
    "round": 18,
    "location": "United States",
    "dateLabel": "Oct. 23-25. 2026.",
    "podium": [
      "kimi-antonelli",
      "charles-leclerc",
      "max-verstappen"
    ],
    "driverStandings": [
      {
        "driver": "kimi-antonelli",
        "points": 365
      },
      {
        "driver": "george-russell",
        "points": 242
      },
      {
        "driver": "lewis-hamilton",
        "points": 241
      },
      {
        "driver": "max-verstappen",
        "points": 236
      },
      {
        "driver": "charles-leclerc",
        "points": 233
      },
      {
        "driver": "lando-norris",
        "points": 211
      },
      {
        "driver": "oscar-piastri",
        "points": 144
      },
      {
        "driver": "isack-hadjar",
        "points": 105
      },
      {
        "driver": "liam-lawson",
        "points": 77
      },
      {
        "driver": "pierre-gasly",
        "points": 42
      }
    ],
    "constructorStandings": [
      {
        "team": "mercedes",
        "points": 607
      },
      {
        "team": "ferrari",
        "points": 474
      },
      {
        "team": "redBullRacing",
        "points": 355
      },
      {
        "team": "mclaren",
        "points": 355
      },
      {
        "team": "racingBulls",
        "points": 102
      },
      {
        "team": "alpine",
        "points": 69
      },
      {
        "team": "haas",
        "points": 30
      },
      {
        "team": "audi",
        "points": 23
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
