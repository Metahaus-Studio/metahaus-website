# MetaHaus release checklist

Complete this checklist against a local HTTP preview and again against the production candidate URL. Do not mark rendered checks complete from source inspection alone.

## Launch approvals

- [ ] Product order is OS, Immersive, Cloud, AI, Furniture in both the homepage and `meta/platform-status.json`
- [ ] MetaHaus OS is described as a shipped authenticated product with `Private Access`; controlled proof is not used as the product’s maturity label
- [ ] MetaHaus Immersive status confirmed as `Project Access`
- [ ] MetaHaus Cloud and MetaHaus AI statuses confirmed as `In Development`
- [ ] Evidence-aware context intelligence is identified as shipped inside MetaHaus OS, while standalone provider-backed generative and autonomous MetaHaus AI remains future-facing
- [ ] MetaHaus Furniture status and project-based commercial wording approved
- [ ] Homepage status and availability copy matches `meta/platform-status.json`
- [ ] Active Studio-client OS access is described as integrated into the delivery relationship, not as a separate subscription or “free OS”
- [ ] Post-handover OS access is described as an optional future paid subscription choice
- [ ] No client is described as automatically becoming a paying subscriber
- [ ] Direct OS onboarding and subscription sales are not presented as publicly available
- [ ] No OS price, inactive edition, Cloud tier or future price appears publicly or as purchasable
- [ ] The OS CTA follows the Studio/contact pathway; there is no checkout
- [ ] `/os/` clearly distinguishes shipped Private Access capability, controlled public proof and future-facing capability without claiming unshipped public access
- [ ] `/os/pricing/` publishes no plan names, prices, checkout or entitlement assumptions and remains `noindex`
- [ ] `/os/signup/` contains no signup form, account creation or provisioning behavior and remains `noindex`
- [ ] `/login/` is the universal existing-approved-access entry and its only authenticated destination is `https://portal.metahaus.studio/`
- [ ] Access copy refers to people with existing approved access without asserting a broad active public customer cohort
- [ ] Client deliverables and IP are described as governed by their engagement agreement, not held by an OS subscription
- [ ] Any post-handover continuation subscription is described as future and optional
- [ ] MetaHaus OS, MetaHaus Immersive and MetaHaus Cloud are the only products with dedicated proof pages
- [ ] Homepage product UI and product-proof image count is zero
- [ ] The OS proof page uses only the four manually approved captures and approved sanitized demonstration identities
- [ ] Organization Home, Workspace Overview, Workflow & Delivery and Identity & Persistence remain on `preview-os.html`
- [ ] The Immersive preview uses only approved Gallery proving-experience source assets
- [ ] Approved Gallery source artwork remains on `preview-immersive.html` and does not render in the homepage product portfolio
- [ ] The Immersive preview does not present AR, WebXR or commerce integration as currently available
- [ ] MetaHaus Cloud uses no OS Engine Launcher, workspace, contract, client, workflow or persistence imagery as Cloud evidence
- [ ] Cloud evidence remains text-only in this release; there is no stale requirement to produce or publish a Cloud capture
- [ ] The Cloud preview does not imply runtime activation, installation, assignment, commercial availability or launch readiness
- [ ] AI and Furniture do not display product previews
- [ ] Homepage preview links resolve to `preview-os.html`, `preview-immersive.html` and `preview-cloud.html`
- [ ] Product cards preserve proof and commercial actions; the hidden future Immersive action reads `Enter Gallery Experience`
- [ ] Homepage has no standalone Demo explanation or large Product Access section
- [ ] AI and Furniture render no Demo CTA until an approved central route exists
- [ ] `js/public-experience-config.js` keeps the global Demo switch disabled; future public experiences require independent product destination and launch approval
- [ ] Disabled Demo configuration renders no live-demo anchors or empty layout placeholders
- [ ] No public page contains a localhost or `127.0.0.1` link
- [ ] The global Demo switch is not activated merely because one product receives approval; per-product activation architecture is required first
- [ ] The reachable Gallery/Vercel experience remains an unlinked controlled-demo candidate awaiting launch approval
- [ ] No page links to absent `immersive.demo.metahaus.studio` DNS, `vrexhibitions.com`, legacy recovery experiences, legacy Furniture VR or the password-gated Furniture storefront
- [ ] Every preview destination returns HTTP 200 and its Back to MetaHaus link returns to the correct homepage product context
- [ ] Preview destinations remain capture-based and do not iframe, expose or link directly to development applications
- [ ] OS captures retain their natural aspect ratios without meaningful interface cropping; Cloud has no capture in this release
- [ ] The Immersive destination explicitly identifies the approved-source limitation and does not present its artwork composition as a runtime screenshot
- [ ] GrabMe partnership wording approved
- [ ] GrabMe remains only under Selected Work / Partnerships and is identified as client-owned
- [ ] Homepage Log in controls route to `/login/` without relying on JavaScript
- [ ] `https://portal.metahaus.studio/` returns the established authenticated login surface
- [ ] No Client Portal notice dialog or Studio-client-only access language remains in active navigation
- [ ] Dedicated 1200×630 MetaHaus Open Graph image approved and added
- [ ] Legacy URL redirect or replacement plan approved
- [ ] Contact email verified
- [ ] Privacy, Terms, billing/cancellation, data handling, provider/subprocessor, security, support and legal-company-identity dependencies are either approved or explicitly blocking public SaaS launch

