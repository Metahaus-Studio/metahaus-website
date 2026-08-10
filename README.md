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
