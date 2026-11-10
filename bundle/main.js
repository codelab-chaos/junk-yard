//#region src/lib/catalog-types.ts
var CATALOG_FILE = "catalog.json";
var SEARCH_INDEX_FILE = "search-index.json";
//#endregion
//#region src/lib/tokenize.ts
var STOPWORDS = new Set("a an and are as at be by for from has have in is it its of on or that the this to was were will with you your".split(" "));
/** Lowercase word tokens, shared by the index builder and the search UI. */
function tokenize(text) {
	return text.toLowerCase().split(/[^a-z0-9]+/).filter((t) => t.length > 1 && !STOPWORDS.has(t));
}
//#endregion
//#region src/lib/search.ts
/** Ranked fields: earlier ones matter more. Exact hits score full weight, prefix hits half. */
var FIELDS = [
	{
		weight: 8,
		terms: (a) => tokenize(a.title)
	},
	{
		weight: 6,
		terms: (a) => a.tags.flatMap(tokenize)
	},
	{
		weight: 3,
		terms: (a) => tokenize(a.description)
	},
	{
		weight: 1,
		terms: (a, i) => i.terms[a.slug] ?? []
	}
];
function scoreToken(token, terms, weight) {
	if (terms.includes(token)) return weight;
	if (terms.some((t) => t.startsWith(token))) return weight / 2;
	return 0;
}
/** Every query token must match somewhere; results are sorted by score. */
function searchApps(apps, index, query) {
	const tokens = tokenize(query);
	if (tokens.length === 0) return apps;
	return apps.map((app) => {
		const fieldTerms = FIELDS.map((f) => ({
			weight: f.weight,
			terms: f.terms(app, index)
		}));
		let total = 0;
		for (const token of tokens) {
			const best = Math.max(...fieldTerms.map((f) => scoreToken(token, f.terms, f.weight)));
			if (best === 0) return {
				app,
				total: 0
			};
			total += best;
		}
		return {
			app,
			total
		};
	}).filter((s) => s.total > 0).sort((a, b) => b.total - a.total).map((s) => s.app);
}
//#endregion
//#region src/lib/tag-filter.ts
function parseTags(value) {
	return (value ?? "").split(",").map((t) => t.trim()).filter(Boolean);
}
function serializeTags(tags) {
	return tags.join(",");
}
/** An app matches when it carries every selected tag. */
function matchesTags(app, selected) {
	return selected.every((tag) => app.tags.includes(tag));
}
function toggleTag(selected, tag) {
	return selected.includes(tag) ? selected.filter((t) => t !== tag) : [...selected, tag];
}
/**
* Every tag in the catalog, counted against the current result so each chip
* shows how many apps remain if it is added. Selected first, then by count.
*/
function tagFacets(all, result, selected) {
	const tags = new Set(all.flatMap((a) => a.tags));
	const counts = /* @__PURE__ */ new Map();
	for (const tag of result.flatMap((a) => a.tags)) counts.set(tag, (counts.get(tag) ?? 0) + 1);
	return [...tags].map((tag) => ({
		tag,
		count: counts.get(tag) ?? 0,
		selected: selected.includes(tag)
	})).sort((a, b) => Number(b.selected) - Number(a.selected) || b.count - a.count || a.tag.localeCompare(b.tag));
}
//#endregion
//#region src/lib/dom.ts
/**
* Minimal element builder. Text children always become text nodes, so
* user-provided strings can never inject markup.
*/
function h(tag, attrs = {}, ...children) {
	const el = document.createElement(tag);
	for (const [key, value] of Object.entries(attrs)) {
		if (value === void 0 || value === false) continue;
		if (key in el && typeof value !== "string") el[key] = value;
		else el.setAttribute(key, value === true ? "" : String(value));
	}
	for (const child of children) {
		if (child === null || child === void 0 || child === false) continue;
		el.append(child);
	}
	return el;
}
function byId(id) {
	const el = document.getElementById(id);
	if (!el) throw new Error(`Missing #${id}`);
	return el;
}
//#endregion
//#region src/catalog/chute/geometry.ts
function regularPolygon(sides, radius, phase = 0) {
	return Array.from({ length: sides }, (_, i) => {
		const a = phase + i / sides * Math.PI * 2;
		return [Math.cos(a) * radius, Math.sin(a) * radius];
	});
}
/** Rotates local points by `angle` and moves them to (x, y). */
function transform(points, x, y, angle) {
	const cos = Math.cos(angle);
	const sin = Math.sin(angle);
	return points.map(([px, py]) => [x + px * cos - py * sin, y + px * sin + py * cos]);
}
function boundingRadius(points) {
	return Math.max(...points.map(([x, y]) => Math.hypot(x, y)));
}
/** True when (px, py) is inside a convex polygon of either winding. */
function pointInConvex(px, py, poly) {
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
function convexHull(points) {
	const sorted = [...points].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
	if (sorted.length < 3) return sorted;
	const cross = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
	const half = (list) => {
		const out = [];
		for (const p of list) {
			while (out.length >= 2 && cross(out[out.length - 2], out[out.length - 1], p) <= 0) out.pop();
			out.push(p);
		}
		out.pop();
		return out;
	};
	return [...half(sorted), ...half([...sorted].reverse())];
}
function centroid(poly) {
	let x = 0;
	let y = 0;
	for (const [px, py] of poly) {
		x += px;
		y += py;
	}
	return [x / poly.length, y / poly.length];
}
/** Smallest overlap of the two polygons projected on the normals of `edges`, with its axis. */
function leastOverlap(edges, a, b) {
	let best = null;
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
		if (!best || depth < best.depth) best = {
			nx,
			ny,
			depth
		};
	}
	return best;
}
/**
* Separating-axis contact between two convex polygons, or null when apart.
* The normal points from `b` toward `a`, so moving `a` by normal * depth separates them.
*/
function convexVsConvex(a, b) {
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
//#endregion
//#region src/catalog/chute/config.ts
/** Units are px and seconds. */
var PHYSICS = {
	gravity: 1400,
	maxSpeed: 1200,
	/** Velocity lost per second to air, as a fraction. */
	drag: .15,
	/** Bounce off deflectors and off each other. */
	restitution: .25,
	junkRestitution: .1,
	/** Share of sliding speed lost on each deflector contact. */
	friction: .04,
	/** Spin lost per second in the air, as a fraction. */
	spinDrag: 1.2,
	/** How far each contact pulls spin toward rolling speed (0 keeps spin, 1 snaps to it). */
	rollGrip: .35,
	/** Substeps per frame keep fast junk from tunneling through thin bars. */
	substeps: 4,
	maxFrame: 1 / 30
};
var SPAWN = {
	perSecond: 5,
	maxJunk: 90,
	radius: [7, 20],
	sides: [3, 7],
	/** How irregular each vertex is, as a share of the radius. */
	jitter: .35,
	speed: [40, 140],
	sideways: 40,
	spin: 5,
	/** Below this speed a piece counts as resting. */
	restSpeed: 30,
	restLimit: 6,
	fadeTime: 1,
	/** Junk this far outside the viewport is removed. */
	margin: 80
};
var CHUTE = {
	/** Horizontal center of the chute as a fraction of the page width. */
	x: .78,
	/** Mouth position inside the chute artwork, as fractions of its box. */
	mouth: {
		x: .5,
		y: .95,
		width: .2
	},
	ambientOpacity: .45
};
var EDITOR = {
	rotateStep: Math.PI / 12,
	nudge: 4,
	handleGap: 24,
	handleRadius: 9,
	/** The remove button sits beside the knob, along the deflector's local x axis. */
	removeGap: 40,
	removeRadius: 9,
	/** Larger touch target than the drawn knob. */
	handleHit: 20
};
/** Theme tokens the renderer reads from CSS, so colors stay in the stylesheet. */
var THEME_TOKENS = {
	junk: [
		"--junk-1",
		"--junk-2",
		"--junk-3",
		"--junk-4",
		"--junk-5"
	],
	junkEdge: "--junk-edge",
	deflector: "--deflector",
	deflectorEdge: "--deflector-edge",
	accent: "--accent",
	panel: "--panel",
	text: "--text"
};
var DEFLECTOR_KINDS = {
	bar: {
		label: "Bar",
		points: [
			[-90, -7],
			[90, -7],
			[90, 7],
			[-90, 7]
		]
	},
	plank: {
		label: "Plank",
		points: [
			[-160, -6],
			[160, -6],
			[160, 6],
			[-160, 6]
		]
	},
	wedge: {
		label: "Wedge",
		points: [
			[-60, 28],
			[60, 28],
			[0, -28]
		]
	},
	bumper: {
		label: "Bumper",
		points: regularPolygon(14, 28)
	}
};
var DEFAULT_LAYOUT = [
	{
		kind: "bar",
		x: .78,
		y: .3,
		angle: -.35
	},
	{
		kind: "plank",
		x: .5,
		y: .52,
		angle: .22
	},
	{
		kind: "bumper",
		x: .76,
		y: .7,
		angle: 0
	},
	{
		kind: "wedge",
		x: .22,
		y: .82,
		angle: 0
	}
];
//#endregion
//#region src/catalog/chute/handle.ts
/** The rotation knob sits "above" a deflector along its local up axis. */
function handlePosition(d, width, height) {
	const dist = d.reach + EDITOR.handleGap;
	return {
		x: d.x * width + Math.sin(d.angle) * dist,
		y: d.y * height - Math.cos(d.angle) * dist
	};
}
/** The remove button sits beside the knob so both controls travel together. */
function removePosition(d, width, height) {
	const knob = handlePosition(d, width, height);
	return {
		x: knob.x + Math.cos(d.angle) * EDITOR.removeGap,
		y: knob.y + Math.sin(d.angle) * EDITOR.removeGap
	};
}
/** Angle that points a deflector's up axis from its center toward (px, py). */
function angleToward(d, px, py, width, height) {
	return Math.atan2(px - d.x * width, -(py - d.y * height));
}
//#endregion
//#region src/catalog/chute/editor.ts
var isTyping = (el) => el instanceof HTMLElement && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));
/**
* Direct manipulation of deflectors on the canvas: drag to move, drag the
* knob or scroll to rotate, keys to nudge, rotate and delete.
* Every finished change is reported through `onChange`.
*/
var Editor = class {
	canvas;
	world;
	onChange;
	onExit;
	selected = null;
	hovered = null;
	enabled = false;
	drag = null;
	constructor(canvas, world, onChange, onExit) {
		this.canvas = canvas;
		this.world = world;
		this.onChange = onChange;
		this.onExit = onExit;
		canvas.addEventListener("pointerdown", (e) => this.pointerDown(e));
		canvas.addEventListener("pointermove", (e) => this.pointerMove(e));
		canvas.addEventListener("pointerup", (e) => this.pointerUp(e));
		canvas.addEventListener("pointercancel", (e) => this.pointerUp(e));
		canvas.addEventListener("wheel", (e) => this.wheel(e), { passive: false });
		window.addEventListener("keydown", (e) => this.keyDown(e));
	}
	setEnabled(on) {
		this.enabled = on;
		this.drag = null;
		this.selected = null;
		this.hovered = null;
		this.canvas.style.cursor = "";
	}
	add(kind) {
		const spec = {
			kind,
			x: .5,
			y: .45,
			angle: 0
		};
		this.selected = this.world.addDeflector(spec);
		this.onChange();
	}
	replaceAll(specs) {
		this.world.setLayout(specs);
		this.selected = null;
		this.hovered = null;
		this.onChange();
	}
	hit(x, y) {
		const list = this.world.deflectors;
		for (let i = list.length - 1; i >= 0; i--) if (pointInConvex(x, y, list[i].poly)) return list[i];
		return null;
	}
	/** True when (x, y) is on one of the selected deflector's controls. */
	onControl(place, x, y) {
		if (!this.selected) return false;
		const at = place(this.selected, this.world.width, this.world.height);
		return Math.hypot(x - at.x, y - at.y) <= EDITOR.handleHit;
	}
	onHandle(x, y) {
		return this.onControl(handlePosition, x, y);
	}
	onRemove(x, y) {
		return this.onControl(removePosition, x, y);
	}
	remove(d) {
		this.world.removeDeflector(d);
		this.selected = null;
		this.onChange();
	}
	pointerDown(e) {
		if (!this.enabled) return;
		const { offsetX: x, offsetY: y } = e;
		if (this.selected && this.onRemove(x, y)) this.remove(this.selected);
		else if (this.selected && this.onHandle(x, y)) this.drag = {
			mode: "rotate",
			d: this.selected
		};
		else {
			const d = this.hit(x, y);
			this.selected = d;
			if (d) this.drag = {
				mode: "move",
				d,
				dx: x - d.x * this.world.width,
				dy: y - d.y * this.world.height
			};
		}
		if (this.drag) this.canvas.setPointerCapture(e.pointerId);
		this.updateCursor(x, y);
	}
	pointerMove(e) {
		if (!this.enabled) return;
		const { offsetX: x, offsetY: y } = e;
		const { width, height } = this.world;
		const drag = this.drag;
		if (drag?.mode === "move") this.world.updateDeflector(drag.d, {
			x: (x - drag.dx) / width,
			y: (y - drag.dy) / height
		});
		else if (drag?.mode === "rotate") {
			const raw = angleToward(drag.d, x, y, width, height);
			const angle = e.shiftKey ? Math.round(raw / EDITOR.rotateStep) * EDITOR.rotateStep : raw;
			this.world.updateDeflector(drag.d, { angle });
		} else this.hovered = this.hit(x, y);
		this.updateCursor(x, y);
	}
	pointerUp(e) {
		if (!this.drag) return;
		this.drag = null;
		if (this.canvas.hasPointerCapture(e.pointerId)) this.canvas.releasePointerCapture(e.pointerId);
		this.updateCursor(e.offsetX, e.offsetY);
		this.onChange();
	}
	wheel(e) {
		if (!this.enabled) return;
		const d = this.hit(e.offsetX, e.offsetY) ?? this.selected;
		if (!d) return;
		e.preventDefault();
		this.selected = d;
		this.rotate(d, Math.sign(e.deltaY));
	}
	rotate(d, steps) {
		this.world.updateDeflector(d, { angle: d.angle + steps * EDITOR.rotateStep });
		this.onChange();
	}
	keyDown(e) {
		if (!this.enabled || isTyping(e.target)) return;
		if (e.key === "Escape") {
			if (this.selected) this.selected = null;
			else this.onExit();
			e.preventDefault();
			return;
		}
		const d = this.selected;
		if (!d) return;
		const { width, height } = this.world;
		const step = EDITOR.nudge * (e.shiftKey ? 10 : 1);
		const moves = {
			ArrowLeft: [-step, 0],
			ArrowRight: [step, 0],
			ArrowUp: [0, -step],
			ArrowDown: [0, step]
		};
		if (e.key in moves) {
			const [dx, dy] = moves[e.key];
			this.world.updateDeflector(d, {
				x: d.x + dx / width,
				y: d.y + dy / height
			});
			this.onChange();
		} else if (e.key === "q" || e.key === "e") this.rotate(d, e.key === "q" ? -1 : 1);
		else if (e.key === "Delete" || e.key === "Backspace") this.remove(d);
		else return;
		e.preventDefault();
	}
	updateCursor(x, y) {
		const cursor = this.drag?.mode === "move" ? "grabbing" : this.drag || this.onHandle(x, y) ? "crosshair" : this.onRemove(x, y) ? "pointer" : this.hit(x, y) ? "grab" : "";
		this.canvas.style.cursor = cursor;
	}
};
//#endregion
//#region src/lib/local-store.ts
/**
* localStorage wrapper that never throws: private windows and blocked
* storage fall back to the provided default.
*/
function readJson(key, fallback) {
	try {
		const raw = window.localStorage.getItem(key);
		return raw === null ? fallback : JSON.parse(raw);
	} catch {
		return fallback;
	}
}
function writeJson(key, value) {
	try {
		window.localStorage.setItem(key, JSON.stringify(value));
		return true;
	} catch {
		return false;
	}
}
//#endregion
//#region src/catalog/chute/layout-store.ts
var KEY = "junkyard:chute-layout";
var VERSION = 1;
function isSpec(value) {
	const s = value;
	return typeof s === "object" && s !== null && typeof s.kind === "string" && s.kind in DEFLECTOR_KINDS && [
		s.x,
		s.y,
		s.angle
	].every(Number.isFinite);
}
/** The viewer's own deflector layout, or the fallback when none is saved or it is unreadable. */
function loadLayout(fallback) {
	const saved = readJson(KEY, null);
	if (!saved || saved.v !== VERSION || !Array.isArray(saved.deflectors)) return fallback;
	return saved.deflectors.filter(isSpec);
}
function saveLayout(deflectors) {
	writeJson(KEY, {
		v: VERSION,
		deflectors
	});
}
//#endregion
//#region src/catalog/chute/render.ts
function readTheme() {
	const style = getComputedStyle(document.documentElement);
	const token = (name) => style.getPropertyValue(name).trim();
	return {
		junk: THEME_TOKENS.junk.map(token),
		junkEdge: token(THEME_TOKENS.junkEdge),
		deflector: token(THEME_TOKENS.deflector),
		deflectorEdge: token(THEME_TOKENS.deflectorEdge),
		accent: token(THEME_TOKENS.accent),
		panel: token(THEME_TOKENS.panel),
		text: token(THEME_TOKENS.text)
	};
}
function tracePolygon(ctx, points) {
	ctx.beginPath();
	points.forEach(([x, y], i) => i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y));
	ctx.closePath();
}
/** Draws a World onto a canvas. Colors come from CSS tokens, re-read on theme change. */
var Renderer = class {
	canvas;
	ctx;
	theme = readTheme();
	constructor(canvas) {
		this.canvas = canvas;
		const ctx = canvas.getContext("2d");
		if (!ctx) throw new Error("2D canvas is not available");
		this.ctx = ctx;
	}
	get colorCount() {
		return this.theme.junk.length;
	}
	refreshTheme() {
		this.theme = readTheme();
	}
	resize(width, height, dpr) {
		this.canvas.width = Math.round(width * dpr);
		this.canvas.height = Math.round(height * dpr);
		this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
	}
	draw(world, view) {
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
	drawHandle(world, d) {
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
	drawRemove(world, d) {
		const { ctx, theme } = this;
		const { x, y } = removePosition(d, world.width, world.height);
		const r = EDITOR.removeRadius;
		const arm = r * .4;
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
};
//#endregion
//#region src/catalog/chute/toolbar.ts
var SVG = "http://www.w3.org/2000/svg";
var ICON = 20;
/** A small outline of a deflector kind, drawn from the same points the physics uses. */
function kindIcon({ points }) {
	const scale = (ICON / 2 - 1) / boundingRadius(points);
	const svg = document.createElementNS(SVG, "svg");
	svg.setAttribute("viewBox", `-10 -10 ${ICON} ${ICON}`);
	svg.setAttribute("width", String(ICON));
	svg.setAttribute("height", String(ICON));
	svg.setAttribute("aria-hidden", "true");
	const poly = document.createElementNS(SVG, "polygon");
	poly.setAttribute("points", points.map(([x, y]) => `${(x * scale).toFixed(2)},${(y * scale).toFixed(2)}`).join(" "));
	svg.append(poly);
	return svg;
}
function button(label, onClick, cls = "", icon) {
	const btn = h("button", {
		type: "button",
		class: cls || void 0
	}, label);
	if (icon) btn.prepend(icon);
	btn.addEventListener("click", onClick);
	return btn;
}
/** Tinker-mode controls, built from the deflector kinds data. */
function buildToolbar(kinds, actions) {
	return h("section", {
		class: "chute-toolbar",
		"aria-label": "Chute tinker tools",
		hidden: true
	}, h("div", { class: "chute-toolbar-row" }, h("span", { class: "chute-label" }, "Add"), ...Object.entries(kinds).map(([kind, spec]) => button(spec.label, () => actions.add(kind), "chute-kind", kindIcon(spec))), h("span", {
		class: "chute-sep",
		"aria-hidden": "true"
	}), button("Clear", actions.clear), button("Reset", actions.reset), button("Done", actions.done, "primary")), h("p", { class: "chute-hint" }, "Drag to move. Drag the knob, scroll, or press Q / E to rotate. The x or Delete removes. Esc exits."));
}
//#endregion
//#region src/catalog/chute/world.ts
var rand = (min, max) => min + Math.random() * (max - min);
var randInt = (min, max) => Math.floor(rand(min, max + 1));
/** An irregular convex polygon: a regular one with each vertex pulled in a little, then hulled. */
function junkShape(r) {
	return convexHull(regularPolygon(randInt(SPAWN.sides[0], SPAWN.sides[1]), 1, Math.random() * Math.PI).map(([x, y]) => {
		const k = r * (1 - Math.random() * SPAWN.jitter);
		return [x * k, y * k];
	}));
}
/**
* Simple gravity simulation: junk pieces and deflectors are convex polygons,
* collided with the separating axis test after a cheap radius check. No DOM here.
*/
var World = class {
	width = 0;
	height = 0;
	junk = [];
	deflectors = [];
	emitter = null;
	colors = 1;
	nextId = 1;
	spawnClock = 0;
	resize(width, height) {
		this.width = width;
		this.height = height;
		this.deflectors.forEach((d) => this.rebuild(d));
	}
	setLayout(specs) {
		this.deflectors = [];
		specs.forEach((s) => this.addDeflector(s));
	}
	layout() {
		return this.deflectors.map(({ kind, x, y, angle }) => ({
			kind,
			x,
			y,
			angle
		}));
	}
	addDeflector(spec) {
		const d = {
			...spec,
			id: this.nextId++,
			poly: [],
			reach: 0
		};
		this.rebuild(d);
		this.deflectors.push(d);
		return d;
	}
	updateDeflector(d, patch) {
		Object.assign(d, patch);
		d.x = Math.min(1, Math.max(0, d.x));
		d.y = Math.min(1, Math.max(0, d.y));
		this.rebuild(d);
	}
	removeDeflector(d) {
		this.deflectors = this.deflectors.filter((x) => x !== d);
	}
	/** Junk pieces at least partly inside the viewport. */
	visibleCount() {
		return this.junk.filter((j) => j.x + j.r > 0 && j.x - j.r < this.width && j.y + j.r > 0 && j.y - j.r < this.height).length;
	}
	step(frame) {
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
	rebuild(d) {
		const points = DEFLECTOR_KINDS[d.kind].points;
		d.poly = transform(points, d.x * this.width, d.y * this.height, d.angle);
		d.reach = boundingRadius(points);
	}
	spawn(dt) {
		if (!this.emitter) return;
		this.spawnClock += dt * SPAWN.perSecond;
		while (this.spawnClock >= 1) {
			this.spawnClock -= 1;
			const { x, y, width } = this.emitter;
			const shape = junkShape(rand(SPAWN.radius[0], SPAWN.radius[1]));
			const r = boundingRadius(shape);
			this.junk.push({
				x: x + rand(-width, width) * .3,
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
				fading: false
			});
		}
	}
	integrate(dt) {
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
	updateHulls() {
		for (const j of this.junk) j.hull = transform(j.shape, j.x, j.y, j.angle);
	}
	collideDeflectors() {
		this.updateHulls();
		for (const j of this.junk) for (const d of this.deflectors) {
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
			const tx = -c.ny;
			const ty = c.nx;
			const vt = j.vx * tx + j.vy * ty;
			j.vx -= tx * vt * PHYSICS.friction;
			j.vy -= ty * vt * PHYSICS.friction;
			j.spin += (vt / j.r - j.spin) * PHYSICS.rollGrip;
		}
	}
	/** Moves a piece and its cached outline together, so later contacts this substep see it. */
	shift(j, dx, dy) {
		j.x += dx;
		j.y += dy;
		j.hull = j.hull.map(([x, y]) => [x + dx, y + dy]);
	}
	/** Pairwise is fine at this scale (under a hundred pieces). */
	collideJunk() {
		const list = this.junk;
		for (let i = 0; i < list.length; i++) {
			const a = list[i];
			for (let k = i + 1; k < list.length; k++) {
				const b = list[k];
				const dx = b.x - a.x;
				const dy = b.y - a.y;
				const rr = a.r + b.r;
				if (dx * dx + dy * dy >= rr * rr) continue;
				const c = convexVsConvex(b.hull, a.hull);
				if (!c) continue;
				const { nx, ny, depth } = c;
				const ma = a.r * a.r;
				const mb = b.r * b.r;
				this.shift(a, -nx * depth * (mb / (ma + mb)), -ny * depth * (mb / (ma + mb)));
				this.shift(b, nx * depth * (ma / (ma + mb)), ny * depth * (ma / (ma + mb)));
				const vn = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
				if (vn >= 0) continue;
				const impulse = -(1 + PHYSICS.junkRestitution) * vn / (1 / ma + 1 / mb);
				a.vx -= impulse / ma * nx;
				a.vy -= impulse / ma * ny;
				b.vx += impulse / mb * nx;
				b.vy += impulse / mb * ny;
			}
		}
	}
	/** Fades out junk that has settled, and the oldest pieces once over the cap. */
	age(dt) {
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
		this.junk = this.junk.filter((j) => j.fade > 0 && j.y < this.height + m && j.x > -m && j.x < this.width + m);
	}
};
//#endregion
//#region src/catalog/chute/index.ts
var TINKER_CLASS = "tinkering";
/**
* Mounts the falling-junk backdrop behind the page. The chute button at the
* top of the page toggles tinker mode, where deflectors can be edited.
*/
function mountJunkChute(chute) {
	const canvas = h("canvas", {
		class: "junk-canvas",
		"aria-hidden": "true"
	});
	const counter = h("span", {
		class: "chute-count",
		"aria-hidden": "true"
	}, "0");
	const world = new World();
	const renderer = new Renderer(canvas);
	const root = document.documentElement;
	const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
	const darkMode = window.matchMedia("(prefers-color-scheme: dark)");
	let tinkering = false;
	let frame = 0;
	let last = 0;
	const editor = new Editor(canvas, world, () => saveLayout(world.layout()), () => setTinkering(false));
	const toolbar = buildToolbar(DEFLECTOR_KINDS, {
		add: (kind) => editor.add(kind),
		clear: () => editor.replaceAll([]),
		reset: () => editor.replaceAll(DEFAULT_LAYOUT),
		done: () => setTinkering(false)
	});
	root.style.setProperty("--chute-x", `${CHUTE.x * 100}%`);
	root.style.setProperty("--junk-ambient-opacity", String(CHUTE.ambientOpacity));
	document.body.prepend(canvas);
	document.body.append(toolbar);
	chute.append(counter);
	/** The chute mouth in viewport px; it scrolls with the page. */
	function updateEmitter() {
		const box = chute.getBoundingClientRect();
		world.emitter = {
			x: box.left + box.width * CHUTE.mouth.x,
			y: box.top + box.height * CHUTE.mouth.y,
			width: box.width * CHUTE.mouth.width
		};
	}
	function resize() {
		world.resize(window.innerWidth, window.innerHeight);
		renderer.resize(window.innerWidth, window.innerHeight, window.devicePixelRatio || 1);
		draw();
	}
	function draw() {
		renderer.draw(world, tinkering ? editor : null);
		const count = String(world.visibleCount());
		if (counter.textContent !== count) counter.textContent = count;
	}
	function tick(now) {
		const dt = last ? (now - last) / 1e3 : 0;
		last = now;
		updateEmitter();
		world.step(dt);
		draw();
		frame = requestAnimationFrame(tick);
	}
	/** Ambient motion respects reduced motion; tinker mode always runs since the viewer asked for it. */
	function syncLoop() {
		const run = tinkering || !reducedMotion.matches;
		if (run && !frame) {
			last = 0;
			frame = requestAnimationFrame(tick);
		} else if (!run && frame) {
			cancelAnimationFrame(frame);
			frame = 0;
			world.junk = [];
			draw();
		}
	}
	function setTinkering(on) {
		tinkering = on;
		if (on) window.scrollTo({ top: 0 });
		root.classList.toggle(TINKER_CLASS, on);
		chute.setAttribute("aria-pressed", String(on));
		toolbar.hidden = !on;
		editor.setEnabled(on);
		syncLoop();
		draw();
	}
	chute.addEventListener("click", () => setTinkering(!tinkering));
	window.addEventListener("resize", resize);
	reducedMotion.addEventListener("change", syncLoop);
	darkMode.addEventListener("change", () => {
		renderer.refreshTheme();
		draw();
	});
	world.colors = renderer.colorCount;
	world.setLayout(loadLayout(DEFAULT_LAYOUT));
	resize();
	syncLoop();
}
//#endregion
//#region src/catalog/main.ts
var search = byId("search");
var tagRow = byId("tags");
var list = byId("apps");
var count = byId("count");
var params = new URLSearchParams(window.location.search);
var state = {
	query: params.get("q") ?? "",
	tags: parseTags(params.get("tag"))
};
async function loadJson(file) {
	const res = await fetch(file);
	if (!res.ok) throw new Error(`${file}: ${res.status}`);
	return await res.json();
}
function tagButton(tag, label, disabled = false) {
	const chip = h("button", {
		class: "chip",
		type: "button",
		"aria-pressed": String(state.tags.includes(tag)),
		disabled
	}, label);
	chip.addEventListener("click", () => {
		state.tags = toggleTag(state.tags, tag);
		update();
	});
	return chip;
}
function appCard(app) {
	return h("li", { class: "app-card" }, h("h2", {}, h("a", { href: app.path }, app.title)), h("p", {}, app.description), h("div", { class: "meta" }, ...app.tags.map((t) => tagButton(t, t)), h("time", { datetime: app.updated ?? app.created }, app.updated ?? app.created)));
}
function clearButton() {
	if (state.tags.length === 0) return null;
	const btn = h("button", {
		class: "chip clear",
		type: "button"
	}, "Clear tags");
	btn.addEventListener("click", () => {
		state.tags = [];
		update();
	});
	return btn;
}
function syncUrl() {
	const next = new URLSearchParams();
	if (state.query) next.set("q", state.query);
	if (state.tags.length > 0) next.set("tag", serializeTags(state.tags));
	const qs = next.toString();
	history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
}
function render(catalog, index) {
	const matches = searchApps(catalog.apps, index, state.query).filter((a) => matchesTags(a, state.tags));
	tagRow.replaceChildren(...tagFacets(catalog.apps, matches, state.tags).map((f) => tagButton(f.tag, `${f.tag} ${f.count}`, f.count === 0 && !f.selected)), clearButton() ?? "");
	list.replaceChildren(...matches.map(appCard));
	count.textContent = `${matches.length} of ${catalog.apps.length} apps`;
}
var update = () => {};
async function start() {
	const [catalog, index] = await Promise.all([loadJson(CATALOG_FILE), loadJson(SEARCH_INDEX_FILE)]);
	update = () => {
		syncUrl();
		render(catalog, index);
	};
	search.value = state.query;
	search.addEventListener("input", () => {
		state.query = search.value;
		update();
	});
	update();
}
mountJunkChute(byId("chute"));
start().catch((err) => {
	count.textContent = `Could not load the catalog: ${String(err)}`;
});
//#endregion

//# sourceMappingURL=main.js.map