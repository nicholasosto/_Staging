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
import { GameImages } from "shared/assets/image";
import { GamePanel, BorderImage, GameImage, Padding, ResourceBars, IconButton } from "./ui";
import { Network } from "shared";
import { EventButtons } from "./ui/organisms/EventButtons";

/* =============================================== Events and Remotes ============================================= */

const SpawnManifestationEvent = Network.Client.Get("SpawnManifestation");

/* =============================================== UI Imports ========================================= */

const playerGui = Players.LocalPlayer.WaitForChild("PlayerGui");

/* =============================================== UI Components ========================================= */
// Spawn Manifestation Button
const SpawnManifestationButton = IconButton({
	Icon: GameImages.Gems.Colorable,
	OnClick: () => {
		const formId = "exampleForm"; // Replace with actual form ID
		const abilityId = "exampleAbility"; // Replace with actual ability ID
		const bonusId = "exampleBonus"; // Replace with actual bonus ID
		SpawnManifestationEvent.SendToServer(formId, abilityId, bonusId);
	},
});

// Game Images
const ColorableGem1 = GameImage({
	Name: "ColorableGem1",
	Image: GameImages.Gems.Colorable,
	Size: UDim2.fromOffset(50, 50),
});
const ColorableGem2 = GameImage({
	Name: "ColorableGem2",
	Image: GameImages.Gems.Colorable,
	ImageColor3: new Color3(0.5, 0.5, 1),
	Size: UDim2.fromOffset(50, 50),
});
// Drag Panel
const DragPanel = GamePanel({
	Name: "DragPanel",
	Size: UDim2.fromOffset(500, 500),
	DragEnabled: true,
	BorderImage: BorderImage.GothicMetal(),
	Padding: Padding(4),
	Children: {
		Top: GamePanel({
			Name: "Top",
			Size: UDim2.fromScale(1, 0.5),
			Children: {
				ColorImage: ColorableGem1,
				TestingObject: SpawnManifestationButton,
			},
		}),
		Bottom: GamePanel({
			Name: "Bottom",
			Size: UDim2.fromScale(1, 0.5),
			Position: UDim2.fromScale(0, 0.5),
			BackgroundTransparency: 0.5,
			BackgroundColor3: new Color3(0.2, 0.2, 0.2),
			Children: {
				ColorImage2: ColorableGem2,
				SpawnManifestationButton: SpawnManifestationButton,
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
		EventButtons: EventButtons(),
		DragPanel: DragPanel,
	},
});

ScreenGUI.Enabled = true; // Enable the GUI
