# Feature status

Status legend: **Complete** · **Partial** · **Placeholder** · **Not started**

## Delivered in this iteration

| Item | Status | Notes |
| --- | --- | --- |
| Landing page (`/`) | Complete | Product-led white/violet reset: real product surfaces in the hero, one contextual photo, four-role preview switcher and support CTA. |
| Role previews | Complete | Working teacher, student, school leader and parent previews on the public page, each linking to its demo workspace via `/demo?role=<role>`. |
| Demo shell | Complete | Shared four-role shell with sidebar and header role switchers, query-based deep links, live view announcements, mobile drawer, demo banner and native support dialog. |
| Teacher workspace | Complete | Review desk with evidence trail, assessment search/filters/empty state, local review state, card-based classes, grounded scripted tutor chat and evidence notes. |
| Student workspace | Complete | Subjects, guided practice with validation and hints, subject filtering and student-facing grounded tutor. |
| School leader workspace | Complete | School overview, card-based classes with grade scoping and evidence reports with source/owner/next check. |
| Parent workspace | Complete | Linked-child overview, teacher feedback with subject filtering and local "Mark as seen", and upcoming assessments. |
| Support CTA | Complete | All CTAs open a composed email to `support@maarivo.com`. Address is a placeholder pending confirmation. |
| Design tokens & typography | Complete | Cool white canvas, near-black ink, restrained violet accent. General Sans + Inter self-hosted in `public/fonts`; 15px secondary text and 16px mobile text inputs. |
| Accessibility shell | Complete | Skip link, native modal dialog, visible focus styles, ARIA-pressed controls, live region for view changes, Escape handling and reduced-motion support. |

## Explicitly not production functionality

- Demo figures, class names, assessments and chat responses are sample content. Every product preview states this.
- `support@maarivo.com` is a placeholder inbox.
- No authentication, database, AI provider or tenant isolation is wired yet.
- The demo AI Tutor returns scripted responses, clearly labeled "Demo mode". It is not connected to an LLM.
- "Mark as reviewed" and "Mark as seen" change local preview state only. Nothing is written to a record or sent to a school.
- Role switching changes the prototype workspace; it is not role-based authentication or access control.
- Deep links such as `/demo?role=student&view=practice` are prototype navigation, not saved user state.

## Verification performed

- `npm run lint` — passes.
- `npm run build` — passes, TypeScript clean, all routes statically generated.
- Lighthouse: accessibility, best practices and SEO all score **1.00** on `/`, `/demo` and a deep-linked demo view (run sequentially).
- No console errors and no failed or 4xx/5xx asset requests on `/` or the demo routes.
- Zero horizontal overflow at 390px, 768px, 1024px and 1440px on `/` and the demo overview.
- No visible text below 15px on `/` or the demo overview; zero tables remain in demo views.
- Deep links verified for all four roles and for teacher/student/leader/parent subviews.
- Public role switcher verified: all four previews change copy, sample view and CTA link.
- Public mobile menu and demo mobile drawer verified at 390px: open, navigate and close.
- Support dialog opens modally from the demo sidebar and closes from its close control.
- Teacher: status filters, search empty state and clear action, local mark-as-reviewed, scripted tutor reply with source grounding.
- Student: practice validation, hint and filter.
- Leader: grade filter class scoping and selectable evidence reports.
- Parent: feedback subject filter, "Mark as seen" status and upcoming assessments.

Visual screenshots were generated but could not be inspected by the implementing model. Layout was verified through DOM measurements, accessibility snapshots and automated audits instead; final visual approval from the user is still outstanding.

## Image sourcing note

Photography is self-hosted from Unsplash in `public/images`. Only one image is embedded in the current page; the other local assets are unused. Freepik was investigated but its pages block automated retrieval and its free licence requires attribution, so no Freepik asset was embedded. Images from ojuwa.com and synacad.com were not copied; only their editorial rhythm and role-based storytelling principles were studied. The 15 attached images were treated as reference only and were not embedded.

## Next up

- Backend scope confirmation, then Supabase scaffolding, SQL migrations and RLS policies.
- Authentication and onboarding flows.
- Organisation, class and subject management with real permissions.
- Confirm a production support inbox.
- User visual approval of the new direction.
