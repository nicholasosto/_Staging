/// <reference types="@rbxts/types" />

/**
 * @file        SettingsScreen.ts
 * @module      SettingsScreen
 * @layer       Client/UI/Screens
 * @description UI screen for adjusting player settings.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 *
 * @author       Codex
 * @license      MIT
 * @since        0.2.1
 * @lastUpdated  2025-07-01 by Codex – Initial stub
 *
 * @dependencies
 *   @rbxts/fusion ^0.4.0
 */

import { GameWindow } from "../molecules";

export const SettingsScreen = () => {
	return GameWindow({
		ScreenKey: "Settings",
		Content: {},
	});
};
