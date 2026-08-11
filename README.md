# MetaHaus public website

The public MetaHaus website is a static-first marketing, storytelling and routing layer. MetaHaus OS remains the application platform; this repository does not contain the Client Portal or product applications.

## Current architecture

- Static HTML, CSS and JavaScript
- No runtime framework, package manager or production build step
- GitHub Pages-compatible relative paths
- Shared design and motion system in `css/styles.css`
- Dependency-free behavior in `js/main.js`
- Existing imagery in `assets/images`
- Custom domain retained through `CNAME`

```text
index.html              Rebuilt public homepage
css/styles.css          Tokens, components, responsive rules, motion and legacy compatibility
js/main.js              Navigation, portal state, accessibility and motion behavior
js/public-experience-config.js Central Live Demo enablement, base URL and route map
js/public-experience.js Activates inert Demo CTA templates only when approved
scripts/serve.mjs       Dependency-free local preview server
assets/images/          Existing image library
meta/platform-status.json Public product status and approved commercial truth
404.html                GitHub Pages not-found experience
robots.txt              Crawler guidance
sitemap.xml             Approved public sitemap
CNAME                   metahaus.studio domain mapping
RELEASE_CHECKLIST.md    Manual launch and browser QA checklist
```

## Company ownership model

Use these definitions consistently:

- **Products** are products, platforms, systems or physical products owned by MetaHaus.
- **Capabilities** are competencies, engines, technologies, systems and methods MetaHaus can build, activate, embed or adapt.
- **Worlds** are industry or experience domains where MetaHaus products and capabilities combine.
- **Selected Work / Partnerships** contains client-owned brands and implementations created through MetaHaus partnerships.

GrabMe is a MetaHaus client and partner engagement. It is not owned by MetaHaus and must appear only under Selected Work / Partnerships.

Commerce Engine remains a MetaHaus-owned reusable capability. MetaHaus Immersive is a product built on the MetaHaus Spatial Runtime; spatial design and integration also remain capabilities MetaHaus can bring to custom work.

## Product status configuration

The public maturity order is:

1. MetaHaus OS — `Private Access`
2. MetaHaus Immersive — `Project Access`
3. MetaHaus Cloud — `In Development`
4. MetaHaus AI — `In Development`
5. MetaHaus Furniture — `Project Access`, commercial and project-based

[`meta/platform-status.json`](meta/platform-status.json) is the website-level authority for public product status, maturity order and commercial availability. Because the site is intentionally build-free, visible copy remains authored in `index.html`; every product-status or commercial change must update both files in the same reviewed change.

MetaHaus Studio is currently the primary client acquisition and revenue layer. Active Studio clients use MetaHaus OS as an integrated part of the delivery relationship and do not pay a separate OS subscription during that engagement. After handover, a client may later choose to continue its OS environment through a future paid subscription; this is optional and does not automatically convert the client into a subscriber. Direct OS onboarding and subscription sales are not publicly available.

The commercial progression is Studio → OS → AI, automation and additional capabilities → broader platform access over time. Reusable operating patterns may become governed capabilities distributed through MetaHaus Cloud. MetaHaus Immersive remains the spatial experience platform.

No OS or Cloud subscription catalogue is approved for public display. Future OS tiers should correspond to actual usage, capabilities, users, workspaces, automation and service level—not company size alone. Do not store unpublished commercial pricing in public website assets.

## Public experience hierarchy

The approved public journey has four distinct layers:

1. **MetaHaus Studio — Why MetaHaus?** Company positioning, ownership, capabilities, Worlds, selected work and conversion on `metahaus.studio`.
2. **Product Proof — Is it real?** Controlled static evidence at `preview-os.html`, `preview-cloud.html` and `preview-immersive.html`.
3. **MetaHaus Demo — Show me.** The future isolated public demonstration environment at `https://demo.metahaus.studio` with `/os`, `/cloud` and `/immersive` routes.
4. **MetaHaus OS, Cloud and Immersive — Experience it.** Isolated product environments reached through Demo when enabled.
5. **Work with MetaHaus — Let’s buy/build.** Commercial discovery, proposal and engagement through the Studio contact path.

