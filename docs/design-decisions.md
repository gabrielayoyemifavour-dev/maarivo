# Design decisions

## Visual concept

The PRD pins the palette and type, so the identity comes from how those tokens are used rather than from new colours.

- **Canvas and chrome:** `#F4F2FA` canvas with white content surfaces and a persistent `#171B35` sidebar in the demo. This gives the product a calm, institutional feel without the generic white-sidebar/grey-canvas look.
- **Accent discipline:** `#9886E9` is used for active states, progress, small marks and primary support CTAs against navy. It is never used as a large gradient wash.
- **Typography:** General Sans for headings and wordmark, Inter for body/UI/data. Self-hosted in `public/fonts`, so rendering does not depend on a third-party CDN at runtime.
- **Scale and restraint:** 6–12px radii, hairline `#E3E0ED` borders, one very subtle shadow for raised product panels. No decorative illustrations, floating shapes or glows.
- **One memorable moment:** the hero's AI Tutor product window with a restrained learning-path line motif behind it; it demonstrates grounding and step-by-step reasoning rather than decorating the page.

## Accessibility refinements

Two derived tokens were darkened from the PRD's initial values to meet 4.5:1 contrast for small text:

| Token | PRD initial | Used value | Reason |
| --- | --- | --- | --- |
| Success | `#278568` | `#1F7359` | 4.04:1 on success-soft background; now 5.13:1 |
| Accent deep | derived from `#9886E9` | `#6B54C2` | 3.88:1 on canvas; now 5.15:1 |

The accent itself is unchanged; only the text variant was adjusted.

## Demo honesty

The landing page and demo are presentation surfaces. Every demo screen states that the data is sampled and no live school records are connected. The AI Tutor in the demo is explicitly labeled "Demo mode" and returns scripted responses about fractions, chemical equations and quadratics. It is not an LLM integration.
