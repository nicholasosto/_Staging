/// <reference types="@rbxts/types" />

/**
 * @file        PlayerHUDScreen.ts
 * @module      PlayerHUDScreen
 * @layer       Client/UI/Screens
 * @description Primary heads-up display shown during gameplay.
 */

import { BaseContainer, GameScreen, ListContainer, UIButton } from "../atoms";
import { HUDMenuBar, ProgressionCard } from "client/ui/organisms";
import { CharacterInfoCard } from "../organisms";
import { GameImages } from "shared";
import { ProgressBar } from "../molecules/ProgressBar";
import PlayerState from "client/states/PlayerState";
import { Computed } from "@rbxts/fusion";
import { ResourceSlice } from "client/states";

/* =============================================== Player HUD Screen ============================================= */

export const PlayerHUDScreen = () => {
	/* Screen */
	return GameScreen({
		Name: "PlayerHUDScreen",
		Content: {
			Testing: BaseContainer({
				Name: "Testing",
				Size: new UDim2(1, 0, 1, 0),
				BackgroundTransparency: 1,
				Content: {
					Item1: UIButton({
						Icon: GameImages.SlotImage.Accessory,
						Size: new UDim2(0, 100, 0, 100),
						Position: new UDim2(0, 100, 0, 100),
						AnchorPoint: new Vector2(0.5, 0.5),
					}),
					Item2: ProgressBar({
						Progress: ResourceSlice.getInstance().Health.percent,
						Size: new UDim2(0, 200, 0, 20),
					}),
				},
			}),
			LeftSide: ListContainer({
				Visible: false, // Initially hidden, can be toggled by game state
				Name: "LeftSide",
				Size: new UDim2(0, 250, 1, 0),
				Gap: 5,
				LayoutOrientation: "vertical",
				AlignmentType: Enum.VerticalAlignment.Top,
				Content: {
					CharacterInfoCard: CharacterInfoCard(0),
					ProgressionCard: ProgressionCard(1),
					MenuBar: HUDMenuBar({
						ScreenStateKeys: ["Character", "Inventory", "Teleport", "Settings"],
					}),
				},
			}),
		},
	});
};
