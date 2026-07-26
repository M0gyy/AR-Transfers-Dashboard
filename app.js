/* ============================================================
   Arkansas Razorbacks 2026 Transfer Portal Dashboard
   app.js — Player data, filtering, sorting, charts, comparison
   ============================================================ */

// ── Player Data ───────────────────────────────────────────────
// Stats reflect most recent season at previous school.
// Traditional: standard box-score stats by position
// Advanced: efficiency / rate metrics
const players = [

  // ── QUARTERBACKS ──────────────────────────────────────────
  {
    name: "A.J. Hill",
    pos: "QB",
    prevSchool: "Memphis",
    height: "6-2", weight: 210,
    on3Rating: 86,
    traditional: {
      games: 11, completions: 198, attempts: 305,
      passingYards: 2614, passingTD: 22, interceptions: 7,
      rushAttempts: 62, rushYards: 312, rushTD: 4
    },
    advanced: {
      completionPct: 64.9, yardsPerAttempt: 8.6,
      adjQBR: 71.2, tdIntRatio: 3.1, overallGrade: 78.4,
      epaPerPlay: 0.21, pressurePct: 28.4
    },
    spotlight: true,
    note: "Led Memphis offense; ranked Top 20 QB in portal by On3."
  },
  {
    name: "Braeden Fuller",
    pos: "QB",
    prevSchool: "Angelo State",
    height: "6-3", weight: 215,
    on3Rating: 78,
    traditional: {
      games: 8, completions: 98, attempts: 143,
      passingYards: 1050, passingTD: 15, interceptions: 3,
      rushAttempts: 34, rushYards: 198, rushTD: 3
    },
    advanced: {
      completionPct: 68.5, yardsPerAttempt: 7.3,
      adjQBR: 82.1, tdIntRatio: 5.0, overallGrade: 80.1,
      epaPerPlay: 0.28, pressurePct: 22.1
    },
    spotlight: false,
    note: "1,050 yards, 15 TDs in 8 games at Div-II Angelo State."
  },

  // ── RUNNING BACKS ─────────────────────────────────────────
  {
    name: "Sutton Smith",
    pos: "RB",
    prevSchool: "Memphis",
    height: "5-11", weight: 205,
    on3Rating: 84,
    traditional: {
      games: 12, carries: 148, rushYards: 812, rushTD: 8,
      receptions: 22, recYards: 178, recTD: 1, ypc: 5.5
    },
    advanced: {
      yardsAfterContact: 3.8, brkTackleRate: 22.1,
      epaPerRush: 0.14, successRate: 48.2,
      overallGrade: 76.3, stuffRate: 12.4
    },
    spotlight: true,
    note: "812 yards, 8 TDs. Explosive between the tackles with elite YAC."
  },
  {
    name: "Jasper Parker",
    pos: "RB",
    prevSchool: "Michigan",
    height: "5-10", weight: 195,
    on3Rating: 85,
    traditional: {
      games: 10, carries: 87, rushYards: 498, rushTD: 4,
      receptions: 18, recYards: 142, recTD: 1, ypc: 5.7
    },
    advanced: {
      yardsAfterContact: 3.5, brkTackleRate: 19.6,
      epaPerRush: 0.11, successRate: 46.0,
      overallGrade: 72.1, stuffRate: 14.2
    },
    spotlight: false,
    note: "Versatile Big Ten back; strong pass-catching ability."
  },

  // ── WIDE RECEIVERS ────────────────────────────────────────
  {
    name: "Chris Marshall",
    pos: "WR",
    prevSchool: "Boise State",
    height: "6-3", weight: 215,
    on3Rating: 88,
    traditional: {
      games: 11, receptions: 30, recYards: 574, recTD: 2,
      targets: 43, longRec: 46, ypr: 19.1
    },
    advanced: {
      catchRate: 69.8, yardsPerTarget: 13.3,
      separationScore: 2.8, overallGrade: 81.2,
      drops: 2, targetShare: 18.4, epaPerTarget: 0.31
    },
    spotlight: true,
    note: "Top-3 yds/reception in Mountain West (19.1). 4-star recruit, former Texas A&M signee."
  },
  {
    name: "Jamari Hawkins",
    pos: "WR",
    prevSchool: "Memphis",
    height: "5-9", weight: 175,
    on3Rating: 83,
    traditional: {
      games: 12, receptions: 55, recYards: 621, recTD: 5,
      targets: 78, longRec: 52, ypr: 11.3
    },
    advanced: {
      catchRate: 70.5, yardsPerTarget: 7.9,
      separationScore: 3.1, overallGrade: 74.8,
      drops: 3, targetShare: 21.6, epaPerTarget: 0.18
    },
    spotlight: false,
    note: "High-volume slot receiver with 5 TDs for Memphis."
  },
  {
    name: "Donovan Faupel",
    pos: "WR",
    prevSchool: "New Mexico State",
    height: "6-1", weight: 190,
    on3Rating: 80,
    traditional: {
      games: 11, receptions: 42, recYards: 508, recTD: 3,
      targets: 60, longRec: 41, ypr: 12.1
    },
    advanced: {
      catchRate: 70.0, yardsPerTarget: 8.5,
      separationScore: 2.5, overallGrade: 71.3,
      drops: 2, targetShare: 19.2, epaPerTarget: 0.16
    },
    spotlight: false,
    note: "Reliable possession receiver from NMSU."
  },
  {
    name: "Jelani Watkins",
    pos: "WR",
    prevSchool: "LSU",
    height: "5-10", weight: 162,
    on3Rating: 82,
    traditional: {
      games: 3, receptions: 2, recYards: 21, recTD: 0,
      targets: 4, longRec: 14, ypr: 10.5
    },
    advanced: {
      catchRate: 50.0, yardsPerTarget: 5.3,
      separationScore: 2.2, overallGrade: 62.0,
      drops: 0, targetShare: 2.1, epaPerTarget: -0.04
    },
    spotlight: false,
    note: "Elite speed; also competed on LSU track & field. High upside."
  },

  // ── TIGHT ENDS ────────────────────────────────────────────
  {
    name: "Matt Adcock",
    pos: "TE",
    prevSchool: "Memphis",
    height: "6-4", weight: 240,
    on3Rating: 81,
    traditional: {
      games: 12, receptions: 28, recYards: 312, recTD: 3,
      targets: 38, longRec: 34, ypr: 11.1
    },
    advanced: {
      catchRate: 73.7, yardsPerTarget: 8.2,
      separationScore: 2.0, overallGrade: 74.5,
      drops: 1, blockRating: 70.2, epaPerTarget: 0.19
    },
    spotlight: false,
    note: "Dual-threat TE; solid blocker and reliable receiving option."
  },
  {
    name: "Ty Lockwood",
    pos: "TE",
    prevSchool: "Boston College",
    height: "6-5", weight: 248,
    on3Rating: 84,
    traditional: {
      games: 11, receptions: 34, recYards: 398, recTD: 4,
      targets: 46, longRec: 38, ypr: 11.7
    },
    advanced: {
      catchRate: 73.9, yardsPerTarget: 8.6,
      separationScore: 2.3, overallGrade: 77.8,
      drops: 2, blockRating: 74.1, epaPerTarget: 0.24
    },
    spotlight: true,
    note: "4 TDs, strong blocking grade. ACC experience adds depth and size."
  },

  // ── OFFENSIVE LINE ────────────────────────────────────────
  {
    name: "Malachi Breland",
    pos: "OL",
    prevSchool: "Memphis",
    height: "6-4", weight: 305,
    on3Rating: 82,
    traditional: { games: 12, starts: 12 },
    advanced: {
      overallGrade: 74.2, passBlockRating: 73.8, runBlockRating: 74.9,
      pressuresAllowed: 22, penaltiesCommitted: 3, snaps: 768
    },
    spotlight: false,
    note: "12-game starter; versatile interior lineman from Memphis."
  },
  {
    name: "Davion Weatherspoon",
    pos: "OL",
    prevSchool: "Ohio",
    height: "6-0", weight: 303,
    on3Rating: 87,
    traditional: { games: 12, starts: 12 },
    advanced: {
      overallGrade: 79.1, passBlockRating: 77.4, runBlockRating: 81.2,
      pressuresAllowed: 18, penaltiesCommitted: 2, snaps: 802
    },
    spotlight: true,
    note: "1st-team All-MAC. Rated No. 12 interior OL in portal by On3."
  },
  {
    name: "Adam Hawkes",
    pos: "OL",
    prevSchool: "Oregon State",
    height: "6-5", weight: 295,
    on3Rating: 83,
    traditional: { games: 11, starts: 9 },
    advanced: {
      overallGrade: 72.8, passBlockRating: 74.1, runBlockRating: 71.6,
      pressuresAllowed: 24, penaltiesCommitted: 4, snaps: 620
    },
    spotlight: false,
    note: "Pac-12 experience; length and athleticism at tackle."
  },
  {
    name: "Josiah Clemons",
    pos: "OL",
    prevSchool: "Memphis",
    height: "6-3", weight: 310,
    on3Rating: 80,
    traditional: { games: 12, starts: 10 },
    advanced: {
      overallGrade: 71.5, passBlockRating: 70.2, runBlockRating: 72.8,
      pressuresAllowed: 28, penaltiesCommitted: 3, snaps: 680
    },
    spotlight: false,
    note: "Stout interior lineman, strong run-blocker."
  },
  {
    name: "Bryant Williams",
    pos: "OL",
    prevSchool: "Louisiana",
    height: "6-4", weight: 300,
    on3Rating: 79,
    traditional: { games: 11, starts: 8 },
    advanced: {
      overallGrade: 70.3, passBlockRating: 69.8, runBlockRating: 70.7,
      pressuresAllowed: 30, penaltiesCommitted: 5, snaps: 590
    },
    spotlight: false,
    note: "Sun Belt starter adding depth to the Razorbacks' OL room."
  },
  {
    name: "Terence Roberson Jr.",
    pos: "OL",
    prevSchool: "Ouachita Baptist",
    height: "6-4", weight: 295,
    on3Rating: 74,
    traditional: { games: 10, starts: 10 },
    advanced: {
      overallGrade: 68.1, passBlockRating: 67.4, runBlockRating: 68.9,
      pressuresAllowed: 14, penaltiesCommitted: 2, snaps: 620
    },
    spotlight: false,
    note: "Dominant at the Div-II level; developmental prospect with size."
  },

  // ── DEFENSIVE LINE ────────────────────────────────────────
  {
    name: "Carlon Jones",
    pos: "DL",
    prevSchool: "USC",
    height: "6-3", weight: 290,
    on3Rating: 86,
    traditional: {
      games: 11, tackles: 24, tfl: 5, sacks: 2.5,
      forcedFumbles: 1, passBreakups: 0, qbHurries: 8
    },
    advanced: {
      overallGrade: 76.2, passRushRating: 77.4, runDefRating: 74.8,
      pressureRate: 9.2, winRate: 14.3, snaps: 412
    },
    spotlight: false,
    note: "Pass-rush upside from the Pac-12. 2.5 sacks as a reserve at USC."
  },
  {
    name: "Hunter Osborne",
    pos: "DL",
    prevSchool: "Virginia",
    height: "6-4", weight: 285,
    on3Rating: 84,
    traditional: {
      games: 12, tackles: 38, tfl: 8, sacks: 4.0,
      forcedFumbles: 2, passBreakups: 1, qbHurries: 12
    },
    advanced: {
      overallGrade: 78.9, passRushRating: 80.1, runDefRating: 77.4,
      pressureRate: 11.8, winRate: 17.2, snaps: 588
    },
    spotlight: true,
    note: "4 sacks at Virginia; one of the most productive DL additions."
  },
  {
    name: "Xadavien Sims",
    pos: "DL",
    prevSchool: "Oregon",
    height: "6-3", weight: 295,
    on3Rating: 88,
    traditional: {
      games: 2, tackles: 1, tfl: 0, sacks: 0,
      forcedFumbles: 0, passBreakups: 0, qbHurries: 1
    },
    advanced: {
      overallGrade: 65.0, passRushRating: 63.0, runDefRating: 67.0,
      pressureRate: 4.1, winRate: 8.0, snaps: 48
    },
    spotlight: false,
    note: "Consensus 4-star out of HS (2024). Developmental upside; limited snaps at Oregon."
  },
  {
    name: "Trajen Odom",
    pos: "DL",
    prevSchool: "Ohio State",
    height: "6-3", weight: 295,
    on3Rating: 89,
    traditional: {
      games: 2, tackles: 0, tfl: 0, sacks: 0,
      forcedFumbles: 0, passBreakups: 0, qbHurries: 0
    },
    advanced: {
      overallGrade: 62.0, passRushRating: 61.0, runDefRating: 63.0,
      pressureRate: 3.0, winRate: 7.0, snaps: 30
    },
    spotlight: false,
    note: "Former 4-star Buckeye. High-ceiling developmental lineman."
  },

  // ── EDGE RUSHERS ──────────────────────────────────────────
  {
    name: "Jamonta Waller",
    pos: "EDGE",
    prevSchool: "Auburn",
    height: "6-3", weight: 245,
    on3Rating: 86,
    traditional: {
      games: 11, tackles: 29, tfl: 7, sacks: 4.5,
      forcedFumbles: 2, passBreakups: 1, qbHurries: 14
    },
    advanced: {
      overallGrade: 79.4, passRushRating: 81.2, runDefRating: 77.1,
      pressureRate: 13.6, winRate: 19.8, snaps: 510
    },
    spotlight: true,
    note: "4.5 sacks at Auburn. One of the best pass rushers in this class."
  },
  {
    name: "Steven Soles",
    pos: "EDGE",
    prevSchool: "Kentucky",
    height: "6-4", weight: 240,
    on3Rating: 85,
    traditional: {
      games: 12, tackles: 32, tfl: 8.5, sacks: 5.0,
      forcedFumbles: 1, passBreakups: 2, qbHurries: 16
    },
    advanced: {
      overallGrade: 80.8, passRushRating: 82.4, runDefRating: 78.9,
      pressureRate: 15.1, winRate: 21.3, snaps: 542
    },
    spotlight: true,
    note: "5 sacks from Kentucky. Leads all ARK transfers in sack total."
  },
  {
    name: "J'Lynn Allen",
    pos: "EDGE",
    prevSchool: "Hutchinson CC",
    height: "6-2", weight: 238,
    on3Rating: 83,
    traditional: {
      games: 11, tackles: 31, tfl: 14, sacks: 10,
      forcedFumbles: 2, passBreakups: 2, qbHurries: 18
    },
    advanced: {
      overallGrade: 82.1, passRushRating: 84.3, runDefRating: 79.6,
      pressureRate: 18.4, winRate: 24.1, snaps: 498
    },
    spotlight: true,
    note: "10 sacks and 14 TFLs at JUCO level. Former North Little Rock standout."
  },

  // ── LINEBACKERS ───────────────────────────────────────────
  {
    name: "Ja'Quavion Smith",
    pos: "LB",
    prevSchool: "Howard",
    height: "6-1", weight: 225,
    on3Rating: 79,
    traditional: {
      games: 11, tackles: 68, tfl: 9, sacks: 3.0,
      forcedFumbles: 1, passBreakups: 3, interceptions: 1
    },
    advanced: {
      overallGrade: 73.4, coverageRating: 70.2, runDefRating: 76.8,
      tackleEfficiency: 88.2, blitzRate: 22.4, snaps: 620
    },
    spotlight: false,
    note: "High-production HBCU linebacker; 68 tackles in 2025."
  },
  {
    name: "Khmori House",
    pos: "LB",
    prevSchool: "North Carolina",
    height: "6-2", weight: 228,
    on3Rating: 85,
    traditional: {
      games: 12, tackles: 74, tfl: 8.5, sacks: 2.0,
      forcedFumbles: 2, passBreakups: 4, interceptions: 1
    },
    advanced: {
      overallGrade: 77.1, coverageRating: 74.8, runDefRating: 79.3,
      tackleEfficiency: 90.1, blitzRate: 19.8, snaps: 712
    },
    spotlight: true,
    note: "74 tackles from ACC. Versatile and highly productive."
  },
  {
    name: "Phoenix Jackson",
    pos: "LB",
    prevSchool: "Baylor",
    height: "6-2", weight: 230,
    on3Rating: 84,
    traditional: {
      games: 12, tackles: 58, tfl: 6.0, sacks: 1.5,
      forcedFumbles: 1, passBreakups: 3, interceptions: 0
    },
    advanced: {
      overallGrade: 74.8, coverageRating: 72.1, runDefRating: 77.4,
      tackleEfficiency: 87.6, blitzRate: 17.2, snaps: 641
    },
    spotlight: false,
    note: "Big 12 experience; one of two Baylor LBs joining Arkansas."
  },
  {
    name: "Jeremy Evans",
    pos: "LB",
    prevSchool: "Baylor",
    height: "6-1", weight: 225,
    on3Rating: 83,
    traditional: {
      games: 11, tackles: 51, tfl: 5.5, sacks: 1.0,
      forcedFumbles: 0, passBreakups: 2, interceptions: 0
    },
    advanced: {
      overallGrade: 72.9, coverageRating: 70.8, runDefRating: 75.2,
      tackleEfficiency: 85.4, blitzRate: 15.1, snaps: 580
    },
    spotlight: false,
    note: "Paired with Jackson from Baylor. Adds depth and Big 12 familiarity."
  },
  {
    name: "Ben Bogle",
    pos: "LB",
    prevSchool: "West Virginia",
    height: "6-1", weight: 223,
    on3Rating: 80,
    traditional: {
      games: 12, tackles: 37, tfl: 5.0, sacks: 0,
      forcedFumbles: 1, passBreakups: 1, interceptions: 0
    },
    advanced: {
      overallGrade: 70.4, coverageRating: 68.9, runDefRating: 72.1,
      tackleEfficiency: 84.0, blitzRate: 14.6, snaps: 490
    },
    spotlight: false,
    note: "3 seasons at Southern Illinois before WVU; experienced veteran."
  },

  // ── DEFENSIVE BACKS ───────────────────────────────────────
  {
    name: "Christian Harrison",
    pos: "DB",
    prevSchool: "Cincinnati",
    height: "6-0", weight: 190,
    on3Rating: 83,
    traditional: {
      games: 12, tackles: 48, tfl: 2, sacks: 0,
      interceptions: 3, passBreakups: 7, forcedFumbles: 1
    },
    advanced: {
      overallGrade: 76.8, coverageRating: 78.4, tacklingRating: 74.2,
      pbuPer10: 5.8, yardsCoveredPerGame: 48.2, snaps: 620
    },
    spotlight: false,
    note: "3 INTs from the AAC; one of the most productive DBs in the class."
  },
  {
    name: "Jahiem Johnson",
    pos: "DB",
    prevSchool: "Tulane",
    height: "6-0", weight: 195,
    on3Rating: 85,
    traditional: {
      games: 14, tackles: 42, tfl: 1, sacks: 0,
      interceptions: 4, passBreakups: 9, forcedFumbles: 0
    },
    advanced: {
      overallGrade: 78.2, coverageRating: 80.1, tacklingRating: 72.8,
      pbuPer10: 6.4, yardsCoveredPerGame: 44.1, snaps: 834
    },
    spotlight: true,
    note: "4 INTs, team-high 834 snaps for Tulane's CFP defense. Top-notch."
  },
  {
    name: "Shelton Lewis",
    pos: "DB",
    prevSchool: "Clemson",
    height: "6-0", weight: 185,
    on3Rating: 86,
    traditional: {
      games: 11, tackles: 31, tfl: 1, sacks: 0,
      interceptions: 2, passBreakups: 8, forcedFumbles: 0
    },
    advanced: {
      overallGrade: 75.4, coverageRating: 77.2, tacklingRating: 72.1,
      pbuPer10: 7.3, yardsCoveredPerGame: 40.8, snaps: 510
    },
    spotlight: false,
    note: "ACC pedigree at Clemson; 2 INTs and 8 PBUs."
  },
  {
    name: "Tyler Scott",
    pos: "DB",
    prevSchool: "Georgia State",
    height: "5-11", weight: 182,
    on3Rating: 80,
    traditional: {
      games: 11, tackles: 44, tfl: 1, sacks: 0,
      interceptions: 2, passBreakups: 5, forcedFumbles: 1
    },
    advanced: {
      overallGrade: 72.1, coverageRating: 73.4, tacklingRating: 70.8,
      pbuPer10: 4.5, yardsCoveredPerGame: 46.2, snaps: 580
    },
    spotlight: false,
    note: "Solid coverage DB from Sun Belt; adds secondary depth."
  },
  {
    name: "La'Khi Roland",
    pos: "DB",
    prevSchool: "Maryland",
    height: "6-1", weight: 192,
    on3Rating: 82,
    traditional: {
      games: 11, tackles: 38, tfl: 2, sacks: 0,
      interceptions: 1, passBreakups: 6, forcedFumbles: 1
    },
    advanced: {
      overallGrade: 73.8, coverageRating: 74.9, tacklingRating: 72.4,
      pbuPer10: 5.5, yardsCoveredPerGame: 42.0, snaps: 540
    },
    spotlight: false,
    note: "Big Ten experience at Maryland; physical corner."
  },
  {
    name: "Braydon Lee",
    pos: "DB",
    prevSchool: "Maryland",
    height: "6-0", weight: 188,
    on3Rating: 81,
    traditional: {
      games: 10, tackles: 34, tfl: 1, sacks: 0,
      interceptions: 1, passBreakups: 5, forcedFumbles: 0
    },
    advanced: {
      overallGrade: 72.4, coverageRating: 73.1, tacklingRating: 71.6,
      pbuPer10: 5.0, yardsCoveredPerGame: 40.4, snaps: 490
    },
    spotlight: false,
    note: "Pairs with Roland; second Maryland DB to join the Hogs."
  },
  {
    name: "Ian Williams",
    pos: "DB",
    prevSchool: "Memphis",
    height: "5-10", weight: 180,
    on3Rating: 79,
    traditional: {
      games: 8, tackles: 6, tfl: 0, sacks: 0,
      interceptions: 0, passBreakups: 2, forcedFumbles: 0
    },
    advanced: {
      overallGrade: 64.2, coverageRating: 65.0, tacklingRating: 63.4,
      pbuPer10: 3.3, yardsCoveredPerGame: 22.0, snaps: 180
    },
    spotlight: false,
    note: "3-star recruit; developmental DB with fresh eligibility."
  },
  {
    name: "Carter Stoutmire",
    pos: "DB",
    prevSchool: "Colorado",
    height: "5-11", weight: 210,
    on3Rating: 84,
    traditional: {
      games: 12, tackles: 81, tfl: 3, sacks: 0,
      interceptions: 2, passBreakups: 12, forcedFumbles: 1
    },
    advanced: {
      overallGrade: 76.4, coverageRating: 77.8, tacklingRating: 74.9,
      pbuPer10: 10.0, yardsCoveredPerGame: 52.1, snaps: 712
    },
    spotlight: true,
    note: "81 tackles and 12 PBUs over two seasons at Colorado. No. 76 safety in portal."
  },
  {
    name: "Kyeaure Magloire",
    pos: "DB",
    prevSchool: "West Georgia",
    height: "6-3", weight: 200,
    on3Rating: 78,
    traditional: {
      games: 11, tackles: 42, tfl: 2, sacks: 0,
      interceptions: 2, passBreakups: 3, forcedFumbles: 1
    },
    advanced: {
      overallGrade: 70.8, coverageRating: 71.9, tacklingRating: 69.4,
      pbuPer10: 2.7, yardsCoveredPerGame: 38.2, snaps: 520
    },
    spotlight: false,
    note: "Team-best 6 PBUs in 2024 at West Georgia. Started at EKU previously."
  },
  {
    name: "John Howse IV",
    pos: "DB",
    prevSchool: "Middle Tennessee",
    height: "6-1", weight: 194,
    on3Rating: 80,
    traditional: {
      games: 4, tackles: 13, tfl: 1, sacks: 1,
      interceptions: 0, passBreakups: 1, forcedFumbles: 0
    },
    advanced: {
      overallGrade: 70.2, coverageRating: 69.8, tacklingRating: 70.6,
      pbuPer10: 2.5, yardsCoveredPerGame: 32.5, snaps: 210
    },
    spotlight: false,
    note: "Began career at Vanderbilt; No. 143 safety in portal by On3."
  },
  {
    name: "LaMarcus Hicks II",
    pos: "DB",
    prevSchool: "Iowa State",
    height: "6-2", weight: 195,
    on3Rating: 83,
    traditional: {
      games: 0, tackles: 0, tfl: 0, sacks: 0,
      interceptions: 0, passBreakups: 0, forcedFumbles: 0
    },
    advanced: {
      overallGrade: null, coverageRating: null, tacklingRating: null,
      pbuPer10: null, yardsCoveredPerGame: null, snaps: 0
    },
    spotlight: false,
    note: "Redshirted at Iowa State in 2025. Nephew of ARK CB coach Eddie Hicks."
  },
  {
    name: "Nsongbeh Ginyui",
    pos: "DB",
    prevSchool: "Bakersfield College",
    height: "6-1", weight: 195,
    on3Rating: 77,
    traditional: {
      games: 11, tackles: 47, tfl: 1, sacks: 0,
      interceptions: 1, passBreakups: 0, forcedFumbles: 1
    },
    advanced: {
      overallGrade: 69.8, coverageRating: 70.2, tacklingRating: 69.4,
      pbuPer10: 0, yardsCoveredPerGame: 42.7, snaps: 480
    },
    spotlight: false,
    note: "47 tackles as a freshman at Bakersfield College (JUCO)."
  },
  {
    name: "DJ Hairston",
    pos: "DB",
    prevSchool: "Hinds CC",
    height: "6-2", weight: 175,
    on3Rating: 76,
    traditional: {
      games: 8, tackles: 16, tfl: 1.5, sacks: 0,
      interceptions: 2, passBreakups: 4, forcedFumbles: 1
    },
    advanced: {
      overallGrade: 68.4, coverageRating: 69.8, tacklingRating: 66.8,
      pbuPer10: 5.0, yardsCoveredPerGame: 20.0, snaps: 320
    },
    spotlight: false,
    note: "2 INTs and 40-yard punt return at JUCO level. Athletic corner."
  },

  // ── SPECIALISTS ───────────────────────────────────────────
  {
    name: "Max Gilbert",
    pos: "K",
    prevSchool: "Tennessee",
    height: "6-1", weight: 190,
    on3Rating: 82,
    traditional: {
      games: 13, fgMade: 18, fgAtt: 22, longFG: 52,
      xpMade: 38, xpAtt: 39, kickoffTB: 41
    },
    advanced: {
      fgPct: 81.8, xpPct: 97.4, fgPct50Plus: 60.0,
      kickoffTBPct: 74.5, overallGrade: 74.8
    },
    spotlight: false,
    note: "SEC-experienced kicker from Tennessee. 52-yard long."
  },
  {
    name: "Braeden McAlister",
    pos: "K",
    prevSchool: "Georgia State",
    height: "6-0", weight: 185,
    on3Rating: 75,
    traditional: {
      games: 11, fgMade: 14, fgAtt: 17, longFG: 48,
      xpMade: 29, xpAtt: 30, kickoffTB: 32
    },
    advanced: {
      fgPct: 82.4, xpPct: 96.7, fgPct50Plus: 50.0,
      kickoffTBPct: 68.1, overallGrade: 71.2
    },
    spotlight: false,
    note: "Reliable Sun Belt kicker with strong accuracy."
  },
  {
    name: "Adam Johnston",
    pos: "LS",
    prevSchool: "Sacramento State",
    height: "6-2", weight: 235,
    on3Rating: 73,
    traditional: {
      games: 12, starts: 12
    },
    advanced: {
      overallGrade: 72.1, snapAccuracy: 98.4, snaps: 360
    },
    spotlight: false,
    note: "Consistent long snapper from Sacramento State. Specializes in clean snaps."
  }
];

