/// <reference types="@rbxts/types" />

/**
 * @file        InventoryScreen.ts
 * @module      InventoryScreen
 * @layer       Client/UI/Screens
 * @description UI screen for managing the player's inventory.
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
import { ScreenKey } from "shared";
const Key: ScreenKey = "Inventory";

export const InventoryScreen = () => {
	return GameWindow({
		Name: `${Key}Screen`,
		ScreenKey: Key,
		Content: {},
	});
};
