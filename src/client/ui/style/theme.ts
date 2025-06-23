/// <reference types="@rbxts/types" />

/**
 * @file        theme.ts
 * @module      Theme
 * @layer       Client/Style
 * @description Shared color palette and theme tokens.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 */

/* =============================================== Color Tokens ================================ */

export const GameColors = {
	StrokeHover: new Color3(0.24, 0.13, 0.01),
	StrokeDefault: new Color3(0.11, 0, 0),
	TextDefault: new Color3(1, 1, 1),
	BackgroundDefault: new Color3(0.1, 0.1, 0.1),
	BackgroundHover: new Color3(0.2, 0.2, 0.2),
	GradientStart: new Color3(0.2, 0.2, 0.2),
	GradientEnd: new Color3(0.1, 0.1, 0.1),
	TextHover: new Color3(1, 1, 1),
	TextDisabled: new Color3(0.5, 0.5, 0.5),
	ButtonBackground: new Color3(0.2, 0.2, 0.2),
	ButtonBackgroundHover: new Color3(0.79, 0.1, 0.1),
	ButtonText: new Color3(1, 1, 1),
	ButtonTextHover: new Color3(1, 1, 1),
	ScrollBar: new Color3(0.3, 0.3, 0.3),
};

/* =============================================== Theme Defaults ============================= */

export const Theme = {
	FrameTransparency: 0.8,
	BackgroundColor3: Color3.fromRGB(30, 30, 30),
};
