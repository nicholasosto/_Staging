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
import { ScreenKey } from "shared";
import { PlayerStateInstance } from "client/states/PlayerState";
import { AttributeControlCard } from "../organisms";
import { Padding } from "../tokens";

const Key: ScreenKey = "Character";

/* Attribute Control Properties */
const AttributeControlProps = {
	Size: new UDim2(0, 300, 0.5, 0),
	Position: new UDim2(0, 0, 0.5, 0),
	AnchorPoint: new Vector2(0, 0.5),
	BackgroundTransparency: 1,
	LayoutOrder: 0,
	ZIndex: 1,
	AttributeSlice: PlayerStateInstance.Attributes,
};

/* Window Properties */
const GameWindowProps = {
	Name: `${Key}Screen`,
	ScreenKey: Key,
	Padding: Padding(10),
	Content: {
		AttributeControls: AttributeControlCard(AttributeControlProps),
	},
};

export const CharacterScreen = () => {
	return GameWindow(GameWindowProps);
};
