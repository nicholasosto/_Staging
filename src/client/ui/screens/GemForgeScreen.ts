/// <reference types="@rbxts/types" />

/**
 * @file        GemForgeScreen.ts
 * @module      GemForgeScreen
 * @layer       Client/UI/Screens
 * @description UI screen for forging manifestation gems.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 *
 * @author       Codex
 * @license      MIT
 * @since        0.2.1
 * @lastUpdated  2025-07-01 by Codex – Reconstructed screen
 *
 * @dependencies
 *   @rbxts/fusion ^0.4.0
 */

import { GameWindow } from "../molecules";
import { ScreenKey } from "client/states";
const Key: ScreenKey = "GemForge";

export const GemForgeScreen = () => {
	return GameWindow({
		ScreenKey: Key,
		Name: `${Key}Screen`,
		Content: {},
	});
};
