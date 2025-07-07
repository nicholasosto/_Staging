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

import { GameImages } from "shared";
import { IconButton } from "client/ui/atoms";
import { GameWindow } from "client/ui/molecules";
import { ScreenKey } from "client/states";
import { AnimationButtons } from "../organisms";

const Key: ScreenKey = "Shop";
export const ShopScreen = () => {
	return GameWindow({
		Name: `${Key}Screen`,
		ScreenKey: Key,
		Content: {
			AnimationButtons: AnimationButtons(),
			IconButton: IconButton({
				Rarity: "Epic",
				Icon: GameImages.Currency.Coins,
				Size: new UDim2(0, 100, 0, 100),
				OnClick: () => {
					print("Shop Icon Clicked");
				},
			}),
		},
	});
};
