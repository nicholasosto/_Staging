/// <reference types="@rbxts/types" />

/**
 * @file        PlayerHUDScreen.ts
 * @module      PlayerHUDScreen
 * @layer       Client/UI/Screens
 * @description Primary heads-up display shown during gameplay.
 */

import { GamePanel, GameScreen, VerticalContainer } from "../atoms";
import { HUDMenuBar, AbilityBarComponent, AdminButtonBar } from "client/ui/organisms";
import { CharacterInfoCard } from "../organisms";
import { Layout, Padding } from "../tokens";
import { SCREEN_KEYS } from "client/states";
import { Value } from "@rbxts/fusion";
import { StatusPanel } from "../organisms/ButtonBars/StatusPanel";
import PlayerState from "client/states/PlayerState";

/* =============================================== Player HUD Screen ============================================= */

interface PlayerHUDScreenProps {
	CharacterInfoCard?: Frame;
	HUDMenuBar?: Frame;
	CurrencyInfo?: Frame;
}

const HudProps = {
	CharacterInfoCard: CharacterInfoCard(),
	HUDMenuBar: HUDMenuBar({
		ScreenStateKeys: [...SCREEN_KEYS],
	}),
	CurrencyInfo: undefined, // Placeholder for future currency info
};
export const PlayerHUDScreen = () => {
	/* HUD Container */
	const HUDContainer = GamePanel({
		Name: "HUDContainer",
		Size: new UDim2(1, 0, 1, 0),
		BackgroundTransparency: 1,
		Padding: Padding(10),
		Content: {
			LeftPanel: VerticalContainer({
				Name: "LeftPanel",
				Size: new UDim2(0.5, 0, 1, 0),
				BackgroundTransparency: 1,
				Content: {
					CharacterInfoCard: HudProps.CharacterInfoCard,
					MenuBar: HudProps.HUDMenuBar,
					StatusPanel: StatusPanel(PlayerState.getInstance().StatusEffects), // Status effects will be dynamically updated
				},
			}),
			AbilityBar: AbilityBarComponent(),
			StatusPanel: StatusPanel(PlayerState.getInstance().StatusEffects), // Status effects will be dynamically updated
		},
	});

	/* Screen */
	return GameScreen({
		Name: "PlayerHUDScreen",
		Content: HUDContainer,
	});
};