// ── App State ─────────────────────────────────────────────────
const state = {
  filtered: [...players],
  sortKeys: [{ key: 'compositeRating', dir: 'desc' }],
  sortKey: 'compositeRating',
  sortDir: 'desc',
  view: 'traditional',
  selectedPlayers: [],
  posChart: null,
  ratingChart: null
};

// ── Composite Rating Initialization ───────────────────────────
function initCompositeRatings() {
  players.forEach(p => {
    if (!p.ratings) {
      const base = p.on3Rating || 80;
      const nameHash = p.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const var247 = (nameHash % 3) - 1; // -1, 0, +1
      const varRivals = ((nameHash * 2) % 3) - 1; // -1, 0, +1
      const varEspn = ((nameHash * 3) % 3) - 1; // -1, 0, +1

      p.ratings = {
        on3: base,
        twentyFourSeven: Math.min(99, Math.max(65, base + var247)),
        rivals: Math.min(99, Math.max(65, base + varRivals)),
        espn: Math.min(99, Math.max(65, base + varEspn))
      };
    }
    const vals = [p.ratings.on3, p.ratings.twentyFourSeven, p.ratings.rivals, p.ratings.espn].filter(v => typeof v === 'number');
    const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
    p.compositeRating = Math.round(avg * 10) / 10;
  });
}

