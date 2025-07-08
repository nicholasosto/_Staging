/// <reference types="@rbxts/types" />

/**
 * @file        PlayerHUDScreen.ts
 * @module      PlayerHUDScreen
 * @layer       Client/UI/Screens
 * @description Primary heads-up display shown during gameplay.
 */

import { GamePanel, GameScreen, ListContainer } from "../atoms";
import { HUDMenuBar, AbilityBarComponent, ProgressionCard } from "client/ui/organisms";
import { CharacterInfoCard } from "../organisms";
import { Padding } from "../tokens";
import { SCREEN_KEYS } from "client/states";
import { ThemeSwitcher } from "../organisms/ButtonBars/ThemeSwitcher";
import { AttributeControls } from "../organisms/AttributeControls";

/* =============================================== Player HUD Screen ============================================= */

export const PlayerHUDScreen = () => {
	const HudMenuBar = HUDMenuBar({
		ScreenStateKeys: [...SCREEN_KEYS],
		layoutOrder: 2,
	});
	/* HUD Container */
	const HUDContainer = GamePanel({
		Name: "HUDContainer",
		Size: new UDim2(1, 0, 1, 0),
		BackgroundTransparency: 1,
		Padding: Padding(10),
		Content: {
			LeftPanel: ListContainer({
				Gap: 10,
				LayoutOrientation: "vertical",
				AlignmentType: Enum.VerticalAlignment.Center,
				Content: {
					CharacterInfoCard: CharacterInfoCard(),
					AttributeControls: AttributeControls(),
					HudMenuBar: HudMenuBar,
				},
				Size: new UDim2(0, 200, 1, 0),
				BackgroundTransparency: 1,
			}),
			ThemeSwitcher: ThemeSwitcher(),
			AbilityBar: AbilityBarComponent(),
			//StatusPanel: StatusPanel(PlayerState.getInstance().StatusEffects), // Status effects will be dynamically updated
		},
	});

	/* Screen */
	return GameScreen({
		Name: "PlayerHUDScreen",
		Content: HUDContainer,
	});
};
