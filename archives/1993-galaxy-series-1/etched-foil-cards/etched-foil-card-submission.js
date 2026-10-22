
(() => {
  "use strict";

  const BUCKET = "card-submissions";
  const SET_SLUG = "1993-topps-star-wars-galaxy-series-1-etched-foil";
  const SET_NAME = "1993 Topps Star Wars Galaxy Series 1 — Etched Foil";
  const MAX_FILE_SIZE = 10 * 1024 * 1024;
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

  const escapeHTML = value =>
    String(value ?? "").replace(/[&<>"']/g, char => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;",
      '"': "&quot;", "'": "&#39;"
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

    const container = document.getElementById("cards");
    if (!container) return;

    const style = document.createElement("style");
    style.textContent = `
      .cc-edit-button {
        width: 100%; margin-top: 12px; padding: 10px 14px;
        border: 1px solid #e4c16f; border-radius: 8px;
        background: #252b38; color: #e4c16f;
        font-weight: bold; cursor: pointer;
      }
      .cc-modal {
        position: fixed; inset: 0; z-index: 9999;
        overflow-y: auto; background: rgba(0,0,0,.85); padding: 20px;
      }
      .cc-panel {
        max-width: 680px; margin: 20px auto; padding: 24px;
        border: 1px solid #424c60; border-radius: 12px;
        background: #141923; color: #f0f2f6;
        font: 16px/1.5 Arial, sans-serif;
      }
      .cc-panel h2 { color: #e4c16f; margin-top: 0; }
      .cc-panel label { display: block; margin: 14px 0 5px; }
      .cc-panel input:not([type=file]), .cc-panel select,
      .cc-panel textarea {
        display: block; box-sizing: border-box; width: 100%;
        padding: 10px; color: #f0f2f6; background: #0c1018;
        border: 1px solid #424c60; border-radius: 6px;
      }
      .cc-panel input[type=file] { display: block; width: 100%; padding: 8px; }
      .cc-actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 20px; }
      .cc-panel button { padding: 11px 14px; border-radius: 6px; cursor: pointer; }
      .cc-submit { background: #e4c16f; color: #141923; border: 0; }
      .cc-cancel { background: #252b38; color: white; border: 1px solid #424c60; }
      .cc-hint { color: #a8b0c0; font-size: .9rem; }
      .cc-status { margin-top: 14px; overflow-wrap: anywhere; }
    `;
    document.head.appendChild(style);

    function addButtons() {
      container.querySelectorAll(".card").forEach(card => {
        if (card.querySelector(".cc-edit-button")) return;

        const number = (
          card.dataset.cardNumber ||
          card.querySelector(".number")?.textContent ||
          ""
        ).replace(/^#/, "").trim();

        if (!number) return;

        const title = card.querySelector("h3")?.textContent || "";
        const button = document.createElement("button");
        button.type = "button";
        button.className = "cc-edit-button";
        button.textContent = "Edit / Contribute";
        button.dataset.number = number;
        button.dataset.title = title;

        const body = card.querySelector(".cardbody") || card;
        body.appendChild(button);
      });
    }

    function showForm(number, title) {
      document.querySelector(".cc-modal")?.remove();

      const modal = document.createElement("div");
      modal.className = "cc-modal";
      modal.innerHTML = `
        <section class="cc-panel" role="dialog" aria-modal="true"
          aria-labelledby="cc-heading">
          <h2 id="cc-heading">Edit / Contribute Etched Foil #${escapeHTML(number)}</h2>
          <p class="cc-hint">
            Upload both sides of the card and correct or complete its details.
            Your submission remains pending until an administrator approves it.
          </p>
          <form id="cc-form">
            <label for="cc-front">Front photo (required)</label>
            <input id="cc-front" name="front" type="file"
              accept="image/jpeg,image/png,image/webp" required>

            <label for="cc-back">Back photo (required)</label>
            <input id="cc-back" name="back" type="file"
              accept="image/jpeg,image/png,image/webp" required>

            <label for="cc-number">Etched Foil insert number</label>
            <input id="cc-number" name="card_number"
              value="${escapeHTML(number)}" required>

            <label for="cc-title">Card subject / title</label>
            <input id="cc-title" name="title"
              value="${escapeHTML(title)}" required>

            <label for="cc-year">Release year</label>
            <input id="cc-year" name="year" type="number"
              min="1900" max="2100" value="1993" required>

            <label for="cc-set">Set / subset</label>
            <input id="cc-set" name="set_name"
              value="${escapeHTML(SET_NAME)}" required>

            <label for="cc-category">Card category</label>
            <input id="cc-category" name="category"
              value="Etched Foil Insert" required>

            <label for="cc-artist">Artist / illustrator, if known</label>
            <input id="cc-artist" name="artist">

            <label for="cc-subject">Characters / artwork subject</label>
            <input id="cc-subject" name="characters"
              value="${escapeHTML(title)}">

            <label for="cc-back-info">Back information / text</label>
            <textarea id="cc-back-info" name="back_information" rows="4"></textarea>

            <label for="cc-variation">Variation / parallel, if applicable</label>
            <input id="cc-variation" name="parallel">

            <label for="cc-notes">Additional details / corrections</label>
            <textarea id="cc-notes" name="notes" rows="4"></textarea>

            <p class="cc-hint">
              JPG, PNG or WebP only. Maximum 10 MB per photo.
            </p>
            <div class="cc-actions">
              <button class="cc-submit" type="submit">Submit for review</button>
              <button class="cc-cancel" type="button">Cancel</button>
            </div>
            <p class="cc-status" role="status" aria-live="polite"></p>
          </form>
        </section>
      `;

      document.body.appendChild(modal);
      const form = modal.querySelector("#cc-form");

      modal.querySelector(".cc-cancel").addEventListener("click", () => modal.remove());
      modal.addEventListener("click", event => {
        if (event.target === modal) modal.remove();
      });

      form.addEventListener("submit", async event => {
        event.preventDefault();

        const submit = form.querySelector(".cc-submit");
        const status = form.querySelector(".cc-status");
        const front = form.elements.front.files[0];
        const back = form.elements.back.files[0];

        if (!front || !back) {
          status.textContent = "Please select both card photos.";
          return;
        }

        for (const file of [front, back]) {
          if (!ALLOWED_TYPES.includes(file.type)) {
            status.textContent = "Use JPG, PNG or WebP images only.";
            return;
          }
          if (file.size > MAX_FILE_SIZE) {
            status.textContent = "Each photo must be 10 MB or smaller.";
            return;
          }
        }

        submit.disabled = true;
        status.textContent = "Uploading photos and submitting…";

        const extension = file => ({
          "image/jpeg": "jpg",
          "image/png": "png",
          "image/webp": "webp"
        })[file.type];

        const folder = crypto.randomUUID();
        const frontPath = `${folder}/front.${extension(front)}`;
        const backPath = `${folder}/back.${extension(back)}`;

        try {
          const first = await client.storage.from(BUCKET).upload(
            frontPath, front, { contentType: front.type, upsert: false }
          );
          if (first.error) throw first.error;

          const second = await client.storage.from(BUCKET).upload(
            backPath, back, { contentType: back.type, upsert: false }
          );
          if (second.error) throw second.error;

          const submittedData = {};
          new FormData(form).forEach((value, key) => {
            if (key !== "front" && key !== "back") submittedData[key] = value;
          });

          const { error } = await client.from("card_submissions").insert({
            set_slug: SET_SLUG,
            card_number: String(submittedData.card_number),
            submission_type: "edit",
            submitted_data: submittedData,
            front_image_path: frontPath,
            back_image_path: backPath,
            status: "pending"
          });

          if (error) throw error;

          status.textContent = "Thank you! Your submission is pending admin review.";
          submit.remove();
        } catch (error) {
          console.error("Etched Foil submission failed:", error);
          status.textContent = "Submission failed. Please try again later.";
          submit.disabled = false;
        }
      });
    }

    container.addEventListener("click", event => {
      const button = event.target.closest(".cc-edit-button");
      if (button) showForm(button.dataset.number, button.dataset.title);
    });

    addButtons();
    new MutationObserver(addButtons).observe(container, {
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
