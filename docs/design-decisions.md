# Design decisions

## Visual concept: a product-led preview

The first revamp used a warm paper-and-ink direction. It was rejected because it made the site feel small and dense: muddy beige, 12–14px secondary text, repeated stock photography and register-like tables in the demo. The current direction is deliberately cooler and more product-led.

> Show the actual decision surface first. Everything else should make that surface easier to read.

- **Palette:** cool white canvas (`#f5f6f8`), white surfaces (`#ffffff`), near-black ink (`#111318`) and one confident violet accent (`#5b3df5`, deep `#4326c4`). Status colours are quiet and semantic. No gradients or decorative washes.
- **Typography:** General Sans for headings and the wordmark, Inter for body/UI/data, both self-hosted in `public/fonts`. Secondary text is 15px; body copy is 16px; headings use a clear 18–55px scale. No all-caps micro-labels.
- **Layout:** generous alignment grids, fewer hairline dividers, larger section rhythm and real product surfaces in the hero. Cards are used only where the content is genuinely a discrete record; radii stay 8–16px and shadows are minimal.
- **Photography:** one self-hosted Unsplash classroom image supplies human context in the hero. The tailoring CTA uses a configuration list instead of a second stock photo. Remaining self-hosted assets are unused.
- **Reference discipline:** ojuwa.com and synacad.com were studied for editorial pacing and role-specific storytelling, not copied. The 15 user-attached images are reference only and were not embedded.

## Public page

- The hero leads with a product review packet and an evidence trail; photography is supporting context, not the claim.
- The workflow explains source, draft, review and outcome as a readable sequence without numbered-document styling.
- The role switcher changes narrative, product preview and CTA, and links directly to the matching demo workspace.
- Trust principles are boundaries, not marketing claims: generated work stays editable, answers stay tied to sources, access follows relationships, exam rules are explicit.
- The final CTA repeats the required path: reach out to customer support for a tailored version of the web app.

## Demo architecture

- One shell serves four isolated role workspaces. Role and view live in the query string (`/demo?role=<role>&view=<view>`) so the global `#main` skip link no longer conflicts with route state.
- `useSyncExternalStore` reads the query string; `popstate` and a custom event keep back/forward and in-app navigation in sync. Changing role unmounts the previous workspace.
- The sidebar and header both expose working role switchers. The mobile drawer uses the same state and navigation.
- Workspaces read as products, not registers: teacher classes and leader classes are card-based records with progress and next actions; assessment and evidence lists pair a selectable item with a detail panel.

## Role-specific choices

- **Teacher** opens on review decisions. Assessments support search, status filters, empty state and a local "Mark as reviewed" action. The tutor is scripted and grounded.
- **Student** opens on the next task with source and teacher note beside the work. Practice validates an answer only after a hint is available; the tutor is student-facing and grounded.
- **Leader** opens on signals to review, with grade scoping across classes and reports. Each signal carries evidence, owner and next check.
- **Parent** opens on a linked-child summary with an explicit access-boundary note. Feedback is guidance, not a grade, and "Mark as seen" is explicitly local only.

## Accessibility refinements

- No visible text renders below 15px. Text inputs render at 16px on mobile to prevent iOS zoom.
- The violet accent is used on white or violet-tinted surfaces with sufficient contrast; warning and status tokens use dark foregrounds on soft tints.
- The public header uses `aria-controls` and Escape for its mobile menu. The demo drawer, role switchers, filter groups and native `<dialog>` all expose their state to assistive technology.
- View changes are announced through a live region; skip links, visible focus rings and reduced-motion handling are present on both routes.
- `data-scroll-behavior="smooth"` is set on `<html>` so Next.js route transitions do not warn about global smooth scrolling.

## Demo honesty

The landing page and demo are presentation surfaces. Every product preview is labelled as sample data, the demo banner states that no live school records are connected, and the tutor is marked "Demo mode". No live school records, authentication, AI provider or tenant isolation are connected.
