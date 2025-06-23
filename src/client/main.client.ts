/// <reference types="@rbxts/types" />

/**
 * @file        src/client/main.client.ts
 * @module      ClientMain
 * @layer       Client
 * @description Main entry point for the client-side application.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 *
 * @author       Trembus
 * @license      MIT
 * @since        0.2.0
 * @lastUpdated  2025-06-25 by Trembus – Initial creation
 *
 * @dependencies
 *   @rbxts/fusion ^0.4.0
 */

/* =============================================== External Imports ============================================= */
import { Children, New } from "@rbxts/fusion";
import { Players } from "@rbxts/services";
import { Network } from "shared/network";
import { GameImages } from "shared/assets/image";
import { IconButton, GameImage, GamePanel, testContainer } from "./ui";

/* =============================================== UI Imports ========================================= */

const playerGui = Players.LocalPlayer.WaitForChild("PlayerGui");

const IconButtonTest = IconButton({
	Icon: GameImages.Control.Close,
	OnClick: () => {
		const character = Players.LocalPlayer.Character;
		if (!character) {
			warn("No character found for player.");
			return;
		}
		Network.Client.Get("SpawnManifestation").SendToServer(character.GetPivot());
	},
});

New("ScreenGui")({
	Name: "GamePanelGui",
	DisplayOrder: 1000,
	ResetOnSpawn: false,
	Parent: playerGui,
	[Children]: {
		GamePanel: GamePanel({
			Name: "GamePanel",
			Size: UDim2.fromOffset(800, 600),
			Children: {
				IconButtonTestArea: IconButtonTest,
			},
		}),
		LayoutContainer: testContainer,
	},
});
