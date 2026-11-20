# Design decisions

## Visual concept: an editorial learning record

The earlier site read like a generic AI SaaS page: soft cards, purple washes and stock-photo hero. The reset replaces that with a warmer, more documentary system. The organising idea is:

> A learning record should be readable like a well-kept document: source, draft, review and outcome, each with a visible owner.

This is a presentation principle only. It adds no new product module or claim.

- **Palette:** warm paper canvas (`#f3efe6` / `#f7f3ea`), ink (`#1a211d`), off-white surfaces (`#fffcf5`) and hairline `#ded7c8` rules. Purple (`#705ad4`) is reserved for AI/provenance marks and active states; it is never a large gradient wash. Ochre (`#9b4f20`) marks section numbers and labels.
- **Typography:** General Sans for headings and the wordmark, Inter for body/UI/data. Both are self-hosted in `public/fonts`. General Sans italic is used sparingly for emphasis in large statements, not for decoration.
- **Layout:** numbered sections, full-width hairline dividers, two-column editorial spreads and product surfaces presented like examined documents rather than floating cards. Radii are small (4–8px) and shadows are minimal.
- **Photography:** self-hosted Unsplash images supply human context only. The product surface is the centrepiece; classroom photos are framed as figures with captions, not as proof of features. Two new assets (`student-device.jpg`, `resource-shelf.jpg`) support the school section.
- **Reference discipline:** ojuwa.com and synacad.com were studied for editorial pacing, real classroom imagery and role-specific storytelling. No copy, image or exact layout was copied. The 15 user-attached images were treated as reference only.

## Public page

- The hero pairs one typographic statement with a sample review packet and an evidence trail; it does not rely on a fabricated dashboard screenshot.
- The workflow is a numbered record with small preview fragments for each step: material, draft, review, outcome.
- The role switcher changes narrative, preview and CTA, and links directly into the matching demo workspace.
- Trust principles are written as boundaries, not marketing claims: generated work stays editable, answers stay tied to sources, access follows relationships, exam rules are explicit.
- The final CTA repeats the required path: reach out to customer support for a tailored version of the web app.

## Demo architecture

- One shell serves four isolated role workspaces. The role and view live in the query string (`/demo?role=<role>&view=<view>`) so the global `#main` skip link no longer conflicts with route state.
- `useSyncExternalStore` reads the query string, with `popstate` and a custom event keeping back/forward and in-app navigation in sync. Changing role resets the previous workspace because each role workspace unmounts.
- The sidebar is a working role switcher and navigation; the header has a compact switcher for quick changes. Both show the active role and current view.
- Every workspace uses the same document language: numbered eyebrows, hairline rules, evidence trails and explicit sample-data footnotes. No role gets a decorative metrics dashboard.

## Role-specific choices

- **Teacher** opens on review decisions, not attendance or charts. The assessment queue is a selectable list beside a detail panel; "Mark as reviewed" is explicitly local only.
- **Student** opens on the next task, with source and teacher note beside the work. Practice validates an answer only after a hint is available; the tutor is student-facing and grounded.
- **Leader** opens on signals to review, with a grade scope applied consistently across overview, classes and reports. Each signal carries evidence, owner and next check.
- **Parent** opens on a linked-child summary with an explicit access-boundary note. Feedback is guidance, not a grade, and "Mark as seen" is explicitly local only.

## Accessibility refinements

- Small text is held at a 12px metadata floor; text inputs render at 16px on mobile to prevent iOS zoom.
- The ochre label token was darkened from `#b7662f` to `#9b4f20` after Lighthouse found 3.59–4.13:1 on paper backgrounds. It now clears 4.5:1 on every surface used.
- The public header uses `aria-controls` and Escape for its mobile menu. The demo drawer, role switchers, filter groups and native `<dialog>` all expose their state to assistive technology.
- View changes are announced through a live region; skip links and focus-visible styles are present on both routes.

## Demo honesty

The landing page and demo are presentation surfaces. Every product preview is labelled as sample data, the demo banner states that no live school records are connected, and the tutor is marked "Demo mode". No live school records, authentication, AI provider or tenant isolation are connected.
