// Courtney Shyposh portfolio — interactions
// Each block checks that its elements exist, so one missing piece
// never stops the rest of the page from working.

document.addEventListener("DOMContentLoaded", () => {

  // 1. Footer year
  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // 2. Mobile menu
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("nav-menu");

  if (toggle && menu) {
    const setMenu = (open) => {
      menu.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
    };

    toggle.addEventListener("click", () => {
      setMenu(
        toggle.getAttribute("aria-expanded") !== "true"
      );
    });

    // Close after choosing a link
    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenu(false));
    });

    // Close when pressing Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        setMenu(false);
      }
    });
  }

  // 3. Navbar border once the page scrolls
  const navbar = document.querySelector(".navbar");

  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle(
        "is-scrolled",
        window.scrollY > 10
      );
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true
    });
  }

  // 4. Highlight the nav link for the section on screen
  const navLinks = document.querySelectorAll(
    '#nav-menu a[href^="#"]'
  );

  const sections = [...navLinks]
    .map((link) =>
      document.querySelector(
        link.getAttribute("href")
      )
    )
    .filter(Boolean);

  if (
    "IntersectionObserver" in window &&
    sections.length
  ) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          navLinks.forEach((link) => {
            link.classList.toggle(
              "is-active",
              link.getAttribute("href") ===
                "#" + entry.target.id
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

  // 5. Breathing cue in the hero, synced to the CSS animation
  const orb = document.querySelector(".breath-orb");
  const cue = document.getElementById("breath-cue");

  if (orb && cue) {
    let inhale = true;

    orb.addEventListener(
      "animationiteration",
      () => {
        inhale = !inhale;

        cue.style.opacity = 0;

        setTimeout(() => {
          cue.textContent = inhale
            ? "Breathe in"
            : "Breathe out";

          cue.style.opacity = 1;
        }, 300);
      }
    );
  }

  // 6. Show / hide experience details
  document
    .querySelectorAll(".details-toggle")
    .forEach((button) => {

      const panel = button.nextElementSibling;

      if (!panel) return;

      button.addEventListener("click", () => {
        const open =
          button.getAttribute("aria-expanded") === "true";

        button.setAttribute(
          "aria-expanded",
          String(!open)
        );

        button.textContent = open
          ? "Show details"
          : "Hide details";

        panel.hidden = open;
      });
    });

  // 7. Copy email to clipboard
  const copyBtn = document.getElementById("copy-email");
  const status = document.getElementById("copy-status");

  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {

      const email = copyBtn.dataset.email;

      try {
        await navigator.clipboard.writeText(email);

        if (status) {
          status.textContent = "Email copied";
        }

      } catch {
        if (status) {
          status.textContent =
            "Copy failed. Select the address to copy it.";
        }
      }

      setTimeout(() => {
        if (status) {
          status.textContent = "";
        }
      }, 2500);

    });
  }

});