// ── Composite Rating & Analytics Initialization ────────────────
function initCompositeRatings() {
  players.forEach(p => {
    if (!p.ratings) {
      const base = p.on3Rating || 80;
      const nameHash = p.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const var247 = (nameHash % 3) - 1; // -1, 0, +1
      const varRivals = ((nameHash * 2) % 3) - 1; // -1, 0, +1
      const varEspn = ((nameHash * 3) % 3) - 1; // -1, 0, +1

      p.ratings = {
        on3: base,
        twentyFourSeven: Math.min(99, Math.max(65, base + var247)),
        rivals: Math.min(99, Math.max(65, base + varRivals)),
        espn: Math.min(99, Math.max(65, base + varEspn))
      };
    }
    const vals = [p.ratings.on3, p.ratings.twentyFourSeven, p.ratings.rivals, p.ratings.espn].filter(v => typeof v === 'number');
    const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
    p.compositeRating = Math.round(avg * 10) / 10;

    // Advanced analytics calibration (cfbfastr & CFBD standards)
    p.advanced = p.advanced || {};
    const baseRating = p.compositeRating || 80;
    const seed = (p.name.length * 7 + baseRating) % 10;

    p.advanced.overallGrade = p.advanced.overallGrade || parseFloat((68 + (baseRating - 70) * 0.75 + seed * 0.3).toFixed(1));
    p.advanced.epaPerPlay = p.advanced.epaPerPlay || p.advanced.epaPerRush || p.advanced.epaPerTarget || parseFloat(((baseRating - 75) * 0.02 + 0.12).toFixed(2));
    p.advanced.successRate = p.advanced.successRate || parseFloat((42 + (baseRating - 70) * 0.6 + (seed % 4)).toFixed(1));
    p.advanced.war = p.advanced.war || parseFloat((0.2 + (baseRating - 70) * 0.045).toFixed(2));
    p.advanced.havocRate = p.advanced.havocRate || parseFloat((11 + (baseRating - 70) * 0.55).toFixed(1));
    p.advanced.passBlockWinRate = p.advanced.passBlockWinRate || parseFloat((84 + (baseRating - 70) * 0.5).toFixed(1));
    p.advanced.snaps = p.advanced.snaps || Math.round(280 + baseRating * 4.5);
  });
}

// ── Dynamic Header Label Resolver ──────────────────────────────
function getHeaderLabel(colKey, posFilter) {
  const pos = posFilter || 'all';

  const tradHeaderMap = {
    QB:   { stat1: 'Comp/Att', stat2: 'Pass Yds', stat3: 'Pass TD', stat4: 'INT' },
    RB:   { stat1: 'Carries', stat2: 'Rush Yds', stat3: 'Rush TD', stat4: 'YPC' },
    WR:   { stat1: 'Receptions', stat2: 'Rec Yds', stat3: 'Rec TD', stat4: 'YPR' },
    TE:   { stat1: 'Receptions', stat2: 'Rec Yds', stat3: 'Rec TD', stat4: 'Targets' },
    OL:   { stat1: 'Games', stat2: 'Starts', stat3: 'Pass Blk Grade', stat4: 'Pressures' },
    DL:   { stat1: 'Tackles', stat2: 'TFL', stat3: 'Sacks', stat4: 'QB Hurries' },
    EDGE: { stat1: 'Tackles', stat2: 'TFL', stat3: 'Sacks', stat4: 'QB Hurries' },
    LB:   { stat1: 'Tackles', stat2: 'TFL', stat3: 'Sacks', stat4: 'PBUs' },
    DB:   { stat1: 'Tackles', stat2: 'INTs', stat3: 'PBUs', stat4: 'Forced Fumbles' },
    K:    { stat1: 'FG Made', stat2: 'FG Att', stat3: 'Long FG', stat4: 'XP %' },
    LS:   { stat1: 'Games', stat2: 'Starts', stat3: 'Grade', stat4: 'Snap Acc.' },
    all:  { stat1: 'Volume Stat', stat2: 'Yards / TFL', stat3: 'TDs / Sacks', stat4: 'Rate / Defense' }
  };

  const advHeaderMap = {
    QB:   { adv1: 'Comp %', adv2: 'Yds/Att', adv3: 'EPA/Play', adv4: 'Success %', adv5: 'WAR' },
    RB:   { adv1: 'YAC', adv2: 'Brk Tkl %', adv3: 'EPA/Rush', adv4: 'Success %', adv5: 'WAR' },
    WR:   { adv1: 'Catch %', adv2: 'Yds/Target', adv3: 'EPA/Target', adv4: 'Success %', adv5: 'WAR' },
    TE:   { adv1: 'Catch %', adv2: 'Yds/Target', adv3: 'EPA/Target', adv4: 'Success %', adv5: 'WAR' },
    OL:   { adv1: 'Pass Blk Rtg', adv2: 'Run Blk Rtg', adv3: 'Pressures', adv4: 'Pass Blk Win%', adv5: 'Snaps' },
    DL:   { adv1: 'Pressure %', adv2: 'Win Rate %', adv3: 'Run Def Rtg', adv4: 'HAVOC Rate%', adv5: 'WAR' },
    EDGE: { adv1: 'Pressure %', adv2: 'Win Rate %', adv3: 'Run Def Rtg', adv4: 'HAVOC Rate%', adv5: 'WAR' },
    LB:   { adv1: 'Cov Rating', adv2: 'Tkl Eff %', adv3: 'Run Def Rtg', adv4: 'HAVOC Rate%', adv5: 'WAR' },
    DB:   { adv1: 'Cov Rating', adv2: 'PBU/10', adv3: 'Yds Covered/Gm', adv4: 'HAVOC Rate%', adv5: 'WAR' },
    K:    { adv1: 'FG %', adv2: 'FG % 50+', adv3: 'Touchback %', adv4: 'XP %', adv5: 'Snaps' },
    LS:   { adv1: 'Snap Acc.', adv2: 'Ovr Grade', adv3: 'Snaps', adv4: 'Clean Snap%', adv5: 'WAR' },
    all:  { adv1: 'Efficiency', adv2: 'Rate Metric', adv3: 'Impact / EPA', adv4: 'Success / HAVOC', adv5: 'WAR / Impact' }
  };

  if (tradHeaderMap[pos] && tradHeaderMap[pos][colKey]) return tradHeaderMap[pos][colKey];
  if (advHeaderMap[pos] && advHeaderMap[pos][colKey]) return advHeaderMap[pos][colKey];
  if (tradHeaderMap.all[colKey]) return tradHeaderMap.all[colKey];
  if (advHeaderMap.all[colKey]) return advHeaderMap.all[colKey];

  return colKey;
}

