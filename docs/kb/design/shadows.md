# Shadows and Light

Research behind the Shadowbox Toolkit. Checked 2026-10-10.

- **Layer for realism.** A single shadow cannot model a real one. Stack several with increasing offset and blur (often doubling each step) for soft, natural depth. ([Tobias Ahlin](https://tobiasahlin.com/blog/layered-smooth-box-shadows/))
- **Lower alpha as layers grow**, or the total gets too dark.
- **One light source per page.** Every layer's offset should point the same way; mixed directions read as wrong even when people cannot say why. ([Josh W. Comeau, Designing beautiful shadows](https://www.joshwcomeau.com/css/designing-shadows))
- **Elevation scales offset and blur together.** Higher elements cast longer, softer shadows.
- **Tint shadows with the background hue** instead of pure black, which looks gray and muddy on colored surfaces. Keep the hue, drop lightness, raise saturation a little.
- **Watch the cost** of large blurs on many elements, especially animated ones.

## How Shadowbox applies this

- The stage light is draggable. Moving it rotates every layer's offset around the box and scales offset length with distance, which keeps all layers consistent with one light.
- "Tint to scene" recolors every layer from the stage background hue.
- The layered smooth collection ships ready-made stacks.
