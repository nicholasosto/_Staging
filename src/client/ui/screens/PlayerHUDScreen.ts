/// <reference types="@rbxts/types" />

/**
 * @file        PlayerHUDScreen.ts
 * @module      PlayerHUDScreen
 * @layer       Client/UI/Screens
 * @description Primary heads-up display shown during gameplay.
 */

import { SCREEN_KEYS } from "shared";
import { GamePanel, GameScreen } from "../atoms";
import { HUDMenuBar, AbilityBar } from "client/ui/organisms";
import { CharacterInfoCard } from "../organisms";
import { Layout, Padding } from "../tokens";
import { BarMeter } from "../molecules";
import { GridContainer } from "../atoms/Container/GridContainer";

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
				BackgroundTransparency: 0.9,
				Content: {
					CharacterInfoCard: HudProps.CharacterInfoCard,
					MenuBar: HudProps.HUDMenuBar,
				},
			}),
			Free: GamePanel({
				Name: "FreeSpace",
				Size: new UDim2(1, 0, 1, 0),
				BackgroundTransparency: 1,
				Content: {
					GridContainer: GridContainer({}),
					AbilityBar: AbilityBar({
						abilities: ["fireball", "ice_shard", "lightning_bolt", "earthquake", "melee"],
					}),
				},
			}),
		},
	});

	/* Screen */
	return GameScreen({
		Name: "PlayerHUDScreen",
		Content: HUDContainer,
	});
};
