class EntriesRotatorCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.currentIndex = 0;
    this.intervalId = null;
  }

  setConfig(config) {
    if (!config.entity || !config.attributes || !config.interval) {
      throw new Error("Please define entity, attributes, and interval in the card config.");
    }

    this.config = config;

    this.shadowRoot.innerHTML = `
      <div id="container"></div>
    `;
  }

  set hass(hass) {
    const entityData = hass.states[this.config.entity];

    if (!entityData || !entityData.attributes.entries) {
      this.shadowRoot.getElementById("container").innerHTML = `
        <div class="error">Entity data is unavailable or malformed.</div>
      `;
      return;
    }

    const entries = entityData.attributes.entries;

    if (!entries || entries.length === 0) {
      this.shadowRoot.getElementById("container").innerHTML = `
        <div class="error">No entries available.</div>
      `;
      return;
    }

    if (!this.intervalId) {
      this.startRotation(entries);
    }
  }

  startRotation(entries) {
    this.updateDisplay(entries);

    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % entries.length;
      this.updateDisplay(entries);
    }, this.config.interval * 1000);
  }

  updateDisplay(entries) {
    const entry = entries[this.currentIndex];
    const container = this.shadowRoot.getElementById("container");
    container.innerHTML = "";

    this.config.attributes.forEach((attr) => {
      if (entry[attr]) {
        const div = document.createElement("div");
        div.className = attr;
        div.textContent = entry[attr];
        container.appendChild(div);
      }
    });
  }

  disconnectedCallback() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

customElements.define("entries-rotator-card", EntriesRotatorCard);
