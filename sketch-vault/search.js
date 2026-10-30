
(function () {
  const base = "/cantina-club-rebuild/sketch-vault/";

  // Load the central search catalogue.
  const indexScript = document.createElement("script");
  indexScript.src = base + "search-index.js";

  indexScript.onload = function () {
    createSearch();
  };

  document.head.appendChild(indexScript);

  function createSearch() {
    const header = document.querySelector(".header-inner") ||
                   document.querySelector("header");

    if (!header || document.getElementById("siteSearch")) return;

    const searchArea = document.createElement("div");
    searchArea.id = "siteSearch";
    searchArea.style.cssText =
      "position:relative; flex:1; max-width:420px; margin:0 15px;";

    const input = document.createElement("input");
    input.type = "search";
    input.placeholder = "Search all sets and artists...";
    input.setAttribute("aria-label", "Search all sets and artists");
    input.style.cssText =
      "width:100%; box-sizing:border-box; padding:11px 14px; " +
      "border:1px solid var(--gold); border-radius:7px; " +
      "background:var(--panel); color:var(--text); font-size:15px;";

    const results = document.createElement("div");
    results.style.cssText =
      "display:none; position:absolute; top:calc(100% + 8px); " +
      "left:0; right:0; max-height:65vh; overflow-y:auto; z-index:1000; " +
      "padding:10px; background:var(--panel); " +
      "border:1px solid var(--gold); border-radius:8px;";

    searchArea.append(input, results);
    header.appendChild(searchArea);

    input.addEventListener("input", function () {
      const query = input.value.trim().toLowerCase();
      const index = window.sketchVaultSearchIndex || [];

      results.innerHTML = "";

      if (!query) {
        results.style.display = "none";
        return;
      }

      const matches = index.filter(item =>
        [
          item.name,
          item.type,
          item.year,
          item.set,
          item.wave,
          item.level,
          item.keywords
        ].filter(Boolean).join(" ").toLowerCase().includes(query)
      );

      results.style.display = "block";

      if (!matches.length) {
        results.textContent = "No matching sets or artists found.";
        return;
      }

      matches.forEach(item => {
        const card = document.createElement("article");

        card.style.cssText =
          "padding:14px 16px; margin-bottom:10px; " +
          "background:var(--panel); border:1px solid var(--border); " +
          "border-radius:9px;";

        const title = document.createElement("h3");
        title.textContent = item.name;
        title.style.cssText = "margin:0 0 7px; color:var(--gold);";

        const description = document.createElement("div");
        description.style.cssText =
          "color:var(--muted); font-size:.9rem; margin-bottom:10px;";

        if (item.type === "Artist") {
          description.textContent =
            [item.set, item.wave, item.level ? "Level " + item.level : ""]
              .filter(Boolean).join(" · ");
        } else {
          description.textContent =
            [item.type, item.year].filter(Boolean).join(" · ");
        }

        const link = document.createElement("a");
        link.href = item.url;
        link.textContent =
          item.type === "Artist"
            ? "View artist page →"
            : "Explore this sketch set →";
        link.style.color = "var(--gold)";

        card.append(title, description, link);
        results.appendChild(card);
      });
    });

    document.addEventListener("click", function (event) {
      if (!searchArea.contains(event.target)) {
        results.style.display = "none";
      }
    });
  }
})();
