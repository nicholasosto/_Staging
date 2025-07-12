import {
	BaseContainer,
	BorderImage,
	GameImage,
	GameScreen,
	GameText,
	GameWindow,
	ListContainer,
	UIButton,
} from "client/ui/atoms";
import { ScreenKey } from "shared";
import { Computed, Value } from "@rbxts/fusion";
import GameState from "client/states/GameState";
import { GameImages } from "shared";
import { ProgressBar } from "../molecules";

export const LoadingScreen = () => {
	const DisableLoadingScreen = Value(false);

	/* -- Loading Bar -- */
	const LoadingBar = ProgressBar({
		Border: BorderImage.GothicMetal(),
		Size: new UDim2(0.8, 0, 0.6, 0),
		Name: `LoadingBarProgress`,
		Percent: Computed(() => {
			const gameDataLoaded = GameState.DataLoaded.get() ? 0.5 : 0;
			const playerDataLoaded = GameState.PlayerDataLoaded.get() ? 0.5 : 0;
			return gameDataLoaded + playerDataLoaded; // Combine both loading states
		}),
	});

	/* -- Play Button -- */
	const PlayButton = UIButton({
		Name: `PlayButton`,
		Icon: GameImages.Control.Play,
		Size: new UDim2(0, 200, 0, 200),
		Position: new UDim2(0.5, -100, 0.5, -100),
		AnchorPoint: new Vector2(0.5, 0.5),
		LayoutOrder: 1,
		ZIndex: 2,
		Visible: Computed(() => !GameState.PlayerDataLoaded.get() || !GameState.DataLoaded.get()),
		OnClick: () => {
			DisableLoadingScreen.set(true);
		},
	});

	/* -- Background -- */
	const LoadingScreenBackground = GameImage({
		Size: new UDim2(1, 0, 1, 0),
		Image: GameImages.Screens.Loading,
		AnchorPoint: new Vector2(0.5, 0.5),
		Position: new UDim2(0.5, 0, 0.5, 0),
		BackgroundTransparency: 1,
		LayoutOrder: 0,
		ZIndex: -1,
		ScaleType: Enum.ScaleType.Stretch,
	});

	/* -- Title Image -- */
	const TitleImage = GameImage({
		Name: `TitleImage`,
		Size: new UDim2(0, 400, 0, 250),
		Image: GameImages.Screens.GameTitle,
		AnchorPoint: new Vector2(0.5, 0.5),
		Position: new UDim2(0.5, 0, 0.18, 0),
		ImageColor3: new Color3(240, 240, 240),
		BackgroundTransparency: 1,
		LayoutOrder: 0,
		ZIndex: 1,
		ScaleType: Enum.ScaleType.Fit,
	});

	return GameScreen({
		Name: `LoadingScreen`,
		IgnoreGuiInset: true,
		DisplayOrder: 10000,
		ResetOnSpawn: false,
		Enabled: Computed(() => !DisableLoadingScreen.get()),
		Content: {
			TitleImage: TitleImage,
			Background: LoadingScreenBackground,
			LoadingContainer: ListContainer({
				LayoutOrientation: "horizontal",
				AlignmentType: Enum.HorizontalAlignment.Center,
				AnchorPoint: new Vector2(0.5, 0.5),
				Position: new UDim2(0.5, 0, 0.5, 0),
				Size: new UDim2(0.5, 0, 0, 200),
				BackgroundTransparency: 1,
				ZIndex: 10,
				Content: {
					LoadingBar: LoadingBar,
					PlayButton: PlayButton,
				},
			}),
		},
	});
};
