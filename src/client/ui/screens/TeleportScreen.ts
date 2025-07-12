/// <reference types="@rbxts/types" />

/**
 * @file        TeleportScreen.ts
 * @module      TeleportScreen
 * @layer       Client/UI/Screens
 * @description UI screen for teleporting to different locations.
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

import { ScreenKey } from "shared";
import { GameWindow } from "client/ui/atoms";

const Key: ScreenKey = "Teleport";

export const TeleportScreen = () => {
	return GameWindow({
		Name: `${Key}Screen`,
		ScreenKey: Key,
		Content: {},
	});
};