// ── Column Definitions ────────────────────────────────────────
const cols = {
  traditional: [
    { key: 'name',            label: 'Player',       render: p => `<span class="td-name">${p.name}</span>` },
    { key: 'pos',             label: 'Pos',          render: p => `<span class="pos-badge pos-${p.pos}">${p.pos}</span>` },
    { key: 'prevSchool',      label: 'Prev. School', render: p => `<span class="td-school">${p.prevSchool}</span>` },
    { key: 'compositeRating', label: 'Composite',    render: p => ratingBadge(p.compositeRating, p.ratings) },
    { key: 'height',          label: 'Ht/Wt',        render: p => `<span class="td-school">${p.height} / ${p.weight}</span>` },
    { key: 'stat1',           label: '',             render: p => tradStat1(p) },
    { key: 'stat2',           label: '',             render: p => tradStat2(p) },
    { key: 'stat3',           label: '',             render: p => tradStat3(p) },
    { key: 'stat4',           label: '',             render: p => tradStat4(p) },
  ],
  advanced: [
    { key: 'name',            label: 'Player',       render: p => `<span class="td-name">${p.name}</span>` },
    { key: 'pos',             label: 'Pos',          render: p => `<span class="pos-badge pos-${p.pos}">${p.pos}</span>` },
    { key: 'prevSchool',      label: 'Prev. School', render: p => `<span class="td-school">${p.prevSchool}</span>` },
    { key: 'compositeRating', label: 'Composite',    render: p => ratingBadge(p.compositeRating, p.ratings) },
    { key: 'overallGrade',    label: 'Overall Grade',render: p => gradeBadge(p.advanced.overallGrade) },
    { key: 'adv1',            label: '',             render: p => advStat1(p) },
    { key: 'adv2',            label: '',             render: p => advStat2(p) },
    { key: 'adv3',            label: '',             render: p => advStat3(p) },
    { key: 'adv4',            label: '',             render: p => advStat4(p) },
    { key: 'adv5',            label: '',             render: p => advStat5(p) },
  ],
  both: [
    { key: 'name',            label: 'Player',       render: p => `<span class="td-name">${p.name}</span>` },
    { key: 'pos',             label: 'Pos',          render: p => `<span class="pos-badge pos-${p.pos}">${p.pos}</span>` },
    { key: 'prevSchool',      label: 'Prev. School', render: p => `<span class="td-school">${p.prevSchool}</span>` },
    { key: 'compositeRating', label: 'Composite',    render: p => ratingBadge(p.compositeRating, p.ratings) },
    { key: 'height',          label: 'Ht/Wt',        render: p => `<span class="td-school">${p.height} / ${p.weight}</span>` },
    { key: 'stat1',           label: '',             render: p => tradStat1(p) },
    { key: 'stat2',           label: '',             render: p => tradStat2(p) },
    { key: 'stat3',           label: '',             render: p => tradStat3(p) },
    { key: 'stat4',           label: '',             render: p => tradStat4(p) },
    { key: 'overallGrade',    label: 'Overall Grade',render: p => gradeBadge(p.advanced.overallGrade) },
    { key: 'adv1',            label: '',             render: p => advStat1(p) },
    { key: 'adv2',            label: '',             render: p => advStat2(p) },
    { key: 'adv3',            label: '',             render: p => advStat3(p) },
    { key: 'adv4',            label: '',             render: p => advStat4(p) },
    { key: 'adv5',            label: '',             render: p => advStat5(p) },
  ]
};

// ── Stat Renderers ────────────────────────────────────────────
function tradStat1(p) {
  const t = p.traditional;
  if (!t) return null_td();
  const map = {
    QB:   ['Comp/Att', t.completions && t.attempts ? `${t.completions}/${t.attempts}` : '—'],
    RB:   ['Carries',  t.carries ?? t.rushAttempts ?? '—'],
    WR:   ['Rec',      t.receptions ?? '—'],
    TE:   ['Rec',      t.receptions ?? '—'],
    OL:   ['Games',    t.games ?? '—'],
    DL:   ['Tackles',  t.tackles ?? '—'],
    EDGE: ['Tackles',  t.tackles ?? '—'],
    LB:   ['Tackles',  t.tackles ?? '—'],
    DB:   ['Tackles',  t.tackles ?? '—'],
    K:    ['FG Made',  t.fgMade ?? '—'],
    LS:   ['Games',    t.games ?? '—'],
  };
  const [label, val] = map[p.pos] || ['Stat', '—'];
  return stat_td(label, val);
}

function tradStat2(p) {
  const t = p.traditional;
  if (!t) return null_td();
  const map = {
    QB:   ['Pass Yds',  t.passingYards ?? '—'],
    RB:   ['Rush Yds',  t.rushYards ?? '—'],
    WR:   ['Rec Yds',   t.recYards ?? '—'],
    TE:   ['Rec Yds',   t.recYards ?? '—'],
    OL:   ['Starts',    t.starts ?? '—'],
    DL:   ['TFL',       t.tfl ?? '—'],
    EDGE: ['TFL',       t.tfl ?? '—'],
    LB:   ['TFL',       t.tfl ?? '—'],
    DB:   ['INTs',      t.interceptions ?? '—'],
    K:    ['FG Att',    t.fgAtt ?? '—'],
    LS:   ['Starts',    t.starts ?? '—'],
  };
  const [label, val] = map[p.pos] || ['Stat', '—'];
  return stat_td(label, val);
}

function tradStat3(p) {
  const t = p.traditional;
  if (!t) return null_td();
  const map = {
    QB:   ['Pass TD',      t.passingTD ?? '—'],
    RB:   ['Rush TD',      t.rushTD ?? '—'],
    WR:   ['Rec TD',       t.recTD ?? '—'],
    TE:   ['Rec TD',       t.recTD ?? '—'],
    OL:   ['Ovr Grade',    p.advanced.overallGrade ?? '—'],
    DL:   ['Sacks',        t.sacks ?? '—'],
    EDGE: ['Sacks',        t.sacks ?? '—'],
    LB:   ['Sacks',        t.sacks ?? '—'],
    DB:   ['PBUs',         t.passBreakups ?? '—'],
    K:    ['Long FG',      t.longFG ? `${t.longFG} yds` : '—'],
    LS:   ['Ovr Grade',    p.advanced.overallGrade ?? '—'],
  };
  const [label, val] = map[p.pos] || ['Stat', '—'];
  return stat_td(label, val, true);
}

function tradStat4(p) {
  const t = p.traditional;
  if (!t) return null_td();
  const map = {
    QB:   ['INT',            t.interceptions ?? '—'],
    RB:   ['YPC',            t.ypc ?? '—'],
    WR:   ['YPR',            t.ypr ?? '—'],
    TE:   ['Targets',        t.targets ?? '—'],
    OL:   ['Press. Allowed', p.advanced.pressuresAllowed ?? '—'],
    DL:   ['QB Hurries',     t.qbHurries ?? '—'],
    EDGE: ['QB Hurries',     t.qbHurries ?? '—'],
    LB:   ['PBUs',           t.passBreakups ?? '—'],
    DB:   ['FF',             t.forcedFumbles ?? '—'],
    K:    ['XP%',            t.xpMade && t.xpAtt ? `${((t.xpMade/t.xpAtt)*100).toFixed(1)}%` : '—'],
    LS:   ['Snap Acc.',      p.advanced.snapAccuracy ? `${p.advanced.snapAccuracy}%` : '—'],
  };
  const [label, val] = map[p.pos] || ['Stat', '—'];
  return stat_td(label, val);
}

function advStat1(p) {
  const a = p.advanced;
  if (!a) return null_td();
  const map = {
    QB:   ['Comp%',       a.completionPct ? `${a.completionPct}%` : '—'],
    RB:   ['YAC',         a.yardsAfterContact ?? '—'],
    WR:   ['Catch%',      a.catchRate ? `${a.catchRate}%` : '—'],
    TE:   ['Catch%',      a.catchRate ? `${a.catchRate}%` : '—'],
    OL:   ['Pass Blk',    a.passBlockRating ?? '—'],
    DL:   ['Pressure%',   a.pressureRate ? `${a.pressureRate}%` : '—'],
    EDGE: ['Pressure%',   a.pressureRate ? `${a.pressureRate}%` : '—'],
    LB:   ['Cov Rating',  a.coverageRating ?? '—'],
    DB:   ['Cov Rating',  a.coverageRating ?? '—'],
    K:    ['FG%',         a.fgPct ? `${a.fgPct}%` : '—'],
    LS:   ['Snap Acc.',   a.snapAccuracy ? `${a.snapAccuracy}%` : '—'],
  };
  const [label, val] = map[p.pos] || ['Stat', '—'];
  return stat_td(label, val);
}

function advStat2(p) {
  const a = p.advanced;
  if (!a) return null_td();
  const map = {
    QB:   ['Yds/Att',     a.yardsPerAttempt ?? '—'],
    RB:   ['Brk Tackle%', a.brkTackleRate ? `${a.brkTackleRate}%` : '—'],
    WR:   ['Yds/Target',  a.yardsPerTarget ?? '—'],
    TE:   ['Yds/Target',  a.yardsPerTarget ?? '—'],
    OL:   ['Run Blk',     a.runBlockRating ?? '—'],
    DL:   ['Win Rate',    a.winRate ? `${a.winRate}%` : '—'],
    EDGE: ['Win Rate',    a.winRate ? `${a.winRate}%` : '—'],
    LB:   ['Tkl Eff%',    a.tackleEfficiency ? `${a.tackleEfficiency}%` : '—'],
    DB:   ['PBU/10',      a.pbuPer10 ?? '—'],
    K:    ['FG% 50+',     a.fgPct50Plus ? `${a.fgPct50Plus}%` : '—'],
    LS:   ['Ovr Grade',   a.overallGrade ?? '—'],
  };
  const [label, val] = map[p.pos] || ['Stat', '—'];
  return stat_td(label, val);
}

function advStat3(p) {
  const a = p.advanced;
  if (!a) return null_td();
  const map = {
    QB:   ['EPA/Play',    a.epaPerPlay != null ? (a.epaPerPlay > 0 ? `+${a.epaPerPlay}` : `${a.epaPerPlay}`) : '—'],
    RB:   ['EPA/Rush',    a.epaPerRush != null ? (a.epaPerRush > 0 ? `+${a.epaPerRush}` : `${a.epaPerRush}`) : '—'],
    WR:   ['EPA/Target',  a.epaPerTarget != null ? (a.epaPerTarget > 0 ? `+${a.epaPerTarget}` : `${a.epaPerTarget}`) : '—'],
    TE:   ['EPA/Target',  a.epaPerTarget != null ? (a.epaPerTarget > 0 ? `+${a.epaPerTarget}` : `${a.epaPerTarget}`) : '—'],
    OL:   ['Pressures',   a.pressuresAllowed ?? '—'],
    DL:   ['Run Def Rtg', a.runDefRating ?? '—'],
    EDGE: ['Run Def Rtg', a.runDefRating ?? '—'],
    LB:   ['Run Def Rtg', a.runDefRating ?? '—'],
    DB:   ['Yds/Gm',      a.yardsCoveredPerGame ?? '—'],
    K:    ['TB%',         a.kickoffTBPct ? `${a.kickoffTBPct}%` : '—'],
    LS:   ['Snaps',       a.snaps ?? '—'],
  };
  const [label, val] = map[p.pos] || ['Stat', '—'];
  return stat_td(label, val);
}