The Live Demo is not publicly deployed or enabled. `js/public-experience-config.js` is the only public-site source for Demo activation, base URL and product route mapping:

```js
demo: {
  enabled: false,
  baseUrl: "https://demo.metahaus.studio",
  routes: { root: "/", os: "/os", cloud: "/cloud", immersive: "/immersive" }
}
```

While disabled, Demo CTAs remain inert `<template>` content and no live-demo anchor, placeholder, localhost URL or dead production URL is rendered. Static product-proof and Work with MetaHaus links remain ordinary HTML navigation.

After deployment approval, verify the production Demo root and all three product routes first, then change only `enabled: false` to `enabled: true` in `js/public-experience-config.js`. The enhancement script will activate the global and product-specific Demo CTAs using the configured HTTPS base URL. Re-run the complete release checklist before publishing Studio.

## Product proof truth

Release 2026.5 separates Studio positioning from product evidence and live interaction. The MetaHaus homepage is not a product screenshot gallery: it renders zero product UI images and zero product-section proof images. Dedicated static proof pages retain approved evidence, while MetaHaus Demo owns the live interactive experience when enabled.

The site has no routing framework or deployment rewrite configuration, so the preview destinations use file-based URLs that work with the existing static host:

- MetaHaus OS: `preview-os.html`
- MetaHaus Cloud: `preview-cloud.html`
- MetaHaus Immersive: `preview-immersive.html`

- MetaHaus OS uses four manually approved interface captures covering Organization Home, Workspace Overview, Workflow & Delivery, and Identity & Persistence. The captures contain only the approved MetaHaus-owned demonstration identity: MetaHaus Demo Company, MetaHaus Operator, MetaHaus Demo Workspace and Northstar Product Launch. No interface content is cropped, altered or reconstructed.
- MetaHaus Immersive uses three original rights-safe artwork surfaces from the verified Gallery proving experience in `metahaus-immersive`. The website frame is a presentation of real Gallery source material, not a fabricated runtime screenshot or a claim that future AR, WebXR or commerce phases are available.
- MetaHaus Cloud currently uses no interface capture. The two files previously labelled as Cloud were audited as MetaHaus OS Engine Launcher and workspace/profile surfaces, so they are not presented as Cloud evidence. `preview-cloud.html` retains only verified development-boundary facts until a Cloud-owned capture is installed and approved.
- MetaHaus AI and MetaHaus Furniture intentionally have no 2026.3 preview surface.

The authoritative public proof assets remain the four approved OS captures and three approved Gallery SVGs, all retained on their dedicated proof pages. The two incorrectly labelled Cloud files remain unused pending later asset cleanup and are not authoritative Cloud evidence. New interface imagery must be captured from the owning product and reviewed for customer names, workspace data, financial values, provider states and credentials before publication.

Preview status and source paths are recorded in `meta/platform-status.json`. A preview must never change commercial status, availability or product maturity.

Studio does not connect to localhost, an authenticated application or a public Demo while Demo is disabled. Product Proof remains static evidence. Live Demo activation requires the separately isolated Demo deployment and explicit deployment approval before Studio links are enabled.

## Local preview on Windows

### Built-in Node.js preview

No Python or dependency installation is required. From PowerShell in the repository root:

```powershell
node scripts/serve.mjs
```

