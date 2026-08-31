/**
 * MetaHaus public experience configuration.
 *
 * Keep the current global Demo gate disabled until demo.metahaus.studio has
 * deployment approval. This single boolean is intentionally retained for
 * backward compatibility, but it is too coarse for future releases: each
 * product experience must receive independent destination and launch approval
 * before the configuration model evolves or public behavior is enabled.
 * This remains the only public-site source for the inactive Demo base URL and
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
