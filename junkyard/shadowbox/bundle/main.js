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
//#region junkyard/shadowbox/presets/design-systems.ts
var tailwind = {
	id: "tailwind",
	name: "Tailwind CSS",
	note: "v3 scale plus the v4 additions (2xs, xs, inset-shadow-*). md and up are identical in both.",
	presets: [
		{
			name: "shadow-2xs (v4)",
			css: "0 1px rgb(0 0 0 / 0.05)"
		},
		{
			name: "shadow-xs (v4)",
			css: "0 1px 2px 0 rgb(0 0 0 / 0.05)"
		},
		{
			name: "shadow-sm (v3)",
			css: "0 1px 2px 0 rgb(0 0 0 / 0.05)"
		},
		{
			name: "shadow (v3) / shadow-sm (v4)",
			css: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)"
		},
		{
			name: "shadow-md",
			css: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
		},
		{
			name: "shadow-lg",
			css: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"
		},
		{
			name: "shadow-xl",
			css: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
		},
		{
			name: "shadow-2xl",
			css: "0 25px 50px -12px rgb(0 0 0 / 0.25)"
		},
		{
			name: "shadow-inner (v3)",
			css: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)"
		},
		{
			name: "inset-shadow-2xs (v4)",
			css: "inset 0 1px rgb(0 0 0 / 0.05)"
		},
		{
			name: "inset-shadow-xs (v4)",
			css: "inset 0 1px 1px rgb(0 0 0 / 0.05)"
		},
		{
			name: "inset-shadow-sm (v4)",
			css: "inset 0 2px 4px rgb(0 0 0 / 0.05)"
		},
		{
			name: "ring-2 + ring-offset-2",
			css: "0 0 0 2px #ffffff, 0 0 0 4px #3b82f6"
		}
	]
};
var bootstrap = {
	id: "bootstrap",
	name: "Bootstrap 5",
	presets: [
		{
			name: ".shadow-sm",
			css: "0 .125rem .25rem rgba(0, 0, 0, .075)"
		},
		{
			name: ".shadow",
			css: "0 .5rem 1rem rgba(0, 0, 0, .15)"
		},
		{
			name: ".shadow-lg",
			css: "0 1rem 3rem rgba(0, 0, 0, .175)"
		},
		{
			name: "focus ring",
			css: "0 0 0 .25rem rgba(13, 110, 253, .25)"
		},
		{
			name: "inset (form-control)",
			css: "inset 0 1px 2px rgba(0, 0, 0, .075)"
		}
	]
};
var material3 = {
	id: "material3",
	name: "Material 3",
	note: "Elevation levels 1 to 5 (key + ambient shadow).",
	presets: [
		{
			name: "Level 1",
			css: "0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)"
		},
		{
			name: "Level 2",
			css: "0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)"
		},
		{
			name: "Level 3",
			css: "0px 1px 3px 0px rgba(0, 0, 0, 0.3), 0px 4px 8px 3px rgba(0, 0, 0, 0.15)"
		},
		{
			name: "Level 4",
			css: "0px 2px 3px 0px rgba(0, 0, 0, 0.3), 0px 6px 10px 4px rgba(0, 0, 0, 0.15)"
		},
		{
			name: "Level 5",
			css: "0px 4px 4px 0px rgba(0, 0, 0, 0.3), 0px 8px 12px 6px rgba(0, 0, 0, 0.15)"
		}
	]
};
var chakra = {
	id: "chakra",
	name: "Chakra UI",
	presets: [
		{
			name: "xs",
			css: "0 0 0 1px rgba(0, 0, 0, 0.05)"
		},
		{
			name: "sm",
			css: "0 1px 2px 0 rgba(0, 0, 0, 0.05)"
		},
		{
			name: "base",
			css: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)"
		},
		{
			name: "md",
			css: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
		},
		{
			name: "lg",
			css: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
		},
		{
			name: "xl",
			css: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
		},
		{
			name: "2xl",
			css: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
		},
		{
			name: "outline",
			css: "0 0 0 3px rgba(66, 153, 225, 0.6)"
		},
		{
			name: "inner",
			css: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)"
		},
		{
			name: "dark-lg",
			css: "rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.2) 0px 5px 10px, rgba(0, 0, 0, 0.4) 0px 15px 40px",
			stage: {
				background: "#1a202c",
				surface: "#2d3748"
			}
		}
	]
};
var fluent = {
	id: "fluent",
	name: "Fluent (Microsoft)",
	note: "Fluent 2 shadow tokens and Fluent UI v8 depths.",
	presets: [
		{
			name: "shadow2",
			css: "0 0 2px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.14)"
		},
		{
			name: "shadow4",
			css: "0 0 2px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.14)"
		},
		{
			name: "shadow8",
			css: "0 0 2px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.14)"
		},
		{
			name: "shadow16",
			css: "0 0 2px rgba(0, 0, 0, 0.12), 0 8px 16px rgba(0, 0, 0, 0.14)"
		},
		{
			name: "shadow28",
			css: "0 0 8px rgba(0, 0, 0, 0.12), 0 14px 28px rgba(0, 0, 0, 0.14)"
		},
		{
			name: "shadow64",
			css: "0 0 8px rgba(0, 0, 0, 0.12), 0 32px 64px rgba(0, 0, 0, 0.14)"
		},
		{
			name: "v8 depth4",
			css: "0 1.6px 3.6px 0 rgba(0, 0, 0, 0.132), 0 0.3px 0.9px 0 rgba(0, 0, 0, 0.108)"
		},
		{
			name: "v8 depth8",
			css: "0 3.2px 7.2px 0 rgba(0, 0, 0, 0.132), 0 0.6px 1.8px 0 rgba(0, 0, 0, 0.108)"
		},
		{
			name: "v8 depth16",
			css: "0 6.4px 14.4px 0 rgba(0, 0, 0, 0.132), 0 1.2px 3.6px 0 rgba(0, 0, 0, 0.108)"
		},
		{
			name: "v8 depth64",
			css: "0 25.6px 57.6px 0 rgba(0, 0, 0, 0.22), 0 4.8px 14.4px 0 rgba(0, 0, 0, 0.18)"
		}
	]
};
var primer = {
	id: "primer",
	name: "GitHub Primer",
	note: "Classic Primer shadow utilities.",
	presets: [
		{
			name: "color-shadow-small",
			css: "0 1px 0 rgba(27, 31, 35, 0.04)"
		},
		{
			name: "color-shadow-medium",
			css: "0 3px 6px rgba(149, 157, 165, 0.15)"
		},
		{
			name: "color-shadow-large",
			css: "0 8px 24px rgba(149, 157, 165, 0.2)"
		},
		{
			name: "color-shadow-extra-large",
			css: "0 12px 28px rgba(149, 157, 165, 0.3)"
		}
	]
};
var antDesign = {
	id: "antd",
	name: "Ant Design",
	presets: [
		{
			name: "boxShadow",
			css: "0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)"
		},
		{
			name: "boxShadowTertiary",
			css: "0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)"
		},
		{
			name: "card hover",
			css: "0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09)"
		}
	]
};
//#endregion
//#region junkyard/shadowbox/presets/material2.ts
var LAYERS = [
	[[
		[
			2,
			1,
			-1
		],
		[
			3,
			1,
			-2
		],
		[
			3,
			3,
			-2
		],
		[
			2,
			4,
			-1
		],
		[
			3,
			5,
			-1
		],
		[
			3,
			5,
			-1
		],
		[
			4,
			5,
			-2
		],
		[
			5,
			5,
			-3
		],
		[
			5,
			6,
			-3
		],
		[
			6,
			6,
			-3
		],
		[
			6,
			7,
			-4
		],
		[
			7,
			8,
			-4
		],
		[
			7,
			8,
			-4
		],
		[
			7,
			9,
			-4
		],
		[
			8,
			9,
			-5
		],
		[
			8,
			10,
			-5
		],
		[
			8,
			11,
			-5
		],
		[
			9,
			11,
			-5
		],
		[
			9,
			12,
			-6
		],
		[
			10,
			13,
			-6
		],
		[
			10,
			13,
			-6
		],
		[
			10,
			14,
			-6
		],
		[
			11,
			14,
			-7
		],
		[
			11,
			15,
			-7
		]
	], .2],
	[[
		[
			1,
			1,
			0
		],
		[
			2,
			2,
			0
		],
		[
			3,
			4,
			0
		],
		[
			4,
			5,
			0
		],
		[
			5,
			8,
			0
		],
		[
			6,
			10,
			0
		],
		[
			7,
			10,
			1
		],
		[
			8,
			10,
			1
		],
		[
			9,
			12,
			1
		],
		[
			10,
			14,
			1
		],
		[
			11,
			15,
			1
		],
		[
			12,
			17,
			2
		],
		[
			13,
			19,
			2
		],
		[
			14,
			21,
			2
		],
		[
			15,
			22,
			2
		],
		[
			16,
			24,
			2
		],
		[
			17,
			26,
			2
		],
		[
			18,
			28,
			2
		],
		[
			19,
			29,
			2
		],
		[
			20,
			31,
			3
		],
		[
			21,
			33,
			3
		],
		[
			22,
			35,
			3
		],
		[
			23,
			36,
			3
		],
		[
			24,
			38,
			3
		]
	], .14],
	[[
		[
			1,
			3,
			0
		],
		[
			1,
			5,
			0
		],
		[
			1,
			8,
			0
		],
		[
			1,
			10,
			0
		],
		[
			1,
			14,
			0
		],
		[
			1,
			18,
			0
		],
		[
			2,
			16,
			1
		],
		[
			3,
			14,
			2
		],
		[
			3,
			16,
			2
		],
		[
			4,
			18,
			3
		],
		[
			4,
			20,
			3
		],
		[
			5,
			22,
			4
		],
		[
			5,
			24,
			4
		],
		[
			5,
			26,
			4
		],
		[
			6,
			28,
			5
		],
		[
			6,
			30,
			5
		],
		[
			6,
			32,
			5
		],
		[
			7,
			34,
			6
		],
		[
			7,
			36,
			6
		],
		[
			8,
			38,
			7
		],
		[
			8,
			40,
			7
		],
		[
			8,
			42,
			7
		],
		[
			9,
			44,
			8
		],
		[
			9,
			46,
			8
		]
	], .12]
];
function level(dp) {
	return LAYERS.map(([table, alpha]) => {
		const [y, blur, spread] = table[dp - 1];
		return `0px ${y}px ${blur}px ${spread}px rgba(0, 0, 0, ${alpha})`;
	}).join(", ");
}
var material2 = {
	id: "material2",
	name: "Material 2 / MUI",
	note: "Elevation 1 to 24, identical to MUI theme.shadows[1..24].",
	presets: Array.from({ length: 24 }, (_, i) => ({
		name: `Elevation ${i + 1}`,
		css: level(i + 1)
	}))
};
//#endregion
//#region junkyard/shadowbox/presets/styles.ts
var everyday = {
	id: "everyday",
	name: "Everyday cards",
	note: "Common single and double layer shadows seen across the web.",
	presets: [
		{
			name: "Whisper",
			css: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px"
		},
		{
			name: "Hairline lift",
			css: "rgba(0, 0, 0, 0.16) 0px 1px 4px"
		},
		{
			name: "Soft card",
			css: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
		},
		{
			name: "Clean card",
			css: "rgba(0, 0, 0, 0.1) 0px 4px 12px"
		},
		{
			name: "Cool gray card",
			css: "rgba(149, 157, 165, 0.2) 0px 8px 24px"
		},
		{
			name: "Diffuse",
			css: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
		},
		{
			name: "Crisp",
			css: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
		},
		{
			name: "Bold",
			css: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
		},
		{
			name: "Card + border",
			css: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px"
		},
		{
			name: "Two-tone",
			css: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px"
		},
		{
			name: "Lifted",
			css: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
		},
		{
			name: "Floating",
			css: "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px"
		},
		{
			name: "Hovering",
			css: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px"
		},
		{
			name: "Indigo glow card",
			css: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px"
		},
		{
			name: "Deep indigo",
			css: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px"
		},
		{
			name: "Bottom only",
			css: "rgba(0, 0, 0, 0.15) 0px 8px 6px -6px"
		},
		{
			name: "Top bar",
			css: "rgba(0, 0, 0, 0.1) 0px 1px 0px 0px"
		},
		{
			name: "Sticky header",
			css: "rgba(0, 0, 0, 0.08) 0px 2px 4px 0px, rgba(0, 0, 0, 0.06) 0px 1px 0px 0px"
		},
		{
			name: "Dramatic stack",
			css: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"
		}
	]
};
var overlays = {
	id: "overlays",
	name: "Menus, popovers, modals",
	presets: [
		{
			name: "Dropdown menu",
			css: "0 0 0 1px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.1), 0 10px 20px -5px rgba(0, 0, 0, 0.15)"
		},
		{
			name: "Popover",
			css: "0 2px 8px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.06)"
		},
		{
			name: "Tooltip",
			css: "0 2px 6px rgba(0, 0, 0, 0.2)"
		},
		{
			name: "Toast",
			css: "0 8px 20px -4px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.08)"
		},
		{
			name: "Modal dialog",
			css: "0 24px 48px -12px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(0, 0, 0, 0.05)"
		},
		{
			name: "Desktop window (macOS-style)",
			css: "0 22px 70px 4px rgba(0, 0, 0, 0.56)"
		},
		{
			name: "Bottom sheet",
			css: "0 -4px 16px rgba(0, 0, 0, 0.12)"
		},
		{
			name: "Command palette",
			css: "0 0 0 1px rgba(0, 0, 0, 0.08), 0 16px 70px rgba(0, 0, 0, 0.2)"
		}
	]
};
var layered = {
	id: "layered",
	name: "Layered smooth",
	note: "Many stacked layers with doubling offsets for very soft, realistic shadows.",
	presets: [
		{
			name: "Smooth 3",
			css: "0 1px 1px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.12), 0 4px 4px rgba(0, 0, 0, 0.12)"
		},
		{
			name: "Smooth 5",
			css: "0 1px 1px rgba(0, 0, 0, 0.11), 0 2px 2px rgba(0, 0, 0, 0.11), 0 4px 4px rgba(0, 0, 0, 0.11), 0 8px 8px rgba(0, 0, 0, 0.11), 0 16px 16px rgba(0, 0, 0, 0.11)"
		},
		{
			name: "Smooth 6",
			css: "0 1px 1px rgba(0, 0, 0, 0.11), 0 2px 2px rgba(0, 0, 0, 0.11), 0 4px 4px rgba(0, 0, 0, 0.11), 0 8px 8px rgba(0, 0, 0, 0.11), 0 16px 16px rgba(0, 0, 0, 0.11), 0 32px 32px rgba(0, 0, 0, 0.11)"
		},
		{
			name: "Sharp layered",
			css: "0 1px 1px rgba(0, 0, 0, 0.15), 0 2px 2px rgba(0, 0, 0, 0.15), 0 4px 4px rgba(0, 0, 0, 0.15), 0 8px 8px rgba(0, 0, 0, 0.15)"
		},
		{
			name: "Long dreamy",
			css: "0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07), 0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07), 0 16px 32px rgba(0, 0, 0, 0.07), 0 32px 64px rgba(0, 0, 0, 0.07)"
		},
		{
			name: "Warm tinted (low)",
			css: "0.3px 0.5px 0.7px hsl(30deg 30% 50% / 0.34), 0.4px 0.8px 1px -1.2px hsl(30deg 30% 50% / 0.34), 1px 2px 2.5px -2.5px hsl(30deg 30% 50% / 0.34)",
			stage: {
				background: "#f6efe6",
				surface: "#fffaf3"
			}
		},
		{
			name: "Warm tinted (high)",
			css: "0.3px 0.5px 0.7px hsl(30deg 30% 50% / 0.3), 1.5px 2.9px 3.7px -0.4px hsl(30deg 30% 50% / 0.3), 2.7px 5.4px 6.8px -0.7px hsl(30deg 30% 50% / 0.3), 4.5px 8.9px 11.2px -1.1px hsl(30deg 30% 50% / 0.3), 7.1px 14.3px 18px -1.4px hsl(30deg 30% 50% / 0.3), 11.2px 22.3px 28.1px -1.8px hsl(30deg 30% 50% / 0.3), 17px 33.9px 42.7px -2.1px hsl(30deg 30% 50% / 0.3), 25px 50px 62.9px -2.5px hsl(30deg 30% 50% / 0.3)",
			stage: {
				background: "#f6efe6",
				surface: "#fffaf3"
			}
		}
	]
};
var NEU = {
	background: "#e0e0e0",
	surface: "#e0e0e0",
	radius: 40
};
var neumorphism = {
	id: "neumorphism",
	name: "Neumorphism",
	note: "Light + dark pair on a surface that matches the background.",
	presets: [
		{
			name: "Raised",
			css: "20px 20px 60px #bebebe, -20px -20px 60px #ffffff",
			stage: NEU
		},
		{
			name: "Raised subtle",
			css: "8px 8px 16px #bebebe, -8px -8px 16px #ffffff",
			stage: NEU
		},
		{
			name: "Raised tight",
			css: "5px 5px 10px #bebebe, -5px -5px 10px #ffffff",
			stage: NEU
		},
		{
			name: "Pressed",
			css: "inset 20px 20px 60px #bebebe, inset -20px -20px 60px #ffffff",
			stage: NEU
		},
		{
			name: "Pressed subtle",
			css: "inset 6px 6px 12px #bebebe, inset -6px -6px 12px #ffffff",
			stage: NEU
		},
		{
			name: "Dark raised",
			css: "12px 12px 24px #1b1d21, -12px -12px 24px #353943",
			stage: {
				background: "#282b32",
				surface: "#282b32",
				radius: 40
			}
		},
		{
			name: "Dark pressed",
			css: "inset 8px 8px 16px #1b1d21, inset -8px -8px 16px #353943",
			stage: {
				background: "#282b32",
				surface: "#282b32",
				radius: 40
			}
		},
		{
			name: "Pastel raised",
			css: "10px 10px 20px #c4c9e6, -10px -10px 20px #ffffff",
			stage: {
				background: "#e6ebff",
				surface: "#e6ebff",
				radius: 40
			}
		}
	]
};
var DARK = {
	background: "#0d0f14",
	surface: "#151821"
};
//#endregion
//#region junkyard/shadowbox/presets/index.ts
/** Display order of the built-in library. */
var BUILT_IN_COLLECTIONS = [
	everyday,
	tailwind,
	material2,
	material3,
	bootstrap,
	chakra,
	fluent,
	primer,
	antDesign,
	overlays,
	layered,
	neumorphism,
	{
		id: "glow",
		name: "Glow and neon",
		presets: [
			{
				name: "Cyan neon",
				css: "0 0 5px #00e5ff, 0 0 10px #00e5ff, 0 0 20px #00e5ff, 0 0 40px #00e5ff",
				stage: DARK
			},
			{
				name: "Magenta neon",
				css: "0 0 5px #ff2bd6, 0 0 15px #ff2bd6, 0 0 30px #ff2bd6, 0 0 60px #ff2bd6",
				stage: DARK
			},
			{
				name: "Lime neon",
				css: "0 0 4px #a6ff00, 0 0 12px #a6ff00, 0 0 24px #a6ff00",
				stage: DARK
			},
			{
				name: "Neon tube (inner + outer)",
				css: "inset 0 0 12px #00e5ff, 0 0 12px #00e5ff, 0 0 32px #0077ff",
				stage: DARK
			},
			{
				name: "Soft blue glow",
				css: "0 0 24px rgba(59, 130, 246, 0.5)",
				stage: DARK
			},
			{
				name: "Gradient-ish aura",
				css: "-12px 0 40px rgba(236, 72, 153, 0.5), 12px 0 40px rgba(59, 130, 246, 0.5)",
				stage: DARK
			},
			{
				name: "Warm ember",
				css: "0 0 10px rgba(255, 140, 0, 0.6), 0 0 40px rgba(255, 69, 0, 0.4)",
				stage: DARK
			},
			{
				name: "Light-mode colored lift",
				css: "0 10px 30px -10px rgba(99, 102, 241, 0.6)"
			},
			{
				name: "Button glow (green)",
				css: "0 4px 14px 0 rgba(16, 185, 129, 0.39)"
			}
		]
	},
	{
		id: "hard",
		name: "Hard, retro, brutalist",
		presets: [
			{
				name: "Brutalist 4px",
				css: "4px 4px 0 0 #000000",
				stage: { radius: 0 }
			},
			{
				name: "Brutalist 8px",
				css: "8px 8px 0 0 #000000",
				stage: { radius: 0 }
			},
			{
				name: "Brutalist border + offset",
				css: "0 0 0 2px #000000, 6px 6px 0 2px #000000",
				stage: {
					radius: 0,
					surface: "#ffde59"
				}
			},
			{
				name: "Retro stack",
				css: "5px 5px rgba(240, 46, 170, 0.4), 10px 10px rgba(240, 46, 170, 0.3), 15px 15px rgba(240, 46, 170, 0.2), 20px 20px rgba(240, 46, 170, 0.1), 25px 25px rgba(240, 46, 170, 0.05)"
			},
			{
				name: "Long 3D block",
				css: "1px 1px 0 #444, 2px 2px 0 #444, 3px 3px 0 #444, 4px 4px 0 #444, 5px 5px 0 #444, 6px 6px 0 #444",
				stage: { radius: 4 }
			},
			{
				name: "Pixel border",
				css: "0 -4px 0 0 #000, 0 4px 0 0 #000, -4px 0 0 0 #000, 4px 0 0 0 #000",
				stage: { radius: 0 }
			},
			{
				name: "Double outline",
				css: "0 0 0 4px #ffffff, 0 0 0 8px #000000"
			},
			{
				name: "Paper on paper",
				css: "3px 3px 0 -1px #ffffff, 3px 3px 0 0 #333333, 6px 6px 0 -1px #ffffff, 6px 6px 0 0 #333333",
				stage: { radius: 0 }
			}
		]
	},
	{
		id: "rings",
		name: "Borders and focus rings",
		note: "Spread-only shadows that act like borders without changing layout.",
		presets: [
			{
				name: "Hairline border",
				css: "0 0 0 1px rgba(0, 0, 0, 0.1)"
			},
			{
				name: "Inner hairline",
				css: "inset 0 0 0 1px rgba(0, 0, 0, 0.1)"
			},
			{
				name: "Focus ring blue",
				css: "0 0 0 3px rgba(66, 153, 225, 0.5)"
			},
			{
				name: "Focus ring with offset",
				css: "0 0 0 2px #ffffff, 0 0 0 4px #6366f1"
			},
			{
				name: "Error ring",
				css: "0 0 0 3px rgba(239, 68, 68, 0.35)"
			},
			{
				name: "Success ring",
				css: "0 0 0 3px rgba(34, 197, 94, 0.35)"
			},
			{
				name: "Selected card",
				css: "0 0 0 2px #2563eb, 0 4px 12px rgba(37, 99, 235, 0.25)"
			},
			{
				name: "Rainbow rings",
				css: "0 0 0 3px #ef4444, 0 0 0 6px #f59e0b, 0 0 0 9px #22c55e, 0 0 0 12px #3b82f6, 0 0 0 15px #8b5cf6"
			}
		]
	},
	{
		id: "insets",
		name: "Inset and pressed",
		presets: [
			{
				name: "Input well",
				css: "inset 0 1px 2px rgba(0, 0, 0, 0.075)"
			},
			{
				name: "Pressed button",
				css: "inset 0 3px 5px rgba(0, 0, 0, 0.125)"
			},
			{
				name: "Deep well",
				css: "inset 0 2px 8px rgba(0, 0, 0, 0.3)"
			},
			{
				name: "Inner glow",
				css: "inset 0 0 20px rgba(59, 130, 246, 0.5)"
			},
			{
				name: "Vignette",
				css: "inset 0 0 60px rgba(0, 0, 0, 0.5)"
			},
			{
				name: "Top highlight",
				css: "inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 1px 3px rgba(0, 0, 0, 0.3)",
				stage: DARK
			},
			{
				name: "Glass edge",
				css: "inset 0 1px 1px rgba(255, 255, 255, 0.4), 0 8px 32px rgba(31, 38, 135, 0.2)",
				stage: {
					background: "#8ea6ff",
					surface: "#b8c6ff"
				}
			},
			{
				name: "Skeuo button",
				css: "inset 0 1px 0 rgba(255, 255, 255, 0.6), inset 0 -2px 0 rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.2)",
				stage: { surface: "#f4f4f6" }
			}
		]
	}
];
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
//#region src/lib/hash-codec.ts
/**
* JSON <-> URL-safe base64 (RFC 4648 base64url, no padding). The output only
* contains [A-Za-z0-9_-], so it is safe in a URL fragment and a bookmark.
* Decoding returns unknown; callers must validate the shape.
*/
var SAFE = /^[A-Za-z0-9_-]+$/;
var MAX_LENGTH = 8192;
function encodeHashData(value) {
	const bytes = new TextEncoder().encode(JSON.stringify(value));
	let binary = "";
	for (const b of bytes) binary += String.fromCharCode(b);
	return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function decodeHashData(encoded) {
	if (encoded.length === 0 || encoded.length > MAX_LENGTH || !SAFE.test(encoded)) return void 0;
	try {
		const base64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
		const binary = atob(base64 + "=".repeat((4 - base64.length % 4) % 4));
		const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
		return JSON.parse(new TextDecoder().decode(bytes));
	} catch {
		return;
	}
}
/** Read one key from a `#key=value&...` fragment. */
function readHashParam(key, hash = window.location.hash) {
	return new URLSearchParams(hash.replace(/^#/, "")).get(key) ?? void 0;
}
function hashWithParam(key, value) {
	const params = new URLSearchParams(window.location.hash.replace(/^#/, ""));
	params.set(key, value);
	return `#${params.toString()}`;
}
//#endregion
//#region junkyard/shadowbox/shadow/model.ts
var DEFAULT_STAGE = {
	background: "#f1f1f4",
	surface: "#ffffff",
	radius: 12,
	size: 180
};
function defaultLayer() {
	return {
		inset: false,
		x: 0,
		y: 8,
		blur: 24,
		spread: 0,
		color: "#000000",
		alpha: .15
	};
}
/** Numeric layer fields with their editor ranges, used for controls and hash validation. */
var LAYER_FIELDS = [
	{
		key: "x",
		label: "X offset",
		min: -100,
		max: 100,
		step: .5
	},
	{
		key: "y",
		label: "Y offset",
		min: -100,
		max: 100,
		step: .5
	},
	{
		key: "blur",
		label: "Blur",
		min: 0,
		max: 200,
		step: .5
	},
	{
		key: "spread",
		label: "Spread",
		min: -100,
		max: 100,
		step: .5
	}
];
var STAGE_FIELDS = [{
	key: "radius",
	label: "Radius",
	min: 0,
	max: 120,
	step: 1
}, {
	key: "size",
	label: "Size",
	min: 60,
	max: 320,
	step: 2
}];
function cloneDesign(design) {
	return {
		name: design.name,
		layers: design.layers.map((l) => ({ ...l })),
		stage: { ...design.stage }
	};
}
//#endregion
//#region junkyard/shadowbox/shadow/codec.ts
var HEX = /^[0-9a-f]{6}$/i;
var MAX_NAME = 60;
function clamp(value, min, max, fallback) {
	return Math.min(max, Math.max(min, typeof value === "number" && Number.isFinite(value) ? value : fallback));
}
function hex(value, fallback) {
	return typeof value === "string" && HEX.test(value) ? `#${value.toLowerCase()}` : fallback;
}
function cleanName(value) {
	return typeof value === "string" ? value.replace(/[\u0000-\u001f\u007f<>]/g, "").trim().slice(0, MAX_NAME) : "";
}
function range(key) {
	const field = [...LAYER_FIELDS, ...STAGE_FIELDS].find((f) => f.key === key);
	if (!field) throw new Error(`Unknown field ${key}`);
	return field;
}
function fit(key, value, fallback) {
	const { min, max } = range(key);
	return clamp(value, min, max, fallback);
}
function encodeDesign(design) {
	return encodeHashData({
		v: 1,
		n: design.name,
		l: design.layers.map((l) => [
			l.inset ? 1 : 0,
			l.x,
			l.y,
			l.blur,
			l.spread,
			l.color.slice(1),
			Math.round(l.alpha * 100)
		]),
		s: [
			design.stage.background.slice(1),
			design.stage.surface.slice(1),
			design.stage.radius,
			design.stage.size
		]
	});
}
function decodeLayer(raw) {
	if (!Array.isArray(raw) || raw.length !== 7) return void 0;
	const [inset, x, y, blur, spread, color, alpha] = raw;
	return {
		inset: inset === 1,
		x: fit("x", x, 0),
		y: fit("y", y, 0),
		blur: fit("blur", blur, 0),
		spread: fit("spread", spread, 0),
		color: hex(color, "#000000"),
		alpha: clamp(alpha, 0, 100, 100) / 100
	};
}
function decodeStage(raw) {
	const [background, surface, radius, size] = Array.isArray(raw) ? raw : [];
	return {
		background: hex(background, DEFAULT_STAGE.background),
		surface: hex(surface, DEFAULT_STAGE.surface),
		radius: fit("radius", radius, DEFAULT_STAGE.radius),
		size: fit("size", size, DEFAULT_STAGE.size)
	};
}
function decodeDesign(encoded) {
	const data = decodeHashData(encoded);
	if (!data || data.v !== 1 || !Array.isArray(data.l)) return void 0;
	const layers = data.l.slice(0, 12).map(decodeLayer);
	if (!layers.every((l) => l !== void 0)) return void 0;
	return {
		name: cleanName(data.n) || "Shared shadow",
		layers,
		stage: decodeStage(data.s)
	};
}
//#endregion
//#region junkyard/shadowbox/presets/user-presets.ts
var KEY = "junkyard.shadowbox.presets.v1";
/** Presets saved in this browser, stored in the same shape as built-ins. */
function loadUserPresets() {
	const raw = readJson(KEY, []);
	if (!Array.isArray(raw)) return [];
	return raw.filter((p) => typeof p === "object" && p !== null && typeof p.name === "string" && typeof p.css === "string");
}
function saveUserPreset(preset) {
	const name = cleanName(preset.name) || "Untitled";
	const next = [{
		...preset,
		name
	}, ...loadUserPresets().filter((p) => p.name !== name)];
	writeJson(KEY, next);
	return next;
}
function deleteUserPreset(name) {
	const next = loadUserPresets().filter((p) => p.name !== name);
	writeJson(KEY, next);
	return next;
}
function userCollection(presets) {
	return {
		id: "mine",
		name: "My presets",
		note: "Saved in this browser only.",
		presets
	};
}
//#endregion
//#region junkyard/shadowbox/shadow/parse.ts
var REM_PX = 16;
/** Split on top-level commas only, so rgba(0, 0, 0, .1) stays whole. */
function splitTopLevel(value, separator) {
	const out = [];
	let depth = 0;
	let current = "";
	for (const ch of value) {
		if (ch === "(") depth++;
		if (ch === ")") depth--;
		if (depth === 0 && (separator === " " ? /\s/.test(ch) : ch === separator)) {
			if (current.trim()) out.push(current.trim());
			current = "";
		} else current += ch;
	}
	if (current.trim()) out.push(current.trim());
	return out;
}
function parseLength(token) {
	const match = /^(-?\d*\.?\d+)(px|rem|em)?$/i.exec(token);
	if (!match) return void 0;
	const n = parseFloat(match[1]);
	return (match[2] ?? "px").toLowerCase() === "px" ? n : n * REM_PX;
}
var colorCtx;
/**
* Normalize any CSS color (named, hex, rgb, hsl, modern syntax) through the
* canvas, which reports back either #rrggbb or rgba(r, g, b, a).
*/
function normalizeColor(input) {
	colorCtx ??= document.createElement("canvas").getContext("2d");
	if (!colorCtx) return void 0;
	const sentinel = "#010203";
	colorCtx.fillStyle = sentinel;
	colorCtx.fillStyle = input;
	const out = String(colorCtx.fillStyle);
	if (out === sentinel && input.trim().toLowerCase() !== sentinel) return void 0;
	if (out.startsWith("#")) return {
		color: out.toLowerCase(),
		alpha: 1
	};
	const m = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/.exec(out);
	if (!m) return void 0;
	return {
		color: `#${[
			m[1],
			m[2],
			m[3]
		].map((c) => Number(c).toString(16).padStart(2, "0")).join("")}`,
		alpha: m[4] === void 0 ? 1 : Number(m[4])
	};
}
function parseLayer(text) {
	const layer = {
		...defaultLayer(),
		color: "#000000",
		alpha: 1
	};
	const lengths = [];
	let colorSeen = false;
	for (const token of splitTopLevel(text, " ")) {
		if (token.toLowerCase() === "inset") {
			layer.inset = true;
			continue;
		}
		const length = parseLength(token);
		if (length !== void 0) {
			lengths.push(length);
			continue;
		}
		const color = normalizeColor(token);
		if (!color || colorSeen) return void 0;
		colorSeen = true;
		layer.color = color.color;
		layer.alpha = color.alpha;
	}
	if (lengths.length < 2 || lengths.length > 4) return void 0;
	[layer.x, layer.y, layer.blur = 0, layer.spread = 0] = lengths;
	return layer;
}
/**
* Parse a box-shadow value (or a full `box-shadow: ...;` declaration).
* Returns undefined when any layer is unreadable.
*/
function parseBoxShadow(input) {
	const value = input.trim().replace(/^box-shadow\s*:/i, "").replace(/;\s*$/, "").trim();
	if (value === "" || value.toLowerCase() === "none") return [];
	const layers = splitTopLevel(value, ",").map(parseLayer);
	return layers.every((l) => l !== void 0) ? layers : void 0;
}
//#endregion
//#region junkyard/shadowbox/shadow/from-preset.ts
function designFromPreset(preset) {
	const layers = parseBoxShadow(preset.css);
	if (!layers) return void 0;
	return {
		name: preset.name,
		layers,
		stage: {
			...DEFAULT_STAGE,
			...preset.stage
		}
	};
}
//#endregion
//#region junkyard/shadowbox/shadow/format.ts
function num(n) {
	return `${Math.round(n * 100) / 100}`;
}
function px(n) {
	return n === 0 ? "0" : `${num(n)}px`;
}
function layerColor(layer) {
	const r = parseInt(layer.color.slice(1, 3), 16);
	const g = parseInt(layer.color.slice(3, 5), 16);
	const b = parseInt(layer.color.slice(5, 7), 16);
	return layer.alpha >= 1 ? layer.color : `rgba(${r}, ${g}, ${b}, ${num(layer.alpha)})`;
}
function layerToCss(layer) {
	const parts = [
		px(layer.x),
		px(layer.y),
		px(layer.blur),
		px(layer.spread),
		layerColor(layer)
	];
	return (layer.inset ? ["inset", ...parts] : parts).join(" ");
}
/** The value of a box-shadow declaration. */
function layersToCss(layers) {
	return layers.length === 0 ? "none" : layers.map(layerToCss).join(", ");
}
/** Copyable snippets, one per target. Add a target by adding a record. */
var OUTPUT_FORMATS = [
	{
		id: "css",
		label: "CSS",
		render: (v) => `box-shadow: ${v};`
	},
	{
		id: "css-multiline",
		label: "CSS (multi-line)",
		render: (v) => v === "none" ? "box-shadow: none;" : `box-shadow:\n  ${v.split(/,\s(?![^(]*\))/).join(",\n  ")};`
	},
	{
		id: "var",
		label: "CSS variable",
		render: (v) => `--shadow: ${v};`
	},
	{
		id: "tailwind",
		label: "Tailwind",
		render: (v) => `shadow-[${v.replace(/,\s+/g, ",").replace(/\s+/g, "_")}]`
	},
	{
		id: "js",
		label: "JS / React style",
		render: (v) => `boxShadow: '${v}',`
	},
	{
		id: "value",
		label: "Value only",
		render: (v) => v
	}
];
//#endregion
//#region junkyard/shadowbox/shadow/transforms.ts
/** Default light position when no layer has an offset: straight above. */
var DEFAULT_LIGHT = -Math.PI / 2;
var snap = (n) => Math.round(n * 2) / 2;
/**
* Where the light sits, in radians, derived from the layer with the longest
* offset. Shadows fall away from the light, so the light is opposite.
*/
function lightAngle(layers) {
	const dominant = layers.filter((l) => !l.inset).reduce((best, l) => !best || Math.hypot(l.x, l.y) > Math.hypot(best.x, best.y) ? l : best, void 0);
	if (!dominant || Math.hypot(dominant.x, dominant.y) === 0) return DEFAULT_LIGHT;
	return Math.atan2(dominant.y, dominant.x) + Math.PI;
}
function hasOffset(layers) {
	return layers.some((l) => l.x !== 0 || l.y !== 0);
}
/** Degrees on a compass where 0 is the top and angles grow clockwise. */
function compassDegrees(radians) {
	return Math.round((radians * 180 / Math.PI + 90 + 360) % 360);
}
/**
* Re-aims every layer at a moved light: offsets rotate by the change in
* angle and stretch by `scale`, so all layers stay consistent with one light.
*/
function relight(base, rotate, scale) {
	const cos = Math.cos(rotate);
	const sin = Math.sin(rotate);
	return base.map((l) => ({
		...l,
		x: snap((l.x * cos - l.y * sin) * scale),
		y: snap((l.x * sin + l.y * cos) * scale)
	}));
}
function hexToHsl(hex) {
	const [r, g, b] = [
		1,
		3,
		5
	].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	const l = (max + min) / 2;
	if (max === min) return [
		0,
		0,
		l
	];
	const d = max - min;
	const s = l > .5 ? d / (2 - max - min) : d / (max + min);
	return [
		(max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4) * 60,
		s,
		l
	];
}
function hslToHex(h, s, l) {
	const k = (n) => (n + h / 30) % 12;
	const a = s * Math.min(l, 1 - l);
	const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
	return `#${[
		0,
		8,
		4
	].map((n) => Math.round(f(n) * 255).toString(16).padStart(2, "0")).join("")}`;
}
/**
* Shadow color tinted from the scene background: same hue, more saturated,
* much darker. Pure black shadows look muddy on colored surfaces.
*/
function shadowTint(background) {
	const [h, s] = hexToHsl(background);
	return hslToHex(h, Math.min(1, s * 1.2 + (s > .04 ? .15 : 0)), .16);
}
/** Recolors dark layers with the scene tint; light layers (highlights, neumorphism) are kept. */
function tintLayers(layers, background) {
	const tint = shadowTint(background);
	return layers.map((l) => hexToHsl(l.color)[2] < .5 ? {
		...l,
		color: tint
	} : l);
}
/** Relative luminance, used to pick readable ink over a user-chosen color. */
function isDark(hex) {
	const [r, g, b] = [
		1,
		3,
		5
	].map((i) => {
		const c = parseInt(hex.slice(i, i + 2), 16) / 255;
		return c <= .03928 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4;
	});
	return .2126 * r + .7152 * g + .0722 * b < .4;
}
//#endregion
//#region junkyard/shadowbox/ui/store.ts
var DesignStore = class {
	design;
	listeners = /* @__PURE__ */ new Set();
	constructor(initial) {
		this.design = cloneDesign(initial);
	}
	get current() {
		return this.design;
	}
	subscribe(listener) {
		this.listeners.add(listener);
	}
	/** Replace the whole design, e.g. from a preset or a shared hash. */
	load(design) {
		this.design = cloneDesign(design);
		this.emit("structure");
	}
	update(mutate, kind = "values") {
		mutate(this.design);
		this.emit(kind);
	}
	emit(kind) {
		for (const listener of this.listeners) listener(this.design, kind);
	}
};
//#endregion
//#region junkyard/shadowbox/ui/history.ts
var IDLE_MS = 350;
/**
* Undo and redo over whole-design snapshots. Changes are committed once the
* store goes idle, so a slider drag or a light drag is one step.
*/
var History = class {
	store;
	past = [];
	future = [];
	committed;
	timer = 0;
	applying = false;
	listeners = /* @__PURE__ */ new Set();
	constructor(store) {
		this.store = store;
		this.committed = cloneDesign(store.current);
		store.subscribe(() => {
			if (this.applying) return;
			this.future = [];
			window.clearTimeout(this.timer);
			this.timer = window.setTimeout(() => this.commit(), IDLE_MS);
		});
	}
	get canUndo() {
		return this.past.length > 0 || this.dirty();
	}
	get canRedo() {
		return this.future.length > 0;
	}
	onChange(listener) {
		this.listeners.add(listener);
	}
	undo() {
		this.commit();
		const previous = this.past.pop();
		if (!previous) return;
		this.future.push(this.committed);
		this.apply(previous);
	}
	redo() {
		const next = this.future.pop();
		if (!next) return;
		this.past.push(this.committed);
		this.apply(next);
	}
	dirty() {
		return JSON.stringify(this.committed) !== JSON.stringify(this.store.current);
	}
	commit() {
		window.clearTimeout(this.timer);
		if (this.dirty()) {
			this.past = [...this.past, this.committed].slice(-100);
			this.committed = cloneDesign(this.store.current);
		}
		this.notify();
	}
	apply(design) {
		this.committed = design;
		this.applying = true;
		this.store.load(design);
		this.applying = false;
		this.notify();
	}
	notify() {
		for (const listener of this.listeners) listener();
	}
};
//#endregion
//#region junkyard/shadowbox/ui/peek.ts
/**
* A transient preview that never touches the store: hovering a preset shows
* it on the stage, leaving restores the design being edited.
*/
var Peek = class {
	design;
	listeners = /* @__PURE__ */ new Set();
	get current() {
		return this.design;
	}
	subscribe(listener) {
		this.listeners.add(listener);
	}
	show(design) {
		if (design === this.design) return;
		this.design = design;
		for (const listener of this.listeners) listener(design);
	}
	clear() {
		this.show(void 0);
	}
};
//#endregion
//#region junkyard/shadowbox/ui/icons.ts
var SVG_NS = "http://www.w3.org/2000/svg";
/** Stroke icons on a 24px grid. Add an icon by adding its path data. */
var PATHS = {
	back: "M15 6l-6 6 6 6",
	undo: "M9 14L4 9l5-5M4 9h11a5 5 0 010 10h-3",
	redo: "M15 14l5-5-5-5M20 9H9a5 5 0 000 10h3",
	up: "M12 19V5M6 11l6-6 6 6",
	down: "M12 5v14M6 13l6 6 6-6",
	copy: "M9 9h10v10H9zM5 15V5h10",
	duplicate: "M8 8h11v11H8zM5 16V5h11M13.5 11v5M11 13.5h5",
	trash: "M5 7h14M10 7V4h4v3M7 7l1 13h8l1-13",
	plus: "M12 5v14M5 12h14",
	droplet: "M12 3.5s6 6.5 6 10.5a6 6 0 01-12 0c0-4 6-10.5 6-10.5z",
	link: "M10 14a4 4 0 005.66 0l3-3a4 4 0 00-5.66-5.66l-1 1M14 10a4 4 0 00-5.66 0l-3 3a4 4 0 005.66 5.66l1-1",
	save: "M6 4h12v16l-6-4-6 4z",
	search: "M11 4a7 7 0 100 14 7 7 0 000-14zM20 20l-4-4",
	chevron: "M9 6l6 6-6 6",
	sun: "M12 8a4 4 0 100 8 4 4 0 000-8zM12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
};
function icon(name) {
	const svg = document.createElementNS(SVG_NS, "svg");
	svg.setAttribute("viewBox", "0 0 24 24");
	svg.setAttribute("aria-hidden", "true");
	svg.classList.add("icon");
	const path = document.createElementNS(SVG_NS, "path");
	path.setAttribute("d", PATHS[name]);
	svg.append(path);
	return svg;
}
/** Puts icons into every element marked data-icon="name" in static markup. */
function hydrateIcons(root = document) {
	for (const el of root.querySelectorAll("[data-icon]")) el.prepend(icon(el.dataset.icon));
}
//#endregion
//#region junkyard/shadowbox/ui/toast.ts
var VISIBLE_MS = 2400;
/** Quiet confirmation messages in a single live region. */
function createToast(root) {
	let timer = 0;
	return (text) => {
		root.textContent = text;
		root.classList.add("is-visible");
		window.clearTimeout(timer);
		timer = window.setTimeout(() => root.classList.remove("is-visible"), VISIBLE_MS);
	};
}
//#endregion
//#region junkyard/shadowbox/ui/controls.ts
/** Pixels of pointer travel per step when scrubbing a label. */
var SCRUB_PX = 2;
var decimals = (step) => (String(step).split(".")[1] ?? "").length;
/**
* A slider and number box that stay in sync. The number box accepts values
* past the slider range. Dragging the label scrubs the value (Shift for 10x).
*/
function rangeControl(spec) {
	const slider = h("input", {
		type: "range",
		min: spec.min,
		max: spec.max,
		step: spec.step,
		value: String(spec.value),
		"aria-label": spec.label
	});
	const box = h("input", {
		type: "number",
		step: spec.step,
		value: String(spec.value),
		"aria-label": `${spec.label} value`
	});
	const label = h("span", {
		class: "control-label",
		title: "Drag to adjust"
	}, spec.label);
	let current = spec.value;
	const set = (n, source) => {
		if (!Number.isFinite(n)) return;
		current = Number(n.toFixed(decimals(spec.step)));
		if (source !== slider) slider.value = String(current);
		if (source !== box) box.value = String(current);
		spec.onInput(current);
	};
	slider.addEventListener("input", () => set(parseFloat(slider.value), slider));
	box.addEventListener("input", () => set(parseFloat(box.value), box));
	label.addEventListener("pointerdown", (down) => {
		down.preventDefault();
		label.setPointerCapture(down.pointerId);
		const start = current;
		const move = (e) => {
			const steps = Math.round((e.clientX - down.clientX) / SCRUB_PX) * (e.shiftKey ? 10 : 1);
			set(start + steps * spec.step);
		};
		const end = () => {
			label.removeEventListener("pointermove", move);
			label.classList.remove("is-scrubbing");
		};
		label.classList.add("is-scrubbing");
		label.addEventListener("pointermove", move);
		label.addEventListener("pointerup", end, { once: true });
		label.addEventListener("pointercancel", end, { once: true });
	});
	return h("div", { class: "control" }, label, slider, h("span", { class: "control-value" }, box, spec.unit ? h("small", {}, spec.unit) : null));
}
function colorControl(label, value, onInput) {
	const input = h("input", {
		type: "color",
		value
	});
	const code = h("code", {}, value);
	input.addEventListener("input", () => {
		code.textContent = input.value;
		onInput(input.value);
	});
	return h("label", { class: "control control-color" }, h("span", { class: "control-label" }, label), h("span", { class: "color-field" }, input, code));
}
/** Two or more mutually exclusive options, rendered as a segmented control. */
function segmented(label, options, value, onChange) {
	const buttons = options.map((o) => {
		const b = h("button", {
			type: "button",
			"aria-pressed": String(o.value === value)
		}, o.label);
		b.addEventListener("click", () => {
			for (const other of buttons) other.setAttribute("aria-pressed", String(other === b));
			onChange(o.value);
		});
		return b;
	});
	return h("div", { class: "control" }, h("span", { class: "control-label" }, label), h("div", {
		class: "segmented",
		role: "group",
		"aria-label": label
	}, ...buttons));
}
/** Square icon-only button; the label becomes its accessible name and tooltip. */
function iconButton(name, label, onClick, disabled = false) {
	const el = h("button", {
		type: "button",
		class: "icon-btn",
		"aria-label": label,
		title: label,
		disabled
	});
	el.append(icon(name));
	el.addEventListener("click", (e) => {
		e.stopPropagation();
		onClick();
	});
	return el;
}
//#endregion
//#region junkyard/shadowbox/ui/layer-editor.ts
function move(list, from, to) {
	const [item] = list.splice(from, 1);
	list.splice(to, 0, item);
}
var THUMB_SCALE = .35;
var summary = (l) => `${l.inset ? "inset " : ""}${l.x} ${l.y} ${l.blur} ${l.spread}`;
/** A layer as a compact row; the open row reveals its controls. */
function layerRow(layer, ctx) {
	const { store, index, total } = ctx;
	const thumb = h("span", { class: "layer-thumb" }, h("span", {}));
	const values = h("code", { class: "layer-values" }, summary(layer));
	const dot = h("span", { class: "layer-dot" });
	const paint = (l) => {
		const k = THUMB_SCALE;
		thumb.firstElementChild.style.boxShadow = layerToCss({
			...l,
			x: l.x * k,
			y: l.y * k,
			blur: l.blur * k,
			spread: l.spread * k,
			alpha: Math.max(l.alpha, .45)
		});
		dot.style.background = l.color;
		values.textContent = summary(l);
	};
	paint(layer);
	const edit = (mutate) => {
		store.update((d) => mutate(d.layers[index]));
		paint(store.current.layers[index]);
	};
	const structural = (mutate) => store.update((d) => mutate(d.layers), "structure");
	const head = h("div", {
		class: "layer-head",
		role: "button",
		tabindex: 0,
		"aria-expanded": String(ctx.open)
	}, thumb, h("span", { class: "layer-title" }, h("strong", {}, `Layer ${index + 1}`), values), dot, h("span", { class: "layer-actions" }, iconButton("up", "Move up", () => structural((ls) => move(ls, index, index - 1)), index === 0), iconButton("down", "Move down", () => structural((ls) => move(ls, index, index + 1)), index === total - 1), iconButton("duplicate", "Duplicate", () => structural((ls) => ls.splice(index + 1, 0, { ...ls[index] })), total >= 12), iconButton("trash", "Remove", () => structural((ls) => ls.splice(index, 1)))), h("span", { class: "layer-chevron" }, icon("chevron")));
	head.addEventListener("click", ctx.toggle);
	head.addEventListener("keydown", (e) => {
		if (e.target === head && (e.key === "Enter" || e.key === " ")) {
			e.preventDefault();
			ctx.toggle();
		}
	});
	const body = ctx.open ? h("div", { class: "layer-body" }, segmented("Type", [{
		value: "drop",
		label: "Drop"
	}, {
		value: "inset",
		label: "Inset"
	}], layer.inset ? "inset" : "drop", (v) => edit((l) => l.inset = v === "inset")), ...LAYER_FIELDS.map((f) => rangeControl({
		...f,
		value: layer[f.key],
		unit: "px",
		onInput: (v) => edit((l) => l[f.key] = v)
	})), colorControl("Color", layer.color, (hex) => edit((l) => l.color = hex)), rangeControl({
		label: "Opacity",
		min: 0,
		max: 100,
		step: 1,
		unit: "%",
		value: Math.round(layer.alpha * 100),
		onInput: (v) => edit((l) => l.alpha = Math.min(1, Math.max(0, v / 100)))
	})) : null;
	return h("li", { class: `layer${ctx.open ? " is-open" : ""}` }, head, body);
}
/** Rebuilds the layer list on structural changes; value edits update in place. */
function mountLayerEditor(root, store) {
	let openIndex = 0;
	const render = () => {
		const { layers } = store.current;
		openIndex = Math.min(openIndex, layers.length - 1);
		const add = h("button", {
			type: "button",
			class: "add-layer",
			disabled: layers.length >= 12
		}, icon("plus"), "Add layer");
		add.addEventListener("click", () => {
			openIndex = layers.length;
			store.update((d) => d.layers.push(defaultLayer()), "structure");
		});
		root.replaceChildren(h("ol", { class: "layer-list" }, ...layers.map((l, i) => layerRow(l, {
			store,
			index: i,
			total: layers.length,
			open: i === openIndex,
			toggle: () => {
				openIndex = openIndex === i ? -1 : i;
				render();
			}
		}))), add);
	};
	store.subscribe((_, kind) => kind === "structure" && render());
	render();
}
//#endregion
//#region junkyard/shadowbox/presets/scenes.ts
/** One-click stage backdrops. Add a scene by adding a record. */
var SCENES = [
	{
		name: "Gallery",
		background: "#f1f1f4",
		surface: "#ffffff"
	},
	{
		name: "Plaster",
		background: "#ece6da",
		surface: "#faf7f0"
	},
	{
		name: "Sky",
		background: "#dfe8f7",
		surface: "#ffffff"
	},
	{
		name: "Sage",
		background: "#dfe7dc",
		surface: "#f7faf5"
	},
	{
		name: "Clay",
		background: "#e0e5ec",
		surface: "#e0e5ec"
	},
	{
		name: "Terracotta",
		background: "#e9b99a",
		surface: "#f8e7db"
	},
	{
		name: "Slate",
		background: "#1d2027",
		surface: "#2a2e38"
	},
	{
		name: "Ink",
		background: "#0e0e10",
		surface: "#1a1a1e"
	}
];
//#endregion
//#region junkyard/shadowbox/ui/stage-editor.ts
function sceneSwatch(scene, store) {
	const { stage } = store.current;
	const active = stage.background === scene.background && stage.surface === scene.surface;
	const swatch = h("button", {
		type: "button",
		class: "scene",
		title: scene.name,
		"aria-label": `${scene.name} scene`,
		"aria-pressed": String(active)
	});
	swatch.style.setProperty("--scene-bg", scene.background);
	swatch.style.setProperty("--scene-surface", scene.surface);
	swatch.addEventListener("click", () => store.update((d) => {
		d.stage.background = scene.background;
		d.stage.surface = scene.surface;
	}, "structure"));
	return swatch;
}
/** Scene backdrops, colors and box geometry. */
function mountStageEditor(root, store) {
	const render = () => {
		const { stage } = store.current;
		root.replaceChildren(h("div", {
			class: "scenes",
			role: "group",
			"aria-label": "Scenes"
		}, ...SCENES.map((s) => sceneSwatch(s, store))), h("div", { class: "scene-colors" }, colorControl("Backdrop", stage.background, (v) => store.update((d) => d.stage.background = v)), colorControl("Surface", stage.surface, (v) => store.update((d) => d.stage.surface = v))), ...STAGE_FIELDS.map((f) => rangeControl({
			...f,
			value: stage[f.key],
			unit: "px",
			onInput: (v) => store.update((d) => d.stage[f.key] = v)
		})));
	};
	store.subscribe((_, kind) => kind === "structure" && render());
	render();
}
//#endregion
//#region junkyard/shadowbox/ui/preview.ts
/** How far from the center the light orb sits, as a share of the stage half-size. */
var LIGHT_ORBIT = .78;
var MORPH_MS = 420;
/**
* Paints the stage: the box, its shadow, the light orb and the readout.
* Shows the peeked design while one is set, the edited design otherwise.
*/
function mountPreview(els, store, peek) {
	let morphTimer = 0;
	const render = () => {
		const { layers, stage } = peek.current ?? store.current;
		const angle = lightAngle(layers);
		els.stage.style.setProperty("--stage-bg", stage.background);
		els.stage.dataset.tone = isDark(stage.background) ? "dark" : "light";
		els.stage.classList.toggle("is-peeking", Boolean(peek.current));
		els.box.style.background = stage.surface;
		els.box.style.borderRadius = `${stage.radius}px`;
		els.box.style.setProperty("--box-size", `${stage.size}px`);
		els.box.style.boxShadow = layersToCss(layers);
		els.stage.style.setProperty("--lcos", String(Math.cos(angle)));
		els.stage.style.setProperty("--lsin", String(Math.sin(angle)));
		els.light.classList.toggle("is-idle", !hasOffset(layers));
		const lit = hasOffset(layers) ? `${compassDegrees(angle)}°` : "overhead";
		els.readout.textContent = `${peek.current ? "Preview" : "Light"} ${lit} · ${layers.length} ${layers.length === 1 ? "layer" : "layers"}`;
	};
	store.subscribe(render);
	peek.subscribe(render);
	render();
	return { 
	/** Lets the next change animate, e.g. when a whole preset loads. */
morph: () => {
		els.stage.classList.add("is-morphing");
		window.clearTimeout(morphTimer);
		morphTimer = window.setTimeout(() => els.stage.classList.remove("is-morphing"), MORPH_MS);
	} };
}
//#endregion
//#region junkyard/shadowbox/ui/light-drag.ts
var MIN_SCALE = .2;
var MAX_SCALE = 3;
var KEY_STEP = Math.PI / 36;
/**
* Drag anywhere on the stage to move the light. Every layer's offset rotates
* to fall away from the pointer, and its length scales with the pointer's
* distance from the box (the orb's resting orbit is 1x).
*/
function mountLightDrag(stage, light, store) {
	const apply = (base, rotate, scale) => store.update((d) => d.layers = relight(base, rotate, scale), "structure");
	stage.addEventListener("pointerdown", (down) => {
		if (down.button !== 0 || down.target.closest("button, input")) return;
		const base = store.current.layers.map((l) => ({ ...l }));
		if (!base.some((l) => l.x !== 0 || l.y !== 0)) return;
		const angle0 = lightAngle(base);
		const rect = stage.getBoundingClientRect();
		const cx = rect.left + rect.width / 2;
		const cy = rect.top + rect.height / 2;
		const orbit = Math.min(rect.width, rect.height) / 2 * LIGHT_ORBIT;
		const move = (e) => {
			const dx = e.clientX - cx;
			const dy = e.clientY - cy;
			const scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, Math.hypot(dx, dy) / orbit));
			apply(base, Math.atan2(dy, dx) - angle0, scale);
		};
		const end = () => {
			stage.removeEventListener("pointermove", move);
			stage.classList.remove("is-dragging");
		};
		stage.setPointerCapture(down.pointerId);
		stage.classList.add("is-dragging");
		move(down);
		stage.addEventListener("pointermove", move);
		stage.addEventListener("pointerup", end, { once: true });
		stage.addEventListener("pointercancel", end, { once: true });
	});
	light.addEventListener("keydown", (e) => {
		const turn = {
			ArrowLeft: -KEY_STEP,
			ArrowUp: -KEY_STEP,
			ArrowRight: KEY_STEP,
			ArrowDown: KEY_STEP
		}[e.key];
		if (turn === void 0) return;
		e.preventDefault();
		apply(store.current.layers, turn * (e.shiftKey ? 3 : 1), 1);
	});
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
//#region junkyard/shadowbox/ui/highlight.ts
/** Token classes, matched in order. Add a rule by adding a record. */
var RULES = [
	{
		kind: "color",
		pattern: /#[0-9a-f]{3,8}\b|(?:rgba?|hsla?|oklch)\([^)]*\)/iy
	},
	{
		kind: "number",
		pattern: /-?\d*\.?\d+(?:px|rem|em|%)?/y
	},
	{
		kind: "keyword",
		pattern: /\b(?:inset|none)\b/y
	},
	{
		kind: "property",
		pattern: /[a-z-]+(?=\s*:)|boxShadow|--shadow|shadow-\[/iy
	}
];
/** Splits a code snippet into spans for color coding. Text nodes only, so it is injection-safe. */
function highlight(code) {
	const out = [];
	let plain = "";
	let i = 0;
	while (i < code.length) {
		const rule = RULES.find((r) => {
			r.pattern.lastIndex = i;
			return r.pattern.test(code);
		});
		if (!rule) {
			plain += code[i++];
			continue;
		}
		const end = rule.pattern.lastIndex;
		if (plain) out.push(plain);
		plain = "";
		out.push(h("span", { class: `tok-${rule.kind}` }, code.slice(i, end)));
		i = end;
	}
	if (plain) out.push(plain);
	return out;
}
//#endregion
//#region junkyard/shadowbox/ui/output.ts
var FORMAT_KEY = "junkyard.shadowbox.format";
/** Code panel: pick a target format from the tabs, copy the snippet. */
function mountOutput(root, store) {
	let formatId = readJson(FORMAT_KEY, OUTPUT_FORMATS[0].id);
	const code = h("pre", { class: "code" }, h("code", {}));
	const snippet = () => {
		return (OUTPUT_FORMATS.find((f) => f.id === formatId) ?? OUTPUT_FORMATS[0]).render(layersToCss(store.current.layers));
	};
	const render = () => code.firstElementChild.replaceChildren(...highlight(snippet()));
	const tabs = OUTPUT_FORMATS.map((f) => {
		const tab = h("button", {
			type: "button",
			role: "tab",
			"aria-selected": String(f.id === formatId)
		}, f.label);
		tab.addEventListener("click", () => {
			formatId = f.id;
			writeJson(FORMAT_KEY, formatId);
			for (const t of tabs) t.setAttribute("aria-selected", String(t === tab));
			render();
		});
		return tab;
	});
	const copyLabel = h("span", {}, "Copy");
	const copyButton = h("button", {
		type: "button",
		class: "primary copy-btn",
		title: "Copy code (C)"
	}, icon("copy"), copyLabel);
	const copy = () => void copyText(snippet(), copyLabel);
	copyButton.addEventListener("click", copy);
	root.replaceChildren(h("div", { class: "output-bar" }, h("div", {
		class: "tabs",
		role: "tablist",
		"aria-label": "Output format"
	}, ...tabs), copyButton), code);
	store.subscribe(render);
	render();
	return { copy };
}
//#endregion
//#region src/lib/tokenize.ts
var STOPWORDS = new Set("a an and are as at be by for from has have in is it its of on or that the this to was were will with you your".split(" "));
/** Lowercase word tokens, shared by the index builder and the search UI. */
function tokenize(text) {
	return text.toLowerCase().split(/[^a-z0-9]+/).filter((t) => t.length > 1 && !STOPWORDS.has(t));
}
//#endregion
//#region junkyard/shadowbox/ui/preset-browser.ts
var ALL = "all";
var pad = (n) => String(n).padStart(2, "0");
function matches(preset, collection, query) {
	const hay = tokenize(`${preset.name} ${collection.name} ${preset.css}`);
	return query.every((q) => hay.some((t) => t.startsWith(q)));
}
/** One cell of the specimen drawer. The whole cell loads the preset; hover or focus previews it. */
function specimen(preset, collection, opts) {
	const stage = {
		...DEFAULT_STAGE,
		...preset.stage
	};
	const box = h("span", { class: "specimen-box" });
	box.style.background = stage.surface;
	box.style.borderRadius = `${Math.min(stage.radius, 18)}px`;
	box.style.boxShadow = preset.css;
	const pick = h("button", {
		type: "button",
		class: "specimen-pick",
		title: `Edit ${preset.name}`
	}, box, h("span", { class: "specimen-name" }, preset.name));
	pick.style.setProperty("--specimen-bg", stage.background);
	pick.addEventListener("click", () => opts.onPick(preset));
	const copy = iconButton("copy", `Copy ${preset.name} CSS`, () => void copyText(`box-shadow: ${preset.css};`).then((ok) => {
		copy.classList.toggle("is-done", ok);
		window.setTimeout(() => copy.classList.remove("is-done"), 1200);
	}));
	const cell = h("li", { class: "specimen" }, pick, h("span", { class: "specimen-tools" }, copy, collection.id === "mine" ? iconButton("trash", `Delete ${preset.name}`, () => opts.onDelete(preset)) : null));
	cell.addEventListener("pointerenter", () => opts.onPeek(preset));
	cell.addEventListener("pointerleave", () => opts.onPeek(void 0));
	pick.addEventListener("focus", () => opts.onPeek(preset));
	pick.addEventListener("blur", () => opts.onPeek(void 0));
	return cell;
}
/** Searchable specimen drawer of every collection, built-in and saved. */
function mountPresetBrowser(root, opts) {
	let selected = ALL;
	const search = h("input", {
		type: "search",
		placeholder: "Search 160 shadows: material 8, neon, inset...",
		"aria-label": "Search presets"
	});
	const index = h("nav", {
		class: "collection-index",
		"aria-label": "Collections"
	});
	const list = h("div", { class: "collections" });
	root.replaceChildren(h("div", { class: "browser-bar" }, h("label", { class: "search-field" }, icon("search"), search), index), list);
	const indexButton = (id, label, count) => {
		const b = h("button", {
			type: "button",
			"aria-pressed": String(id === selected)
		}, label, h("sup", {}, String(count)));
		b.addEventListener("click", () => {
			selected = id;
			refresh();
		});
		return b;
	};
	const refresh = () => {
		const collections = opts.collections();
		if (!collections.some((c) => c.id === selected)) selected = ALL;
		search.placeholder = `Search ${collections.reduce((n, c) => n + c.presets.length, 0)} shadows: material 8, neon, inset...`;
		index.replaceChildren(indexButton(ALL, "All", collections.reduce((n, c) => n + c.presets.length, 0)), ...collections.map((c) => indexButton(c.id, c.name, c.presets.length)));
		const query = tokenize(search.value);
		const sections = collections.map((c, i) => ({
			c,
			n: i + 1,
			presets: c.presets.filter((p) => matches(p, c, query))
		})).filter(({ c, presets }) => (selected === ALL || c.id === selected) && presets.length > 0).map(({ c, n, presets }) => h("section", { class: "collection" }, h("header", { class: "collection-head" }, h("span", { class: "collection-no" }, pad(n)), h("h3", {}, c.name), h("span", { class: "collection-count" }, `${presets.length} ${presets.length === 1 ? "shadow" : "shadows"}`), c.note ? h("p", { class: "note" }, c.note) : null), h("ul", { class: "specimens" }, ...presets.map((p) => specimen(p, c, opts)))));
		list.replaceChildren(...sections.length ? sections : [h("p", { class: "empty" }, "Nothing in the collection matches that search.")]);
	};
	search.addEventListener("input", refresh);
	refresh();
	return {
		refresh,
		focusSearch: () => search.focus()
	};
}
//#endregion
//#region junkyard/shadowbox/ui/shortcuts.ts
var isTyping = (target) => target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName));
function describe(e) {
	const parts = [];
	if (e.metaKey || e.ctrlKey) parts.push("mod");
	if (e.shiftKey && e.key.length === 1 && /[a-z]/i.test(e.key)) parts.push("shift");
	parts.push(e.key.toLowerCase());
	return parts.join("+");
}
/**
* Global shortcuts. Single-key shortcuts never fire while typing, and
* mod+z is left to text fields so their own undo keeps working.
*/
function bindShortcuts(shortcuts) {
	document.addEventListener("keydown", (e) => {
		const match = shortcuts.find((s) => s.keys === describe(e));
		if (!match || isTyping(e.target) && !match.global) return;
		e.preventDefault();
		match.run();
	});
}
/** Paste anywhere outside a text field to hand the text to `onText`. */
function bindPaste(onText) {
	document.addEventListener("paste", (e) => {
		if (isTyping(e.target)) return;
		const text = e.clipboardData?.getData("text/plain");
		if (!text) return;
		e.preventDefault();
		onText(text);
	});
}
//#endregion
//#region junkyard/shadowbox/ui/share.ts
var PARAM = "s";
function designFromHash() {
	const encoded = readHashParam(PARAM);
	return encoded ? decodeDesign(encoded) : void 0;
}
function shareUrl(design) {
	const url = new URL(window.location.href);
	url.hash = hashWithParam(PARAM, encodeDesign(design));
	return url.toString();
}
/**
* Keeps the URL fragment in sync with the design so the address bar is
* always a bookmarkable link. Loads designs when the hash changes
* (opening a bookmark, back/forward).
*/
function syncHash(store) {
	let timer = 0;
	store.subscribe(() => {
		window.clearTimeout(timer);
		timer = window.setTimeout(() => {
			history.replaceState(null, "", hashWithParam(PARAM, encodeDesign(store.current)));
		}, 250);
	});
	window.addEventListener("hashchange", () => {
		const encoded = readHashParam(PARAM);
		if (!encoded || encoded === encodeDesign(store.current)) return;
		const design = decodeDesign(encoded);
		if (design) store.load(design);
	});
}
function copyShareLink(store) {
	return copyText(shareUrl(store.current));
}
//#endregion
//#region junkyard/shadowbox/main.ts
var fallback = designFromPreset(BUILT_IN_COLLECTIONS[0].presets[13]);
if (!fallback) throw new Error("Default preset failed to parse");
hydrateIcons();
var store = new DesignStore(designFromHash() ?? fallback);
var history$1 = new History(store);
var peek = new Peek();
var toast = createToast(byId("toast"));
var userPresets = loadUserPresets();
var stage = byId("stage");
var light = byId("light");
var preview = mountPreview({
	stage,
	box: byId("box"),
	light,
	readout: byId("readout")
}, store, peek);
mountLightDrag(stage, light, store);
mountLayerEditor(byId("layers"), store);
mountStageEditor(byId("scene"), store);
var output = mountOutput(byId("output"), store);
syncHash(store);
/** Loads a whole design with a morph, so switching presets reads as one motion. */
var loadDesign = (design) => {
	preview.morph();
	peek.clear();
	store.load(design);
};
var nameInput = byId("name");
var showName = () => nameInput.value = store.current.name;
store.subscribe((_, kind) => kind === "structure" && showName());
showName();
nameInput.addEventListener("input", () => store.update((d) => d.name = cleanName(nameInput.value)));
var browser = mountPresetBrowser(byId("library"), {
	collections: () => userPresets.length ? [userCollection(userPresets), ...BUILT_IN_COLLECTIONS] : BUILT_IN_COLLECTIONS,
	onPeek: (preset) => peek.show(preset && designFromPreset(preset)),
	onPick: (preset) => {
		const design = designFromPreset(preset);
		if (!design) return toast(`Could not read "${preset.name}"`);
		loadDesign(design);
		toast(`Loaded ${preset.name}`);
		if (window.scrollY > stage.offsetTop) window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	},
	onDelete: (preset) => {
		userPresets = deleteUserPreset(preset.name);
		browser.refresh();
		toast(`Deleted ${preset.name}`);
	}
});
var undoButton = byId("undo");
var redoButton = byId("redo");
var syncHistoryButtons = () => {
	undoButton.disabled = !history$1.canUndo;
	redoButton.disabled = !history$1.canRedo;
};
history$1.onChange(syncHistoryButtons);
store.subscribe(syncHistoryButtons);
syncHistoryButtons();
undoButton.addEventListener("click", () => history$1.undo());
redoButton.addEventListener("click", () => history$1.redo());
var save = () => {
	const { name, layers, stage: scene } = store.current;
	userPresets = saveUserPreset({
		name: name || "Untitled",
		css: layersToCss(layers),
		stage: scene
	});
	browser.refresh();
	toast(`Saved "${name || "Untitled"}" to My presets`);
};
byId("save").addEventListener("click", save);
var share = () => void copyShareLink(store).then((ok) => toast(ok ? "Share link copied" : "Could not copy the link"));
byId("share").addEventListener("click", share);
byId("tint").addEventListener("click", () => {
	store.update((d) => d.layers = tintLayers(d.layers, d.stage.background), "structure");
	toast("Shadow colors tinted from the backdrop");
});
var importCss = (text) => {
	const layers = parseBoxShadow(text);
	if (!layers) return toast("That is not a box-shadow I can read");
	loadDesign({
		...store.current,
		name: "Imported",
		layers
	});
	toast(`Imported ${layers.length} ${layers.length === 1 ? "layer" : "layers"}`);
};
bindPaste(importCss);
var importText = byId("import-text");
byId("import").addEventListener("click", () => importCss(importText.value));
bindShortcuts([
	{
		keys: "mod+z",
		run: () => history$1.undo()
	},
	{
		keys: "mod+shift+z",
		run: () => history$1.redo()
	},
	{
		keys: "mod+y",
		run: () => history$1.redo()
	},
	{
		keys: "mod+s",
		run: save,
		global: true
	},
	{
		keys: "c",
		run: output.copy
	},
	{
		keys: "/",
		run: browser.focusSearch
	}
]);
//#endregion

//# sourceMappingURL=main.js.map