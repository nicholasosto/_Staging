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
import { IconButton, DataButtons, GamePanel, ItemButton, BorderImage, GameImage, Padding, ResourceBars } from "./ui";

/* =============================================== UI Imports ========================================= */

const playerGui = Players.LocalPlayer.WaitForChild("PlayerGui");

/* =============================================== UI Components ========================================= */
// Game Images
const ColorableGem = GameImage({
	Name: "ColorableGem",
	Image: GameImages.Gems.Colorable,
	Size: UDim2.fromOffset(50, 50),
});
// Drag Panel
const DragPanel = GamePanel({
	Name: "DragPanel",
	Size: UDim2.fromOffset(500, 500),
	Position: UDim2.fromScale(0.5, 0.5),
	AnchorPoint: new Vector2(0.5, 0.5),
	DragEnabled: true,
	BorderImage: BorderImage.GothicMetal(),
	Padding: Padding(4),
	Children: {
		Top: GamePanel({
			Name: "Top",
			Size: UDim2.fromScale(1, 0.5),
			Children: {
				ResourceBars: ResourceBars(),
			},
		}),
		Bottom: GamePanel({
			Name: "Bottom",
			Size: UDim2.fromScale(1, 0.5),
			Position: UDim2.fromScale(0, 0.5),
			BackgroundTransparency: 0.5,
			BackgroundColor3: new Color3(0.2, 0.2, 0.2),
			Children: {
				Image: GameImage({
					Name: "BottomImage",
					Image: GameImages.Ability.Blood_Siphon,
				}),
			},
		}),
	},
});

const ScreenGUI = New("ScreenGui")({
	Name: "Main GUI",
	DisplayOrder: 1000,
	ResetOnSpawn: false,
	Parent: playerGui,
	Enabled: false, // Initially disabled
	[Children]: {
		DragPanel: DragPanel,
	},
});

ScreenGUI.Enabled = true; // Enable the GUI
