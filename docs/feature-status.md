# Feature status

Status legend: **Complete** · **Partial** · **Placeholder** · **Not started**

## Delivered in this iteration

| Item | Status | Notes |
| --- | --- | --- |
| Landing page (`/`) | Complete | Hero, product preview, audience, capabilities, workflow, support CTA, footer. |
| Support CTA | Complete | All CTAs open a composed email to `support@maarivo.com`. Address is a placeholder pending confirmation. |
| Demo dashboard (`/demo`) | Complete | Teacher workspace with sample data, five navigable views, working search, filters, chat interaction and request modal. |
| Design tokens & typography | Complete | PRD palette, General Sans + Inter self-hosted in `public/fonts`, 8-point spacing via Tailwind utilities. |

## Explicitly not production functionality

- Demo figures, class names, assessments and chat responses are sample content. The demo banner states this in the interface.
- `support@maarivo.com` is a placeholder inbox.
- No authentication, database, AI provider or tenant isolation is wired yet.
- The demo AI Tutor returns scripted responses, clearly labeled "Demo mode". It is not connected to an LLM.

## Verification performed

- `npm run build` — passes, TypeScript clean, both routes statically generated.
- `npm run lint` — passes with no warnings.
- Lighthouse: accessibility, best practices and SEO all score 1.00 on `/` and `/demo`.
- No console errors on either route.
- No horizontal overflow at 390px, 768px or 1440px (measured in browser iframes at those widths).
- Desktop navigation appears at 1440px; mobile menu appears below that.
- Demo interactions verified: view navigation, class search, assessment status filter, tutor message send with scripted reply, support modal open/close and Escape handling.
- All primary CTAs open a pre-composed support email.

Visual screenshots were generated for review but could not be inspected by the implementing model; layout was verified through DOM measurements and automated audits instead.

## Next up (PRD Phase 1)

- Supabase scaffolding, SQL migrations and RLS policies.
- Authentication and onboarding flows.
- Organisation, class and subject management.
