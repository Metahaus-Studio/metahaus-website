/**
 * MetaHaus public experience configuration.
 *
 * Keep Demo disabled until demo.metahaus.studio has passed RC1.8 launch
 * approval. This is the only public-site source for the Demo base URL and
 * product route mapping.
 */
window.MetaHausPublicExperience = Object.freeze({
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
