import { ScreenState } from "shared";
import { GameWindow, GameWindowProps } from "../molecules";
import { GameButton, GamePanel } from "../atoms";

const SettingsWindowProps: GameWindowProps = {
	Name: "SettingsWindow",
	Title: "Settings",
	ScreenKey: "Settings",
	Size: new UDim2(0, 400, 0, 300),
	Content: {
		GameButton: GameButton({
			OnClick: () => {
				print("Settings button clicked");
			},
		}),
	},
};

export const SettingsScreen = () => {
	return GameWindow(SettingsWindowProps);
};