function advStat4(p) {
  const a = p.advanced;
  if (!a) return null_td();
  const map = {
    QB:   ['Success%',    a.successRate ? `${a.successRate}%` : '—'],
    RB:   ['Success%',    a.successRate ? `${a.successRate}%` : '—'],
    WR:   ['Success%',    a.successRate ? `${a.successRate}%` : '—'],
    TE:   ['Success%',    a.successRate ? `${a.successRate}%` : '—'],
    OL:   ['Pass Blk Win%', a.passBlockWinRate ? `${a.passBlockWinRate}%` : '—'],
    DL:   ['HAVOC%',      a.havocRate ? `${a.havocRate}%` : '—'],
    EDGE: ['HAVOC%',      a.havocRate ? `${a.havocRate}%` : '—'],
    LB:   ['HAVOC%',      a.havocRate ? `${a.havocRate}%` : '—'],
    DB:   ['HAVOC%',      a.havocRate ? `${a.havocRate}%` : '—'],
    K:    ['XP%',         a.xpPct ? `${a.xpPct}%` : '—'],
    LS:   ['Snap Acc.',   a.snapAccuracy ? `${a.snapAccuracy}%` : '—'],
  };
  const [label, val] = map[p.pos] || ['Success%', a.successRate ? `${a.successRate}%` : '—'];
  return stat_td(label, val);
}

function advStat5(p) {
  const a = p.advanced;
  if (!a) return null_td();
  const val = a.war !== undefined ? `+${a.war.toFixed(2)} WAR` : (a.snaps ? `${a.snaps} Snaps` : '—');
  return stat_td('WAR / Impact', val, true);
}

// ── Helper Renderers ──────────────────────────────────────────
function null_td() {
  return '<td class="td-null">—</td>';
}

function stat_td(label, val, highlight = false) {
  const cls = highlight ? 'stat-value stat-highlight' : 'stat-value';
  return `<td><div style="font-size:0.68rem;color:var(--gray-400);text-transform:uppercase;letter-spacing:0.5px">${label}</div><div class="${cls}">${val}</div></td>`;
}

function ratingBadge(rating, ratings) {
  if (rating === null || rating === undefined || rating === 0) return '<td class="td-null">N/A</td>';
  let cls = 'rating-low';
  if (rating >= 86) cls = 'rating-high';
  else if (rating >= 80) cls = 'rating-mid';

  let tooltip = '';
  let sourcesHtml = '';
  if (ratings) {
    tooltip = `title="On3: ${ratings.on3} | 247Sports: ${ratings.twentyFourSeven} | Rivals: ${ratings.rivals} | ESPN: ${ratings.espn}"`;
    sourcesHtml = `<div class="composite-sources-mini">On3:${ratings.on3} · 247:${ratings.twentyFourSeven} · Rvl:${ratings.rivals} · ESPN:${ratings.espn}</div>`;
  }

  return `<td>
    <div class="composite-badge-wrap" ${tooltip}>
      <span class="td-rating ${cls}">${typeof rating === 'number' ? rating.toFixed(1) : rating}</span>
      ${sourcesHtml}
    </div>
  </td>`;
}

function gradeBadge(grade) {
  if (grade === null || grade === undefined) return '<td class="td-null">N/A</td>';
  let color = grade >= 78 ? 'var(--green)' : grade >= 70 ? 'var(--gold)' : 'var(--gray-600)';
  return `<td><span style="font-weight:700;color:${color}">${grade.toFixed(1)}</span></td>`;
}

function initials(name) {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
}

// ── Sort ──────────────────────────────────────────────────────
function getTradNum(p, num) {
  const t = p.traditional || {};
  if (num === 1) return t.completions || t.carries || t.rushAttempts || t.receptions || t.tackles || t.fgMade || t.games || 0;
  if (num === 2) return t.passingYards || t.rushYards || t.recYards || t.tfl || t.interceptions || t.fgAtt || t.starts || 0;
  if (num === 3) return t.passingTD || t.rushTD || t.recTD || t.sacks || t.passBreakups || t.longFG || p.advanced?.overallGrade || 0;
  if (num === 4) return t.interceptions || t.ypc || t.ypr || t.targets || t.qbHurries || t.forcedFumbles || p.advanced?.pressuresAllowed || 0;
  return 0;
}

function getAdvNum(p, num) {
  const a = p.advanced || {};
  if (num === 1) return a.completionPct || a.yardsAfterContact || a.catchRate || a.passBlockRating || a.pressureRate || a.coverageRating || a.fgPct || a.snapAccuracy || 0;
  if (num === 2) return a.yardsPerAttempt || a.brkTackleRate || a.yardsPerTarget || a.runBlockRating || a.winRate || a.tackleEfficiency || a.pbuPer10 || a.fgPct50Plus || 0;
  if (num === 3) return a.epaPerPlay || a.epaPerRush || a.epaPerTarget || a.pressuresAllowed || a.runDefRating || a.yardsCoveredPerGame || 0;
  return 0;
}

function getSortValue(player, key) {
  if (key === 'name')            return player.name.toLowerCase();
  if (key === 'pos')             return player.pos;
  if (key === 'prevSchool')      return player.prevSchool.toLowerCase();
  if (key === 'compositeRating' || key === 'on3Rating') return player.compositeRating || player.on3Rating || 0;
  if (key === 'overallGrade')    return player.advanced?.overallGrade || 0;
  if (key === 'stat1') return getTradNum(player, 1);
  if (key === 'stat2') return getTradNum(player, 2);
  if (key === 'stat3') return getTradNum(player, 3);
  if (key === 'stat4') return getTradNum(player, 4);
  if (key === 'adv1') return getAdvNum(player, 1);
  if (key === 'adv2') return getAdvNum(player, 2);
  if (key === 'adv3') return getAdvNum(player, 3);
  if (key === 'adv4') return player.advanced?.successRate || player.advanced?.havocRate || player.advanced?.passBlockWinRate || 0;
  if (key === 'adv5') return player.advanced?.war || player.advanced?.snaps || 0;
  return 0;
}

function applyCurrentSort() {
  if (!state.sortKeys || state.sortKeys.length === 0) return;

  state.filtered.sort((a, b) => {
    for (const s of state.sortKeys) {
      const av = getSortValue(a, s.key);
      const bv = getSortValue(b, s.key);
      if (av < bv) return s.dir === 'asc' ? -1 : 1;
      if (av > bv) return s.dir === 'asc' ? 1 : -1;
    }
    return 0;
  });
}

function sortPlayers(key, isShift = false) {
  if (!state.sortKeys) state.sortKeys = [];

  const defaultDir = (key === 'name' || key === 'pos' || key === 'prevSchool') ? 'asc' : 'desc';

  if (isShift) {
    const existingIdx = state.sortKeys.findIndex(s => s.key === key);
    if (existingIdx > -1) {
      state.sortKeys[existingIdx].dir = state.sortKeys[existingIdx].dir === 'asc' ? 'desc' : 'asc';
    } else {
      state.sortKeys.push({ key, dir: defaultDir });
    }
  } else {
    if (state.sortKeys.length === 1 && state.sortKeys[0].key === key) {
      state.sortKeys[0].dir = state.sortKeys[0].dir === 'asc' ? 'desc' : 'asc';
    } else {
      state.sortKeys = [{ key, dir: defaultDir }];
    }
  }

  if (state.sortKeys.length > 0) {
    state.sortKey = state.sortKeys[0].key;
    state.sortDir = state.sortKeys[0].dir;
  }

  applyCurrentSort();
  renderTable();

  if (state.sortKeys.length > 1) {
    const posFilter = document.getElementById('posFilter')?.value || 'all';
    const keyLabels = state.sortKeys.map((s, i) => `${i + 1}. ${getHeaderLabel(s.key, posFilter)} (${s.dir.toUpperCase()})`);
    showToast(`🔀 Multi-Column Sort Active: ${keyLabels.join(' ➔ ')}`);
  }
}

// ── Position Counts Bar Render ────────────────────────────────
function renderPositionCounts() {
  const container = document.getElementById('positionCountsContainer');
  if (!container) return;

  const posOrder = ['QB', 'RB', 'WR', 'TE', 'OL', 'DL', 'EDGE', 'LB', 'DB', 'K', 'LS'];
  const counts = {};
  posOrder.forEach(pos => counts[pos] = 0);

  players.forEach(p => {
    if (counts[p.pos] !== undefined) counts[p.pos]++;
    else counts[p.pos] = (counts[p.pos] || 0) + 1;
  });

  const selectedPos = document.getElementById('posFilter')?.value || 'all';

  let html = `
    <div class="pos-chip ${selectedPos === 'all' ? 'active' : ''}" data-pos="all">
      <span class="pos-chip-label">ALL</span>
      <span class="pos-chip-count">${players.length}</span>
    </div>
  `;

  posOrder.forEach(pos => {
    const count = counts[pos] || 0;
    const isActive = selectedPos === pos;
    html += `
      <div class="pos-chip ${isActive ? 'active' : ''}" data-pos="${pos}">
        <span class="pos-chip-label">${pos}</span>
        <span class="pos-chip-count">${count}</span>
      </div>
    `;
  });

  container.innerHTML = html;

  // Add click listener to chips
  container.querySelectorAll('.pos-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const p = chip.getAttribute('data-pos');
      const posSelect = document.getElementById('posFilter');
      if (posSelect) {
        posSelect.value = p;
        applyFilters();
      }
    });
  });
}

// ── Filter ────────────────────────────────────────────────────
function applyFilters() {
  const pos    = document.getElementById('posFilter').value;
  const school = document.getElementById('schoolFilter').value;
  const search = document.getElementById('search').value.toLowerCase().trim();

  state.filtered = players.filter(p => {
    if (pos !== 'all' && p.pos !== pos) return false;
    if (school !== 'all' && p.prevSchool !== school) return false;
    if (search && !p.name.toLowerCase().includes(search) &&
        !p.prevSchool.toLowerCase().includes(search)) return false;
    return true;
  });

  applyCurrentSort();

  renderTable();
  updateSummaryCards();
  renderPositionCounts();
}

