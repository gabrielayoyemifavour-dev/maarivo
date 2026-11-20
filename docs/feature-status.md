# Feature status

Status legend: **Complete** · **Partial** · **Placeholder** · **Not started**

## Delivered in this iteration

| Item | Status | Notes |
| --- | --- | --- |
| Landing page (`/`) | Complete | Hero, product preview, audience, capabilities, workflow, support CTA, footer. |
| Support CTA | Complete | All CTAs open a composed email to `support@maarivo.com`. Address is a placeholder pending confirmation. |
| Demo dashboard (`/demo`) | Complete | Teacher workspace with sample data, five navigable views, working search, filters, chat interaction and request modal. |
| Design tokens & typography | Complete | PRD palette, General Sans + Inter self-hosted in `public/fonts`, 8-point spacing via Tailwind utilities. General Sans italic added for editorial headlines. |
| Photography revamp | Complete | Landing page rebuilt around seven self-hosted Unsplash education photos, full-bleed statement band, alternating role stories and photographic CTA. Reference layouts studied from Ojuwa and Synacad; no images copied from those sites. |

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

Post-revamp checks: no console errors, no failed image requests, 1.00 Lighthouse scores retained, no overflow at 390/768/1440, General Sans italic loads, above-the-fold image is eager and the rest lazy.

## Image sourcing note

Photography is self-hosted from Unsplash in `public/images`. Freepik was investigated but its pages block automated retrieval and its free licence requires attribution, so no Freepik asset was embedded. Images from ojuwa.com and synacad.com were not copied; only their layout principles were studied.

## Next up (PRD Phase 1)

- Supabase scaffolding, SQL migrations and RLS policies.
- Authentication and onboarding flows.
- Organisation, class and subject management.
