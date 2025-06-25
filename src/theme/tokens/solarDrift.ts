/// <reference types="@rbxts/types" />

/**
 * @file        solarDrift.ts
 * @module      SolarDriftTokens
 * @layer       Shared
 * @description Example token table for the SolarDrift theme.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 */

import { ThemeTokens } from "../types";
import { Sizes } from "../../constants/Sizes";

/* =============================================== Token Table ============================= */

export const solarDrift: ThemeTokens = {
	colours: {
		panelBg: Color3.fromRGB(28, 12, 40),
		panelBorder: Color3.fromRGB(255, 175, 0),
		textPrimary: Color3.fromRGB(255, 175, 0),
		textSecondary: Color3.fromRGB(255, 226, 179),
	},
	fonts: {
		family: Enum.Font.SciFi,
		weightNormal: 400,
		weightBold: 700,
	},
	images: {
		panelBorderSlice: "rbxassetid://9876543210",
	},
};
