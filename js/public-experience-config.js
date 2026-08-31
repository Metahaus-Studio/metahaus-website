/**
 * MetaHaus public experience configuration.
 *
 * Product destinations are activated independently only after their canonical
 * HTTPS domain and isolated public profile pass end-to-end verification. The
 * Gallery demo is product-owner approved and enabled after its canonical
 * domain and isolated public profile passed end-to-end verification.
 *
 * The legacy global Demo gate remains disabled and is retained only for the
 * unlaunched demo.metahaus.studio architecture.
 */
window.MetaHausPublicExperience = Object.freeze({
  products: Object.freeze({
    immersive: Object.freeze({
      enabled: true,
      url: "https://immersive.demo.metahaus.studio/",
      approvalStatus: "approved-and-verified-public-demo",
    }),
  }),
  demo: Object.freeze({
    enabled: false,
    baseUrl: "https://demo.metahaus.studio",
    routes: Object.freeze({
      root: "/",
      os: "/os",
      cloud: "/cloud",
      immersive: "/immersive",
    }),
  }),
});
