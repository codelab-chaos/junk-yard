import { DEFLECTOR_KINDS, PHYSICS, SPAWN } from './config';
import { boundingRadius, convexHull, convexVsConvex, regularPolygon, transform, type Point } from './geometry';
import type { Deflector, DeflectorSpec, Emitter, Junk } from './types';

const rand = (min: number, max: number) => min + Math.random() * (max - min);
const randInt = (min: number, max: number) => Math.floor(rand(min, max + 1));

/** An irregular convex polygon: a regular one with each vertex pulled in a little, then hulled. */
function junkShape(r: number): Point[] {
  const sides = randInt(SPAWN.sides[0], SPAWN.sides[1]);
  const jittered = regularPolygon(sides, 1, Math.random() * Math.PI).map(([x, y]) => {
    const k = r * (1 - Math.random() * SPAWN.jitter);
    return [x * k, y * k] as const;
  });
  return convexHull(jittered);
}

/**
 * Simple gravity simulation: junk pieces and deflectors are convex polygons,
 * collided with the separating axis test after a cheap radius check. No DOM here.
 */
export class World {
  width = 0;
  height = 0;
  junk: Junk[] = [];
  deflectors: Deflector[] = [];
  emitter: Emitter | null = null;
  colors = 1;

  private nextId = 1;
  private spawnClock = 0;

  resize(width: number, height: number): void {
    this.width = width;
    this.height = height;
    this.deflectors.forEach((d) => this.rebuild(d));
  }

  setLayout(specs: DeflectorSpec[]): void {
    this.deflectors = [];
    specs.forEach((s) => this.addDeflector(s));
  }

  layout(): DeflectorSpec[] {
    return this.deflectors.map(({ kind, x, y, angle }) => ({ kind, x, y, angle }));
  }

  addDeflector(spec: DeflectorSpec): Deflector {
    const d: Deflector = { ...spec, id: this.nextId++, poly: [], reach: 0 };
    this.rebuild(d);
    this.deflectors.push(d);
    return d;
  }

  updateDeflector(d: Deflector, patch: Partial<DeflectorSpec>): void {
    Object.assign(d, patch);
    d.x = Math.min(1, Math.max(0, d.x));
    d.y = Math.min(1, Math.max(0, d.y));
    this.rebuild(d);
  }

  removeDeflector(d: Deflector): void {
    this.deflectors = this.deflectors.filter((x) => x !== d);
  }

  /** Junk pieces at least partly inside the viewport. */
  visibleCount(): number {
    return this.junk.filter(
      (j) => j.x + j.r > 0 && j.x - j.r < this.width && j.y + j.r > 0 && j.y - j.r < this.height,
    ).length;
  }

  step(frame: number): void {
    const dt = Math.min(frame, PHYSICS.maxFrame);
    this.spawn(dt);
    const sub = dt / PHYSICS.substeps;
    for (let i = 0; i < PHYSICS.substeps; i++) {
      this.integrate(sub);
      this.collideDeflectors();
      this.collideJunk();
    }
    this.age(dt);
  }

  private rebuild(d: Deflector): void {
    const points = DEFLECTOR_KINDS[d.kind].points;
    d.poly = transform(points, d.x * this.width, d.y * this.height, d.angle);
    d.reach = boundingRadius(points);
  }

  private spawn(dt: number): void {
    if (!this.emitter) return;
    this.spawnClock += dt * SPAWN.perSecond;
    while (this.spawnClock >= 1) {
      this.spawnClock -= 1;
      const { x, y, width } = this.emitter;
      const shape = junkShape(rand(SPAWN.radius[0], SPAWN.radius[1]));
      const r = boundingRadius(shape);
      this.junk.push({
        x: x + rand(-width, width) * 0.3,
        y: y - r,
        vx: rand(-SPAWN.sideways, SPAWN.sideways),
        vy: rand(SPAWN.speed[0], SPAWN.speed[1]),
        angle: Math.random() * Math.PI * 2,
        spin: rand(-SPAWN.spin, SPAWN.spin),
        r,
        shape,
        hull: [],
        color: randInt(0, this.colors - 1),
        rest: 0,
        fade: 1,
        fading: false,
      });
    }
  }

