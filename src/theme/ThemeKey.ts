/// <reference types="@rbxts/types" />

/**
 * @file        ThemeKey.ts
 * @module      ThemeKey
 * @layer       Shared
 * @description Enumeration of available themes.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 */

/* =============================================== Theme Enumeration ======================= */

export enum ThemeKey {
	CyberGothic = "CyberGothic",
	SolarDrift = "SolarDrift",
}

export const DEFAULT_THEME = ThemeKey.CyberGothic;
