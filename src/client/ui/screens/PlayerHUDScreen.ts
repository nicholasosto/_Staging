/// <reference types="@rbxts/types" />

/**
 * @file        PlayerHUDScreen.ts
 * @module      PlayerHUDScreen
 * @layer       Client/UI/Screens
 * @description Primary heads-up display shown during gameplay.
 */

import { GamePanel, GameScreen, UIButton, VerticalContainer } from "../atoms";
import { HUDMenuBar, AbilityBarComponent, AdminButtonBar, ProgressionCard } from "client/ui/organisms";
import { CharacterInfoCard } from "../organisms";
import { Padding } from "../tokens";
import { SCREEN_KEYS } from "client/states";
import { GameImages } from "shared";
import { ClientSend } from "client/network";
import { ThemeSwitcher } from "../organisms/ButtonBars/ThemeSwitcher";

/* =============================================== Player HUD Screen ============================================= */

const SpawnModelButton = UIButton({
	Icon: GameImages.Ability.Spirit_Circles,
	OnClick: () => {
		ClientSend.SpawnWeapon();
	},
	Size: new UDim2(0, 64, 0, 64),
	Position: new UDim2(0, 0, 1, -74),
	AnchorPoint: new Vector2(0, 1),
	BackgroundTransparency: 1,
	Label: "Spawn Weapon",
});

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
			LeftPanel: VerticalContainer({
				Name: "LeftPanel",
				Size: new UDim2(0.5, 0, 1, 0),
				BackgroundTransparency: 1,
				Content: {
					CharacterInfoCard: CharacterInfoCard(0),
					MenuBar: HudMenuBar,
					ProgressionCard: ProgressionCard(1),
					SpawnModel: SpawnModelButton,
				},
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
