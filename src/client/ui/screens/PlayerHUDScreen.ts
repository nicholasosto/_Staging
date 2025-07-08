/// <reference types="@rbxts/types" />

/**
 * @file        PlayerHUDScreen.ts
 * @module      PlayerHUDScreen
 * @layer       Client/UI/Screens
 * @description Primary heads-up display shown during gameplay.
 */

import { GameScreen, ListContainer } from "../atoms";
import { HUDMenuBar, ProgressionCard } from "client/ui/organisms";
import { CharacterInfoCard } from "../organisms";

/* =============================================== Player HUD Screen ============================================= */

export const PlayerHUDScreen = () => {
	/* Screen */
	return GameScreen({
		Name: "PlayerHUDScreen",
		Content: {
			LeftSide: ListContainer({
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