## Start the local preview

From PowerShell in the repository root:

```powershell
node scripts/serve.mjs
```

Open `http://127.0.0.1:4173` in Chrome.

## Viewport matrix

Test each width at a representative viewport height and capture the listed screenshots.

| Width | Required review | Screenshot |
|---:|---|---|
| 320px | Smallest navigation, Log in CTA, hero wrapping, system diagram, one-column cards and footer | Hero with menu closed and open |
| 375px | Common phone hierarchy, buttons, capability labels, World cards | Hero and Products |
| 430px | Large phone spacing, furniture crop, Selected Work | Furniture and Selected Work |
| 768px | Tablet navigation mode, stacked hero and two-column product relationships | Hero and Products |
| 1024px | Compact desktop grid, navigation, product modules, partnership layout | Full viewport and Selected Work |
| 1280px | Standard desktop rhythm, line lengths and card proportions | Hero and Products |
| 1440px | Primary desktop presentation | Full-page screenshot |
| ≥1728px | Maximum content width, ambient background and excessive empty-space check | Hero and footer |

At every width:

- [ ] `document.documentElement.scrollWidth === document.documentElement.clientWidth`
- [ ] Fixed navigation does not cover anchored headings
- [ ] No text, focus outline or decorative line is clipped
- [ ] Buttons and menu items remain at least 44px in their interactive dimension
- [ ] No image distortion or unintended consumer-commerce treatment appears
- [ ] Footer content remains readable without overflow
- [ ] Homepage and all three preview destinations have zero page-level horizontal overflow
- [ ] `/os/`, `/os/pricing/`, `/os/signup/` and `/login/` have zero page-level horizontal overflow
- [ ] Product proof remains full-width within its content container on mobile
- [ ] Primary product captures are not distorted, destructively cropped or upscaled beyond their source width

## Chrome desktop interaction review

- [ ] Hero orbital movement is slow and does not compete with reading
- [ ] Products, Capabilities and Worlds layer controls respond to hover, click and keyboard focus
- [ ] Pointer depth returns to neutral when leaving the hero
- [ ] Active navigation follows the visible section without flicker
- [ ] Magnetic Log in movement does not move the click target excessively
- [ ] Product lighting follows the pointer without jitter
- [ ] Five-product maturity order remains visually clear and status labels remain readable
- [ ] Homepage preview CTAs and all Back to MetaHaus controls are keyboard- and touch-operable links
- [ ] Preview labels, artwork and captions remain readable without clipping
- [ ] OS interface motion starts when visible and stops off-screen
- [ ] Capability and World focus states match their hover states
- [ ] GrabMe motion reads as a client partnership, not a MetaHaus-owned product
- [ ] Log in links open the public `/login/` bridge and the bridge clearly labels portal access as existing approved access

## Keyboard-only review

Starting from the address bar, use only `Tab`, `Shift+Tab`, `Enter`, `Space` and `Escape`.

- [ ] Skip link is the first page control and moves focus to main content
- [ ] Focus order follows the visual reading order
- [ ] Focus indicators are always visible
- [ ] Mobile menu reports its expanded state and closes with Escape
- [ ] Hero layer buttons report `aria-pressed` correctly
- [ ] Product, capability, World and Selected Work states do not trap focus
- [ ] Login and portal handoff links have visible focus states and descriptive accessible names
- [ ] Mail links and external actions have clear names

## Reduced-motion review

In Chrome DevTools, open **Rendering** and set **Emulate CSS media feature prefers-reduced-motion** to `reduce`.

