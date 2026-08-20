// assets/header.js

class SiteHeader extends HTMLElement {
  connectedCallback() {
    // Do not build the component again if the site editor reconnects it.
    if (this.shadowRoot) return;

    // Create the header's isolated component area.
    const shadow = this.attachShadow({ mode: 'open' });

    shadow.innerHTML = `
      <style>
        /*
          :host means the outer <site-header> element itself.
          It remains stuck to the top while visitors scroll.
        */
        :host {
          position: sticky;
          top: 0;
          z-index: 1000;
          display: block;
        }

        /*
          A local reset: Shadow DOM does not automatically receive
          your page's normal CSS rules.
        */
        * {
          box-sizing: border-box;
        }

        header {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 22px 48px;
          border-bottom: 1px solid #2a2a28;
          background: #0b0b0a;
        }

        .logo-link {
          display: flex;
          align-items: center;
          gap: 14px;
          color: inherit;
          text-decoration: none;
        }

        .logo-image {
          width: auto;
          height: 46px;
        }

        .logo-name {
          color: #f2ede4;
          font-family: Arsenal, serif;
          font-size: 20px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        /* Normal desktop navigation. */
        .desktop-nav {
          display: flex;
          gap: 32px;
          font-family: "Space Mono", monospace;
          font-size: 13px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .desktop-nav a,
        .mobile-menu a {
          color: #f2ede4;
          text-decoration: none;
        }

        .desktop-nav a:hover,
        .mobile-menu a:hover {
          color: #c81d2d;
        }

        /*
          The hamburger button and its menu are hidden on desktop.
          They become visible in the mobile media query below.
        */
        .menu-button,
        .mobile-menu {
          display: none;
        }

        @media (max-width: 900px) {
          header {
            padding: 18px 24px;
          }

          .logo-image {
            height: 40px;
          }

          .logo-name {
            font-size: 16px;
          }

          /* Hide the horizontal desktop links on mobile. */
          .desktop-nav {
            display: none;
          }

          /*
            The menu button is visible on mobile.
            It contains the word MENU and three lines.
          */
          .menu-button {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            padding: 10px 0 10px 14px;
            border: 0;
            background: transparent;
            color: #f2ede4;
            cursor: pointer;
            font-family: "Space Mono", monospace;
            font-size: 13px;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
          }

          .menu-icon {
            display: flex;
            flex-direction: column;
            gap: 4px;
          }

          .menu-icon span {
            display: block;
            width: 20px;
            height: 2px;
            background: #c81d2d;
            transition: transform 0.2s ease, opacity 0.2s ease;
          }

          /*
            Turn the three hamburger lines into an X
            when the menu is open.
          */
          .menu-button.is-open .menu-icon span:nth-child(1) {
            transform: translateY(6px) rotate(45deg);
          }

          .menu-button.is-open .menu-icon span:nth-child(2) {
            opacity: 0;
          }

          .menu-button.is-open .menu-icon span:nth-child(3) {
            transform: translateY(-6px) rotate(-45deg);
          }

          /*
            The menu sits directly below the header.
            position:absolute prevents it from pushing the page content down.
          */
          .mobile-menu {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            flex-direction: column;
            padding: 8px 24px 20px;
            border-bottom: 1px solid #2a2a28;
            background: #0b0b0a;
          }

          /* JavaScript adds .is-open when MENU is pressed. */
          .mobile-menu.is-open {
            display: flex;
          }

          .mobile-menu a {
            padding: 16px 0;
            border-bottom: 1px solid #2a2a28;
            font-family: "Space Mono", monospace;
            font-size: 15px;
            letter-spacing: 0.08em;
            text-transform: uppercase;
          }

          .mobile-menu a:last-child {
            border-bottom: 0;
            color: #c81d2d;
          }
        }
      </style>

      <header>
        <a href="/index.html" class="logo-link">
          <img
            src="/assets/drm-logo.png"
            alt="DRM crest"
            class="logo-image"
          >

          <span class="logo-name">Donny Reiher Music</span>
        </a>

        <!-- This navigation is visible on desktop only. -->
        <nav class="desktop-nav" aria-label="Main navigation">
          <a href="/About.html">About</a>
          <a href="/Services.html">Services</a>
          <a href="/Lessons.html">Lessons</a>
          <a href="/Specs.html">Specs</a>
          <a href="/Terms.html">Terms</a>
          <a href="/Contact.html">Contact</a>
        </nav>

        <!-- This button is visible on mobile only. -->
        <button
          class="menu-button"
          type="button"
          aria-label="Open navigation menu"
          aria-expanded="false"
          aria-controls="mobile-navigation"
        >
          <span>Menu</span>

          <span class="menu-icon" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        <!-- This navigation is visible only after pressing MENU on mobile. -->
        <nav
          id="mobile-navigation"
          class="mobile-menu"
          aria-label="Mobile navigation"
        >
          <a href="/About.html">About</a>
          <a href="/Services.html">Services</a>
          <a href="/Lessons.html">Lessons</a>
          <a href="/Specs.html">Specs</a>
          <a href="/Terms.html">Terms</a>
          <a href="/Contact.html">Contact →</a>
        </nav>
      </header>
    `;

    // Find the button and the mobile menu inside this header component.
    const menuButton = shadow.querySelector('.menu-button');
    const mobileMenu = shadow.querySelector('.mobile-menu');

    // Open or close the mobile menu when the button is pressed.
    menuButton.addEventListener('click', () => {
      const menuIsOpen = mobileMenu.classList.toggle('is-open');

      menuButton.classList.toggle('is-open', menuIsOpen);
      menuButton.setAttribute('aria-expanded', String(menuIsOpen));

      // Update the invisible accessibility label.
      menuButton.setAttribute(
        'aria-label',
        menuIsOpen ? 'Close navigation menu' : 'Open navigation menu'
      );
    });

    // Close the menu immediately when the visitor selects a page.
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('is-open');
        menuButton.classList.remove('is-open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Open navigation menu');
      });
    });

    // Let keyboard users close the open menu with the Escape key.
    shadow.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
        mobileMenu.classList.remove('is-open');
        menuButton.classList.remove('is-open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Open navigation menu');

        // Return keyboard focus to the button that opened it.
        menuButton.focus();
      }
    });
  }
}

// Avoid an error if the editor evaluates the script more than once.
if (!customElements.get('site-header')) {
  customElements.define('site-header', SiteHeader);
}
