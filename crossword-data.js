// crossword-data.js — v5

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

const CLUES = {
  H: [
    { word: "ECOGRAFIA",    clue: "Sens dubte és el futur", hint: "Pregunta a Pablo Mitjans" },
    { word: "TURISTAS",     clue: "Com ens anomenem des de la pitjor caixa forta de la història", hint: "Pregunta a Alba Fleta i Sergi Amate" },
    { word: "MIGUEL",       clue: "Nom que anomenes al Collbaix i automàticament et fots de cap", hint: "Pregunta a la Xell" },
    { word: "ORXATA",       clue: "Beguda d'estiu que es va pujar fins a dalt del Canigó", hint: "Pregunta a Concepció Prat" },
    { word: "BARRANQUILLO", clue: "Per on et venen ganes de tirar-te en moments crítics quan fas muntanya [en castellà]", hint: "Pregunta a Sara Jordan" },
    { word: "GUIX",         clue: "Lloc a les afores de Manresa on la Meritxell ha passat gran part de la seva infantesa", hint: "Pregunta a David Vilanova o Vanessa Anaya" },
    { word: "BASIC",        clue: "Bar musical on el Xavi es va conèixer amb un dels convidats (a part de passar-s'hi mooooooooltes tardes i nits)", hint: "Pregunta a Joaquín García o Josep Maria Soldevilla" },
    { word: "AMAZON",       clue: "D'on era el paquet que es va rebre sortint de la dutxa", hint: "Pregunta a Olga Tena o Sonia Reillo" },
    { word: "NADAL",        clue: "Esperem tot l'any per a que arribi", hint: "Pregunta a Patricia Gómez o Marta Valdés" },
    { word: "COMPI",        clue: "Expressió lúdico-afectiva per a referir-se a un company de feina a Inditex [en castellà]", hint: "Pregunta a Rafael Ríos, Samuel García o Efrén Fernández" },
  ],
  V: [
    { word: "ENTRECOT",     clue: "Clàssic que mai falla en un dinar de masia", hint: "Pregunta a Joan Capdevila o Cristian Martín" },
    { word: "MASELLA",      clue: "L'estació d'esquí per defecte", hint: "Pregunta a Cristian Martín" },
    { word: "FRAKTAL",      clue: "Formació clàssica de la makina catalana que ha tornat amb molta \"Actitut\"", hint: "Pregunta a Josep Canadell, Josep Maria Soldevilla o Joaquín García" },
    { word: "OLEART",       clue: "DJ incombustible que organitza festes que ens permeten tornar al passat", hint: "Pregunta a Josep Canadell, Josep Maria Soldevilla o Joaquín García" },
    { word: "PAYMENTS",     clue: "Unitat de negoci en la que treballa en Xavi", hint: "Pregunta a Rafael Ríos, Samuel García o Efrén Fernández" },
    { word: "CAZUELITA",    clue: "Utensili de cuina on el Xavi menjava els dinars que li feia la seva àvia [en castellà]", hint: "Pregunta a Joan Capdevila, Carmen Estevez o Assumpta Capdevila" },
    { word: "VALENCIA",     clue: "Radio on va tenir resó mediàtic el club de fans de Take That de dues adolescents que avui ens acompanyen", hint: "Pregunta a Sonia Reillo" },
    { word: "LLUVIA",       clue: "Inclemència meteorològica que es dona quan ens ajuntem (excepte si anem a un \"resort\") [en castellà]", hint: "Pregunta a Pablo Mitjans" },
    { word: "FARRU",        clue: "Personatge que regenta el bar més xungo de tot Manresa", hint: "Pregunta a David Sobrino" },
    { word: "MOJITO",       clue: "Còctel pel que sempre estem a punt, sobretot després d'un dia de platja", hint: "Pregunta a Anna Cudos o Alode Izquierdo" },
    { word: "AIRBIKE",      clue: "L'infern disfressat de bicicleta", hint: "Pregunta a Anna Cudos" },
    { word: "RECAREDO",     clue: "Caves que hem tingut la sort de conèixer en profunditat (amb pedal inclòs)", hint: "Pregunta a Josep Canadell o Esther Prades" },
    { word: "CBMANRESA",    clue: "Club de bàsquet on la Meritxell es va conèixer amb una de les convidades", hint: "Pregunta a Irene Puntí" },
  ],
};

function getSortedClues(dir) {
  return CLUES[dir]
    .map(c => {
      const p = PLACEMENTS.find(p => p.word === c.word && p.dir === dir);
      return { ...c, num: p ? p.num : 0 };
    })
    .sort((a, b) => a.num - b.num);
}
