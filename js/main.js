/**
 * MetaHaus public website
 * Static-first navigation, portal configuration and Motion Language v1.
 */

// Replace the empty value with the approved production Client Portal URL.
// Example shape only: "https://portal.example.com"
const PORTAL_URL = "";

const mobileBreakpoint = window.matchMedia("(max-width: 55rem)");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
const runningAnimations = new Set();

function motionIsAllowed() {
  return !reducedMotion.matches;
}

function trackAnimation(animation) {
  if (!animation) return;

  runningAnimations.add(animation);
  animation.addEventListener("finish", () => runningAnimations.delete(animation), { once: true });
  animation.addEventListener("cancel", () => runningAnimations.delete(animation), { once: true });
}

function configurePortalLinks() {
  const portalLinks = document.querySelectorAll("[data-portal-link]");
  const portalUrl = PORTAL_URL.trim();

  portalLinks.forEach((link) => {
    if (portalUrl) {
      link.setAttribute("href", portalUrl);
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
      link.removeAttribute("aria-haspopup");
      link.removeAttribute("aria-controls");
      link.dataset.portalConfigured = "true";
    } else {
      link.setAttribute("href", "#client-portal");
      link.removeAttribute("target");
      link.removeAttribute("rel");
      link.setAttribute("aria-haspopup", "dialog");
      link.setAttribute("aria-controls", "portal-notice");
      link.dataset.portalConfigured = "false";
    }
  });

  const portalAction = document.querySelector("[data-portal-action]");
  if (portalAction && portalUrl) {
    portalAction.firstChild.textContent = "Open Client Portal ";
  }
}

function initializePortalNotice() {
  const dialog = document.querySelector("#portal-notice");
  if (!dialog || typeof dialog.showModal !== "function") return;

  const closeButton = dialog.querySelector("[data-portal-close]");
  let invokingControl = null;

  document.querySelectorAll('[data-portal-link][data-portal-configured="false"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      invokingControl = link;
      dialog.showModal();
      closeButton?.focus();
    });
  });

  closeButton?.addEventListener("click", () => dialog.close());

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  dialog.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    event.preventDefault();
    dialog.close();
  });

  dialog.addEventListener("close", () => {
    invokingControl?.focus();
    invokingControl = null;
  });
}

function initializeNavigation() {
  const toggle = document.querySelector(".nav-toggle");
  const navigation = document.querySelector(".primary-nav, .nav-links");

  if (!toggle || !navigation) return;

  if (!navigation.id) navigation.id = "legacy-primary-navigation";
  if (!toggle.hasAttribute("aria-controls")) toggle.setAttribute("aria-controls", navigation.id);

  toggle.setAttribute("aria-expanded", "false");

  const setNavigationState = (isOpen) => {
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    navigation.classList.toggle("is-open", isOpen);
    navigation.classList.toggle("open", isOpen);
  };

  toggle.addEventListener("click", () => {
    setNavigationState(toggle.getAttribute("aria-expanded") !== "true");
  });

  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) setNavigationState(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setNavigationState(false);
      toggle.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (
      mobileBreakpoint.matches &&
      toggle.getAttribute("aria-expanded") === "true" &&
      !toggle.contains(event.target) &&
      !navigation.contains(event.target)
    ) {
      setNavigationState(false);
    }
  });

  mobileBreakpoint.addEventListener("change", (event) => {
    if (!event.matches) setNavigationState(false);
  });
}

