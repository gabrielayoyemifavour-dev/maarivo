# Feature status

Status legend: **Complete** · **Partial** · **Placeholder** · **Not started**

## Delivered in this iteration

| Item | Status | Notes |
| --- | --- | --- |
| Landing page (`/`) | Complete | Full visual reset: editorial paper-and-ink system, numbered sections, document-style product previews, self-hosted Unsplash photography and four-role preview switcher. |
| Role previews | Complete | Working teacher, student, school leader and parent previews on the public page, each linking to its demo workspace via `/demo?role=<role>`. |
| Demo shell | Complete | Shared four-role shell with sidebar and header role switchers, query-based deep links, live view announcements, mobile drawer, demo banner and native support dialog. |
| Teacher workspace | Complete | Review desk with evidence trail, assessment queue, local review state, class register, grounded tutor chat and evidence notes. |
| Student workspace | Complete | Subjects, guided practice with validation and hints, subject filtering and student-facing grounded tutor. |
| School leader workspace | Complete | School overview, class register, grade scoping and evidence reports with source/owner/next check. |
| Parent workspace | Complete | Linked-child overview, teacher feedback with subject filtering and local "Mark as seen", and upcoming assessments. |
| Support CTA | Complete | All CTAs open a composed email to `support@maarivo.com`. Address is a placeholder pending confirmation. |
| Design tokens & typography | Complete | Warm paper canvas, deep ink, restrained purple accent and accessible ochre labels. General Sans + Inter self-hosted in `public/fonts`; 16px mobile text inputs. |
| Accessibility shell | Complete | Skip link, native modal dialog, visible focus styles, ARIA-pressed controls, live region for view changes and Escape handling for the mobile drawer. |

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
- Lighthouse: accessibility, best practices and SEO all score **1.00** on `/` and `/demo` (run sequentially).
- No console errors and no failed or 4xx/5xx requests on `/` or any of the four demo roles.
- Zero horizontal overflow at 390px, 768px, 1024px and 1440px on `/` and all four role entry points.
- Deep links verified for all four roles and for teacher/student/leader/parent subviews.
- Public role switcher verified: all four previews change copy, sample view and CTA link.
- Public mobile menu opens and closes with Escape.
- Demo mobile drawer opens, navigates and closes with Escape; skip link keeps the query-based demo route intact.
- Support dialog opens modally from the demo sidebar and closes with Escape.
- Student practice: incorrect/correct answer states, hint, filter, 16px mobile input.
- Teacher: status filters, search empty state and clear action, local mark-as-reviewed, scripted tutor reply with source grounding.
- Leader: grade filter and navigation from a signal to the full evidence report.
- Parent: feedback subject filter, "Mark as seen" status and upcoming assessments.

Visual screenshots could not be inspected by the implementing model because the browser window was not visible to the capture tool. Layout was verified through DOM measurements, accessibility snapshots and automated audits instead.

## Image sourcing note

Photography is self-hosted from Unsplash in `public/images`, including the added `student-device.jpg` and `resource-shelf.jpg`. Freepik was investigated but its pages block automated retrieval and its free licence requires attribution, so no Freepik asset was embedded. Images from ojuwa.com and synacad.com were not copied; only their editorial rhythm and role-based storytelling principles were studied. The 15 attached images were treated as reference only and were not embedded.

## Next up

- Backend scope confirmation, then Supabase scaffolding, SQL migrations and RLS policies.
- Authentication and onboarding flows.
- Organisation, class and subject management with real permissions.
- Confirm a production support inbox.
