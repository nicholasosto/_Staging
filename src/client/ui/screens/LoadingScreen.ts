import { BaseContainer, GameImage, GameScreen, GameText, GameWindow } from "client/ui/atoms";
import { ScreenKey } from "client/states";
import { Computed } from "@rbxts/fusion";
import GameState from "client/states/GameState";
import { GameImages } from "shared";

export const LoadingScreen = () => {
	return GameScreen({
		Name: `LoadingScreen`,
		IgnoreGuiInset: true,
		DisplayOrder: 10000,
		ResetOnSpawn: false,
		Enabled: Computed(() => !GameState.PlayerDataLoaded.get() || !GameState.DataLoaded.get()),
		Content: {
			Background: BaseContainer({
				Size: UDim2.fromScale(1, 1),
				BackgroundColor3: Color3.fromRGB(255, 255, 255),
				BackgroundTransparency: 0.2,

				Content: {
					BackgroundImage: GameImage({
						Image: GameImages.Screens.Loading,
						Size: UDim2.fromScale(1, 1),
						BackgroundTransparency: 1,
						ZIndex: 0,
					}),
					LoadingText: GameText({
						TextState: Computed(() => {
							return (
								`Loading... ${GameState.DataLoaded.get() ? "Data Loaded" : "Loading Data"}\n` +
								`${GameState.PlayerDataLoaded.get() ? "Player Data Loaded" : "Loading Player Data"}`
							);
						}),
						Size: UDim2.fromScale(1, 0.1),
						Position: UDim2.fromScale(0.5, 0.5),
						AnchorPoint: new Vector2(0.5, 0.5),
						TextColor3: Color3.fromRGB(0, 0, 0),
						TextScaled: true,
						TextWrapped: true,
						BackgroundTransparency: 0.5,
						ZIndex: 1,
					}),
				},
			}),
		},
	});
};
