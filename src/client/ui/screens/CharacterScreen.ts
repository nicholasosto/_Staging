/// <reference types="@rbxts/types" />

/**
 * @file        CharacterScreen.ts
 * @module      CharacterScreen
 * @layer       Client/UI/Screens
 * @description UI screen for viewing the player's character details.
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
import { ScreenKey } from "client/states";
import { PlayerStateInstance } from "client/states/PlayerState";
import { AttributeControls } from "../organisms";
const Key: ScreenKey = "Character";

export const CharacterScreen = () => {
	const attributeControls = AttributeControls({
		AttributeSlice: PlayerStateInstance.Attributes,
		Size: new UDim2(1, 0, 0.5, 0),
		Position: new UDim2(0, 0, 0.5, 0),
		BackgroundTransparency: 1,
		AnchorPoint: new Vector2(0.5, 0.5),
		LayoutOrder: 0,
		ZIndex: 1,
	});
	return GameWindow({
		Name: `${Key}Screen`,
		ScreenKey: Key,
		Content: {
			AttributeControls: attributeControls,
		},
	});
};
