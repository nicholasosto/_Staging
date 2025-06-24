import Fusion, { Children } from "@rbxts/fusion";
import { GamePanel, GameText } from "../atoms";

const TextItem1 = GameText({
	Name: "GameText Test",
	Text: "This is a test of the GameText component.",
	Size: UDim2.fromScale(0.8, 0.1),
	Position: UDim2.fromScale(0.5, 0.5),
	AnchorPoint: new Vector2(0.5, 0.5),
	TextSize: 24,
});

export const GameTextScreen = () => {
	const screen = Fusion.New("ScreenGui")({
		Name: "GameTextScreen",
		DisplayOrder: 1000,
		ResetOnSpawn: false,
		Enabled: true,
		Parent: game.GetService("Players").LocalPlayer.WaitForChild("PlayerGui"),
		[Children]: {
			MainPanel: GamePanel({
				Name: "MainPanel",
				Size: UDim2.fromScale(1, 1),
				BackgroundTransparency: 1,
				Children: {
					GameText: TextItem1,
				},
			}),
		},
	});
	return screen;
};
