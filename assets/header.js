// assets/header.js

class SiteHeader extends HTMLElement {
  connectedCallback() {
    // Do nothing if this instance already has a Shadow DOM.
    if (this.shadowRoot) return;

    // Keep the generated header isolated from the page editor's DOM updates.
    const shadow = this.attachShadow({ mode: 'open' });

    shadow.innerHTML = `
      <style>
        :host {
          position: sticky;
          top: 0;
          z-index: 1000;
          display: block;
        }

        header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 22px 48px;
          border-bottom: 1px solid #2a2a28;
          background: #0b0b0a;
        }

        @media (max-width: 900px) {
          header {
            padding: 18px 24px;
          }

          .drm-nav {
            display: none !important;
          }
        }
      </style>

      <header>
        <a href="/index.html" style="display:flex;align-items:center;gap:14px;text-decoration:none;color:inherit">
          <img src="/assets/drm-logo.png" alt="DRM crest" style="height:46px;width:auto">

          <span style="font-family:Arsenal,serif;color:#f2ede4;font-weight:700;font-size:20px;letter-spacing:0.06em;text-transform:uppercase">
            Donny Reiher Music
          </span>
        </a>

        <nav class="drm-nav" style="display:flex;gap:32px;font-family:'Space Mono',monospace;font-size:13px;letter-spacing:0.08em;text-transform:uppercase">
          <a href="/About.html" style="color:#f2ede4;text-decoration:none">About</a>
          <a href="/Services.html" style="color:#f2ede4;text-decoration:none">Services</a>
          <a href="/Lessons.html" style="color:#f2ede4;text-decoration:none">Lessons</a>
          <a href="/Specs.html" style="color:#f2ede4;text-decoration:none">Specs</a>
          <a href="/Terms.html" style="color:#f2ede4;text-decoration:none">Terms</a>
          <a href="/Contact.html" style="color:#f2ede4;text-decoration:none">Contact</a>
        </nav>
      </header>
    `;
  }
}

// Avoid an error if the script is evaluated more than once.
if (!customElements.get('site-header')) {
  customElements.define('site-header', SiteHeader);
}
