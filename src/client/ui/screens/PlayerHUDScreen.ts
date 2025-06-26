/// <reference types="@rbxts/types" />

/**
 * @file        PlayerHUDScreen.ts
 * @module      PlayerHUDScreen
 * @layer       Client/UI/Screens
 * @description Primary heads-up display shown during gameplay.
 */

import { SCREEN_KEYS } from "shared";
import { GameScreen } from "../atoms";
import { HUDMenuBar } from "../organisms/HUDMenuBar";

/* =============================================== Player HUD Screen ============================================= */

export const PlayerHUDScreen = () => {
	return GameScreen({
		Name: "PlayerHUDScreen",
		Content: {
			HUDMenuBar: HUDMenuBar({
				ScreenStateKeys: [...SCREEN_KEYS],
			}),
		},
	});
};
