/// <reference types="@rbxts/types" />

/**
 * @file        PlayerHUDScreen.ts
 * @module      PlayerHUDScreen
 * @layer       Client/UI/Screens
 * @description Primary heads-up display shown during gameplay.
 */

import { GamePanel, GameScreen } from "../atoms";
import { HUDMenuBar, AbilityBar } from "client/ui/organisms";
import { CharacterInfoCard } from "../organisms";
import { Layout, Padding } from "../tokens";
import { Players } from "@rbxts/services";
import { SCREEN_KEYS } from "client/states";
import { AdminBar } from "../organisms/ButtonBars/AdminBar";
import { Value } from "@rbxts/fusion";
import { StatusPanel } from "../organisms/ButtonBars/StatusPanel";
import { StatusEffect } from "shared/definitions/StatusEffect";
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
			LeftPanel: GamePanel({
				Layout: Layout.VerticalScroll(5),
				Name: "LeftPanel",
				Size: new UDim2(0.5, 0, 1, 0),
				BackgroundTransparency: 1,
				Content: {
					CharacterInfoCard: HudProps.CharacterInfoCard,
					MenuBar: HudProps.HUDMenuBar,
				},
			}),
			AbilityBar: AbilityBar({
				PlayerStateAbilities: PlayerState.getInstance().Abilities,
			}),
			AdminBar: AdminBar(Value(false)), // Admin bar visibility controlled by a Value
			StatusPanel: StatusPanel(PlayerState.getInstance().StatusEffects), // Status effects will be dynamically updated
		},
	});

	/* Screen */
	return GameScreen({
		Name: "PlayerHUDScreen",
		Content: HUDContainer,
	});
};
