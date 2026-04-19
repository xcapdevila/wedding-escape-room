// crossword-render.js — v5: deterministic hints with per-word caps

// Seeded PRNG (mulberry32) — same seed = same hints every time
function seededRandom(seed) {
  return function() {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

// Build a map: for each cell, which words does it belong to?
function buildCellWordMap() {
  const cellWords = {}; // key "r,c" → [{ word, len }]
  PLACEMENTS.forEach(p => {
    const len = p.word.length;
    for (let i = 0; i < len; i++) {
      const r = p.dir === "H" ? p.r : p.r + i;
      const c = p.dir === "H" ? p.c + i : p.c;
      const key = `${r},${c}`;
      if (!cellWords[key]) cellWords[key] = [];
      cellWords[key].push({ word: p.word, len, dir: p.dir });
    }
  });
  return cellWords;
}

const CELL_WORD_MAP = buildCellWordMap();

// Compute deterministic hint set
// Rules:
//   - Colored cells NEVER get hints
//   - Per word: max 2 hints if word length > 4, max 1 if length ≤ 4
//   - Target ~30% of hintable cells shown (i.e. 70% difficulty)
//   - Seed-based so it's always the same
function computeHintSet(hintPercent, seed) {
  const rng = seededRandom(seed);

  // Gather all hintable cells (not colored)
  const hintable = [];
  for (let r = 0; r < GRID_RAW.length; r++) {
    for (let c = 0; c < GRID_RAW[r].length; c++) {
      const ch = GRID_RAW[r][c];
      const key = `${r},${c}`;
      if (ch !== "." && !COLOR_MAP[key]) {
        hintable.push({ r, c, ch, key });
      }
    }
  }

  // Shuffle with seeded RNG
  for (let i = hintable.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [hintable[i], hintable[j]] = [hintable[j], hintable[i]];
  }

  const targetCount = Math.round((hintPercent / 100) * hintable.length);
  const hintSet = new Set();
  const wordHintCount = {}; // "WORD_DIR" → count of hints in that word

  for (const cell of hintable) {
    if (hintSet.size >= targetCount) break;

    // Check per-word caps for ALL words this cell belongs to
    const words = CELL_WORD_MAP[cell.key] || [];
    let allowed = true;
    for (const w of words) {
      const wKey = `${w.word}_${w.dir}`;
      const current = wordHintCount[wKey] || 0;
      const maxHints = w.len <= 5 ? 1 : 2;
      if (current >= maxHints) { allowed = false; break; }
    }

    if (allowed) {
      hintSet.add(cell.key);
      for (const w of words) {
        const wKey = `${w.word}_${w.dir}`;
        wordHintCount[wKey] = (wordHintCount[wKey] || 0) + 1;
      }
    }
  }

  return hintSet;
}

// Pre-compute the default hint set (30% hints = 70% difficulty, seed 2026)
const DEFAULT_HINT_SET = computeHintSet(30, 2026);

function renderGrid(containerId, options = {}) {
  const {
    showLetters = false,
    showNumbers = true,
    hintSet = DEFAULT_HINT_SET,
    showColorLetters = false,
  } = options;

  const container = document.getElementById(containerId);
  container.innerHTML = "";

  for (let r = 0; r < GRID_RAW.length; r++) {
    const rowDiv = document.createElement("div");
    rowDiv.className = "row";
    for (let c = 0; c < GRID_RAW[r].length; c++) {
      const ch = GRID_RAW[r][c];
      const cell = document.createElement("div");
      cell.className = "cell";
      const key = `${r},${c}`;

      if (ch === ".") {
        cell.classList.add("empty");
      } else {
        cell.classList.add("filled");
        const color = COLOR_MAP[key];
        if (color) cell.classList.add(`color-${color}`);

        if (showNumbers && NUMBER_MAP[key]) {
          const numSpan = document.createElement("span");
          numSpan.className = "clue-num";
          numSpan.textContent = NUMBER_MAP[key];
          cell.appendChild(numSpan);
        }

        let showThis = false;
        if (showLetters) {
          showThis = true;
        } else if (color && showColorLetters) {
          showThis = true;
        } else if (!color && hintSet.has(key)) {
          showThis = true;
          cell.classList.add("hint-letter");
        }

        if (showThis) {
          const letterSpan = document.createElement("span");
          letterSpan.textContent = ch;
          cell.appendChild(letterSpan);
        }
      }
      rowDiv.appendChild(cell);
    }
    container.appendChild(rowDiv);
  }
}

function renderClues(containerId, showAnswers = false) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  ["H", "V"].forEach(dir => {
    const label = dir === "H" ? "HORITZONTALS" : "VERTICALS";
    const h3 = document.createElement("h3");
    h3.textContent = label;
    container.appendChild(h3);

    const ul = document.createElement("ul");
    ul.className = "clue-list";

    getSortedClues(dir).forEach(c => {
      const li = document.createElement("li");
      const numSpan = document.createElement("span");
      numSpan.className = "clue-num-label";
      numSpan.textContent = `${c.num}.`;
      li.appendChild(numSpan);
      li.appendChild(document.createTextNode(c.clue));

      // Hint: guest who knows the answer
      if (c.hint) {
        if (showAnswers) {
          // Admin mode: show hint directly, no button
          const hintText = document.createElement("span");
          hintText.className = "hint-text hint-visible";
          hintText.textContent = " — " + c.hint;
          li.appendChild(hintText);
        } else {
          // Player mode: magnifying glass button to reveal
          const hintBtn = document.createElement("button");
          hintBtn.className = "hint-btn";
          hintBtn.textContent = "🔍";
          hintBtn.title = "Pista: qui sap la resposta?";
          const hintText = document.createElement("span");
          hintText.className = "hint-text";
          hintText.textContent = c.hint;
          hintBtn.addEventListener("click", () => {
            hintText.classList.toggle("hint-visible");
          });
          li.appendChild(hintBtn);
          li.appendChild(hintText);
        }
      }

      if (showAnswers) {
        const ansSpan = document.createElement("span");
        ansSpan.className = "clue-answer";
        ansSpan.textContent = `[${c.word}]`;
        li.appendChild(ansSpan);
      }
      ul.appendChild(li);
    });

    container.appendChild(ul);
  });
}