- [ ] Content remains immediately visible
- [ ] Orbital, breathing, connection and interface loops stop
- [ ] Word and section reveal movement is absent
- [ ] Pointer depth and magnetic movement are absent
- [ ] Focus, active navigation and relationship labels remain clear

## JavaScript-disabled review

In Chrome DevTools settings, disable JavaScript and reload.

- [ ] All essential homepage copy is visible
- [ ] Every section can be reached by normal scrolling
- [ ] The dedicated no-script navigation is visible and its anchors work
- [ ] Log in remains a normal usable link to `/login/`
- [ ] Contact email remains usable
- [ ] The page does not display popup remnants or loading placeholders

## Console and network review

Reload with DevTools open.

- [ ] Console contains no errors or uncaught promise rejections
- [ ] No 404 responses for CSS, JavaScript, favicon or homepage imagery
- [ ] No third-party script, font or tracking request appears unexpectedly
- [ ] `meta/platform-status.json` returns HTTP 200 and parses as valid JSON
- [ ] JavaScript files pass syntax validation, `meta/platform-status.json` parses, and `sitemap.xml` parses as XML
- [ ] Every local route and internal fragment referenced by active HTML resolves; inert `<template>` Demo anchors remain excluded while disabled
- [ ] All three Gallery preview SVG assets return HTTP 200
- [ ] `index.html`, CSS and JavaScript return HTTP 200
- [ ] `/os/`, `/os/pricing/`, `/os/signup/` and `/login/` return HTTP 200
- [ ] Furniture imagery is lazy-loaded and does not block first paint
- [ ] Switching tabs pauses continuous motion and returning resumes it calmly
- [ ] Simulated offline reload fails predictably without repeated requests or console loops

Useful console checks:

```js
document.documentElement.scrollWidth === document.documentElement.clientWidth
document.querySelectorAll('[id]').length === new Set([...document.querySelectorAll('[id]')].map(el => el.id)).size
[...document.images].every(img => img.complete && img.naturalWidth > 0)
matchMedia('(prefers-reduced-motion: reduce)').matches
```

## 404 and legacy URLs

- [ ] `http://127.0.0.1:4173/does-not-exist` returns the custom 404 with HTTP 404
- [ ] 404 styling, favicon and homepage link load correctly
- [ ] Legacy pages are absent from homepage navigation and footer
- [ ] Legacy pages are absent from `sitemap.xml`
- [ ] Each legacy page contains `noindex, follow`
- [ ] Approved production redirects are tested when introduced

## SEO and social preview

- [ ] Title and description match current company positioning
- [ ] Canonical resolves to `https://metahaus.studio/`
- [ ] Open Graph and Twitter text is correct
- [ ] Organization structured data validates without warnings that require invented information
- [ ] `robots.txt` points to the production sitemap
- [ ] Sitemap contains only approved public routes
- [ ] Favicon appears in browser tabs
- [ ] Approved Open Graph image renders correctly at 1200×630 without retired “Immersive Commerce” wording

## Cross-repository truth follow-up

- [ ] Stale `metahaus-platform/docs/PRODUCTION_AUTHENTICATION.md` is tracked for a platform-owned correction
- [ ] Stale `metahaus-platform/docs/PRODUCTS.md` is tracked for a platform-owned correction
- [ ] Stale platform Demo README is tracked for a platform-owned correction
- [ ] Stale Immersive deployment documentation is tracked for an Immersive-owned correction
- [ ] Stale `vrexhibitions.com` ownership language is tracked for an Immersive-owned correction
- [ ] The Managed Founding Customer offer contradiction is tracked for explicit platform supersession
- [ ] No platform or Immersive repository file is included in the website release boundary

## Final source and staged-boundary review

- [ ] `git diff --check` passes
- [ ] `git diff --cached --name-only` contains only the approved website semantic-alignment tranche
- [ ] `git diff --cached` contains no CSS, layout, runtime activation, checkout, signup, pricing, provisioning or unsafe destination change
- [ ] `git status --short` is reviewed before commit

## Final production smoke test

- [ ] Domain resolves over HTTPS
- [ ] `CNAME` remains `metahaus.studio`
- [ ] Homepage, favicon, robots, sitemap and 404 return expected status codes
- [ ] `/login/` and the external portal handoff match the approved access architecture
- [ ] Contact email opens with the correct address
- [ ] Chrome desktop and mobile screenshots are approved
- [ ] Rollback commit is identified before deployment
