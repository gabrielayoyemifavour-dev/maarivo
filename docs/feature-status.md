# Feature status

Status legend: **Complete** · **Partial** · **Placeholder** · **Not started**

## Delivered in this iteration

| Item | Status | Notes |
| --- | --- | --- |
| Landing page (`/`) | Complete | Rebuilt around the evidence-first product story: product-first hero, source-to-outcome workflow, role switcher, trust principles and a support CTA. |
| Role previews | Complete | Working teacher, student, school leader and parent previews with sample data. The page states that the interactive demo currently shows only the teacher workspace. |
| Teacher workspace (`/demo`) | Complete | Redesigned as a review desk: evidence trail, selectable assessment queue, local review state, class register, grounded tutor chat and evidence notes. All five views and existing interactions retained. |
| Support CTA | Complete | All CTAs open a composed email to `support@maarivo.com`. Address is a placeholder pending confirmation. |
| Design tokens & typography | Complete | PRD palette, General Sans + Inter self-hosted in `public/fonts`, 12px metadata floor, 16px mobile inputs, 8-point spacing via Tailwind utilities. |
| Accessibility shell | Complete | Skip link, native modal dialog, visible focus styles, ARIA-pressed controls, live region for view changes and Escape handling for the mobile drawer. |

## Explicitly not production functionality

- Demo figures, class names, assessments and chat responses are sample content. The interface states this in every product preview.
- `support@maarivo.com` is a placeholder inbox.
- No authentication, database, AI provider or tenant isolation is wired yet.
- The demo AI Tutor returns scripted responses, clearly labeled "Demo mode". It is not connected to an LLM.
- "Mark as reviewed" changes local preview state only. It does not write to a record or trigger a workflow.
- Role previews on the homepage are static sample product views, not role-based access or real dashboards.

## Verification performed

- `npm run lint` — passes with no warnings.
- `npm run build` — passes, TypeScript clean, all routes statically generated.
- Lighthouse: accessibility, best practices and SEO all score 1.00 on `/` and `/demo` after the redesign.
- No console errors on either route; no failed image requests.
- No horizontal overflow at 390px, 768px, 1024px or 1440px (measured in browser iframes at those widths).
- Desktop sidebar is visible from 1024px; mobile drawer appears below 1024px.
- Mobile drawer opens, overlays the page and closes with both Escape and its close button.
- Support dialog uses the native `<dialog>` element, opens modally and closes with Escape.
- Assessment status filters, class search, empty-state clear actions and the local review state all verified.
- Tutor mode selection, scripted reply, loading state and source attribution verified.
- Insight actions navigate to the relevant workspace view.
- Skip link target verified on both `/` and `/demo`.
- All primary CTAs open a pre-composed support email.

Visual screenshots could not be inspected by the implementing model because the browser window was not visible to the capture tool. Layout was verified through DOM measurements, accessibility snapshots and automated audits instead.

## Image sourcing note

Photography is self-hosted from Unsplash in `public/images`. Freepik was investigated but its pages block automated retrieval and its free licence requires attribution, so no Freepik asset was embedded. Images from ojuwa.com and synacad.com were not copied; only their layout principles were studied.

## Next up

- Student workspace prototype, followed by school leader and parent previews.
- Full QA pass across all role prototypes.
- Backend scope confirmation, then Supabase scaffolding, SQL migrations and RLS policies.
- Authentication and onboarding flows.
- Organisation, class and subject management.
