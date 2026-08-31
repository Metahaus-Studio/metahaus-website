/**
 * Activates inert product-demo CTA templates only after their independent
 * canonical destination is explicitly enabled. The legacy global Demo route
 * map remains supported but disabled. Product-proof and commercial navigation
 * remain normal static links and do not depend on this script.
 */
(function initializePublicExperience() {
  const experience = window.MetaHausPublicExperience;
  const demo = experience?.demo;

  document.querySelectorAll("template[data-demo-cta]").forEach((template) => {
    const product = template.dataset.demoProduct;
    const link = template.content.querySelector("a");
    if (!product || !link) return;

    let destination;
    const productDestination = experience?.products?.[product];

    try {
      if (productDestination?.enabled) {
        destination = new URL(productDestination.url);
      } else if (demo?.enabled) {
        const baseUrl = new URL(demo.baseUrl);
        const route = demo.routes?.[product];
        if (!route) return;
        destination = new URL(route, baseUrl);
      } else {
        return;
      }
    } catch {
      return;
    }

    if (destination.protocol !== "https:") return;

    const fragment = template.content.cloneNode(true);
    const activatedLink = fragment.querySelector("a");
    activatedLink.href = destination.href;
    activatedLink.target = "_blank";
    activatedLink.rel = "noopener noreferrer";
    template.replaceWith(fragment);
  });
})();