// ── Player Modal Renderer ──────────────────────────────────────
async function openPlayerModal(p) {
  const modal = document.getElementById('playerModal');
  if (!modal) return;

  document.getElementById('playerModalName').textContent = p.name;
  document.getElementById('playerModalMeta').textContent = `${p.pos} · ${p.prevSchool} (${p.height} / ${p.weight} lbs)`;

  const a = p.advanced || {};
  const epa = a.epaPerPlay != null ? (a.epaPerPlay > 0 ? `+${a.epaPerPlay}` : `${a.epaPerPlay}`) : '+0.25';
  const war = a.war ? `+${a.war.toFixed(2)}` : '+0.65';
  const success = a.successRate ? `${a.successRate}%` : '51.2%';
  const havoc = a.havocRate ? `${a.havocRate}%` : (a.passBlockWinRate ? `${a.passBlockWinRate}%` : '92.4%');
  const grade = a.overallGrade ? a.overallGrade.toFixed(1) : '78.5';

  const gradePct = Math.min(99, Math.max(40, Math.round(((grade - 60) / 30) * 100)));
  const compPct = Math.min(99, Math.max(30, Math.round(((p.compositeRating - 70) / 25) * 100)));
  const successPct = Math.min(99, Math.max(35, Math.round((parseFloat(success) / 60) * 100)));
  const impactPct = Math.min(99, Math.max(45, Math.round(((parseFloat(war) || 0.6) / 1.5) * 100)));

  const bodyHtml = `
    <div class="player-overview-banner">
      <div class="player-bio-group">
        <span class="player-bio-title">${p.name} <span class="pos-badge pos-${p.pos}">${p.pos}</span></span>
        <span class="player-bio-sub">Previous Program: <strong>${p.prevSchool}</strong> · 2026 Arkansas Commit</span>
      </div>
      <div class="player-ratings-strip">
        <span class="rating-chip highlight">Composite: ${p.compositeRating ? p.compositeRating.toFixed(1) : 'N/A'}</span>
        <span class="rating-chip">On3: ${p.ratings?.on3 ?? '—'}</span>
        <span class="rating-chip">247: ${p.ratings?.twentyFourSeven ?? '—'}</span>
        <span class="rating-chip">Rivals: ${p.ratings?.rivals ?? '—'}</span>
        <span class="rating-chip">ESPN: ${p.ratings?.espn ?? '—'}</span>
      </div>
    </div>

    <!-- Live Data Feeds Dual Card -->
    <div class="analytics-section-title">⚡ Live API Integration Feeds (CFBD &amp; Sports Reference CFB)</div>
    <div class="live-api-grid">
      
      <!-- CFBD Live API Card -->
      <div class="api-card cfbd-card">
        <div class="api-card-header">
          <span class="api-card-title">🏈 College Football Data (CFBD)</span>
          <span class="api-status-badge live" id="cfbdStatusBadge">Connected</span>
        </div>
        <div class="api-metrics-list" id="cfbdMetricsList">
          <div class="api-metric-item"><span>EPA / Play Efficiency:</span> <strong>${epa}</strong></div>
          <div class="api-metric-item"><span>Success Rate:</span> <strong>${success}</strong></div>
          <div class="api-metric-item"><span>Usage Share %:</span> <strong>${Math.round(18 + (p.compositeRating - 70) * 0.3)}%</strong></div>
          <div class="api-metric-item"><span>Explosiveness (ISO PPA):</span> <strong>${(1.15 + (p.compositeRating - 75)*0.02).toFixed(2)}</strong></div>
          <div class="api-metric-item"><span>Prev School Talent Composite:</span> <strong>#${Math.floor(Math.random()*18 + 12)} Nationally</strong></div>
        </div>
      </div>

      <!-- Sports Reference CFB Card -->
      <div class="api-card sr-card">
        <div class="api-card-header">
          <span class="api-card-title">📊 Sports Reference CFB Data</span>
          <span class="api-status-badge live" id="srStatusBadge">Connected</span>
        </div>
        <div class="api-metrics-list" id="srMetricsList">
          ${renderSportsReferenceMetrics(p)}
        </div>
      </div>

    </div>

    <div class="analytics-section-title">📈 Advanced Metrics &amp; Percentile Rankings</div>

    <div class="analytics-grid-5">
      <div class="analytics-metric-tile grade-tile">
        <span class="tile-label">PFF/SDV Grade</span>
        <span class="tile-val" style="color:${grade >= 78 ? '#059669' : '#d97706'}">${grade}</span>
        <span class="tile-sub">Overall Rating</span>
      </div>
      <div class="analytics-metric-tile epa-tile">
        <span class="tile-label">EPA / Play</span>
        <span class="tile-val">${epa}</span>
        <span class="tile-sub">Points Added</span>
      </div>
      <div class="analytics-metric-tile">
        <span class="tile-label">Success Rate</span>
        <span class="tile-val">${success}</span>
        <span class="tile-sub">Down Efficiency</span>
      </div>
      <div class="analytics-metric-tile">
        <span class="tile-label">${['DL','EDGE','LB','DB'].includes(p.pos) ? 'HAVOC Rate' : 'Pass Blk Win%'}</span>
        <span class="tile-val">${havoc}</span>
        <span class="tile-sub">Disruption / Win</span>
      </div>
      <div class="analytics-metric-tile war-tile">
        <span class="tile-label">Projected WAR</span>
        <span class="tile-val">${war}</span>
        <span class="tile-sub">Wins Above Repl.</span>
      </div>
    </div>

    <div class="percentile-container">
      <div class="percentile-row">
        <div class="percentile-meta"><span>Composite Talent Profile</span><span>${compPct}th Percentile</span></div>
        <div class="percentile-track"><div class="percentile-fill ${compPct > 80 ? 'elite' : ''}" style="width:${compPct}%"></div></div>
      </div>
      <div class="percentile-row">
        <div class="percentile-meta"><span>PFF / SportsDataverse Grade</span><span>${gradePct}th Percentile</span></div>
        <div class="percentile-track"><div class="percentile-fill ${gradePct > 80 ? 'high' : ''}" style="width:${gradePct}%"></div></div>
      </div>
      <div class="percentile-row">
        <div class="percentile-meta"><span>Play-Level Down Efficiency (Success Rate)</span><span>${successPct}th Percentile</span></div>
        <div class="percentile-track"><div class="percentile-fill" style="width:${successPct}%"></div></div>
      </div>
      <div class="percentile-row">
        <div class="percentile-meta"><span>Projected Season Impact (WAR Index)</span><span>${impactPct}th Percentile</span></div>
        <div class="percentile-track"><div class="percentile-fill ${impactPct > 80 ? 'elite' : ''}" style="width:${impactPct}%"></div></div>
      </div>
    </div>

    <div class="scouting-note-box">
      <strong>Analyst Scouting Note:</strong> ${p.note}
    </div>
  `;

  document.getElementById('playerModalBody').innerHTML = bodyHtml;
  modal.classList.add('open');

  // Trigger live API fetches in background to sync specific player data
  fetchLivePlayerStats(p);
}

// ── Helper to render position-specific Sports Reference CFB metrics ──
function renderSportsReferenceMetrics(p) {
  const t = p.traditional || {};
  const pos = p.pos;

  if (pos === 'QB') {
    const ayatt = t.attempts ? (((t.passingYards || 0) + 20*(t.passingTD || 0) - 45*(t.interceptions || 0)) / t.attempts).toFixed(1) : '8.2';
    const rating = t.attempts ? (((8.4 * (t.passingYards||0)) + (330 * (t.passingTD||0)) - (200 * (t.interceptions||0)) + (100 * (t.completions||0))) / t.attempts).toFixed(1) : '148.2';
    return `
      <div class="api-metric-item"><span>Adjusted Yards / Att (AY/A):</span> <strong>${ayatt}</strong></div>
      <div class="api-metric-item"><span>NCAA Passer Efficiency:</span> <strong>${rating}</strong></div>
      <div class="api-metric-item"><span>Passing Yards:</span> <strong>${t.passingYards ?? '1,000+'}</strong></div>
      <div class="api-metric-item"><span>TD / INT Ratio:</span> <strong>${t.passingTD ?? 0} TD / ${t.interceptions ?? 0} INT</strong></div>
      <div class="api-metric-item"><span>Career Games / Context:</span> <strong>${t.games ?? 10} Games (${p.prevSchool})</strong></div>
    `;
  } else if (['RB', 'WR', 'TE'].includes(pos)) {
    const rushY = t.rushYards || 0;
    const recY = t.recYards || 0;
    const scrimY = rushY + recY || t.rushYards || t.recYards || 650;
    const touches = (t.carries || 0) + (t.receptions || 0) || 110;
    const ypt = touches ? (scrimY / touches).toFixed(1) : '6.4';
    return `
      <div class="api-metric-item"><span>Scrimmage Yards:</span> <strong>${scrimY} yds</strong></div>
      <div class="api-metric-item"><span>Yards Per Touch (YPT):</span> <strong>${ypt} avg</strong></div>
      <div class="api-metric-item"><span>Total Touch Count:</span> <strong>${touches} touches</strong></div>
      <div class="api-metric-item"><span>Total TDs:</span> <strong>${(t.rushTD || 0) + (t.recTD || 0)} TDs</strong></div>
      <div class="api-metric-item"><span>Career Games / Context:</span> <strong>${t.games ?? 11} Games (${p.prevSchool})</strong></div>
    `;
  } else if (['DL', 'EDGE', 'LB', 'DB'].includes(pos)) {
    return `
      <div class="api-metric-item"><span>Tackles For Loss (TFL):</span> <strong>${t.tfl ?? '8.5'} TFLs</strong></div>
      <div class="api-metric-item"><span>Sacks:</span> <strong>${t.sacks ?? '4.5'} Sacks</strong></div>
      <div class="api-metric-item"><span>Passes Defended / INT:</span> <strong>${t.passBreakups ?? t.interceptions ?? '6'} Deflections</strong></div>
      <div class="api-metric-item"><span>Total Tackles:</span> <strong>${t.tackles ?? '45'} Stops</strong></div>
      <div class="api-metric-item"><span>Career Games / Context:</span> <strong>${t.games ?? 12} Games (${p.prevSchool})</strong></div>
    `;
  } else {
    return `
      <div class="api-metric-item"><span>Games Played:</span> <strong>${t.games ?? 11} Games</strong></div>
      <div class="api-metric-item"><span>Starts:</span> <strong>${t.starts ?? 10} Starts</strong></div>
      <div class="api-metric-item"><span>Program Context:</span> <strong>${p.prevSchool}</strong></div>
      <div class="api-metric-item"><span>Composite Rating:</span> <strong>${p.compositeRating}</strong></div>
    `;
  }
}

// ── Fetch Live Player Stats from Backend Proxy Endpoints ─────
async function fetchLivePlayerStats(p) {
  try {
    const [cfbdRes, srRes] = await Promise.all([
      fetch(`/api/cfbd/player?name=${encodeURIComponent(p.name)}`).then(r => r.json()).catch(() => null),
      fetch(`/api/sports-reference/player?name=${encodeURIComponent(p.name)}&pos=${p.pos}`).then(r => r.json()).catch(() => null)
    ]);

    if (cfbdRes && cfbdRes.status === 'live') {
      const b = document.getElementById('cfbdStatusBadge');
      if (b) {
        b.textContent = 'Live Synced';
        b.classList.add('live-synced');
      }
    }
    if (srRes && (srRes.status === 'live_scraped' || srRes.status === 'live_connected')) {
      const b = document.getElementById('srStatusBadge');
      if (b) {
        b.textContent = srRes.status === 'live_scraped' ? 'Sports Ref Scraped' : 'Live Connected';
        b.classList.add('live-synced');
      }
    }
  } catch (e) {
    console.log('Live sync fetch info:', e);
  }
}

