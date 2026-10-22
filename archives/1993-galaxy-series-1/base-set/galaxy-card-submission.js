
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>9-Card Panel 1 | 1993 Star Wars Galaxy Series 1 | The Cantina Club</title>

  <style>
    :root {
      color-scheme: dark;
      --background: #0c1018;
      --surface: #141923;
      --surface-light: #202838;
      --gold: #e4c16f;
      --text: #f0f2f6;
      --muted: #a8b0c0;
      --border: #424c60;
    }

    * { box-sizing: border-box; }

    body {
      margin: 0;
      background: var(--background);
      color: var(--text);
      font: 16px/1.6 Arial, sans-serif;
    }

    a { color: var(--gold); }

    header {
      padding: 24px 18px;
      background: #141923;
      border-bottom: 1px solid var(--border);
    }

    .header-inner, main {
      width: min(1100px, 100%);
      margin: auto;
    }

    .brand {
      margin: 0;
      color: var(--gold);
      font-size: 1.7rem;
      letter-spacing: 1px;
    }

    .tagline { color: var(--muted); margin: 2px 0 16px; }

    nav {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
    }

    nav a { text-decoration: none; }

    main { padding: 24px 18px 50px; }

    .back-link {
      display: inline-block;
      margin-bottom: 18px;
    }

    h1, h2, h3 { line-height: 1.3; }

    h1, h2 { color: var(--gold); }

    .intro, .panel-info, .card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
    }

    .intro, .panel-info { padding: 20px; margin-bottom: 22px; }

    .facts {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 12px;
      margin: 0;
    }

    .facts div {
      padding: 10px;
      background: #0c1018;
      border-radius: 6px;
    }

    dt { color: var(--muted); font-size: .88rem; }
    dd { margin: 3px 0 0; }

    #cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(245px, 1fr));
      gap: 18px;
    }

    .card { overflow: hidden; }

    .cardtop {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding: 12px 15px;
      background: var(--surface-light);
      border-bottom: 1px solid var(--border);
    }

    .number {
      color: var(--gold);
      font-size: 1.2rem;
      font-weight: bold;
    }

    .cardbody { padding: 16px; }

    .cardbody h3 {
      margin: 0 0 12px;
      color: var(--text);
    }

    .card-photos {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
      margin: 12px 0;
    }

    .card-photos figure { margin: 0; }

    .card-photos img {
      display: block;
      width: 100%;
      height: 190px;
      object-fit: contain;
      background: #090c12;
      border-radius: 6px;
    }

    .card-photos figcaption {
      color: var(--muted);
      font-size: .8rem;
      text-align: center;
      margin-top: 4px;
    }

    .panel-label {
      color: var(--muted);
      font-size: .9rem;
      margin: 10px 0;
    }

    details {
      margin-top: 12px;
      border-top: 1px solid var(--border);
      padding-top: 12px;
    }

    summary {
      color: var(--gold);
      cursor: pointer;
      font-weight: bold;
    }

    .card-details {
      overflow-wrap: anywhere;
      font-size: .92rem;
    }

    .card-details p { margin: 8px 0; }

    .note { color: var(--muted); }

    footer {
      padding: 22px 18px;
      border-top: 1px solid var(--border);
      color: var(--muted);
      text-align: center;
    }
  </style>

  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
  <script src="../../../../supabase-config.js"></script>
  <script src="../../base-set/galaxy-card-submission.js"></script>
</head>

