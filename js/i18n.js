// i18n.js — Internationalization for the escape room

const STORAGE_KEY_LANG = "escaperoom-lang";

const I18N = {
  ca: {
    // General
    title: "ON ÉS EL SEATING PLAN?",
    subtitle: "Casament Xavier & Meritxell · 25 d'abril de 2026",
    btnContinue: "Continuar →",
    btnReset: "Tornar a començar",
    adminBanner: "MODE ORGANITZADORS",
    pageUnavailable: "Pàgina no disponible",

    // Section 1
    mascotsCaption: '<b>Mel</b> 🦮 · <b>Bruna</b> 🐱 · <b>Brutus</b> 🐶',

    // Section 2
    crosswordTitle: "Resoleu els mots encreuats",
    crosswordIntro: "Fixeu-vos bé en tots els detalls.",
    cluesHorizontal: "HORITZONTALS",
    cluesVertical: "VERTICALS",
    legendGreen: "Verd",
    legendBlue: "Blau",
    legendRed: "Vermell",
    btnToggleSolution: "Veure com a jugador",
    btnToggleSolutionAlt: "Veure solució",

    // Section 3
    camerasTitle: "Càmeres de seguretat",
    camerasIntro: "Les càmeres del recinte han captat moviment sospitós la nit del 24 d'abril...",

    // Section 4
    lastStepTitle: "L'últim pas",
    codeLabel: "Introduïu el codi:",
    codeBtn: "Obrir 🔓",
    codeMissing: "Introduïu les 4 xifres!",
    codeAttemptsLeft: n => `Intents restants: ${n}`,
    lockoutTitle: "Alarma activada!",
    lockoutText: "Heu superat els 3 intents permesos.<br>El sistema de seguretat s'ha activat i ha reiniciat totes les proves.",
    lockoutBtn: "Tornar a començar",

    // Section 5
    victoryTitle: "Esteu a punt de recuperar el seating plan!!",
    victorySubtitle: "Aneu cap als nuvis i tots junts, a la de 3, crideu ben fort:",
    victoryFooter: "Gràcies per jugar! ❤️💍",

    // Modals
    confirmStep1: "Ja heu vist el vídeo que us han deixat els sospitosos?",
    confirmStep2: "Heu acabat els mots encreuats i sabeu què amaguen les caselles de color?",
    confirmStep3: "Us heu fixat bé en tots els detalls de les càmeres? Ja sabeu què mostren?",
    confirmReset: "Segur que voleu tornar a començar?",
    modalConfirm: "Endavant!",
    modalCancel: "Encara no",
    modalResetConfirm: "Sí, reiniciar",
    modalResetCancel: "Cancel·lar",

    // Code fail hints
    failHint1: "Codi incorrecte! Segur que heu revisat bé les caselles de color i les càmeres de seguretat?",
    failHint2: "Codi incorrecte! Últim intent... Potser hauríeu de tornar a repassar les pistes anteriors.",

    // Clue language tag
    langTag: "en castellà",
    hintPrefix: "Pregunta a",
  },

  es: {
    // General
    title: "¿DÓNDE ESTÁ EL SEATING PLAN?",
    subtitle: "Boda Xavier & Meritxell · 25 de abril de 2026",
    btnContinue: "Continuar →",
    btnReset: "Volver a empezar",
    adminBanner: "MODO ORGANIZADORES",
    pageUnavailable: "Página no disponible",

    // Section 1
    mascotsCaption: '<b>Mel</b> 🦮 · <b>Bruna</b> 🐱 · <b>Brutus</b> 🐶',

    // Section 2
    crosswordTitle: "Resolved el crucigrama",
    crosswordIntro: "Fijaos bien en todos los detalles.",
    cluesHorizontal: "HORIZONTALES",
    cluesVertical: "VERTICALES",
    legendGreen: "Verde",
    legendBlue: "Azul",
    legendRed: "Rojo",
    btnToggleSolution: "Ver como jugador",
    btnToggleSolutionAlt: "Ver solución",

    // Section 3
    camerasTitle: "Cámaras de seguridad",
    camerasIntro: "Las cámaras del recinto han captado movimiento sospechoso la noche del 24 de abril...",

    // Section 4
    lastStepTitle: "El último paso",
    codeLabel: "Introducid el código:",
    codeBtn: "Abrir 🔓",
    codeMissing: "¡Introducid los 4 dígitos!",
    codeAttemptsLeft: n => `Intentos restantes: ${n}`,
    lockoutTitle: "¡Alarma activada!",
    lockoutText: "Habéis superado los 3 intentos permitidos.<br>El sistema de seguridad se ha activado y ha reiniciado todas las pruebas.",
    lockoutBtn: "Volver a empezar",

    // Section 5
    victoryTitle: "¡¡Estáis a punto de recuperar el seating plan!!",
    victorySubtitle: "Id hacia los novios y todos juntos, a la de 3, gritad bien fuerte:",
    victoryFooter: "¡Gracias por jugar! ❤️💍",

    // Modals
    confirmStep1: "¿Ya habéis visto el vídeo que os han dejado los sospechosos?",
    confirmStep2: "¿Habéis acabado el crucigrama y sabéis qué esconden las casillas de color?",
    confirmStep3: "¿Os habéis fijado bien en todos los detalles de las cámaras? ¿Ya sabéis qué muestran?",
    confirmReset: "¿Seguro que queréis volver a empezar?",
    modalConfirm: "¡Adelante!",
    modalCancel: "Todavía no",
    modalResetConfirm: "Sí, reiniciar",
    modalResetCancel: "Cancelar",

    // Code fail hints
    failHint1: "¡Código incorrecto! ¿Seguro que habéis revisado bien las casillas de color y las cámaras de seguridad?",
    failHint2: "¡Código incorrecto! Último intento... Quizás deberíais volver a repasar las pistas anteriores.",

    // Clue language tag
    langTag: "en catalán",
    hintPrefix: "Pregunta a",
  },
};

