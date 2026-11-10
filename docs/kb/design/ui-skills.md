# UI skills review

Every junkyard entry is reviewed against the shared frontend skills in `~/git/skills/frontend-agent-skills/` before it ships. Each skill has a `SKILL.md` (principles) and `references/checklists.md` (testable checks). This note maps them to junkyard work and pulls out the checks that keep mattering. Mapped 2026-10-29.

## Which skills apply

| Skill | Use it when | Junkyard default |
| --- | --- | --- |
| `ux-usability-foundations` | Any app. Purpose at a glance, primary action, recognition over recall, feedback, recovery | Always |
| `information-architecture-navigation` | Catalogs, references, guides: anything people search, filter or browse | Always for reference apps |
| `ux-writing-content-design` | Labels, headings, empty states, help text, jargon | Always |
| `ui-visual-composition` | Hierarchy, spacing, type scale, color roles, dark mode | Always (pairs with [art-direction.md](art-direction.md)) |
| `interaction-patterns-components` | Picking the pattern: table vs cards, tabs vs filters, disclosure, sort | Always for tools and data displays |
| `accessibility-inclusive-design` | Semantics, keyboard, focus, screen readers, zoom, motion | Always |
| `forms-inputs-checkout` | Apps with real data entry (Shadowbox controls, search fields) | When there are inputs beyond one search box |
| `design-systems-frontend-architecture` | Shared code in `src/lib`, tokens in `src/styles/base.css` | When touching shared code or tokens |
| `ux-research-discovery-testing` | Deciding what to build, or validating with real users | Rarely; one-offs are not user-tested |

## The review, in order

1. **State the user and the task in one sentence** (usability, IA). If you cannot, the page has no clear purpose yet.
2. **Purpose at a glance, one primary action** (usability, visual). The first screen shows what the page is for and where to start. Secondary actions are quieter.
3. **Structure follows intent** (IA). Organise by the reader's job, not the data's shape. Tabs are for peer views; filters show active state and clear easily; state lives in the URL.
4. **User language** (writing, IA). No internal or community jargon in labels ("keeper", "relaxed", "n/p", "tk"). Expand abbreviations. Sibling labels are parallel and distinct.
5. **No hover-only meaning** (usability, a11y). A `title` tooltip is a bonus, never the only explanation. Badges and marks get a visible legend.
6. **Pattern fits the data** (interaction). Tables for comparing attributes, cards for rich self-contained items, disclosure for detail. Sorting shows its current state.
7. **States** (all). Empty, no results, loading, missing data and long text are designed, not left to chance.
8. **Semantics** (a11y). One `h1`, logical headings, `main` plus a skip link, row headers in data tables (`th scope="row"`), buttons for actions and links for navigation.
9. **Focus survives re-renders** (a11y, interaction). If the UI rebuilds DOM on click, put focus back on the same control or on the thing just opened. Losing focus to `body` strands keyboard users.
10. **Announce what changed** (a11y). Results that change in place (picks, counts) sit in a polite live region.
11. **Color is never the only cue** (visual, a11y). Selected, current and recommended states also carry text, weight or shape.
12. **Touch and zoom** (a11y, visual). Targets about 36 to 44px on coarse pointers, no horizontal scroll at 390px, readable at 200% zoom.
13. **Motion explains state** (visual, a11y) and respects `prefers-reduced-motion`.

Record what the review found and fixed under "Skills review" in the app's `docs/kb/apps/{slug}.md`, so recurring issues show up here over time.

## Recurring findings

| Finding | Seen in | Fix |
| --- | --- | --- |
| Full re-render on click dropped keyboard focus | AI Model Usage Guide | Tag controls with `data-key`, restore focus after render |
| Jargon from the source domain leaked into labels | AI Model Usage Guide ("keeper", "relaxed", "n/p", "tk") | Plain words; explain the remaining terms in a visible legend |
| Badges explained only by `title` | AI Model Usage Guide | Visible legend under the table |
| `base.css` element selectors (`input[type=search]`) outrank an app's single class | AI Music Session Guide | Qualify app selectors (`input.q`) or check inputs in the first screenshot |
| Strict all-words search returned nothing for natural phrases | AI Music Session Guide | Require most words for longer queries, rank full matches first, add aliases from suggested queries |
| Long, evenly ruled lists with one accent read as one grey block | AI Music Session Guide | Identity colour per section on an edge stripe, alternate banding, kind shown by badge shape; a docked index for wayfinding |
| A filtering control rebuilt on each keystroke would lose focus | AI Music Session Guide | Build the search box once; re-render only what is around it |
