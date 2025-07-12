/// <reference types="@rbxts/types" />

/**
 * @file        ShopScreen.ts
 * @module      ShopScreen
 * @layer       Client/UI/Screens
 * @description UI screen for purchasing items from the shop.
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

import { GameWindow } from "client/ui/atoms";
import { ScreenKey } from "shared";

const Key: ScreenKey = "Shop";
export const ShopScreen = () => {
	return GameWindow({
		Name: `${Key}Screen`,
		ScreenKey: Key,
		Content: {},
	});
};
