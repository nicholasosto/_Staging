import Fusion from "@rbxts/fusion";
import { GamePanel, IconButton } from "../atoms";

import { Network } from "shared/network";
import { Layout } from "../style";

const IncreaseStrengthButton = IconButton({
	Icon: "rbxassetid://12345678", // Replace with actual icon ID
	OnClick: () => {
		Network.Client.Get("IncreaseAttribute").SendToServer("str", 1);
	},
});

const AddGemButton = IconButton({
	Icon: "rbxassetid://87654321", // Replace with actual icon ID
	OnClick: () => {
		Network.Client.Get("AddGem").SendToServer("gemid_example"); // Replace with actual gem ID
	},
});

export const DataButtons = () => {
	const container = GamePanel({
		Name: "DataButtonsContainer",
		Size: UDim2.fromOffset(200, 100),
		Position: UDim2.fromScale(0.5, 0.5),
		AnchorPoint: new Vector2(0.5, 0.5),
		Layout: Layout.HorizontalSet(2),
		Children: {
			Strength: IncreaseStrengthButton,
			AddGemButton: AddGemButton,
		},
	});

	return container;
};
