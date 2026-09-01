(() => {
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];

  let mode = "otc";
  let selectedFile = null;

  const marketSelect = $("#marketSelect");
  const marketGrid = $("#marketGrid");
  const futureGrid = $("#futureGrid");
  const chartInput = $("#chartInput");
  const dropZone = $("#dropZone");
  const preview = $("#preview");
  const analyzeBtn = $("#analyzeBtn");
  const resultBox = $("#resultBox");

  function initMarkets() {
    marketSelect.innerHTML = CONFIG.MARKETS.map(
      (m) => `<option value="\( {m.id}"> \){m.name}</option>`
    ).join("");

    renderMarketGrid("all");
    renderFuture();
  }

  function renderMarketGrid(filter) {
    const list =
      filter === "all"
        ? CONFIG.MARKETS
        : CONFIG.MARKETS.filter((m) => m.type === filter);

    marketGrid.innerHTML = list
      .map(
        (m) => `
      <div class="market-chip" data-id="${m.id}">
        <b>${m.name}</b>
        <span>${m.type.toUpperCase()}</span>
      </div>`
      )
      .join("");

    \[ (".market-chip").forEach((el) => {
      el.addEventListener("click", () => {
        marketSelect.value = el.dataset.id;
        document.getElementById("analyze").scrollIntoView({ behavior: "smooth" });
      });
    });
  }

  function randomDir() {
    const r = Math.random();
    if (r < 0.42) return "UP";
    if (r < 0.84) return "DOWN";
    return "NEUTRAL";
  }

  function renderFuture() {
    const picks = [...CONFIG.MARKETS].sort(() => Math.random() - 0.5).slice(0, 12);
    futureGrid.innerHTML = picks
      .map((m, i) => {
        const d = randomDir();
        const conf = 55 + Math.floor(Math.random() * 35);
        const cls =
          d === "UP" ? "badge-up" : d === "DOWN" ? "badge-down" : "badge-neu";
        return `
        <div class="future-card" style="animation-delay:${i * 0.04}s">
          <div class="pair">${m.name}</div>
          <div class="row">
            <span class="\( {cls}"> \){d}</span>
            <span>${conf}%</span>
          </div>
        </div>`;
      })
      .join("");
  }

  // Mode switch \](".mode-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      \[ (".mode-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      mode = btn.dataset.mode;
    });
  });

  // Filters \](".filter").forEach((btn) => {
    btn.addEventListener("click", () => {
      $$(".filter").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderMarketGrid(btn.dataset.filter);
    });
  });

  $("#refreshFuture").addEventListener("click", renderFuture);

  // Upload
  dropZone.addEventListener("click", () => chartInput.click());
  chartInput.addEventListener("change", (e) => handleFile(e.target.files[0]));

  ["dragenter", "dragover"].forEach((ev) => {
    dropZone.addEventListener(ev, (e) => {
      e.preventDefault();
      dropZone.classList.add("drag");
    });
  });
  ["dragleave", "drop"].forEach((ev) => {
    dropZone.addEventListener(ev, (e) => {
      e.preventDefault();
      dropZone.classList.remove("drag");
    });
  });
  dropZone.addEventListener("drop", (e) => {
    handleFile(e.dataTransfer.files[0]);
  });

  function handleFile(file) {
    if (!file || !file.type.startsWith("image/")) {
      alert("Please upload an image file.");
      return;
    }
    if (file.size > CONFIG.MAX_IMAGE_MB * 1024 * 1024) {
      alert(`Max ${CONFIG.MAX_IMAGE_MB}MB`);
      return;
    }
    selectedFile = file;
    const url = URL.createObjectURL(file);
    preview.src = url;
    preview.classList.remove("hidden");
    analyzeBtn.disabled = false;
  }

  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result.split(",")[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  function setLoading(on) {
    const text = analyzeBtn.querySelector(".btn-text");
    const loader = analyzeBtn.querySelector(".btn-loader");
    analyzeBtn.disabled = on || !selectedFile;
    text.classList.toggle("hidden", on);
    loader.classList.toggle("hidden", !on);
  }

  function showResult(data) {
    const pair = CONFIG.MARKETS.find((m) => m.id === marketSelect.value);
    $("#resultPair").textContent = pair ? pair.name : marketSelect.value;
    $("#resultMode").textContent = mode.toUpperCase();
    $("#resultTf").textContent = $("#tfSelect").value;
    $("#resultTime").textContent = new Date().toLocaleTimeString();

    const dir = (data.direction || "NEUTRAL").toUpperCase();
    const badge = $("#directionBadge");
    badge.textContent = dir;
    badge.className = "direction " + (dir === "UP" ? "up" : dir === "DOWN" ? "down" : "neutral");

    const conf = Math.min(95, Math.max(40, Math.round(data.confidence || 60)));
    $("#confText").textContent = conf + "%";
    const circle = $("#confCircle");
    const offset = 327 - (327 * conf) / 100;
    circle.style.strokeDashoffset = offset;
    circle.style.stroke =
      dir === "UP" ? "var(--green)" : dir === "DOWN" ? "var(--red)" : "var(--cyan)";

    $("#resultReason").textContent =
      data.reason ||
      "Model reviewed structure, momentum and recent candles. Treat as educational bias only.";

    resultBox.classList.remove("hidden");
    resultBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  async function analyzeDemo() {
    await new Promise((r) => setTimeout(r, 1800 + Math.random() * 1200));
    const dir = randomDir();
    const conf = 52 + Math.floor(Math.random() * 38);
    const reasons = {
      UP: "Higher lows visible; short-term momentum leans bullish. Wait for confirmation candle.",
      DOWN: "Lower highs / rejection near resistance. Bias leans bearish for next window.",
      NEUTRAL: "Mixed structure — no clear edge. Prefer sit-out or smaller size."
    };
    return { direction: dir, confidence: conf, reason: reasons[dir] };
  }

  async function analyzeReal() {
    const base64 = await fileToBase64(selectedFile);
    const pair = CONFIG.MARKETS.find((m) => m.id === marketSelect.value);
    const res = await fetch(CONFIG.API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        imageBase64: base64,
        market: pair ? pair.name : marketSelect.value,
        marketType: mode,
        timeframe: $("#tfSelect").value
      })
    });
    if (!res.ok) throw new Error("API error " + res.status);
    return res.json();
  }

  analyzeBtn.addEventListener("click", async () => {
    if (!selectedFile) return;
    setLoading(true);
    resultBox.classList.add("hidden");
    try {
      const data = CONFIG.DEMO_MODE ? await analyzeDemo() : await analyzeReal();
      showResult(data);
    } catch (err) {
      console.error(err);
      alert("Analysis failed. Check backend / API or use DEMO_MODE.");
    } finally {
      setLoading(false);
    }
  });

  initMarkets();
})();