// Clues in both languages
// wordLang: language of the answer word itself (for the [en X] tag)
const CLUES_I18N = {
  H: [
    { word: "ECOGRAFIA", wordLang: "ca",
      ca: "Sens dubte és el futur",
      es: "Sin duda es el futuro",
      hint: "Pablo Mitjans" },
    { word: "TURISTAS", wordLang: "es",
      ca: "Com ens anomenem des de la pitjor caixa forta de la història",
      es: "Cómo nos llamamos desde la peor caja fuerte de la historia",
      hint: "Alba Fleta i Sergi Amate" },
    { word: "MIGUEL", wordLang: null,
      ca: "Nom que anomenes al Collbaix i automàticament et fots de cap",
      es: "Nombre que dices en el Collbaix y automáticamente te tiras de cabeza",
      hint: "la Xell" },
    { word: "ORXATA", wordLang: "ca",
      ca: "Beguda d'estiu que es va pujar fins a dalt del Canigó",
      es: "Bebida de verano que se subió hasta la cima del Canigó",
      hint: "Concepció Prat" },
    { word: "BARRANQUILLO", wordLang: "es",
      ca: "Per on et venen ganes de tirar-te en moments crítics quan fas muntanya",
      es: "Por donde te entran ganas de tirarte en momentos críticos cuando haces montaña",
      hint: "Sara Jordan" },
    { word: "GUIX", wordLang: "ca",
      ca: "Lloc a les afores de Manresa on la Meritxell ha passat gran part de la seva infantesa",
      es: "Lugar en las afueras de Manresa donde Meritxell ha pasado gran parte de su infancia",
      hint: "David Vilanova o Vanessa Anaya" },
    { word: "BASIC", wordLang: null,
      ca: "Bar musical on el Xavi es va conèixer amb un dels convidats (a part de passar-s'hi mooooooooltes tardes i nits)",
      es: "Bar musical donde Xavi conoció a uno de los invitados (además de pasarse muuuuuuchas tardes y noches)",
      hint: "Joaquín García o Josep Maria Soldevilla" },
    { word: "AMAZON", wordLang: null,
      ca: "D'on era el paquet que es va rebre sortint de la dutxa",
      es: "De dónde era el paquete que se recibió al salir de la ducha",
      hint: "Olga Tena o Sonia Reillo" },
    { word: "NADAL", wordLang: null,
      ca: "Esperem tot l'any per a que arribi",
      es: "Lo esperamos todo el año para que llegue",
      hint: "Patricia Gómez o Marta Valdés" },
    { word: "COMPI", wordLang: "es",
      ca: "Expressió lúdico-afectiva per a referir-se a un company de feina a Inditex",
      es: "Expresión lúdico-afectiva para referirse a un compañero de trabajo en Inditex",
      hint: "Rafael Ríos, Samuel García o Efrén Fernández" },
    { word: "AIRBIKE", wordLang: null,
      ca: "L'infern disfressat de bicicleta",
      es: "El infierno disfrazado de bicicleta",
      hint: "Anna Cudos" },
  ],
  V: [
    { word: "ENTRECOT", wordLang: null,
      ca: "Clàssic que mai falla en un dinar de masia",
      es: "Clásico que nunca falla en una comida de masía",
      hint: "Joan Capdevila o Cristian Martín" },
    { word: "MASELLA", wordLang: null,
      ca: "L'estació d'esquí per defecte",
      es: "La estación de esquí por defecto",
      hint: "Cristian Martín" },
    { word: "FRAKTAL", wordLang: null,
      ca: "Formació clàssica de la makina catalana que ha tornat amb molta \"Actitut\"",
      es: "Formación clásica de la makina catalana que ha vuelto con mucha \"Actitut\"",
      hint: "Josep Canadell, Josep Maria Soldevilla o Joaquín García" },
    { word: "OLEART", wordLang: null,
      ca: "DJ incombustible que organitza festes que ens permeten tornar al passat",
      es: "DJ incombustible que organiza fiestas que nos permiten volver al pasado",
      hint: "Josep Canadell, Josep Maria Soldevilla o Joaquín García" },
    { word: "PAYMENTS", wordLang: "en",
      ca: "Unitat de negoci en la que treballa en Xavi",
      es: "Unidad de negocio en la que trabaja Xavi",
      hint: "Rafael Ríos, Samuel García o Efrén Fernández" },
    { word: "CAZUELITA", wordLang: "es",
      ca: "Utensili de cuina on el Xavi menjava els dinars que li feia la seva àvia",
      es: "Utensilio de cocina donde Xavi comía las comidas que le hacía su abuela",
      hint: "Joan Capdevila, Carmen Estevez o Assumpta Capdevila" },
    { word: "VALENCIA", wordLang: null,
      ca: "Radio on va tenir resó mediàtic el club de fans de Take That de dues adolescents que avui ens acompanyen",
      es: "Radio donde tuvo repercusión mediática el club de fans de Take That de dos adolescentes que hoy nos acompañan",
      hint: "Sonia Reillo" },
    { word: "LLUVIA", wordLang: "es",
      ca: "Inclemència meteorològica que es dona quan ens ajuntem (excepte si anem a un \"resort\")",
      es: "Inclemencia meteorológica que se da cuando nos juntamos (excepto si vamos a un \"resort\")",
      hint: "Pablo Mitjans" },
    { word: "FARRU", wordLang: "ca",
      ca: "Personatge que regenta el bar més xungo de tot Manresa",
      es: "Personaje que regenta el bar más chungo de todo Manresa",
      hint: "David Sobrino" },
    { word: "MOJITO", wordLang: null,
      ca: "Còctel pel que sempre estem a punt, sobretot després d'un dia de platja",
      es: "Cóctel para el que siempre estamos listos, sobre todo después de un día de playa",
      hint: "Anna Cudos o Alode Izquierdo" },
    { word: "RECAREDO", wordLang: null,
      ca: "Caves que hem tingut la sort de conèixer en profunditat (amb pedal inclòs)",
      es: "Cavas que hemos tenido la suerte de conocer en profundidad (pedal incluido)",
      hint: "Josep Canadell o Esther Prades" },
    { word: "CBMANRESA", wordLang: null,
      ca: "Club de bàsquet on la Meritxell es va conèixer amb una de les convidades",
      es: "Club de baloncesto donde Meritxell conoció a una de las invitadas",
      hint: "Irene Puntí" },
  ],
};

// Get current language
function getLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_LANG);
    if (saved === "es" || saved === "ca") return saved;
  } catch(e) {}
  return "ca";
}

function setLang(lang) {
  try { localStorage.setItem(STORAGE_KEY_LANG, lang); } catch(e) {}
}

function t(key) {
  return I18N[getLang()][key] || I18N.ca[key] || key;
}

// Get clue text with language tag if word is in a different language
function getClueText(clueObj) {
  const lang = getLang();
  let text = clueObj[lang] || clueObj.ca;
  // Add language tag if the word is in a specific language different from current
  if (clueObj.wordLang && clueObj.wordLang !== lang) {
    const tagMap = {
      ca: { es: "en catalán", ca: "" },
      es: { ca: "en castellà", es: "" },
      en: { ca: "en anglès", es: "en inglés" },
    };
    const tag = tagMap[clueObj.wordLang]?.[lang] || "";
    if (tag) text += ` [${tag}]`;
  }
  return text;
}

function getClueHint(clueObj) {
  return `${t("hintPrefix")} ${clueObj.hint}`;
}
