/// <reference types="@rbxts/types" />

/**
 * @file        PlayerHUDScreen.ts
 * @module      PlayerHUDScreen
 * @layer       Client/UI/Screens
 * @description Primary heads-up display shown during gameplay.
 */

import { GamePanel, GameScreen } from "../atoms";
import { HUDMenuBar, SoulPlayerAbilityBar } from "client/ui/organisms";
import { CharacterInfoCard } from "../organisms";
import { Layout, Padding } from "../tokens";
import { Players } from "@rbxts/services";
import { SCREEN_KEYS } from "client/states";
import { AdminBar } from "../organisms/ButtonBars/AdminBar";
import { Value } from "@rbxts/fusion";

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
	/* Ability Bar */
	const abilityBar = SoulPlayerAbilityBar(Players.LocalPlayer);
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
				BackgroundTransparency: 0.9,
				Content: {
					CharacterInfoCard: HudProps.CharacterInfoCard,
					MenuBar: HudProps.HUDMenuBar,
				},
			}),
			AbilityBar: abilityBar,
			AdminBar: AdminBar(Value(true)), // Admin bar visibility controlled by a Value
		},
	});

	/* Screen */
	return GameScreen({
		Name: "PlayerHUDScreen",
		Content: HUDContainer,
	});
};
