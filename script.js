let decks = [];

async function loadDefault() {
  try {
    const res = await fetch('../vocab.json');
    if (!res.ok) throw new Error();
    const data = await res.json();

    // kalau array langsung → bungkus jadi 1 deck
    if (Array.isArray(data)) {
      decks = [{ name: 'Default Deck', words: data }];
    } else {
      decks = data;
    }
  } catch {
    decks = [];
  }
  renderDecks();
  updateStats();
}

function renderDecks() {
  const list = document.querySelector("#deck-list");
  list.innerHTML = "";

  if (decks.length === 0) {
    list.innerHTML = `<p class="muted small">No decks found.</p>`;
    return;
  }

  decks.forEach((deck, i) => {
    const div = document.createElement("div");
    div.className = "deck-item";

    div.innerHTML = `
      <div>
        <strong>${deck.name || "Deck " + (i + 1)}</strong>
        <p class="small muted">${deck.words.length} words</p>
      </div>
      <div>
        <button class="btn light small" onclick="previewDeck(${i})">Preview</button>
      </div>
    `;

    list.appendChild(div);
  });
}

function previewDeck(i) {
  const p = document.querySelector("#preview-box");
  const deck = decks[i];
  const word = deck.words[0];

  p.innerHTML = `
    <strong>${word.word}</strong> <span class="small muted">(${word.partOfSpeech || ""})</span>
    <p class="muted small">${word.translations || ""}</p>
    <p class="small">${word.definitions?.[0]?.meaning || ""}</p>
    <em class="muted small">${word.definitions?.[0]?.example?.en || ""}</em>
  `;
}

function updateStats() {
  document.querySelector("#stat-decks").textContent = decks.length;
  const total = decks.reduce((a, d) => a + d.words.length, 0);
  document.querySelector("#stat-words").textContent = total;
}

document.querySelector("#btn-import").addEventListener("click", () => {
  document.querySelector("#file-input").click();
});

document.querySelector("#file-input").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);

      if (Array.isArray(data)) {
        decks.push({ name: `Imported ${decks.length + 1}`, words: data });
      } else if (data.words) {
        decks.push(data);
      } else {
        alert("Invalid JSON format.");
      }

      renderDecks();
      updateStats();

    } catch {
      alert("Invalid JSON.");
    }
  };
  reader.readAsText(file);
});

document.querySelector("#btn-export").addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(decks, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "supervocab-decks.json";
  a.click();
});

document.querySelector("#btn-clear").addEventListener("click", () => {
  if (confirm("Clear localStorage?")) {
    localStorage.clear();
    alert("Cleared.");
  }
});

loadDefault();
