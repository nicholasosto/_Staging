import Fusion, { Children, New, Value } from "@rbxts/fusion";
import { Network } from "shared/network";
import { BorderImage, GameButton, GamePanel, GameScreen } from "../atoms";
import { CharacterInfoCard } from "../organisms";
import { CountdownTimer, GameWindow } from "../molecules";
import { Layout, Padding } from "../tokens";
import { GameImages, ScreenState } from "shared";
import { HUDMenuBar } from "../organisms/HUDMenuBar";

/* =============================================== Player HUD Screen ============================================= */

export const PlayerHUDScreen = () => {
	return GameScreen({
		Name: "PlayerHUDScreen",
		Content: {
			HUDMenuBar: HUDMenuBar(),
			GameWindow: GameWindow({
				VisibleState: ScreenState.PlayerHUDScreenVisible,
				Title: "Player HUD",
				Size: new UDim2(0, 500, 0, 500),
				AnchorPoint: new Vector2(0.5, 0.5),
				Position: new UDim2(0.5, 0, 0.5, 0),
			}),
		},
	});
};
