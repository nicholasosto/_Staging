/// <reference types="@rbxts/types" />

/**
 * @file        PlayerHUDScreen.ts
 * @module      PlayerHUDScreen
 * @layer       Client/UI/Screens
 * @description Primary heads-up display shown during gameplay.
 */

import { SpacialInterface } from "shared";
import { GameScreen } from "../atoms";
import { AbilityBarComponent, ThemeOptions, HUDMenuBar } from "../organisms";
import { CharacterInfoCard } from "../organisms/Groups/CharacterInfoCard";
import { Computed, Value } from "@rbxts/fusion";
import { GameState } from "client/states";

/* =============================================== Player HUD Screen ============================================= */
const Offset = 10; // Offset for positioning elements
const CharacterInfoCardProps = {
	Size: new UDim2(0, 300, 0, 105),
	Position: new UDim2(0, Offset, 0, Offset),
	LayoutOrder: 1,
};

const HudMenuBarProps = {
	Size: new UDim2(0, 380, 0, 56),
	Position: new UDim2(0, Offset, 0, 2 * Offset + CharacterInfoCardProps.Size.Y.Offset),
	AnchorPoint: new Vector2(0, 0),
	LayoutOrder: 2,
};

export const PlayerHUDScreen = () => {
	/* Screen */
	return GameScreen({
		Name: "PlayerHUDScreen",
		Enabled: Computed(() => GameState.PlayerDataLoaded.get()),
		Content: {
			CharacterInfoCard: CharacterInfoCard(CharacterInfoCardProps),
			HUDMenuBar: HUDMenuBar(HudMenuBarProps),

			AbilityBar: AbilityBarComponent(),
		},
	});
};
