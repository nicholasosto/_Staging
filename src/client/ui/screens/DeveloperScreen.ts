import { BaseContainer, BaseContainerProps, GameWindow, ListContainer } from "client/ui/atoms";
import { PlayerStateInstance } from "client/states";
import { ScreenKey } from "shared";
import { Value } from "@rbxts/fusion";
import { StateInfoDisplay } from "../molecules";

const Key: ScreenKey = "Developer";

const ListContainerInstance = ListContainer({
	Name: `${Key}ListContainer`,
	Size: new UDim2(1, 0, 1, 0),
	Position: new UDim2(0, 0, 0, 0),
	AnchorPoint: new Vector2(0, 0),
	Gap: 10,
	LayoutOrientation: "vertical",
	BackgroundTransparency: 1,
	Content: {
		Level: StateInfoDisplay({
			Label: "Level",
			Value: PlayerStateInstance.Progression.Progression.Level,
			Size: new UDim2(1, 0, 0, 30),
		}),
		Experience: StateInfoDisplay({
			Label: "Experience",
			Value: PlayerStateInstance.Progression.Progression.Experience,
			Size: new UDim2(1, 0, 0, 30),
		}),
	},
	ZIndex: 1,
	LayoutOrder: 0,
});

const BasicInfoPanelProps: BaseContainerProps = {
	Size: new UDim2(0, 300, 1, 0),
	Position: new UDim2(0, 0, 0, 0),
	AnchorPoint: new Vector2(0, 0),
	BackgroundTransparency: 0.5,
	LayoutOrder: 0,
	ZIndex: 1,
	Content: {},
};

export const DeveloperScreen = () => {
	return GameWindow({
		Name: `${Key}Screen`,
		ScreenKey: Key,
		Content: {
			BasicInfoPanel: BaseContainer(BasicInfoPanelProps),
		},
	});
};
