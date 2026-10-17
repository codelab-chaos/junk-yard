/** A 2D point as [x, y]. Shapes are lists of points in local space. */
export type Point = readonly [number, number];

export interface Contact {
  /** Unit normal pointing out of the shape being pushed against. */
  nx: number;
  ny: number;
  /** How far the two shapes overlap. */
  depth: number;
}

export function regularPolygon(sides: number, radius: number, phase = 0): Point[] {
  return Array.from({ length: sides }, (_, i) => {
    const a = phase + (i / sides) * Math.PI * 2;
    return [Math.cos(a) * radius, Math.sin(a) * radius] as const;
  });
}

/** Rotates local points by `angle` and moves them to (x, y). */
export function transform(points: readonly Point[], x: number, y: number, angle: number): Point[] {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return points.map(([px, py]) => [x + px * cos - py * sin, y + px * sin + py * cos] as const);
}

export function boundingRadius(points: readonly Point[]): number {
  return Math.max(...points.map(([x, y]) => Math.hypot(x, y)));
}

/** True when (px, py) is inside a convex polygon of either winding. */
export function pointInConvex(px: number, py: number, poly: readonly Point[]): boolean {
  let sign = 0;
  for (let i = 0; i < poly.length; i++) {
    const [ax, ay] = poly[i];
    const [bx, by] = poly[(i + 1) % poly.length];
    const cross = (bx - ax) * (py - ay) - (by - ay) * (px - ax);
    if (cross === 0) continue;
    const s = Math.sign(cross);
    if (sign === 0) sign = s;
    else if (s !== sign) return false;
  }
  return true;
}

/** Convex hull (monotone chain), counter-clockwise in screen space. */
export function convexHull(points: readonly Point[]): Point[] {
  const sorted = [...points].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  if (sorted.length < 3) return sorted;
  const cross = (o: Point, a: Point, b: Point) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const half = (list: Point[]) => {
    const out: Point[] = [];
    for (const p of list) {
      while (out.length >= 2 && cross(out[out.length - 2], out[out.length - 1], p) <= 0) out.pop();
      out.push(p);
    }
    out.pop();
    return out;
  };
  return [...half(sorted), ...half([...sorted].reverse())];
}

function centroid(poly: readonly Point[]): Point {
  let x = 0;
  let y = 0;
  for (const [px, py] of poly) {
    x += px;
    y += py;
  }
  return [x / poly.length, y / poly.length];
}

/** Smallest overlap of the two polygons projected on the normals of `edges`, with its axis. */
function leastOverlap(edges: readonly Point[], a: readonly Point[], b: readonly Point[]): Contact | null {
  let best: Contact | null = null;
  for (let i = 0; i < edges.length; i++) {
    const [x0, y0] = edges[i];
    const [x1, y1] = edges[(i + 1) % edges.length];
    const len = Math.hypot(x1 - x0, y1 - y0);
    if (len < 1e-9) continue;
    const nx = -(y1 - y0) / len;
    const ny = (x1 - x0) / len;
    let minA = Infinity;
    let maxA = -Infinity;
    let minB = Infinity;
    let maxB = -Infinity;
    for (const [px, py] of a) {
      const d = px * nx + py * ny;
      minA = Math.min(minA, d);
      maxA = Math.max(maxA, d);
    }
    for (const [px, py] of b) {
      const d = px * nx + py * ny;
      minB = Math.min(minB, d);
      maxB = Math.max(maxB, d);
    }
    const depth = Math.min(maxA - minB, maxB - minA);
    if (depth <= 0) return null;
    if (!best || depth < best.depth) best = { nx, ny, depth };
  }
  return best;
}

/**
 * Separating-axis contact between two convex polygons, or null when apart.
 * The normal points from `b` toward `a`, so moving `a` by normal * depth separates them.
 */
export function convexVsConvex(a: readonly Point[], b: readonly Point[]): Contact | null {
  const fromA = leastOverlap(a, a, b);
  if (!fromA) return null;
  const fromB = leastOverlap(b, a, b);
  if (!fromB) return null;
  const c = fromA.depth < fromB.depth ? fromA : fromB;
  const [ax, ay] = centroid(a);
  const [bx, by] = centroid(b);
  if ((ax - bx) * c.nx + (ay - by) * c.ny < 0) {
    c.nx = -c.nx;
    c.ny = -c.ny;
  }
  return c;
}
