import { ScreenState } from "shared";
import { GameWindow, GameWindowProps } from "../molecules";
import { GameButton } from "../atoms";

const TeleportScreenProps: GameWindowProps = {
	Name: "TeleportWindow",
	Title: "Teleport",
	ScreenKey: "Teleport",
	Size: new UDim2(0, 400, 0, 300),
	Content: {
		GameButton: GameButton({
			OnClick: () => {
				print("Teleport button clicked");
			},
		}),
	},
};

export const TeleportScreen = () => {
	return GameWindow(TeleportScreenProps);
};