<body>
  <header>
    <div class="header-inner">
      <p class="brand">THE CANTINA CLUB</p>
      <p class="tagline">A Galaxy of Cards</p>
      <nav aria-label="Main navigation">
        <a href="../../../../index.html">Home</a>
        <a href="../../../../archives.html">The Archives</a>
        <a href="../../../../sketch-vault.html">Sketch Vault</a>
        <a href="../../../../cantina.html">The Cantina</a>
        <a href="../../../../trading-post.html">The Trading Post</a>
      </nav>
    </div>
  </header>

  <main>
    <a class="back-link" href="../index.html">← Back to 9-Card Panels</a>

    <section class="intro">
      <h1>9-Card Panel 1</h1>
      <p><strong>1993 Topps Star Wars Galaxy Series 1</strong></p>
      <p>
        This nine-card panel is associated with the
        <em>Art of Star Wars Galaxy</em> book. It reproduces artwork
        represented by nine cards in the regular 140-card base set.
      </p>
      <p>
        The panel is a separate product-related item. Its nine images
        are cross-references to existing base cards, not nine additional
        base-set cards.
      </p>
    </section>

    <section class="panel-info">
      <h2>Panel information</h2>
      <dl class="facts">
        <div><dt>Year</dt><dd>1993</dd></div>
        <div><dt>Issuer</dt><dd>Topps</dd></div>
        <div><dt>Category</dt><dd>Product premium — book insert</dd></div>
        <div><dt>Associated publication</dt><dd>Art of Star Wars Galaxy</dd></div>
        <div><dt>Panel size</dt><dd>8¼ × 11¼ inches</dd></div>
        <div><dt>Country</dt><dd>United States</dd></div>
        <div><dt>Rarity</dt><dd>Rare+</dd></div>
        <div><dt>Artists</dt><dd>See the individual base-card records below</dd></div>
      </dl>
    </section>

    <section>
      <h2>Cards represented on this panel</h2>
      <p class="note">
        These are links to the existing base-card records by card number.
        Use View card details to inspect information and Edit / Contribute
        to submit corrections or front and back photos for admin review.
      </p>

      <div id="cards">
        <article class="card" data-category="New Visions" data-panel="1">
          <div class="cardtop"><span class="number">#87</span><span>Base card</span></div>
          <div class="cardbody">
            <h3>Howard Chaykin</h3>
            <p class="panel-label">Panel 1 appearance</p>
            <div class="card-photos"></div>
            <details>
              <summary>View card details</summary>
              <div class="card-details">
                <p><strong>Artist / subject:</strong> Howard Chaykin</p>
                <p><strong>Panel association:</strong> 1</p>
              </div>
            </details>
          </div>
        </article>

        <article class="card" data-category="New Visions" data-panel="1">
          <div class="cardtop"><span class="number">#88</span><span>Base card</span></div>
          <div class="cardbody">
            <h3>Mark Chiarello</h3>
            <p class="panel-label">Panel 1 appearance</p>
            <div class="card-photos"></div>
            <details>
              <summary>View card details</summary>
              <div class="card-details">
                <p><strong>Artist / subject:</strong> Mark Chiarello</p>
                <p><strong>Panel association:</strong> 1</p>
              </div>
            </details>
          </div>
        </article>

        <article class="card" data-category="New Visions" data-panel="1">
          <div class="cardtop"><span class="number">#89</span><span>Base card</span></div>
          <div class="cardbody">
            <h3>Geof Darrow</h3>
            <p class="panel-label">Panel 1 appearance</p>
            <div class="card-photos"></div>
            <details>
              <summary>View card details</summary>
              <div class="card-details">
                <p><strong>Artist / subject:</strong> Geof Darrow</p>
                <p><strong>Panel association:</strong> 1</p>
              </div>
            </details>
          </div>
        </article>

        <article class="card" data-category="New Visions" data-panel="1">
          <div class="cardtop"><span class="number">#97</span><span>Base card</span></div>
          <div class="cardbody">
            <h3>Scott Hampton</h3>
            <p class="panel-label">Panel 1 appearance</p>
            <div class="card-photos"></div>
            <details>
              <summary>View card details</summary>
              <div class="card-details">
                <p><strong>Artist / subject:</strong> Scott Hampton</p>
                <p><strong>Panel association:</strong> 1</p>
              </div>
            </details>
          </div>
        </article>

        <article class="card" data-category="New Visions" data-panel="1">
          <div class="cardtop"><span class="number">#98</span><span>Base card</span></div>
          <div class="cardbody">
            <h3>Michael Wm. Kaluta</h3>
            <p class="panel-label">Panel 1 appearance</p>
            <div class="card-photos"></div>
            <details>
              <summary>View card details</summary>
              <div class="card-details">
                <p><strong>Artist / subject:</strong> Michael Wm. Kaluta</p>
                <p><strong>Panel association:</strong> 1</p>
              </div>
            </details>
          </div>
        </article>

        <article class="card" data-category="New Visions" data-panel="1">
          <div class="cardtop"><span class="number">#99</span><span>Base card</span></div>
          <div class="cardbody">
            <h3>Gil Kane (A)</h3>
            <p class="panel-label">Panel 1 appearance</p>
            <div class="card-photos"></div>
            <details>
              <summary>View card details</summary>
              <div class="card-details">
                <p><strong>Artist / subject:</strong> Gil Kane (A)</p>
                <p><strong>Panel association:</strong> 1</p>
              </div>
            </details>
          </div>
        </article>

        <article class="card" data-category="New Visions" data-panel="1">
          <div class="cardtop"><span class="number">#107</span><span>Base card</span></div>
          <div class="cardbody">
            <h3>Mike Lemos</h3>
            <p class="panel-label">Panel 1 appearance</p>
            <div class="card-photos"></div>
            <details>
              <summary>View card details</summary>
              <div class="card-details">
                <p><strong>Artist / subject:</strong> Mike Lemos</p>
                <p><strong>Panel association:</strong> 1</p>
              </div>
            </details>
          </div>
        </article>

        <article class="card" data-category="New Visions" data-panel="1">
          <div class="cardtop"><span class="number">#108</span><span>Base card</span></div>
          <div class="cardbody">
            <h3>Esteban Maroto</h3>
            <p class="panel-label">Panel 1 appearance</p>
            <div class="card-photos"></div>
            <details>
              <summary>View card details</summary>
              <div class="card-details">
                <p><strong>Artist / subject:</strong> Esteban Maroto</p>
                <p><strong>Panel association:</strong> 1</p>
              </div>
            </details>
          </div>
        </article>

        <article class="card" data-category="New Visions" data-panel="1">
          <div class="cardtop"><span class="number">#109</span><span>Base card</span></div>
          <div class="cardbody">
            <h3>Cynthia Martin</h3>
            <p class="panel-label">Panel 1 appearance</p>
            <div class="card-photos"></div>
            <details>
              <summary>View card details</summary>
              <div class="card-details">
                <p><strong>Artist / subject:</strong> Cynthia Martin</p>
                <p><strong>Panel association:</strong> 1</p>
              </div>
            </details>
          </div>
        </article>
      </div>
    </section>

    <section class="panel-info" style="margin-top:24px">
      <h2>Archive notes</h2>
      <p>
        The individual card records remain part of the original 140-card
        base set. Panel appearances are cross-references and do not create
        duplicate card records.
      </p>
      <p>
        Verified photographs, packaging details, and additional publication
        information can be added as they become available.
      </p>
      <p>
        <a href="../../base-set/index.html">Open the complete base-set checklist →</a>
      </p>
    </section>
  </main>

  <footer>
    The Cantina Club — A Galaxy of Cards
  </footer>

  <script>
    (() => {
      "use strict";

      const SET_SLUG = "1993-topps-star-wars-galaxy-series-1";
      const cardsContainer = document.getElementById("cards");

      if (
        !window.supabase ||
        !window.CANTINA_SUPABASE_URL ||
        !window.CANTINA_SUPABASE_KEY ||
        !cardsContainer
      ) {
        console.warn("Cantina Club: approved card details could not be loaded.");
        return;
      }

      const client = window.supabase.createClient(
        window.CANTINA_SUPABASE_URL,
        window.CANTINA_SUPABASE_KEY
      );

      const escapeHTML = (value) =>
        String(value ?? "").replace(/[&<>"']/g, (char) => ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;"
        })[char]);

      function getField(data, names) {
        for (const name of names) {
          if (data && data[name] !== undefined && data[name] !== null &&
              String(data[name]).trim() !== "") {
            return data[name];
          }
        }
        return "";
      }

      function addPhoto(container, url, label) {
        if (!url) return;

        const figure = document.createElement("figure");
        const image = document.createElement("img");
        const caption = document.createElement("figcaption");

        image.src = url;
        image.alt = label;
        image.loading = "lazy";
        caption.textContent = label;

        figure.append(image, caption);
        container.appendChild(figure);
      }

      async function loadApprovedCards() {
        const { data, error } = await client
          .from("approved_cards")
          .select("card_number, card_data, front_image_path, back_image_path")
          .eq("set_slug", SET_SLUG);

        if (error) {
          console.error("Could not load approved card records:", error);
          return;
        }

        for (const record of data || []) {
          const card = [...cardsContainer.querySelectorAll(".card")]
            .find((element) =>
              element.querySelector(".number")?.textContent
                .replace(/^#/, "").trim() === String(record.card_number)
            );

          if (!card) continue;

          const details = card.querySelector(".card-details");
          const photoContainer = card.querySelector(".card-photos");
          const cardData = record.card_data || {};

          const title = getField(cardData, ["title", "card_title", "name"]);
          if (title) {
            card.querySelector("h3").textContent = title;
          }

          if (details) {
            const fields = [
              ["Title", ["title", "card_title", "name"]],
              ["Year", ["year", "release_year"]],
              ["Artist / illustrator", ["artist", "illustrator"]],
              ["Characters / artwork subject", ["characters", "subject"]],
              ["Related film / media", ["media", "film"]],
              ["Card type", ["card_type", "type"]],
              ["Checklist section", ["category", "section"]],
              ["Back information", ["back_information", "back_text"]],
              ["Variation / parallel", ["parallel", "variation"]],
              ["Serial numbering", ["serial_number", "serial"]],
              ["Additional notes", ["notes", "description"]]
            ];

            const rows = fields.map(([label, keys]) => {
              const value = getField(cardData, keys);
              return value
                ? `<p><strong>${escapeHTML(label)}:</strong> ${escapeHTML(value)}</p>`
                : "";
            }).filter(Boolean);

            rows.push("<p><strong>Panel association:</strong> 1</p>");

            details.innerHTML = rows.join("");
          }

          if (photoContainer) {
            photoContainer.replaceChildren();

            if (record.front_image_path) {
              const { data: result } = client.storage
                .from("approved-card-images")
                .getPublicUrl(record.front_image_path);

              addPhoto(photoContainer, result?.publicUrl, "Approved front photo");
            }

            if (record.back_image_path) {
              const { data: result } = client.storage
                .from("approved-card-images")
                .getPublicUrl(record.back_image_path);

              addPhoto(photoContainer, result?.publicUrl, "Approved back photo");
            }
          }
        }
      }

      loadApprovedCards();
    })();
  </script>
</body>
</html>
