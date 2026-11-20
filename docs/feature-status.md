# Feature status

Status legend: **Complete** · **Partial** · **Placeholder** · **Not started**

## Delivered in this iteration

| Item | Status | Notes |
| --- | --- | --- |
| Landing page (`/`) | Complete | Rebuilt around the evidence-first product story: product-first hero, source-to-outcome workflow, role switcher, trust principles and a support CTA. |
| Role previews | Complete | Working teacher, student, school leader and parent previews with sample data. The page states that the interactive demo currently shows only the teacher workspace. |
| Support CTA | Complete | All CTAs open a composed email to `support@maarivo.com`. Address is a placeholder pending confirmation. |
| Demo dashboard (`/demo`) | Complete | Teacher workspace with sample data, five navigable views, working search, filters, chat interaction and request modal. No redesign applied in this iteration. |
| Design tokens & typography | Complete | PRD palette, General Sans + Inter self-hosted in `public/fonts`, 8-point spacing via Tailwind utilities. |
| Accessibility shell | Complete | Skip link, sticky-header scroll padding, mobile menu `aria-controls`, ARIA-pressed role buttons and visible focus styles. |

## Explicitly not production functionality

- Demo figures, class names, assessments and chat responses are sample content. The interface states this in every product preview.
- `support@maarivo.com` is a placeholder inbox.
- No authentication, database, AI provider or tenant isolation is wired yet.
- The demo AI Tutor returns scripted responses, clearly labeled "Demo mode". It is not connected to an LLM.
- Role previews on the homepage are static sample product views, not role-based access or real dashboards.

## Verification performed

- `npm run lint` — passes with no warnings.
- `npm run build` — passes, TypeScript clean, all routes statically generated.
- Lighthouse: accessibility, best practices and SEO all score 1.00 on `/` and `/demo` after the redesign.
- No console errors on either route; no failed image requests.
- No horizontal overflow at 390px, 768px, 1024px or 1440px (measured in browser iframes at those widths).
- Desktop navigation appears at 1024px and above; mobile menu appears below 1024px.
- Mobile menu opens, exposes all five navigation links and closes with Escape.
- Role switcher verified across all four roles: content changes and `aria-pressed` states update correctly.
- Skip link target verified on both `/` and `/demo`.
- All primary CTAs open a pre-composed support email.

Visual screenshots could not be inspected by the implementing model because the browser window was not visible to the capture tool. Layout was verified through DOM measurements, accessibility snapshots and automated audits instead.

## Image sourcing note

Photography is self-hosted from Unsplash in `public/images`. Freepik was investigated but its pages block automated retrieval and its free licence requires attribution, so no Freepik asset was embedded. Images from ojuwa.com and synacad.com were not copied; only their layout principles were studied.

## Next up (PRD Phase 1)

- Supabase scaffolding, SQL migrations and RLS policies.
- Authentication and onboarding flows.
- Organisation, class and subject management.
- Teacher workspace redesign after the public site is signed off.
