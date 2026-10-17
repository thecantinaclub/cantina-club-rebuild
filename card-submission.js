
(() => {
  const BUCKET = "card-submissions";

const PAGE_PATH = window.location.pathname.toLowerCase();

const SERIES_MATCH = PAGE_PATH.match(
  /1977-topps-star-wars-series-(\d+)/
);

const SERIES_NUMBER = SERIES_MATCH
  ? Number(SERIES_MATCH[1])
  : 1;

const SET_SLUG =
  `1977-topps-star-wars-series-${SERIES_NUMBER}`;

const SET_NAME =
  `1977 Topps Star Wars — Series ${SERIES_NUMBER}`;
  const MAX_FILE_SIZE = 10 * 1024 * 1024;
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

  const escapeHTML = (value) =>
    String(value ?? "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[char]);

  function start() {
    if (
      !window.supabase ||
      !window.CANTINA_SUPABASE_URL ||
      !window.CANTINA_SUPABASE_KEY
    ) {
      console.error("Cantina Club: Supabase configuration is missing.");
      return;
    }

    const client = window.supabase.createClient(
      window.CANTINA_SUPABASE_URL,
      window.CANTINA_SUPABASE_KEY
    );

    const cardsContainer = document.getElementById("cards");
    if (!cardsContainer) return;

    // Read the existing checklist without changing it.
    function getCardRecord(number) {
  const currentCards = window[`series${SERIES_NUMBER}Cards`];

  if (!Array.isArray(currentCards)) {
    console.error(
      `Card database for Series ${SERIES_NUMBER} was not found.`
    );
    return null;
  }

  return currentCards.find(
    card =>
      String(card.card).replace("#", "").trim() === String(number)
  ) || null;
}

    const style = document.createElement("style");
    style.textContent = `
      .cc-edit-button {
        margin-top: 12px;
        padding: 10px 14px;
        width: 100%;
        border: 1px solid #e4c16f;
        border-radius: 8px;
        background: #252b38;
        color: #e4c16f;
        font-weight: bold;
        cursor: pointer;
      }
      .cc-modal {
        position: fixed;
        inset: 0;
        z-index: 9999;
        overflow-y: auto;
        background: rgba(0,0,0,.85);
        padding: 20px;
      }
      .cc-panel {
        max-width: 680px;
        margin: 20px auto;
        padding: 24px;
        border: 1px solid #424c60;
        border-radius: 12px;
        background: #141923;
        color: #f0f2f6;
        font: 16px/1.5 Arial, sans-serif;
      }
      .cc-panel h2 { color: #e4c16f; margin-top: 0; }
      .cc-panel label { display: block; margin: 14px 0 5px; }
      .cc-panel input:not([type=file]),
      .cc-panel select,
      .cc-panel textarea {
        display: block;
        width: 100%;
        padding: 10px;
        color: #f0f2f6;
        background: #0c1018;
        border: 1px solid #424c60;
        border-radius: 6px;
      }
      .cc-panel input[type=file] {
        display: block;
        width: 100%;
        padding: 8px;
      }
      .cc-panel .cc-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 20px;
      }
      .cc-panel button {
        padding: 11px 14px;
        border-radius: 6px;
        cursor: pointer;
      }
      .cc-submit {
        background: #e4c16f;
        color: #141923;
        border: 0;
      }
      .cc-cancel {
        background: #252b38;
        color: white;
        border: 1px solid #424c60;
      }
      .cc-status {
        margin-top: 14px;
        overflow-wrap: anywhere;
      }
      .cc-hint {
        color: #a8b0c0;
        font-size: .9rem;
      }
    `;
    document.head.appendChild(style);

    function addButtons() {
      cardsContainer.querySelectorAll(".card").forEach(cardElement => {
        if (cardElement.querySelector(".cc-edit-button")) return;

        const numberText =
          cardElement.querySelector(".number")?.textContent || "";
        const number = numberText.replace(/^#/, "").trim();
        const title = cardElement.querySelector("h3")?.textContent || "";

        const button = document.createElement("button");
        button.type = "button";
        button.className = "cc-edit-button";
        button.textContent = "Edit / Contribute";
        button.dataset.number = number;
        button.dataset.title = title;

        cardElement.querySelector(".cardbody")?.appendChild(button);
      });
    }

    function showForm(number, displayedTitle) {
      document.querySelector(".cc-modal")?.remove();

      const card = getCardRecord(number) || {};
      const title = card.title || displayedTitle || "";

      // Separate a performer in parentheses when the checklist records one.
      const characterText = [
        card.characters,
        card.droids,
        card.creatures
      ].filter(Boolean).join("; ");

      let characters = characterText;
      let actor = "";

      const performerMatch = characterText.match(/^(.+?)\s+\(([^()]+)\)$/);
      if (performerMatch) {
        characters = performerMatch[1].trim();
        actor = performerMatch[2].trim();
      }

      const setName = [
        card.set || "1977 Topps Star Wars",
        card.series ? "Series " + card.series : ""
      ].filter(Boolean).join(" — ");

      const backType = card.back || "";
      const knownBackTypes = [
        "Puzzle — Small",
        "Puzzle — Large",
        "Story Summary",
        "Movie Facts",
        "Other"
      ];
      const selectedBackType = knownBackTypes.includes(backType)
        ? backType
        : "";

      const modal = document.createElement("div");
      modal.className = "cc-modal";
      modal.innerHTML = `
        <section class="cc-panel" role="dialog"
          aria-modal="true" aria-labelledby="cc-heading">

          <h2 id="cc-heading">
            Edit / Contribute Card #${escapeHTML(number)}
          </h2>

          <p class="cc-hint">
            Known information has been filled in from the checklist.
            Please correct or complete it where needed. Your submission
            will be reviewed before public information changes.
          </p>

          <form id="cc-form">
            <label for="cc-front">Front photo (required)</label>
            <input id="cc-front" name="front" type="file"
              accept="image/jpeg,image/png,image/webp" required>

            <label for="cc-back">Back photo (required)</label>
            <input id="cc-back" name="back" type="file"
              accept="image/jpeg,image/png,image/webp" required>

            <label for="cc-number">Card number</label>
            <input id="cc-number" name="card_number"
              value="${escapeHTML(number)}" required>

            <label for="cc-title">Card title</label>
            <input id="cc-title" name="title"
              value="${escapeHTML(title)}">

            <label for="cc-year">Release year</label>
            <input id="cc-year" name="year" type="number"
              min="1900" max="2100" value="1977">

            <label for="cc-set">Set / subset</label>
            <input id="cc-set" name="set_name"
              value="${escapeHTML(setName)}">

            <label for="cc-border">Border / design</label>
            <input id="cc-border" name="border"
              value="${escapeHTML(card.border || "")}">

            <label for="cc-media">Movie / series / media</label>
            <input id="cc-media" name="media"
              value="${escapeHTML(card.media || "")}">

            <label for="cc-characters">Characters</label>
            <input id="cc-characters" name="characters"
              value="${escapeHTML(characters)}">

            <label for="cc-actor">Actor / actress</label>
            <input id="cc-actor" name="actor"
              value="${escapeHTML(actor)}">

            <label for="cc-droids">Droids</label>
            <input id="cc-droids" name="droids"
              value="${escapeHTML(card.droids || "")}">

            <label for="cc-creatures">Creatures</label>
            <input id="cc-creatures" name="creatures"
              value="${escapeHTML(card.creatures || "")}">

            <label for="cc-vehicles">Vehicles / spaceships</label>
            <input id="cc-vehicles" name="vehicles"
              value="${escapeHTML(card.vehiclesSpaceships || "")}">

            <label for="cc-location">Location / scene</label>
            <input id="cc-location" name="location"
              value="${escapeHTML(card.location || "")}">

            <label for="cc-type">Card type</label>
            <select id="cc-type" name="card_type">
              <option value="Base">Base</option>
              <option value="Autograph">Autograph</option>
              <option value="Sketch">Sketch</option>
              <option value="Relic">Relic / memorabilia</option>
              <option value="Insert">Insert</option>
              <option value="Puzzle">Puzzle</option>
              <option value="Other">Other</option>
            </select>

            <div id="cc-autograph-fields" hidden>
              <label for="cc-signer">Autograph signer</label>
              <input id="cc-signer" name="autograph_signer">
            </div>

            <div id="cc-sketch-fields" hidden>
              <label for="cc-artist">Sketch artist</label>
              <input id="cc-artist" name="sketch_artist">
            </div>

            <div id="cc-relic-fields" hidden>
              <label for="cc-relic">Relic / memorabilia details</label>
              <input id="cc-relic" name="relic_details">
            </div>

            <label for="cc-back-type">Back type</label>
            <select id="cc-back-type" name="back_type">
              <option value="">Unknown / not recorded</option>
              <option value="Puzzle — Small">Puzzle — Small</option>
              <option value="Puzzle — Large">Puzzle — Large</option>
              <option value="Story Summary">Story Summary</option>
              <option value="Movie Facts">Movie Facts</option>
              <option value="Other">Other</option>
            </select>

            <label for="cc-back-info">Back information</label>
            <textarea id="cc-back-info" name="back_information"
              rows="2">${escapeHTML(card.backInformation || "")}</textarea>

            <label for="cc-variations">Parallel / variation</label>
            <input id="cc-variations" name="parallel"
              value="${escapeHTML(card.variations || "")}">

            <label for="cc-serial">Serial numbering (e.g. 12/99)</label>
            <input id="cc-serial" name="serial_number">

            <label for="cc-notes">Additional details / corrections</label>
            <textarea id="cc-notes" name="notes" rows="4"
              placeholder="Add corrections or information not covered above"></textarea>

            <p class="cc-hint">
              Photos must be JPG, PNG or WebP, up to 10 MB each.
            </p>

            <div class="cc-actions">
              <button class="cc-submit" type="submit">
                Submit for review
              </button>
              <button class="cc-cancel" type="button">Cancel</button>
            </div>

            <p class="cc-status" role="status" aria-live="polite"></p>
          </form>
        </section>
      `;

      document.body.appendChild(modal);

      const form = modal.querySelector("#cc-form");
      const typeSelect = form.elements.card_type;
      const backTypeSelect = form.elements.back_type;

      // Use the known checklist back type when available.
      backTypeSelect.value = selectedBackType;

      // Preserve the recorded card type when it matches an option.
      const knownCardTypes = [
        "Base", "Autograph", "Sketch", "Relic", "Insert", "Puzzle", "Other"
      ];
      if (knownCardTypes.includes(card.cardType)) {
        typeSelect.value = card.cardType;
      }

      function updateTypeFields() {
        modal.querySelector("#cc-autograph-fields").hidden =
          typeSelect.value !== "Autograph";
        modal.querySelector("#cc-sketch-fields").hidden =
          typeSelect.value !== "Sketch";
        modal.querySelector("#cc-relic-fields").hidden =
          typeSelect.value !== "Relic";
      }

      typeSelect.addEventListener("change", updateTypeFields);
      updateTypeFields();

      modal.querySelector(".cc-cancel").addEventListener("click", () => {
        modal.remove();
      });

      modal.addEventListener("click", event => {
        if (event.target === modal) modal.remove();
      });

      form.addEventListener("submit", async event => {
        event.preventDefault();

        const submitButton = form.querySelector(".cc-submit");
        const status = form.querySelector(".cc-status");
        const front = form.elements.front.files[0];
        const back = form.elements.back.files[0];

        if (!front || !back) {
          status.textContent = "Please select both card photos.";
          return;
        }

        for (const file of [front, back]) {
          if (!ALLOWED_TYPES.includes(file.type)) {
            status.textContent = "Use JPG, PNG or WebP image files only.";
            return;
          }
          if (file.size > MAX_FILE_SIZE) {
            status.textContent = "Each photo must be 10 MB or smaller.";
            return;
          }
        }

        submitButton.disabled = true;
        status.textContent = "Uploading photos and submitting…";

        const extensionFor = file => ({
          "image/jpeg": "jpg",
          "image/png": "png",
          "image/webp": "webp"
        })[file.type];

        const folder = crypto.randomUUID();
        const frontPath = `${folder}/front.${extensionFor(front)}`;
        const backPath = `${folder}/back.${extensionFor(back)}`;

        try {
          const frontUpload = await client.storage
            .from(BUCKET)
            .upload(frontPath, front, {
              contentType: front.type,
              upsert: false
            });

          if (frontUpload.error) throw frontUpload.error;

          const backUpload = await client.storage
            .from(BUCKET)
            .upload(backPath, back, {
              contentType: back.type,
              upsert: false
            });

          if (backUpload.error) throw backUpload.error;

          const data = {};
          new FormData(form).forEach((value, key) => {
            if (key !== "front" && key !== "back") {
              data[key] = value;
            }
          });

          const { error } = await client
            .from("card_submissions")
            .insert({
              set_slug: SET_SLUG,
              card_number: String(data.card_number),
              submission_type: "edit",
              submitted_data: data,
              front_image_path: frontPath,
              back_image_path: backPath,
              status: "pending"
            });

          if (error) throw error;

          status.textContent =
            "Thank you! Your submission is pending admin review.";
          submitButton.remove();
        } catch (error) {
          console.error("Card submission failed:", error);
          status.textContent =
            "Submission failed. Please try again later.";
          submitButton.disabled = false;
        }
      });
    }

    cardsContainer.addEventListener("click", event => {
      const button = event.target.closest(".cc-edit-button");
      if (!button) return;

      showForm(button.dataset.number, button.dataset.title);
    });

    addButtons();

    new MutationObserver(addButtons).observe(cardsContainer, {
      childList: true,
      subtree: true
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
