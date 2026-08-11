/**
 * Activates inert Demo CTA templates only after the central configuration is
 * explicitly enabled. Product-proof and commercial navigation remain normal
 * static links and do not depend on this script.
 */
(function initializePublicExperience() {
  const demo = window.MetaHausPublicExperience?.demo;
  if (!demo?.enabled) return;

  let baseUrl;
  try {
    baseUrl = new URL(demo.baseUrl);
  } catch {
    return;
  }

  if (baseUrl.protocol !== "https:") return;

  document.querySelectorAll("template[data-demo-cta]").forEach((template) => {
    const product = template.dataset.demoProduct;
    const route = demo.routes?.[product];
    const link = template.content.querySelector("a");
    if (!route || !link) return;

    const fragment = template.content.cloneNode(true);
    const activatedLink = fragment.querySelector("a");
    activatedLink.href = new URL(route, baseUrl).href;
    activatedLink.target = "_blank";
    activatedLink.rel = "noopener noreferrer";
    template.replaceWith(fragment);
  });
})();