function initializeActiveNavigation() {
  const navigation = document.querySelector(".primary-nav");
  if (!navigation || !("IntersectionObserver" in window)) return;

  const links = Array.from(navigation.querySelectorAll('a[href^="#"]'));
  const observedSections = links
    .map((link) => ({ link, section: document.querySelector(link.getAttribute("href")) }))
    .filter((item) => item.section);

  if (!observedSections.length) return;

  const visibility = new Map();

  const updateActiveSection = () => {
    const active = Array.from(visibility.entries())
      .filter(([, ratio]) => ratio > 0)
      .sort((a, b) => b[1] - a[1])[0];

    if (!active) return;

    const activeId = active[0];
    links.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${activeId}`;
      if (isActive) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });

    document.body.dataset.activeSection = activeId;
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => visibility.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0));
      updateActiveSection();
    },
    {
      rootMargin: "-18% 0px -52% 0px",
      threshold: [0, 0.1, 0.3, 0.6],
    }
  );

  observedSections.forEach(({ section }) => observer.observe(section));
}

function initializeReveals() {
  const revealElements = document.querySelectorAll(".reveal");
  if (!revealElements.length) return;

  const reveal = (element, index = 0) => {
    element.classList.add("is-visible", "visible");

    if (!motionIsAllowed() || typeof element.animate !== "function") return;

    const distance = index % 3 === 0 ? 12 : index % 3 === 1 ? 8 : 6;
    const animation = element.animate(
      [
        { opacity: 0.68, transform: `translate3d(0, ${distance}px, 0)` },
        { opacity: 1, transform: "translate3d(0, 0, 0)" },
      ],
      {
        duration: 520 + (index % 3) * 70,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      }
    );
    trackAnimation(animation);
  };

  if (!("IntersectionObserver" in window)) {
    revealElements.forEach(reveal);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const index = Number(entry.target.dataset.revealIndex || 0);
        reveal(entry.target, index);
        observer.unobserve(entry.target);
      });
    },
    {
      rootMargin: "0px 0px -7% 0px",
      threshold: 0.06,
    }
  );

  revealElements.forEach((element, index) => {
    element.dataset.revealIndex = String(index);
    observer.observe(element);
  });
}

function initializeHeadingMotion() {
  if (!motionIsAllowed() || !("IntersectionObserver" in window)) return;

  const headings = document.querySelectorAll(
    ".hero-copy h1, .section-heading h2, .company-copy h2, .portal-copy h2, .contact-panel h2"
  );

  const preparedHeadings = Array.from(headings).filter((heading) => {
    if (heading.querySelector("br")) return false;

    const label = heading.textContent.trim();
    const words = label.split(/\s+/);
    heading.setAttribute("aria-label", label);
    heading.textContent = "";

    words.forEach((word, index) => {
      const span = document.createElement("span");
      span.className = "motion-word";
      span.setAttribute("aria-hidden", "true");
      span.textContent = word;
      heading.append(span);
      if (index < words.length - 1) heading.append(document.createTextNode(" "));
    });

    return true;
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.querySelectorAll(".motion-word").forEach((word, index) => {
          const animation = word.animate(
            [
              { opacity: 0.58, transform: "translate3d(0, 0.38em, 0) rotate(0.6deg)" },
              { opacity: 1, transform: "translate3d(0, 0, 0) rotate(0deg)" },
            ],
            {
              duration: 500,
              delay: Math.min(index * 34, 280),
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            }
          );
          trackAnimation(animation);
        });

        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.35 }
  );

  preparedHeadings.forEach((heading) => observer.observe(heading));
}

function initializeMotionRegions() {
  const regions = document.querySelectorAll("[data-motion-region]");
  if (!regions.length) return;

  if (!("IntersectionObserver" in window)) {
    regions.forEach((region) => (region.dataset.motionActive = "true"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.dataset.motionActive = String(entry.isIntersecting);
      });
    },
    { rootMargin: "12% 0px 12% 0px", threshold: 0.01 }
  );

  regions.forEach((region) => observer.observe(region));
}

function initializeHeroSystem() {
  const system = document.querySelector(".hero-system");
  if (!system) return;

  const controls = system.querySelectorAll("[data-layer-control]");
  const nodes = system.querySelectorAll("[data-layer]");
  let lockedLayer = "";

  const setLayer = (layer = "") => {
    if (layer) system.dataset.activeLayer = layer;
    else delete system.dataset.activeLayer;

    controls.forEach((control) => {
      control.setAttribute("aria-pressed", String(control.dataset.layerControl === layer));
    });
  };

  controls.forEach((control) => {
    const layer = control.dataset.layerControl;
    control.addEventListener("pointerenter", () => setLayer(layer));
    control.addEventListener("focus", () => setLayer(layer));
    control.addEventListener("pointerleave", () => setLayer(lockedLayer));
    control.addEventListener("blur", () => setLayer(lockedLayer));
    control.addEventListener("click", () => {
      lockedLayer = lockedLayer === layer ? "" : layer;
      setLayer(lockedLayer);
    });
  });

  nodes.forEach((node) => {
    const layer = node.dataset.layer;
    node.addEventListener("pointerenter", () => setLayer(layer));
    node.addEventListener("focus", () => setLayer(layer));
    node.addEventListener("pointerleave", () => setLayer(lockedLayer));
    node.addEventListener("blur", () => setLayer(lockedLayer));
  });

  if (!finePointer.matches || !motionIsAllowed()) return;

  let frame = 0;
  let pointerX = 0;
  let pointerY = 0;

  const updateDepth = () => {
    system.style.setProperty("--depth-x", `${pointerY * -1.15}deg`);
    system.style.setProperty("--depth-y", `${pointerX * 1.15}deg`);
    frame = 0;
  };

  system.addEventListener("pointermove", (event) => {
    if (!motionIsAllowed()) return;
    const bounds = system.getBoundingClientRect();
    pointerX = (event.clientX - bounds.left) / bounds.width - 0.5;
    pointerY = (event.clientY - bounds.top) / bounds.height - 0.5;
    if (!frame) frame = requestAnimationFrame(updateDepth);
  });

  system.addEventListener("pointerleave", () => {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    system.style.setProperty("--depth-x", "0deg");
    system.style.setProperty("--depth-y", "0deg");
  });
}

function initializeMagneticElements() {
  if (!finePointer.matches || !motionIsAllowed()) return;

  document.querySelectorAll("[data-magnetic]").forEach((element) => {
    let frame = 0;
    let offsetX = 0;
    let offsetY = 0;

    const update = () => {
      element.style.setProperty("--magnetic-x", `${offsetX}px`);
      element.style.setProperty("--magnetic-y", `${offsetY}px`);
      frame = 0;
    };

    element.addEventListener("pointermove", (event) => {
      if (!motionIsAllowed()) return;
      const bounds = element.getBoundingClientRect();
      offsetX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 7;
      offsetY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 5;
      if (!frame) frame = requestAnimationFrame(update);
    });

    element.addEventListener("pointerleave", () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      element.style.setProperty("--magnetic-x", "0px");
      element.style.setProperty("--magnetic-y", "0px");
    });
  });
}

function initializeModuleLighting() {
  if (!finePointer.matches || !motionIsAllowed()) return;

  document.querySelectorAll("[data-module]").forEach((module) => {
    let frame = 0;
    let x = 50;
    let y = 50;

    const update = () => {
      module.style.setProperty("--module-x", `${x}%`);
      module.style.setProperty("--module-y", `${y}%`);
      frame = 0;
    };

    module.addEventListener("pointermove", (event) => {
      if (!motionIsAllowed()) return;
      const bounds = module.getBoundingClientRect();
      x = ((event.clientX - bounds.left) / bounds.width) * 100;
      y = ((event.clientY - bounds.top) / bounds.height) * 100;
      if (!frame) frame = requestAnimationFrame(update);
    });

    module.addEventListener("pointerleave", () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      module.style.setProperty("--module-x", "50%");
      module.style.setProperty("--module-y", "50%");
    });
  });
}

function initializeVisibilityState() {
  const update = () => {
    const isVisible = document.visibilityState === "visible";
    document.body.dataset.pageVisible = String(isVisible);

    runningAnimations.forEach((animation) => {
      if (isVisible) animation.play();
      else animation.pause();
    });
  };

  document.addEventListener("visibilitychange", update);
  update();
}

function initializeMotionPreferenceState() {
  reducedMotion.addEventListener("change", (event) => {
    if (!event.matches) return;

    runningAnimations.forEach((animation) => animation.cancel());
    runningAnimations.clear();

    document.querySelectorAll("[data-magnetic]").forEach((element) => {
      element.style.setProperty("--magnetic-x", "0px");
      element.style.setProperty("--magnetic-y", "0px");
    });

    document.querySelectorAll("[data-module]").forEach((module) => {
      module.style.setProperty("--module-x", "50%");
      module.style.setProperty("--module-y", "50%");
    });

    const heroSystem = document.querySelector(".hero-system");
    if (heroSystem) {
      heroSystem.style.setProperty("--depth-x", "0deg");
      heroSystem.style.setProperty("--depth-y", "0deg");
    }
  });
}

function setCurrentYear() {
  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });
}

configurePortalLinks();
initializePortalNotice();
initializeNavigation();
initializeActiveNavigation();
initializeVisibilityState();
initializeMotionPreferenceState();
setCurrentYear();

const startMotionSystem = () => {
  initializeReveals();
  initializeHeadingMotion();
  initializeMotionRegions();
  initializeHeroSystem();
  initializeMagneticElements();
  initializeModuleLighting();
};

// Two frames guarantee that essential content has painted before motion begins.
requestAnimationFrame(() => requestAnimationFrame(startMotionSystem));