  private integrate(dt: number): void {
    const keep = 1 - PHYSICS.drag * dt;
    const keepSpin = 1 - PHYSICS.spinDrag * dt;
    for (const j of this.junk) {
      j.vy += PHYSICS.gravity * dt;
      j.vx *= keep;
      j.vy *= keep;
      const speed = Math.hypot(j.vx, j.vy);
      if (speed > PHYSICS.maxSpeed) {
        j.vx *= PHYSICS.maxSpeed / speed;
        j.vy *= PHYSICS.maxSpeed / speed;
      }
      j.x += j.vx * dt;
      j.y += j.vy * dt;
      j.spin *= keepSpin;
      j.angle += j.spin * dt;
    }
  }

  /** World-space outlines for this substep, shared by both collision passes. */
  private updateHulls(): void {
    for (const j of this.junk) j.hull = transform(j.shape, j.x, j.y, j.angle);
  }

  private collideDeflectors(): void {
    this.updateHulls();
    for (const j of this.junk) {
      for (const d of this.deflectors) {
        const cx = d.x * this.width;
        const cy = d.y * this.height;
        if (Math.abs(j.x - cx) > d.reach + j.r || Math.abs(j.y - cy) > d.reach + j.r) continue;
        const c = convexVsConvex(j.hull, d.poly);
        if (!c) continue;
        this.shift(j, c.nx * c.depth, c.ny * c.depth);
        const vn = j.vx * c.nx + j.vy * c.ny;
        if (vn < 0) {
          j.vx -= (1 + PHYSICS.restitution) * vn * c.nx;
          j.vy -= (1 + PHYSICS.restitution) * vn * c.ny;
        }
        // Slide along the surface with a little friction and roll to match.
        const tx = -c.ny;
        const ty = c.nx;
        const vt = j.vx * tx + j.vy * ty;
        j.vx -= tx * vt * PHYSICS.friction;
        j.vy -= ty * vt * PHYSICS.friction;
        j.spin += (vt / j.r - j.spin) * PHYSICS.rollGrip;
      }
    }
  }

  /** Moves a piece and its cached outline together, so later contacts this substep see it. */
  private shift(j: Junk, dx: number, dy: number): void {
    j.x += dx;
    j.y += dy;
    j.hull = j.hull.map(([x, y]) => [x + dx, y + dy] as const);
  }

  /** Pairwise is fine at this scale (under a hundred pieces). */
  private collideJunk(): void {
    const list = this.junk;
    for (let i = 0; i < list.length; i++) {
      const a = list[i];
      for (let k = i + 1; k < list.length; k++) {
        const b = list[k];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const rr = a.r + b.r;
        const d2 = dx * dx + dy * dy;
        if (d2 >= rr * rr) continue;
        const c = convexVsConvex(b.hull, a.hull);
        if (!c) continue;
        const { nx, ny, depth } = c;
        const ma = a.r * a.r;
        const mb = b.r * b.r;
        this.shift(a, -nx * depth * (mb / (ma + mb)), -ny * depth * (mb / (ma + mb)));
        this.shift(b, nx * depth * (ma / (ma + mb)), ny * depth * (ma / (ma + mb)));
        const vn = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
        if (vn >= 0) continue;
        const impulse = (-(1 + PHYSICS.junkRestitution) * vn) / (1 / ma + 1 / mb);
        a.vx -= (impulse / ma) * nx;
        a.vy -= (impulse / ma) * ny;
        b.vx += (impulse / mb) * nx;
        b.vy += (impulse / mb) * ny;
      }
    }
  }

  /** Fades out junk that has settled, and the oldest pieces once over the cap. */
  private age(dt: number): void {
    let alive = 0;
    for (const j of this.junk) {
      if (Math.hypot(j.vx, j.vy) < SPAWN.restSpeed) j.rest += dt;
      else j.rest = Math.max(0, j.rest - dt);
      if (j.rest > SPAWN.restLimit) j.fading = true;
      if (j.fading) j.fade -= dt / SPAWN.fadeTime;
      else alive++;
    }
    for (const j of this.junk) {
      if (alive <= SPAWN.maxJunk) break;
      if (!j.fading) {
        j.fading = true;
        alive--;
      }
    }
    const m = SPAWN.margin;
    this.junk = this.junk.filter(
      (j) => j.fade > 0 && j.y < this.height + m && j.x > -m && j.x < this.width + m,
    );
  }
}
