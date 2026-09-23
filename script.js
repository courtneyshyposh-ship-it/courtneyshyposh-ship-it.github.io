// Courtney Shyposh portfolio — interactions
// Handles the interactive features of the portfolio website.

document.addEventListener("DOMContentLoaded", () => {

  // ==========================================================
  // 1. FOOTER YEAR
  // Automatically updates the copyright year.
  // ==========================================================

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  // ==========================================================
  // 2. MOBILE MENU
  // Opens and closes the navigation menu on smaller screens.
  // ==========================================================

  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("nav-menu");

  if (toggle && menu) {

    const setMenu = (open) => {
      menu.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
    };

    toggle.addEventListener("click", () => {
      const isOpen =
        toggle.getAttribute("aria-expanded") === "true";

      setMenu(!isOpen);
    });

    // Close the menu when a navigation link is clicked.
    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        setMenu(false);
      });
    });

    // Close the menu when Escape is pressed.
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        setMenu(false);
      }
    });
  }


  // ==========================================================
  // 3. NAVBAR SCROLL EFFECT
  // Adds a border to the navigation bar after scrolling.
  // ==========================================================

  const navbar = document.querySelector(".navbar");

  if (navbar) {

    const onScroll = () => {
      navbar.classList.toggle(
        "is-scrolled",
        window.scrollY > 10
      );
    };

    onScroll();

    window.addEventListener(
      "scroll",
      onScroll,
      { passive: true }
    );
  }


  // ==========================================================
  // 4. ACTIVE NAVIGATION LINK
  // Highlights the navigation link for the section
  // currently visible on the screen.
  // ==========================================================

  const navLinks = document.querySelectorAll(
    '#nav-menu a[href^="#"]'
  );

  const sections = [...navLinks]
    .map((link) => {
      return document.querySelector(
        link.getAttribute("href")
      );
    })
    .filter(Boolean);

  if (
    "IntersectionObserver" in window &&
    sections.length
  ) {

    const observer = new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) {
            return;
          }

          navLinks.forEach((link) => {

            const target =
              link.getAttribute("href");

            link.classList.toggle(
              "is-active",
              target === "#" + entry.target.id
            );

          });

        });

      },
      {
        rootMargin: "-45% 0px -50% 0px"
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });
  }


  // ==========================================================
  // 5. BREATHING ANIMATION
  // Changes the "Breathe in" / "Breathe out" text
  // along with the breathing animation.
  // ==========================================================

  const orb = document.querySelector(".breath-orb");
  const cue = document.getElementById("breath-cue");

  if (orb && cue) {

    let inhale = true;

    orb.addEventListener(
      "animationiteration",
      () => {

        inhale = !inhale;

        cue.style.opacity = "0";

        setTimeout(() => {

          cue.textContent = inhale
            ? "Breathe in"
            : "Breathe out";

          cue.style.opacity = "1";

        }, 300);

      }
    );
  }


  // ==========================================================
  // 6. EXPERIENCE DETAILS
  // Opens and closes the "Show details" sections.
  // ==========================================================

  document
    .querySelectorAll(".details-toggle")
    .forEach((button) => {

      const panel = button.nextElementSibling;

      if (!panel) {
        return;
      }

      button.addEventListener("click", () => {

        const isOpen =
          button.getAttribute("aria-expanded") === "true";

        button.setAttribute(
          "aria-expanded",
          String(!isOpen)
        );

        button.textContent = isOpen
          ? "Show details"
          : "Hide details";

        panel.hidden = isOpen;

      });

    });


  // ==========================================================
  // 7. COPY EMAIL BUTTON
  // Copies the email address to the visitor's clipboard.
  // ==========================================================

  const copyButton =
    document.getElementById("copy-email");

  const copyStatus =
    document.getElementById("copy-status");

  if (copyButton) {

    copyButton.addEventListener(
      "click",
      async () => {

        const email =
          copyButton.dataset.email;

        try {

          await navigator.clipboard.writeText(email);

          if (copyStatus) {
            copyStatus.textContent =
              "Email copied";
          }

        } catch (error) {

          if (copyStatus) {
            copyStatus.textContent =
              "Copy failed. Select the address to copy it.";
          }

        }

        setTimeout(() => {

          if (copyStatus) {
            copyStatus.textContent = "";
          }

        }, 2500);

      }
    );
  }

});
