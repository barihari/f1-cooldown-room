/*
 * 2026 roster and profile styling sampled from formula1.com/en/drivers on
 * 2026-09-14. Race-specific data lives in data/current-event.js.
 */
(function exposeF1DriverIndex() {
  const teams = {
    mercedes: {
      name: "Mercedes",
      color: "#27f4d2",
      surface: "#067e6a",
    },
    ferrari: {
      name: "Ferrari",
      color: "#e8002d",
      surface: "#5c0012",
    },
    mclaren: {
      name: "McLaren",
      color: "#ff8000",
      surface: "#804000",
    },
    redBullRacing: {
      name: "Red Bull Racing",
      color: "#3671c6",
      surface: "#142948",
    },
    racingBulls: {
      name: "Racing Bulls",
      color: "#6692ff",
      surface: "#0038c2",
    },
    alpine: {
      name: "Alpine",
      color: "#00a1e8",
      surface: "#004e70",
    },
    haas: {
      name: "Haas F1 Team",
      color: "#dee1e2",
      surface: "#667175",
    },
    audi: {
      name: "Audi",
      color: "#ff2d00",
      surface: "#751500",
    },
    williams: {
      name: "Williams",
      color: "#1868db",
      surface: "#082145",
    },
    astonMartin: {
      name: "Aston Martin",
      color: "#229971",
      surface: "#0f4331",
    },
    cadillac: {
      name: "Cadillac",
      color: "#aaaaad",
      surface: "#58585b",
    },
  };

  const drivers = {
    "george-russell": {
      firstName: "George",
      lastName: "Russell",
      country: "United Kingdom",
      flag: "assets/flags/gb.svg",
      team: "mercedes",
      number: "63",
    },
    "kimi-antonelli": {
      firstName: "Kimi",
      lastName: "Antonelli",
      country: "Italy",
      flag: "assets/flags/it.svg",
      team: "mercedes",
      number: "12",
    },
    "charles-leclerc": {
      firstName: "Charles",
      lastName: "Leclerc",
      country: "Monaco",
      flag: "assets/flags/mc.svg",
      team: "ferrari",
      number: "16",
    },
    "lewis-hamilton": {
      firstName: "Lewis",
      lastName: "Hamilton",
      country: "United Kingdom",
      flag: "assets/flags/gb.svg",
      team: "ferrari",
      number: "44",
    },
    "lando-norris": {
      firstName: "Lando",
      lastName: "Norris",
      country: "United Kingdom",
      flag: "assets/flags/gb.svg",
      team: "mclaren",
      number: "1",
    },
    "oscar-piastri": {
      firstName: "Oscar",
      lastName: "Piastri",
      country: "Australia",
      flag: "assets/flags/au.svg",
      team: "mclaren",
      number: "81",
    },
    "max-verstappen": {
      firstName: "Max",
      lastName: "Verstappen",
      country: "Netherlands",
      flag: "assets/flags/nl.svg",
      team: "redBullRacing",
      number: "3",
    },
    "isack-hadjar": {
      firstName: "Isack",
      lastName: "Hadjar",
      country: "France",
      flag: "assets/flags/fr.svg",
      team: "redBullRacing",
      number: "6",
    },
    "liam-lawson": {
      firstName: "Liam",
      lastName: "Lawson",
      country: "New Zealand",
      flag: "assets/flags/nz.svg",
      team: "racingBulls",
      number: "30",
    },
    "arvid-lindblad": {
      firstName: "Arvid",
      lastName: "Lindblad",
      country: "United Kingdom",
      flag: "assets/flags/gb.svg",
      team: "racingBulls",
      number: "41",
    },
    "pierre-gasly": {
      firstName: "Pierre",
      lastName: "Gasly",
      country: "France",
      flag: "assets/flags/fr.svg",
      team: "alpine",
      number: "10",
    },
    "franco-colapinto": {
      firstName: "Franco",
      lastName: "Colapinto",
      country: "Argentina",
      flag: "assets/flags/ar.svg",
      team: "alpine",
      number: "43",
    },
    "esteban-ocon": {
      firstName: "Esteban",
      lastName: "Ocon",
      country: "France",
      flag: "assets/flags/fr.svg",
      team: "haas",
      number: "31",
    },
    "oliver-bearman": {
      firstName: "Oliver",
      lastName: "Bearman",
      country: "United Kingdom",
      flag: "assets/flags/gb.svg",
      team: "haas",
      number: "87",
    },
    "nico-hulkenberg": {
      firstName: "Nico",
      lastName: "Hulkenberg",
      country: "Germany",
      flag: "assets/flags/de.svg",
      team: "audi",
      number: "27",
    },
    "gabriel-bortoleto": {
      firstName: "Gabriel",
      lastName: "Bortoleto",
      country: "Brazil",
      flag: "assets/flags/br.svg",
      team: "audi",
      number: "5",
    },
    "carlos-sainz": {
      firstName: "Carlos",
      lastName: "Sainz",
      country: "Spain",
      flag: "assets/flags/es.svg",
      team: "williams",
      number: "55",
    },
    "alexander-albon": {
      firstName: "Alexander",
      lastName: "Albon",
      country: "Thailand",
      flag: "assets/flags/th.svg",
      team: "williams",
      number: "23",
    },
    "fernando-alonso": {
      firstName: "Fernando",
      lastName: "Alonso",
      country: "Spain",
      flag: "assets/flags/es.svg",
      team: "astonMartin",
      number: "14",
    },
    "lance-stroll": {
      firstName: "Lance",
      lastName: "Stroll",
      country: "Canada",
      flag: "assets/flags/ca.svg",
      team: "astonMartin",
      number: "18",
    },
    "sergio-perez": {
      firstName: "Sergio",
      lastName: "Perez",
      country: "Mexico",
      flag: "assets/flags/mx.svg",
      team: "cadillac",
      number: "11",
    },
    "valtteri-bottas": {
      firstName: "Valtteri",
      lastName: "Bottas",
      country: "Finland",
      flag: "assets/flags/fi.svg",
      team: "cadillac",
      number: "77",
    },
  };

  Object.values(teams).forEach(Object.freeze);
  Object.values(drivers).forEach(Object.freeze);

  window.F1_2026 = Object.freeze({
    teams: Object.freeze(teams),
    drivers: Object.freeze(drivers),
  });
})();
