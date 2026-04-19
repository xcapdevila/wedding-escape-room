// crossword-data.js — v6 (i18n-ready, clues moved to i18n.js)

const WEDDING_DATE = "25 d'abril de 2026";

const GRID_RAW = [
  ".........................F",
  ".........................R",
  "......................O..A",
  "......................L..K",
  "......................E..T",
  ".................ECOGRAFIA",
  ".................N....R..L",
  ".................TURISTAS.",
  ".................R........",
  "...........F.MIGUEL.......",
  "........ORXATA...C........",
  "...........R.S...O........",
  ".....V..C..R.E.M.T........",
  "....BARRANQUILLO..L.......",
  ".....L..Z....L.J..L.......",
  "P....E.GUIX.BASIC.U.......",
  "AMAZON..E......T..V.......",
  "Y....C..L.R...COMPI.......",
  "M...AIRBIKE...B...A.......",
  "E....A..T.C...M...........",
  "N......NADAL..A...........",
  "T.........R...N...........",
  "S.........E...R...........",
  "..........D...E...........",
  "..........O...S...........",
  "..............A...........",
];

const COLORED_CELLS = [
  { r: 4,  c: 25, color: "green",  letter: "T" },
  { r: 21, c: 10, color: "green",  letter: "R" },
  { r: 19, c: 0,  color: "green",  letter: "E" },
  { r: 11, c: 13, color: "green",  letter: "S" },
  { r: 16, c: 5,  color: "blue",   letter: "N" },
  { r: 13, c: 15, color: "blue",   letter: "O" },
  { r: 15, c: 8,  color: "blue",   letter: "U" },
  { r: 16, c: 18, color: "red",    letter: "V" },
  { r: 7,  c: 18, color: "red",    letter: "U" },
  { r: 9,  c: 14, color: "red",    letter: "I" },
  { r: 10, c: 12, color: "red",    letter: "T" },
];

const COLOR_MAP = {};
COLORED_CELLS.forEach(cc => { COLOR_MAP[`${cc.r},${cc.c}`] = cc.color; });

const PLACEMENTS = [
  { word: "ECOGRAFIA",    r: 5,  c: 17, dir: "H" },
  { word: "TURISTAS",     r: 7,  c: 17, dir: "H" },
  { word: "MIGUEL",       r: 9,  c: 13, dir: "H" },
  { word: "ORXATA",       r: 10, c: 8,  dir: "H" },
  { word: "BARRANQUILLO", r: 13, c: 4,  dir: "H" },
  { word: "GUIX",         r: 15, c: 7,  dir: "H" },
  { word: "BASIC",        r: 15, c: 12, dir: "H" },
  { word: "AMAZON",       r: 16, c: 0,  dir: "H" },
  { word: "NADAL",        r: 20, c: 7,  dir: "H" },
  { word: "COMPI",        r: 17, c: 14, dir: "H" },
  { word: "ENTRECOT",     r: 5,  c: 17, dir: "V" },
  { word: "MASELLA",      r: 9,  c: 13, dir: "V" },
  { word: "FRAKTAL",      r: 0,  c: 25, dir: "V" },
  { word: "OLEART",       r: 2,  c: 22, dir: "V" },
  { word: "PAYMENTS",     r: 15, c: 0,  dir: "V" },
  { word: "CAZUELITA",    r: 12, c: 8,  dir: "V" },
  { word: "VALENCIA",     r: 12, c: 5,  dir: "V" },
  { word: "LLUVIA",       r: 13, c: 18, dir: "V" },
  { word: "FARRU",        r: 9,  c: 11, dir: "V" },
  { word: "MOJITO",       r: 12, c: 15, dir: "V" },
  { word: "AIRBIKE",      r: 18, c: 4,  dir: "H" },
  { word: "RECAREDO",     r: 17, c: 10, dir: "V" },
  { word: "CBMANRESA",    r: 17, c: 14, dir: "V" },
];

function computeClueNumbers() {
  const startCells = {};
  PLACEMENTS.forEach(p => {
    const key = `${p.r},${p.c}`;
    if (!startCells[key]) startCells[key] = [];
    startCells[key].push(p);
  });
  const sorted = Object.keys(startCells).sort((a, b) => {
    const [ar, ac] = a.split(",").map(Number);
    const [br, bc] = b.split(",").map(Number);
    return ar !== br ? ar - br : ac - bc;
  });
  const numberMap = {};
  let num = 1;
  sorted.forEach(key => {
    numberMap[key] = num;
    startCells[key].forEach(p => { p.num = num; });
    num++;
  });
  return numberMap;
}
const NUMBER_MAP = computeClueNumbers();

// getSortedClues now uses CLUES_I18N from i18n.js
function getSortedClues(dir) {
  return CLUES_I18N[dir]
    .map(c => {
      const p = PLACEMENTS.find(p => p.word === c.word && p.dir === dir);
      return { ...c, num: p ? p.num : 0 };
    })
    .sort((a, b) => a.num - b.num);
}
