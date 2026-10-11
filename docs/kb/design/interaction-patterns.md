# Interaction Patterns

Patterns that made junkyard tools friendlier. Add the app that proved each one out.

| Pattern | What it solves | Used in |
| --- | --- | --- |
| Hover or focus to preview, click to commit | Browsing a library without losing your work | Shadowbox preset library |
| Direct manipulation over numeric input | Dragging a light to set direction is faster than editing X and Y per layer | Shadowbox stage |
| Scrubbable labels | Drag a field label left or right to change its value, like design tools; Shift for 10x | Shadowbox controls |
| Undo and redo with idle-debounced snapshots | A whole drag becomes one undo step | Shadowbox |
| Paste anywhere to import | No need to find an import box | Shadowbox (paste any box-shadow) |
| URL hash as state | Every state is bookmarkable and shareable with no backend | Shadowbox |
| Toasts for confirmation, not errors that need action | Quiet feedback that does not shift layout | Shadowbox |
| Sticky preview on mobile | Edits below stay visible in the preview | Shadowbox |
| One expanded row at a time | Long control lists stay scannable | Shadowbox layers |

## Keyboard

List shortcuts near the actions they trigger (in `title` or a small hint), and never bind single keys while focus is in a text field.
