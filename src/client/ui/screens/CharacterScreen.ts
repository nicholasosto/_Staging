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
import { StateDebugPanel } from "../organisms/StateDebugPanel";
import { PlayerStateInstance } from "client/states/PlayerState";
const Key: ScreenKey = "Character";

export const CharacterScreen = () => {
	return GameWindow({
		Name: `${Key}Screen`,
		ScreenKey: Key,
		Content: {
			StateDebugPanel: StateDebugPanel({
				Value1: PlayerStateInstance.Resources.Health.current,
				Value2: PlayerStateInstance.Resources.Mana.current,
				Value3: PlayerStateInstance.Resources.Stamina.current,
				Computed1: PlayerStateInstance.Resources.Health.percent,
				Computed2: PlayerStateInstance.Resources.Mana.percent,
				Computed3: PlayerStateInstance.Resources.Stamina.percent,
			}),
		},
	});
};
