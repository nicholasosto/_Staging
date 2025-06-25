import { ComponentSizes } from "constants";
import { GamePanel } from "../atoms";
import { ResourceBars } from "./ResourceBars";

import Fusion, { New, Value } from "@rbxts/fusion";
import { Layout } from "../tokens";

export const CharacterInfoCard = () => {
	const Avatar = New("ImageLabel")({
		Name: "Avatar",
		Size: ComponentSizes.Avatar,
	});

	const organism = GamePanel({
		Name: "CharacterInfoCard",
		Size: new UDim2(0, 300, 0, 200),
		BackgroundTransparency: 0.5,
		BorderSizePixel: 0,
		Layout: Layout.HorizontalSet(0),
		Children: {
			Avatar: Avatar,
			ResourceBars: ResourceBars(false),
		},
	});

	return organism;
};
