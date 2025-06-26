import Fusion, { Children } from "@rbxts/fusion";
import { GamePanel, GameText } from "../atoms";

export const OrganismTestingScreen = () => {
	const screen = Fusion.New("ScreenGui")({
		Name: "OrganismTestingScreen",
		DisplayOrder: 1000,
		ResetOnSpawn: false,
		Enabled: true,
		Parent: game.GetService("Players").LocalPlayer.WaitForChild("PlayerGui"),
		[Children]: {
			MainPanel: GamePanel({
				Name: "OrganismTestingPanel",
				Size: UDim2.fromScale(1, 1),
				BackgroundTransparency: 1,
				Content: {
					Organism1: {},
					Organism2: {},
					Organism3: {},
				},
			}),
		},
	});
	return screen;
};
