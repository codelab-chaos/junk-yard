//#region junkyard/icon-cabinet/artwork.ts
var collections = /* @__PURE__ */ new Map();
async function getSvg(icon) {
	const prefix = icon.library.prefix;
	if (!collections.has(prefix)) collections.set(prefix, (async () => {
		const response = await fetch(`../../assets/icon-cabinet/${prefix}.json.gz`);
		if (!response.ok || !response.body) throw new Error("Library unavailable");
		const bytes = new Uint8Array(await response.arrayBuffer());
		if (bytes[0] === 31 && bytes[1] === 139) return await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream("gzip"))).json();
		return JSON.parse(new TextDecoder().decode(bytes));
	})().catch((error) => {
		collections.delete(prefix);
		throw error;
	}));
	const collection = await collections.get(prefix);
	const shape = collection.icons[icon.name];
	if (!shape) throw new Error("Icon unavailable");
	const width = shape.width ?? collection.width ?? 16;
	const height = shape.height ?? collection.height ?? 16;
	return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="${shape.left ?? 0} ${shape.top ?? 0} ${width} ${height}">${shape.body}</svg>`;
}
function svgUrl(svg) {
	return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
//#endregion
//#region src/lib/clipboard.ts
/** Copy text and flash feedback on the trigger button. */
async function copyText(text, button) {
	let ok = true;
	try {
		await navigator.clipboard.writeText(text);
	} catch {
		ok = fallbackCopy(text);
	}
	if (button) flash(button, ok ? "Copied" : "Copy failed");
	return ok;
}
function fallbackCopy(text) {
	const area = document.createElement("textarea");
	area.value = text;
	area.setAttribute("readonly", "");
	area.style.position = "fixed";
	area.style.opacity = "0";
	document.body.append(area);
	area.select();
	const ok = document.execCommand("copy");
	area.remove();
	return ok;
}
function flash(button, label) {
	const original = button.dataset.label ?? button.textContent ?? "";
	button.dataset.label = original;
	button.textContent = label;
	window.setTimeout(() => {
		button.textContent = original;
	}, 1200);
}
//#endregion
//#region junkyard/icon-cabinet/search.ts
var related = {
	interface: [
		"menu",
		"settings",
		"search",
		"layout",
		"toggle",
		"cursor"
	],
	weather: [
		"sun",
		"cloud",
		"rain",
		"snow",
		"wind",
		"thermometer"
	],
	music: [
		"music",
		"headphone",
		"audio",
		"speaker",
		"piano",
		"guitar"
	],
	home: ["home", "house"],
	house: ["house", "home"],
	settings: [
		"settings",
		"gear",
		"cog"
	],
	user: [
		"user",
		"person",
		"account"
	],
	search: [
		"search",
		"magnifying",
		"magnify"
	],
	heart: ["heart", "favorite"]
};
function searchIcons(icons, query, prefix, saved) {
	const terms = query.toLowerCase().trim().split(/[\s_-]+/).filter(Boolean);
	return icons.filter((icon) => (!prefix || icon.library.prefix === prefix) && (!saved || saved.has(icon.id))).map((icon) => {
		let score = 0;
		for (const term of terms) {
			const matches = related[term] ?? [term];
			const best = Math.max(...matches.map((word) => icon.name === word ? 100 : icon.name.startsWith(`${word}-`) ? 50 : icon.name.includes(word) ? 20 : 0));
			if (!best) return {
				icon,
				score: -1
			};
			score += best;
		}
		return {
			icon,
			score
		};
	}).filter((hit) => hit.score >= 0).sort((a, b) => b.score - a.score).map((hit) => hit.icon);
}
//#endregion
//#region junkyard/icon-cabinet/main.ts
var $ = (id) => document.getElementById(id);
var query = $("query");
var library = $("library");
var grid = $("results");
var notice = $("notice");
var inspector = document.querySelector(".inspector");
var source = $("source");
var color = $("color");
var size = $("size");
var pageSize = 72;
var storageKey = "junkyard:icon-cabinet:saved";
var saved = /* @__PURE__ */ new Set();
try {
	const value = JSON.parse(localStorage.getItem(storageKey) ?? "[]");
	if (Array.isArray(value)) saved = new Set(value.filter((id) => typeof id === "string"));
} catch {}
var icons = [];
var matches = [];
var page = 0;
var savedOnly = false;
var selected;
var rawSvg = "";
var licenseText = "";
var licenses = /* @__PURE__ */ new Map();
var request;
var previousFocus = null;
var svgCache = /* @__PURE__ */ new Map();
var initial = new URLSearchParams(location.hash.slice(1));
query.value = initial.get("q") ?? "";
savedOnly = initial.get("saved") === "1";
function savedCount() {
	$("saved-count").textContent = String(saved.size);
	$("saved").setAttribute("aria-pressed", String(savedOnly));
	$("favorite").setAttribute("aria-pressed", String(!!selected && saved.has(selected.id)));
	$("favorite").textContent = selected && saved.has(selected.id) ? "Unsave icon" : "Save icon";
}
function message(text, retry) {
	notice.textContent = text;
	notice.hidden = false;
	if (retry) {
		const button = document.createElement("button");
		button.textContent = "Try again";
		button.onclick = retry;
		notice.append(button);
	}
}
function updateHash() {
	const params = new URLSearchParams();
	if (query.value.trim()) params.set("q", query.value.trim());
	if (library.value) params.set("library", library.value);
	if (savedOnly) params.set("saved", "1");
	history.replaceState(null, "", `${location.pathname}${location.search}${params.size ? `#${params}` : ""}`);
}
function filter() {
	page = 0;
	matches = searchIcons(icons, query.value, library.value, savedOnly ? saved : void 0);
	updateHash();
	render();
}
function render() {
	grid.replaceChildren();
	grid.setAttribute("aria-busy", "false");
	notice.hidden = true;
	$("results-title").textContent = savedOnly ? "Your saved icons" : query.value.trim() ? "Search results" : "The collection";
	$("summary").textContent = `${matches.length.toLocaleString()} icons${library.value ? "" : " / 12 libraries"}`;
	if (!matches.length) message(savedOnly ? "No saved icons match. Save an icon from the collection, or clear your filters." : "No icons found. Try a shorter word or choose All libraries.");
	for (const icon of matches.slice(page * pageSize, (page + 1) * pageSize)) {
		const tile = document.createElement("button");
		tile.className = "icon-tile";
		tile.dataset.id = icon.id;
		tile.title = `${icon.name} · ${icon.library.name}`;
		tile.setAttribute("aria-label", `${icon.name}, ${icon.library.name}`);
		tile.setAttribute("aria-pressed", String(selected?.id === icon.id));
		const glyph = document.createElement("span");
		glyph.className = "glyph";
		glyph.setAttribute("aria-hidden", "true");
		getSvg(icon).then((svg) => {
			glyph.style.setProperty("--icon", `url("${svgUrl(svg)}")`);
		}).catch(() => {
			glyph.classList.add("unavailable");
			glyph.textContent = "×";
			tile.title += " — artwork unavailable; select to retry";
		});
		const name = document.createElement("span");
		name.className = "icon-name";
		name.textContent = icon.name;
		const family = document.createElement("span");
		family.className = "icon-family";
		family.textContent = icon.library.name;
		tile.append(glyph, name, family);
		if (saved.has(icon.id)) {
			const mark = document.createElement("span");
			mark.className = "saved-mark";
			mark.textContent = "•";
			mark.setAttribute("aria-label", "Saved");
			tile.append(mark);
		}
		tile.onclick = () => {
			previousFocus = tile;
			selectIcon(icon);
		};
		grid.append(tile);
	}
	$("page-label").textContent = `Page ${page + 1} of ${Math.max(1, Math.ceil(matches.length / pageSize))}`;
	$("previous").disabled = page === 0;
	$("next").disabled = (page + 1) * pageSize >= matches.length;
	savedCount();
}
function setExportEnabled(enabled) {
	$("copy").disabled = !enabled;
	$("download").disabled = !enabled;
}
function exportedSvg() {
	if (!rawSvg || !selected) return "";
	const document = new DOMParser().parseFromString(rawSvg, "image/svg+xml");
	const svg = document.documentElement;
	if (svg.localName !== "svg" || document.querySelector("parsererror")) throw new Error("Invalid SVG");
	svg.setAttribute("width", size.value);
	svg.setAttribute("height", size.value);
	svg.setAttribute("color", color.value);
	svg.setAttribute("role", "img");
	svg.setAttribute("aria-label", selected.name);
	return `<!-- ${`${selected.library.name} — ${selected.library.author.name}; ${selected.library.license.title}; ${selected.library.license.url ?? selected.library.author.url ?? ""}`.replaceAll("--", "—")}\n${licenseText.replaceAll("--", "—")} -->\n${new XMLSerializer().serializeToString(svg)}`;
}
function refreshExport() {
	source.value = exportedSvg();
	const image = $("preview").querySelector("img");
	if (image && source.value) image.src = svgUrl(source.value);
}
function addLink(parent, text, url) {
	if (url?.startsWith("https://")) {
		const link = document.createElement("a");
		link.textContent = text;
		link.href = url;
		link.target = "_blank";
		link.rel = "noopener noreferrer";
		parent.append(link);
	} else parent.append(text);
}
async function selectIcon(icon) {
	request?.abort();
	request = new AbortController();
	const currentRequest = request;
	selected = icon;
	rawSvg = "";
	licenseText = "";
	source.value = "";
	setExportEnabled(false);
	$("favorite").disabled = false;
	inspector.classList.add("open");
	if (matchMedia("(max-width:700px)").matches) $("close-detail").focus();
	$("detail-library").textContent = icon.library.name;
	$("detail-title").textContent = icon.name;
	$("detail-id").textContent = icon.id;
	$("detail-status").textContent = "Loading SVG…";
	const preview = document.createElement("img");
	preview.alt = icon.name;
	$("preview").replaceChildren(preview);
	const license = $("license");
	license.replaceChildren();
	addLink(license, icon.library.author.name, icon.library.author.url);
	license.append(" · ");
	addLink(license, icon.library.license.title, icon.library.license.url ?? (icon.library.license.spdx ? `https://spdx.org/licenses/${icon.library.license.spdx}.html` : void 0));
	license.append(". Check the license for attribution and redistribution requirements.");
	for (const tile of grid.querySelectorAll("button")) tile.setAttribute("aria-pressed", String(tile.dataset.id === icon.id));
	savedCount();
	try {
		let svg = svgCache.get(icon.id);
		if (!svg) {
			svg = await getSvg(icon);
			svgCache.set(icon.id, svg);
		}
		let license = licenses.get(icon.library.prefix);
		if (!license) {
			const response = await fetch(`../../assets/icon-cabinet/${icon.library.prefix}-license.txt`);
			if (!response.ok) throw new Error("License unavailable");
			license = await response.text();
			licenses.set(icon.library.prefix, license);
		}
		if (currentRequest.signal.aborted) return;
		licenseText = license;
		rawSvg = svg;
		refreshExport();
		setExportEnabled(true);
		$("detail-status").textContent = "Ready to use. Color and size apply to your SVG.";
	} catch {
		if (currentRequest.signal.aborted) return;
		$("preview").textContent = "Preview unavailable";
		$("detail-status").textContent = "Could not load the SVG. Check your connection and ";
		const retry = document.createElement("button");
		retry.textContent = "Retry";
		retry.onclick = () => void selectIcon(icon);
		$("detail-status").append(retry);
	}
}
function closeDetail() {
	inspector.classList.remove("open");
	if (previousFocus?.isConnected) previousFocus.focus();
	else query.focus();
}
$("close-detail").onclick = closeDetail;
query.addEventListener("input", filter);
library.addEventListener("change", filter);
$("saved").onclick = () => {
	savedOnly = !savedOnly;
	filter();
};
$("reset").onclick = () => {
	query.value = "";
	library.value = "";
	savedOnly = false;
	filter();
};
for (const button of document.querySelectorAll("[data-query]")) button.onclick = () => {
	query.value = button.dataset.query;
	filter();
};
for (const [id, delta] of [["previous", -1], ["next", 1]]) $(id).onclick = () => {
	page += delta;
	render();
	grid.scrollIntoView({ block: "start" });
	grid.querySelector("button")?.focus();
};
$("favorite").onclick = () => {
	if (!selected) return;
	if (saved.has(selected.id)) saved.delete(selected.id);
	else saved.add(selected.id);
	try {
		localStorage.setItem(storageKey, JSON.stringify([...saved]));
	} catch {
		$("detail-status").textContent = "Saved for this visit. Your browser could not store it for next time.";
	}
	if (savedOnly) filter();
	else render();
};
color.addEventListener("input", refreshExport);
size.addEventListener("change", refreshExport);
$("copy").onclick = async () => {
	const success = await copyText(source.value);
	$("detail-status").textContent = success ? "SVG copied to clipboard." : "Clipboard unavailable. Select and copy the SVG source below.";
	if (!success) {
		document.querySelector("details").open = true;
		source.focus();
		source.select();
	}
};
$("download").onclick = () => {
	if (!selected || !source.value) return;
	const url = URL.createObjectURL(new Blob([source.value], { type: "image/svg+xml" }));
	const link = document.createElement("a");
	link.href = url;
	link.download = `${selected.library.prefix}-${selected.name}.svg`;
	link.click();
	setTimeout(() => URL.revokeObjectURL(url), 1e3);
	$("detail-status").textContent = "SVG download started.";
};
document.addEventListener("keydown", (event) => {
	if (event.key === "Escape" && inspector.classList.contains("open")) closeDetail();
	if (event.key === "/" && !event.ctrlKey && !event.metaKey && !(event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement || event.target instanceof HTMLSelectElement)) {
		event.preventDefault();
		query.focus();
	}
	if (event.key === "Tab" && inspector.classList.contains("open") && matchMedia("(max-width:700px)").matches) {
		const controls = [...inspector.querySelectorAll("button:not(:disabled),select,input,summary,a[href],textarea")].filter((element) => element.getClientRects().length);
		const first = controls[0], last = controls.at(-1);
		if (event.shiftKey && document.activeElement === first) {
			event.preventDefault();
			last?.focus();
		} else if (!event.shiftKey && document.activeElement === last) {
			event.preventDefault();
			first?.focus();
		}
	}
});
async function load() {
	notice.hidden = true;
	grid.setAttribute("aria-busy", "true");
	try {
		const response = await fetch(`../../assets/icon-cabinet/index.json`);
		if (!response.ok) throw new Error("Index unavailable");
		const data = await response.json();
		icons = [];
		const count = Math.max(...data.libraries.map((item) => item.icons.length));
		for (let i = 0; i < count; i++) for (const item of data.libraries) {
			const name = item.icons[i];
			if (name) icons.push({
				id: `${item.prefix}:${name}`,
				name,
				library: item
			});
		}
		library.replaceChildren(new Option("All libraries", ""));
		for (const item of data.libraries) library.add(new Option(`${item.name} (${item.total.toLocaleString()})`, item.prefix));
		library.value = data.libraries.some((item) => item.prefix === initial.get("library")) ? initial.get("library") : "";
		$("inventory").textContent = `${icons.length.toLocaleString()} icons · ${data.libraries.length} libraries · Indexed ${data.updated}`;
		filter();
	} catch {
		grid.setAttribute("aria-busy", "false");
		$("summary").textContent = "Collection unavailable";
		message("Could not open the search index. Check your connection.", () => void load());
	}
}
savedCount();
load();
//#endregion

//# sourceMappingURL=main.js.map