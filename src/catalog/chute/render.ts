import { EDITOR, THEME_TOKENS } from './config';
import type { Point } from './geometry';
import { handlePosition, removePosition } from './handle';
import type { Deflector } from './types';
import type { World } from './world';

interface Theme {
  junk: string[];
  junkEdge: string;
  deflector: string;
  deflectorEdge: string;
  accent: string;
  panel: string;
  text: string;
}

export interface EditorView {
  selected: Deflector | null;
  hovered: Deflector | null;
}

function readTheme(): Theme {
  const style = getComputedStyle(document.documentElement);
  const token = (name: string) => style.getPropertyValue(name).trim();
  return {
    junk: THEME_TOKENS.junk.map(token),
    junkEdge: token(THEME_TOKENS.junkEdge),
    deflector: token(THEME_TOKENS.deflector),
    deflectorEdge: token(THEME_TOKENS.deflectorEdge),
    accent: token(THEME_TOKENS.accent),
    panel: token(THEME_TOKENS.panel),
    text: token(THEME_TOKENS.text),
  };
}

function tracePolygon(ctx: CanvasRenderingContext2D, points: readonly Point[]): void {
  ctx.beginPath();
  points.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
  ctx.closePath();
}

/** Draws a World onto a canvas. Colors come from CSS tokens, re-read on theme change. */
export class Renderer {
  private ctx: CanvasRenderingContext2D;
  private theme = readTheme();

  constructor(private canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('2D canvas is not available');
    this.ctx = ctx;
  }

  get colorCount(): number {
    return this.theme.junk.length;
  }

  refreshTheme(): void {
    this.theme = readTheme();
  }

  resize(width: number, height: number, dpr: number): void {
    this.canvas.width = Math.round(width * dpr);
    this.canvas.height = Math.round(height * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  draw(world: World, view: EditorView | null): void {
    const { ctx, theme } = this;
    ctx.clearRect(0, 0, world.width, world.height);

    for (const d of world.deflectors) {
      tracePolygon(ctx, d.poly);
      ctx.fillStyle = theme.deflector;
      ctx.fill();
      const active = view && (d === view.selected || d === view.hovered);
      ctx.lineWidth = d === view?.selected ? 2 : 1;
      ctx.strokeStyle = active ? theme.accent : theme.deflectorEdge;
      ctx.stroke();
    }

    ctx.lineWidth = 1;
    ctx.strokeStyle = theme.junkEdge;
    for (const j of world.junk) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, j.fade);
      ctx.translate(j.x, j.y);
      ctx.rotate(j.angle);
      tracePolygon(ctx, j.shape);
      ctx.fillStyle = theme.junk[j.color % theme.junk.length];
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }

    if (view?.selected) {
      this.drawHandle(world, view.selected);
      this.drawRemove(world, view.selected);
    }
  }

  private drawHandle(world: World, d: Deflector): void {
    const { ctx, theme } = this;
    const cx = d.x * world.width;
    const cy = d.y * world.height;
    const knob = handlePosition(d, world.width, world.height);
    ctx.strokeStyle = theme.accent;
    ctx.fillStyle = theme.accent;
    ctx.lineWidth = 1.5;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(knob.x, knob.y);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.arc(knob.x, knob.y, EDITOR.handleRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx, cy, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  private drawRemove(world: World, d: Deflector): void {
    const { ctx, theme } = this;
    const { x, y } = removePosition(d, world.width, world.height);
    const r = EDITOR.removeRadius;
    const arm = r * 0.4;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = theme.panel;
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = theme.deflectorEdge;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x - arm, y - arm);
    ctx.lineTo(x + arm, y + arm);
    ctx.moveTo(x + arm, y - arm);
    ctx.lineTo(x - arm, y + arm);
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = theme.text;
    ctx.stroke();
  }
}
