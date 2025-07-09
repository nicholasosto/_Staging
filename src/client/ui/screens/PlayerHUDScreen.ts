/// <reference types="@rbxts/types" />

/**
 * @file        PlayerHUDScreen.ts
 * @module      PlayerHUDScreen
 * @layer       Client/UI/Screens
 * @description Primary heads-up display shown during gameplay.
 */

import { SpacialInterface } from "shared";
import { GameScreen } from "../atoms";
import { AdminButtonBar, HUDMenuBar } from "../organisms";
import { CharacterInfoCard } from "../organisms/Groups/CharacterInfoCard";

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

const AdminButtonBarProps = {
	Size: new UDim2(0, 200, 0, 56),
	Position: new UDim2(
		0,
		Offset,
		0,
		3 * Offset + CharacterInfoCardProps.Size.Y.Offset + HudMenuBarProps.Size.Y.Offset,
	),
	AnchorPoint: new Vector2(0, 0),
	LayoutOrder: 3,
};

export const PlayerHUDScreen = () => {
	/* Screen */
	return GameScreen({
		Name: "PlayerHUDScreen",
		Content: {
			CharacterInfoCard: CharacterInfoCard(CharacterInfoCardProps),
			HUDMenuBar: HUDMenuBar(HudMenuBarProps),
			AdminButtonBar: AdminButtonBar(AdminButtonBarProps),
		},
	});
};