Open [http://127.0.0.1:4173](http://127.0.0.1:4173). Press `Ctrl+C` to stop the server.

To use another port:

```powershell
$env:PORT=8080
node scripts/serve.mjs
```

### VS Code Live Server

1. Install the “Live Server” extension by Ritwick Dey in VS Code.
2. Open this repository folder.
3. Right-click `index.html` and select **Open with Live Server**.
4. Test through the HTTP address shown by VS Code, not only by opening the file directly.

Opening `index.html` directly is acceptable for a quick content check, but HTTP preview is required for launch QA and 404 testing.

## Client Portal configuration

The production Client Portal URL is intentionally unset. There is exactly one configuration location: `PORTAL_URL` near the top of `js/main.js`.

```js
const PORTAL_URL = "";
```

When empty, portal controls open an accessible notice explaining that access is provided directly to active clients. Without JavaScript, the controls fall back to the honest Client Portal section on the homepage.

Set the constant only to the approved absolute HTTPS portal URL. When configured, all `data-portal-link` controls automatically open that URL safely in a new tab.

## Motion and accessibility expectations

MetaHaus Motion Language v1 uses CSS, IntersectionObserver, the Web Animations API and narrowly scoped `requestAnimationFrame` updates.

- Essential content must remain visible without JavaScript.
- Continuous motion must run only while its region and browser tab are visible.
- Pointer depth, magnetic controls and module lighting must remain disabled on touch/coarse-pointer devices.
- `prefers-reduced-motion` must disable orbital drift, depth, magnetic response, word sequencing and connection flow.
- Keyboard focus must expose the same relationship states as pointer hover.
- Navigation, portal notice and all CTAs must remain operable by keyboard.
- No information may exist only in an animated or hover state.

## Performance expectations

- No third-party runtime dependencies
- No render-blocking external font requests
- Homepage photography should be responsive, dimensioned and lazy-loaded
- Motion should use transforms and opacity where practical
- No unthrottled scroll or pointer handlers
- Homepage transfer set should remain below approximately 200 KB uncompressed until approved social imagery is added
- Unused legacy assets do not affect homepage transfer weight but should be archived in a later asset-cleanup phase

## Legacy pages

The following URLs remain in the repository for continuity but contain retired positioning:

- `book-online.html`
- `furniture.html`
- `projects.html`
- `services.html`
- `web-commerce.html`

They are not linked from the rebuilt homepage or listed in `sitemap.xml`, and each carries `noindex, follow`. They must not be promoted or restored to active navigation. Permanent redirects or approved replacements are required in a later phase; do not delete the files without approval.

## Branch and deployment model

- Active rebuild branch: `codex/metahaus-repositioning`
- Production compatibility: GitHub Pages
- Custom domain: `metahaus.studio` through `CNAME`
- No deployment should occur until manual QA and explicit approval are complete
- The exact GitHub Pages source branch is configured in repository settings, not in this repository

## Responsive QA checklist

Test at 320, 375, 430, 768, 1024, 1280 and 1440 pixels, plus a wide desktop viewport. At every size verify:

- No horizontal page scrolling
- Header, menu and Client Portal control fit without collision
- Hero copy and system diagram preserve hierarchy
- Headings wrap without clipping or orphaned fragments
- Product, OS, capability, World and partnership layouts remain readable
- Buttons remain at least 44 pixels in their interactive dimension
- Furniture imagery crops appropriately
- Footer columns do not overflow

Detailed steps and screenshot requirements are in `RELEASE_CHECKLIST.md`.

## Launch and rollback

Before launch, complete every required item in `RELEASE_CHECKLIST.md`, confirm product statuses and portal configuration, approve a dedicated Open Graph image, and approve the legacy URL redirect plan.

If a published release must be rolled back:

1. Identify the last approved deployment commit in GitHub.
2. Revert the release commit through a new revert commit; do not rewrite shared history.
3. Confirm GitHub Pages finishes redeploying the reverted state.
4. Verify the homepage, `CNAME`, portal behavior and 404 response on the production domain.
5. Record the reason for rollback before attempting another release.

## Next planned phases

1. Manual rendered-browser QA and screenshot approval
2. Dedicated MetaHaus Open Graph artwork
3. Legacy URL redirects or approved replacement pages
4. Dedicated product, capability, World, company and contact routes
5. Real product imagery and interface assets where available
6. Further asset cleanup after route migration
