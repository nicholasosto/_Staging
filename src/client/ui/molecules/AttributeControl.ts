import { ATTR_KEYS, AttributeKey, AttributesMeta } from "shared";
import { GameImage, GameText, ListContainer } from "../atoms";
import { CombinedAdjustor } from "../molecules/ValueAdjustors";
import { PlayerStateInstance } from "client/states/PlayerState";

import { Value } from "@rbxts/fusion";
import { StateInfoDisplay } from "./StateInfoDisplay";
import { AttributesSlice } from "client/states";

export interface AttributeControlsProps {
	attributeKey: AttributeKey;
}

/* Points Display Component */
export function AttributePointsCard() {
	const container = ListContainer({
		Name: "AttributePointsContainer",
		Size: new UDim2(0, 150, 1, 0),
		LayoutOrder: 0,
		LayoutOrientation: "horizontal",
		AlignmentType: Enum.HorizontalAlignment.Center,
		Gap: 10,
		Content: {
			AvailablePoints: StateInfoDisplay({
				Size: new UDim2(0.45, 0, 1, 0),
				Label: "Available",
				Value: PlayerStateInstance.Attributes.Available,
			}),
			SpentPoints: StateInfoDisplay({
				Size: new UDim2(0.45, 0, 1, 0),
				Label: "Spent",
				Value: PlayerStateInstance.Attributes.Spent,
			}),
		},
	});
	return container;
}

/* Attribute Control Component */
export function AttributeControl(props: AttributeControlsProps) {
	const icon = GameImage({
		Size: new UDim2(0, 45, 1, 35),
		LayoutOrder: 0,
		Image: AttributesMeta[props.attributeKey].iconId,
	});

	const controller = CombinedAdjustor({
		Size: new UDim2(0, 100, 1, 0),
		LayoutOrder: 2,
		value: PlayerStateInstance.Attributes.Attributes[props.attributeKey],
		amount: 1,
	});

	const container = ListContainer({
		Gap: 10,
		LayoutOrientation: "horizontal",
		AlignmentType: Enum.HorizontalAlignment.Center,
		BackgroundColor3: new Color3(0.2, 0.2, 0.2),
		BackgroundTransparency: 0.5,
		Size: new UDim2(0, 300, 0, 50),
		AnchorPoint: new Vector2(0.5, 0.5),
		Position: new UDim2(0.5, 0, 0.5, 0),
		Name: `AttributeControl_${props.attributeKey}`,
		LayoutOrder: 0,
		Content: {
			Icon: icon,
			StateInfoDisplay: StateInfoDisplay({
				Size: new UDim2(0, 150, 1, 0),
				LayoutOrder: 1,
				Label: AttributesMeta[props.attributeKey].displayName,
				Value: PlayerStateInstance.Attributes.Attributes[props.attributeKey],
			}),
			Controller: controller,
		},
	});
	return container;
}
