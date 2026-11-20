# Design decisions

## Visual concept: evidence-first learning workspace

The PRD pins the palette and type, so the identity comes from how those tokens are used rather than from new colours. Maarivo 2.0 uses one organising idea across the public site and the teacher workspace prototype:

> Every important view should answer: what material is this based on, what was generated, what did a human approve, and what changed as a result?

This is a presentation and interaction principle derived from the PRD. It does not add a new module or claim new functionality.

- **Product is the proof:** the hero shows a real application surface in a sample state, not a stock classroom photo labelled as a workspace.
- **Evidence spine:** a 1px connector with small nodes links source, draft, review and outcome in the hero and workflow. It carries meaning; it is not decorative.
- **Accent discipline:** `#9886E9` is used for active states, progress, small marks and primary support CTAs against navy. It is never used as a large gradient wash.
- **Typography:** General Sans for headings and wordmark, Inter for body/UI/data. Both are self-hosted in `public/fonts`. The General Sans italic face remains available but is not used in the 2.0 homepage.
- **Scale and restraint:** 6–12px radii, hairline `#E3E0ED` borders, one very subtle shadow for raised product panels. No decorative illustrations, floating shapes, glows or gradients.
- **Photography:** retained self-hosted Unsplash images are used sparingly as human context. The closing CTA keeps one classroom photo; the hero and role previews use product surfaces instead.
- **Roles:** the landing page has a working role switcher with sample teacher, student, school leader and parent previews. It also states that the interactive demo currently shows only the teacher workspace.

## Teacher workspace: review desk

The first application prototype avoids the standard metrics-dashboard layout. A teacher's primary job in the PRD is to check AI-generated material before students see it, so the workspace opens on that decision.

- **Overview is a decision surface:** the main panel shows the selected draft, its source, what AI generated, what needs checking and what happens after approval. The evidence spine is the same 1px/nodes system used on the landing page.
- **Assessments are a queue, not a card grid:** a selectable list sits beside a detail panel. The panel carries the full evidence trail and a "Mark as reviewed" action that only changes local preview state.
- **Classes remain a register:** a table is the right shape for scanning assigned classes, topics, student counts and progress. It keeps a compact search and a clear empty-state action.
- **Tutor stays grounded:** the chat keeps response modes, a scripted reply, a source line and an explicit demo badge. Inputs are 16px on mobile to prevent iOS zoom.
- **Insights are evidence notes:** each observation states its evidence and links to the relevant view. No decorative chart was added.
- **Support dialog uses the native `<dialog>` element:** this gives focus trapping and Escape handling from the browser instead of a hand-built modal. The mobile drawer also closes on Escape.

## Accessibility refinements

Two derived tokens were darkened from the PRD's initial values to meet 4.5:1 contrast for small text:

| Token | PRD initial | Used value | Reason |
| --- | --- | --- | --- |
| Success | `#278568` | `#1F7359` | 4.04:1 on success-soft background; now 5.13:1 |
| Accent deep | derived from `#9886E9` | `#6B54C2` | 3.88:1 on canvas; now 5.15:1 |

The accent itself is unchanged; only the text variant was adjusted. The 2.0 pages also add a skip link, ARIA-pressed role buttons, `aria-controls` on the public mobile menu, scroll padding for sticky-header anchors, a 12px metadata floor and 16px mobile inputs.

## Demo honesty

The landing page and demo are presentation surfaces. Every product preview is explicitly labelled as sample data, and the hero note states that the demo tutor is scripted. No live school records, authentication, AI provider or tenant isolation are connected. The public footer no longer exposes internal reference-site process notes.