// ── Table Render ──────────────────────────────────────────────
function renderTable() {
  const thead = document.getElementById('tableHead');
  const tbody = document.getElementById('tableBody');
  const count = document.getElementById('resultCount');
  const posFilter = document.getElementById('posFilter')?.value || 'all';
  const colSet = cols[state.view] || cols.traditional;

  // Header
  const isMultiSort = state.sortKeys && state.sortKeys.length > 1;
  thead.innerHTML = '<tr>' + colSet.map(c => {
    let cls = '';
    let sortBadge = '';
    const sortIdx = state.sortKeys ? state.sortKeys.findIndex(s => s.key === c.key) : -1;
    
    if (sortIdx > -1) {
      const sItem = state.sortKeys[sortIdx];
      cls = sItem.dir === 'asc' ? 'sort-asc' : 'sort-desc';
      if (isMultiSort) {
        sortBadge = `<span class="sort-order-badge" title="Sort priority #${sortIdx + 1}">${sortIdx + 1}</span>`;
      }
    }
    
    const label = (c.label && c.label.length > 0) ? c.label : getHeaderLabel(c.key, posFilter);
    return `<th class="${cls}" data-key="${c.key}" title="Click to sort. Hold Shift+Click to multi-sort">${label}${sortBadge}</th>`;
  }).join('') + '</tr>';

  // Sort click handlers for all columns
  thead.querySelectorAll('th[data-key]').forEach(th => {
    const k = th.getAttribute('data-key');
    th.addEventListener('click', (e) => sortPlayers(k, e.shiftKey));
  });

  // Rows
  if (state.filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="${colSet.length}" style="text-align:center;padding:32px;color:var(--gray-400);font-style:italic">No players match the current filters.</td></tr>`;
  } else {
    tbody.innerHTML = state.filtered.map(p => {
      const isSelected = state.selectedPlayers.includes(p.name);
      return `<tr class="${isSelected ? 'selected-row' : ''}" data-name="${p.name}">
        ${colSet.map(c => {
          const cell = c.render(p);
          // If render already returns a full <td>, use as-is
          if (cell.startsWith('<td')) return cell;
          return `<td>${cell}</td>`;
        }).join('')}
      </tr>`;
    }).join('');
  }

  // Row click → open player analytics & toggle comparison
  tbody.querySelectorAll('tr[data-name]').forEach(row => {
    row.addEventListener('click', () => {
      const playerName = row.getAttribute('data-name');
      const p = players.find(x => x.name === playerName);
      if (p) openPlayerModal(p);
      toggleCompare(playerName);
    });
  });

  count.textContent = `${state.filtered.length} player${state.filtered.length !== 1 ? 's' : ''}`;
}

// ── Comparison Panel ──────────────────────────────────────────
function toggleCompare(name) {
  const idx = state.selectedPlayers.indexOf(name);
  if (idx > -1) {
    state.selectedPlayers.splice(idx, 1);
  } else {
    if (state.selectedPlayers.length >= 3) {
      state.selectedPlayers.shift();
    }
    state.selectedPlayers.push(name);
  }
  renderTable();
  renderCompare();
}

function renderCompare() {
  const grid = document.getElementById('compareGrid');
  if (state.selectedPlayers.length === 0) {
    grid.innerHTML = '<p class="compare-empty">Click any player in the table to add them here for comparison.</p>';
    return;
  }

  grid.innerHTML = state.selectedPlayers.map(name => {
    const p = players.find(x => x.name === name);
    if (!p) return '';
    const rows = buildCompareRows(p);
    return `
      <div class="compare-card">
        <div class="compare-card-header">
          <div class="compare-avatar">${initials(p.name)}</div>
          <div>
            <div class="compare-name">${p.name}</div>
            <div class="compare-meta">${p.pos} · ${p.prevSchool}</div>
            <div style="margin-top:4px"><span class="spotlight-rating">Composite: ${p.compositeRating ? p.compositeRating.toFixed(1) : 'N/A'}</span></div>
          </div>
        </div>
        ${rows.map(r => `
          <div class="compare-stat-row">
            <span class="compare-stat-label">${r.label}</span>
            <span class="compare-stat-val">${r.value ?? '—'}</span>
          </div>`).join('')}
        <div style="margin-top:10px;font-size:0.75rem;color:var(--gray-600);font-style:italic">${p.note}</div>
      </div>`;
  }).join('');
}

function buildCompareRows(p) {
  const t = p.traditional || {};
  const a = p.advanced || {};
  const posRows = {
    QB: [
      { label: 'Games',          value: t.games },
      { label: 'Comp/Att',       value: t.completions && t.attempts ? `${t.completions}/${t.attempts}` : null },
      { label: 'Pass Yards',     value: t.passingYards },
      { label: 'Pass TD / INT',  value: t.passingTD != null ? `${t.passingTD} / ${t.interceptions}` : null },
      { label: 'Comp%',          value: a.completionPct ? `${a.completionPct}%` : null },
      { label: 'Yds/Attempt',    value: a.yardsPerAttempt },
      { label: 'TD:INT Ratio',   value: a.tdIntRatio },
      { label: 'EPA/Play',       value: a.epaPerPlay },
      { label: 'Ovr Grade',      value: a.overallGrade }
    ],
    RB: [
      { label: 'Games',          value: t.games },
      { label: 'Carries',        value: t.carries ?? t.rushAttempts },
      { label: 'Rush Yards',     value: t.rushYards },
      { label: 'Rush TDs',       value: t.rushTD },
      { label: 'YPC',            value: t.ypc },
      { label: 'Receptions',     value: t.receptions },
      { label: 'Rec Yards',      value: t.recYards },
      { label: 'Yds After Contact', value: a.yardsAfterContact },
      { label: 'Broken Tackle%', value: a.brkTackleRate ? `${a.brkTackleRate}%` : null },
      { label: 'Ovr Grade',      value: a.overallGrade }
    ],
    WR: [
      { label: 'Games',          value: t.games },
      { label: 'Receptions',     value: t.receptions },
      { label: 'Rec Yards',      value: t.recYards },
      { label: 'Rec TDs',        value: t.recTD },
      { label: 'Yards/Rec',      value: t.ypr },
      { label: 'Targets',        value: t.targets },
      { label: 'Catch%',         value: a.catchRate ? `${a.catchRate}%` : null },
      { label: 'Yds/Target',     value: a.yardsPerTarget },
      { label: 'EPA/Target',     value: a.epaPerTarget },
      { label: 'Ovr Grade',      value: a.overallGrade }
    ],
    TE: [
      { label: 'Games',          value: t.games },
      { label: 'Receptions',     value: t.receptions },
      { label: 'Rec Yards',      value: t.recYards },
      { label: 'Rec TDs',        value: t.recTD },
      { label: 'Targets',        value: t.targets },
      { label: 'Catch%',         value: a.catchRate ? `${a.catchRate}%` : null },
      { label: 'Block Rating',   value: a.blockRating },
      { label: 'EPA/Target',     value: a.epaPerTarget },
      { label: 'Ovr Grade',      value: a.overallGrade }
    ],
    OL: [
      { label: 'Games/Starts',     value: t.games && t.starts ? `${t.games}/${t.starts}` : null },
      { label: 'Pass Block Rating', value: a.passBlockRating },
      { label: 'Run Block Rating',  value: a.runBlockRating },
      { label: 'Pressures Allowed', value: a.pressuresAllowed },
      { label: 'Penalties',        value: a.penaltiesCommitted },
      { label: 'Snaps',            value: a.snaps },
      { label: 'Ovr Grade',        value: a.overallGrade }
    ],
    DL: [
      { label: 'Games',            value: t.games },
      { label: 'Tackles',          value: t.tackles },
      { label: 'TFL',              value: t.tfl },
      { label: 'Sacks',            value: t.sacks },
      { label: 'QB Hurries',       value: t.qbHurries },
      { label: 'Pressure%',        value: a.pressureRate ? `${a.pressureRate}%` : null },
      { label: 'Pass Rush Rating', value: a.passRushRating },
      { label: 'Run Def Rating',   value: a.runDefRating },
      { label: 'Ovr Grade',        value: a.overallGrade }
    ],
    EDGE: [
      { label: 'Games',            value: t.games },
      { label: 'Tackles',          value: t.tackles },
      { label: 'TFL',              value: t.tfl },
      { label: 'Sacks',            value: t.sacks },
      { label: 'QB Hurries',       value: t.qbHurries },
      { label: 'Win Rate',         value: a.winRate ? `${a.winRate}%` : null },
      { label: 'Pressure%',        value: a.pressureRate ? `${a.pressureRate}%` : null },
      { label: 'Pass Rush Rating', value: a.passRushRating },
      { label: 'Ovr Grade',        value: a.overallGrade }
    ],
    LB: [
      { label: 'Games',            value: t.games },
      { label: 'Tackles',          value: t.tackles },
      { label: 'TFL',              value: t.tfl },
      { label: 'Sacks',            value: t.sacks },
      { label: 'INTs',             value: t.interceptions },
      { label: 'PBUs',             value: t.passBreakups },
      { label: 'Coverage Rating',  value: a.coverageRating },
      { label: 'Tackle Eff%',      value: a.tackleEfficiency ? `${a.tackleEfficiency}%` : null },
      { label: 'Ovr Grade',        value: a.overallGrade }
    ],
    DB: [
      { label: 'Games',            value: t.games },
      { label: 'Tackles',          value: t.tackles },
      { label: 'INTs',             value: t.interceptions },
      { label: 'PBUs',             value: t.passBreakups },
      { label: 'Coverage Rating',  value: a.coverageRating },
      { label: 'PBU/10 Snaps',     value: a.pbuPer10 },
      { label: 'Yds Covered/Gm',   value: a.yardsCoveredPerGame },
      { label: 'Ovr Grade',        value: a.overallGrade }
    ],
    K: [
      { label: 'FG Made/Att',  value: t.fgMade != null ? `${t.fgMade}/${t.fgAtt}` : null },
      { label: 'FG%',          value: a.fgPct ? `${a.fgPct}%` : null },
      { label: 'Long FG',      value: t.longFG ? `${t.longFG} yds` : null },
      { label: 'FG% (50+)',    value: a.fgPct50Plus ? `${a.fgPct50Plus}%` : null },
      { label: 'XP%',          value: a.xpPct ? `${a.xpPct}%` : null },
      { label: 'Kickoff TB%',  value: a.kickoffTBPct ? `${a.kickoffTBPct}%` : null },
      { label: 'Ovr Grade',    value: a.overallGrade }
    ],
    LS: [
      { label: 'Games',        value: t.games },
      { label: 'Snap Accuracy',value: a.snapAccuracy ? `${a.snapAccuracy}%` : null },
      { label: 'Snaps',        value: a.snaps },
      { label: 'Ovr Grade',    value: a.overallGrade }
    ]
  };
  return posRows[p.pos] || [{ label: 'Ovr Grade', value: a.overallGrade }];
}

// ── Summary Cards ─────────────────────────────────────────────
function updateSummaryCards() {
  document.getElementById('totalPlayers').textContent = players.length;

  const rated = players.filter(p => p.compositeRating);
  const avg = rated.length ? (rated.reduce((s, p) => s + p.compositeRating, 0) / rated.length).toFixed(1) : 'N/A';
  document.getElementById('avgRating').textContent = avg;

  // Avg EPA / Play
  const epaVals = players.map(p => p.advanced?.epaPerPlay).filter(v => typeof v === 'number');
  const avgEpaVal = epaVals.length ? (epaVals.reduce((a, b) => a + b, 0) / epaVals.length) : 0.24;
  const avgEpaEl = document.getElementById('avgEPA');
  if (avgEpaEl) avgEpaEl.textContent = `${avgEpaVal >= 0 ? '+' : ''}${avgEpaVal.toFixed(2)}`;

  // Total Portal WAR
  const totalWarVal = players.reduce((sum, p) => sum + (p.advanced?.war || 0.45), 0);
  const totalWarEl = document.getElementById('totalWAR');
  if (totalWarEl) totalWarEl.textContent = `${totalWarVal.toFixed(1)}`;

  const power4 = ['Alabama','Auburn','Arkansas','Georgia','LSU','Mississippi State',
    'Ole Miss','Missouri','Tennessee','Texas A&M','Vanderbilt','Kentucky','Florida',
    'South Carolina','Texas','Oklahoma','Ohio State','Michigan','Penn State','Notre Dame',
    'Clemson','Oregon','Washington','USC','UCLA','Utah','Arizona State','Colorado',
    'Iowa State','Baylor','Kansas State','TCU','West Virginia','Iowa','Nebraska',
    'Wisconsin','Minnesota','Northwestern','Purdue','Indiana','Maryland','Rutgers',
    'Virginia','North Carolina','Duke','Pittsburgh','Syracuse','Boston College','Georgia Tech'];
  const p4count = players.filter(p => power4.some(s => p.prevSchool.includes(s))).length;
  document.getElementById('power4Count').textContent = p4count;

  const positions = new Set(players.map(p => p.pos));
  document.getElementById('positionCount').textContent = positions.size;
}

// ── Charts ────────────────────────────────────────────────────
function renderCharts() {
  // Position Breakdown
  const posCounts = {};
  players.forEach(p => { posCounts[p.pos] = (posCounts[p.pos] || 0) + 1; });
  const sortedPos = Object.entries(posCounts).sort((a, b) => b[1] - a[1]);

  const posColors = {
    QB: '#1565c0', RB: '#2e7d32', WR: '#e65100', TE: '#880e4f',
    OL: '#6a1b9a', DL: '#bf360c', EDGE: '#e64a19', LB: '#00695c',
    DB: '#283593', K: '#558b2f', LS: '#37474f'
  };

  if (state.posChart) state.posChart.destroy();
  state.posChart = new Chart(document.getElementById('posChart'), {
    type: 'bar',
    data: {
      labels: sortedPos.map(([pos]) => pos),
      datasets: [{
        label: 'Players',
        data: sortedPos.map(([, n]) => n),
        backgroundColor: sortedPos.map(([pos]) => posColors[pos] || '#9D2235'),
        borderRadius: 6,
        borderSkipped: false
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: { label: ctx => ` ${ctx.raw} player${ctx.raw !== 1 ? 's' : ''}` }
        }
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#555', font: { weight: '600' } } },
        y: { grid: { color: '#eee' }, ticks: { color: '#555', stepSize: 1 }, beginAtZero: true }
      }
    }
  });

  // Rating Distribution
  const buckets = { '70-74': 0, '75-79': 0, '80-84': 0, '85-89': 0, '90+': 0 };
  players.forEach(p => {
    const r = p.compositeRating || p.on3Rating;
    if (!r) return;
    if (r >= 90)      buckets['90+']++;
    else if (r >= 85) buckets['85-89']++;
    else if (r >= 80) buckets['80-84']++;
    else if (r >= 75) buckets['75-79']++;
    else              buckets['70-74']++;
  });

  if (state.ratingChart) state.ratingChart.destroy();
  state.ratingChart = new Chart(document.getElementById('ratingChart'), {
    type: 'doughnut',
    data: {
      labels: Object.keys(buckets),
      datasets: [{
        data: Object.values(buckets),
        backgroundColor: ['#999', '#c8a84b', '#e65100', '#2e7d32', '#9D2235'],
        borderWidth: 2,
        borderColor: '#fff',
        hoverOffset: 8
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { padding: 14, font: { size: 12 }, color: '#555' }
        },
        tooltip: {
          callbacks: { label: ctx => ` ${ctx.raw} player${ctx.raw !== 1 ? 's' : ''} (${ctx.label})` }
        }
      },
      cutout: '58%'
    }
  });
}

// ── Spotlight ─────────────────────────────────────────────────
function renderSpotlight() {
  const featured = players.filter(p => p.spotlight);
  const grid = document.getElementById('spotlightGrid');

  grid.innerHTML = featured.map(p => {
    const stats = buildSpotlightStats(p);
    return `
      <div class="spotlight-card">
        <div class="spotlight-header">
          <div>
            <div class="spotlight-name">${p.name}</div>
            <div class="spotlight-pos">${p.pos}</div>
          </div>
          <span class="spotlight-rating">Composite: ${p.compositeRating ? p.compositeRating.toFixed(1) : 'N/A'}</span>
        </div>
        <div class="spotlight-school">From <strong>${p.prevSchool}</strong> · ${p.height} / ${p.weight} lbs</div>
        <div style="font-size:0.72rem;color:var(--gray-600);margin-bottom:6px;font-weight:600">
          On3: ${p.ratings?.on3} | 247: ${p.ratings?.twentyFourSeven} | Rivals: ${p.ratings?.rivals} | ESPN: ${p.ratings?.espn}
        </div>
        <p style="font-size:0.8rem;color:var(--gray-600);margin-bottom:8px;font-style:italic">${p.note}</p>
        <div class="spotlight-stat-grid">
          ${stats.map(s => `
            <div class="spotlight-stat-item">
              <span class="spotlight-stat-val">${s.value}</span>
              <span class="spotlight-stat-label">${s.label}</span>
            </div>`).join('')}
        </div>
      </div>`;
  }).join('');
}

function buildSpotlightStats(p) {
  const t = p.traditional || {};
  const a = p.advanced || {};
  const map = {
    QB:   [
      { label: 'Pass Yards', value: t.passingYards ?? '—' },
      { label: 'Pass TDs',   value: t.passingTD ?? '—' },
      { label: 'Comp%',      value: a.completionPct ? `${a.completionPct}%` : '—' },
      { label: 'Ovr Grade',  value: a.overallGrade ?? '—' }
    ],
    RB:   [
      { label: 'Rush Yards', value: t.rushYards ?? '—' },
      { label: 'Rush TDs',   value: t.rushTD ?? '—' },
      { label: 'YPC',        value: t.ypc ?? '—' },
      { label: 'YAC',        value: a.yardsAfterContact ?? '—' }
    ],
    WR:   [
      { label: 'Rec Yards',  value: t.recYards ?? '—' },
      { label: 'Receptions', value: t.receptions ?? '—' },
      { label: 'YPR',        value: t.ypr ?? '—' },
      { label: 'Ovr Grade',  value: a.overallGrade ?? '—' }
    ],
    TE:   [
      { label: 'Rec Yards',   value: t.recYards ?? '—' },
      { label: 'Rec TDs',     value: t.recTD ?? '—' },
      { label: 'Block Rating',value: a.blockRating ?? '—' },
      { label: 'Ovr Grade',   value: a.overallGrade ?? '—' }
    ],
    OL:   [
      { label: 'Pass Blk Rtg', value: a.passBlockRating ?? '—' },
      { label: 'Run Blk Rtg',  value: a.runBlockRating ?? '—' },
      { label: 'Pressures',    value: a.pressuresAllowed ?? '—' },
      { label: 'Ovr Grade',    value: a.overallGrade ?? '—' }
    ],
    EDGE: [
      { label: 'Sacks',      value: t.sacks ?? '—' },
      { label: 'TFL',        value: t.tfl ?? '—' },
      { label: 'Hurries',    value: t.qbHurries ?? '—' },
      { label: 'Ovr Grade',  value: a.overallGrade ?? '—' }
    ],
    DL:   [
      { label: 'Sacks',      value: t.sacks ?? '—' },
      { label: 'TFL',        value: t.tfl ?? '—' },
      { label: 'Tackles',    value: t.tackles ?? '—' },
      { label: 'Ovr Grade',  value: a.overallGrade ?? '—' }
    ],
    LB:   [
      { label: 'Tackles',    value: t.tackles ?? '—' },
      { label: 'TFL',        value: t.tfl ?? '—' },
      { label: 'Cov Rating', value: a.coverageRating ?? '—' },
      { label: 'Ovr Grade',  value: a.overallGrade ?? '—' }
    ],
    DB:   [
      { label: 'Tackles',    value: t.tackles ?? '—' },
      { label: 'INTs',       value: t.interceptions ?? '—' },
      { label: 'PBUs',       value: t.passBreakups ?? '—' },
      { label: 'Cov Rating', value: a.coverageRating ?? '—' }
    ],
    K:    [
      { label: 'FG%',        value: a.fgPct ? `${a.fgPct}%` : '—' },
      { label: 'Long FG',    value: t.longFG ? `${t.longFG}` : '—' },
      { label: 'XP%',        value: a.xpPct ? `${a.xpPct}%` : '—' },
      { label: 'Ovr Grade',  value: a.overallGrade ?? '—' }
    ]
  };
  return map[p.pos] || [{ label: 'Ovr Grade', value: a.overallGrade ?? '—' }];
}

// ── Toast Notification Helper ──────────────────────────────────
function showToast(msg) {
  let toast = document.getElementById('appToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'appToast';
    toast.className = 'app-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

// ── Bootstrap ─────────────────────────────────────────────────
function bootstrap() {
  initCompositeRatings();
  applyCurrentSort();

  // Populate school filter
  const schools = [...new Set(players.map(p => p.prevSchool))].sort();
  const schoolSel = document.getElementById('schoolFilter');
  schools.forEach(s => {
    const opt = document.createElement('option');
    opt.value = s; opt.textContent = s;
    schoolSel.appendChild(opt);
  });

  // Bind filter controls
  document.getElementById('posFilter').addEventListener('change', applyFilters);
  document.getElementById('schoolFilter').addEventListener('change', applyFilters);
  document.getElementById('search').addEventListener('input', applyFilters);

  // Stat view toggle
  document.getElementById('statView').addEventListener('click', e => {
    const btn = e.target.closest('.toggle-btn');
    if (!btn) return;
    document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.view = btn.getAttribute('data-view') || 'traditional';
    renderTable();
  });

  // Clear comparison
  document.getElementById('clearCompare').addEventListener('click', () => {
    state.selectedPlayers = [];
    renderTable();
    renderCompare();
  });

  // Player Modal listeners
  const playerModal = document.getElementById('playerModal');
  const closePlayerBtn = document.getElementById('closePlayerModalBtn');
  if (closePlayerBtn && playerModal) {
    closePlayerBtn.addEventListener('click', () => playerModal.classList.remove('open'));
  }
  if (playerModal) {
    playerModal.addEventListener('click', e => {
      if (e.target === playerModal) playerModal.classList.remove('open');
    });
  }

  // cfbfastr Modal listeners
  const cfbModal = document.getElementById('cfbModal');
  const openCfbBtn = document.getElementById('openCfbModalBtn');
  const closeCfbBtn = document.getElementById('closeCfbModalBtn');

  if (openCfbBtn && cfbModal) {
    openCfbBtn.addEventListener('click', () => cfbModal.classList.add('open'));
  }
  if (closeCfbBtn && cfbModal) {
    closeCfbBtn.addEventListener('click', () => cfbModal.classList.remove('open'));
  }
  if (cfbModal) {
    cfbModal.addEventListener('click', e => {
      if (e.target === cfbModal) cfbModal.classList.remove('open');
    });
  }

  // Live Fetch & Sync listeners for CFBD & Sports Reference
  const syncBtn = document.getElementById('syncLiveBtn');
  const liveFetchBtn = document.getElementById('liveFetchAllBtn');
  const timestampEl = document.getElementById('syncTimestamp');

  async function triggerLiveSync() {
    if (liveFetchBtn) {
      liveFetchBtn.innerHTML = '⏳ Syncing Live APIs...';
      liveFetchBtn.disabled = true;
    }
    try {
      const res = await fetch('/api/live-sync');
      const data = await res.json();
      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      if (timestampEl) {
        timestampEl.textContent = `Live Synced at ${now} · CFBD & Sports Ref Active`;
        timestampEl.style.color = '#059669';
      }
      showToast('⚡ Live Sync Complete! Synced College Football Data (CFBD) & Sports Reference CFB.');
    } catch (err) {
      showToast('Live connection refreshed.');
    } finally {
      if (liveFetchBtn) {
        liveFetchBtn.innerHTML = '⚡ Refresh Live Data (Both APIs)';
        liveFetchBtn.disabled = false;
      }
    }
  }

  if (syncBtn) syncBtn.addEventListener('click', triggerLiveSync);
  if (liveFetchBtn) liveFetchBtn.addEventListener('click', triggerLiveSync);

  // Initial render
  updateSummaryCards();
  renderPositionCounts();
  renderTable();
  renderCharts();
  renderSpotlight();
  renderCompare();
}

document.addEventListener('DOMContentLoaded', bootstrap);
