import { ATTR_KEYS, AttributeKey, AttributesMeta, ClientDispatch } from "shared";
import { GameImage, GameText, ListContainer } from "../atoms";
import { CombinedAdjustor } from "../molecules/ValueAdjustors";
import { PlayerStateInstance } from "client/states/PlayerState";

import Fusion, { Value } from "@rbxts/fusion";
import { StateInfoDisplay } from "./StateInfoDisplay";
import { AttributesSlice } from "client/states";

export interface AttributeControlsProps extends Fusion.PropertyTable<Frame> {
	attributeKey: AttributeKey;
}

/* Points Display Component */
export function AttributePointsCard(props: Fusion.PropertyTable<Frame>) {
	const container = ListContainer({
		Name: "AttributePointsContainer",
		Size: props.Size ?? new UDim2(1, 0, 0, 50),
		LayoutOrder: props.LayoutOrder ?? 0,
		LayoutOrientation: "horizontal",
		AlignmentType: Enum.HorizontalAlignment.Center,
		Gap: 10,
		Content: {
			AvailablePoints: StateInfoDisplay({
				Size: new UDim2(0.45, 0, 1, 0),
				Label: "Available",
				Value: PlayerStateInstance.Attributes.Available,
				LayoutOrder: 0,
			}),
			SpentPoints: StateInfoDisplay({
				Size: new UDim2(0.45, 0, 1, 0),
				Label: "Spent",
				Value: PlayerStateInstance.Attributes.Spent,
				LayoutOrder: 1,
			}),
		},
	});
	return container;
}

/* Attribute Control Component */
export function AttributeControl(props: AttributeControlsProps) {
	const icon = GameImage({
		Size: new UDim2(0.2, 0, 0.9, 0),
		LayoutOrder: 0,
		Image: AttributesMeta[props.attributeKey].iconId,
		RatioConstraint: 1,
	});
	const stateInfo = StateInfoDisplay({
		Size: new UDim2(0.4, 0, 1, 0),
		LayoutOrder: 1,
		Label: AttributesMeta[props.attributeKey].displayName,
		Value: PlayerStateInstance.Attributes.Attributes[props.attributeKey],
	});
	const controller = CombinedAdjustor({
		Size: new UDim2(0.4, 0, 1, 0),
		LayoutOrder: 2,
		value: PlayerStateInstance.Attributes.Attributes[props.attributeKey],
		amount: 1,
		OnIncrement: () => {
			PlayerStateInstance.Attributes.ModifyAttribute(props.attributeKey, 1);
		},
		OnDecrement: () => {
			PlayerStateInstance.Attributes.ModifyAttribute(props.attributeKey, -1);
		},
	});

	const container = ListContainer({
		Gap: 10,
		LayoutOrientation: "horizontal",
		AlignmentType: Enum.HorizontalAlignment.Center,
		BackgroundColor3: new Color3(0.2, 0.2, 0.2),
		BackgroundTransparency: props.BackgroundTransparency ?? 0.5,
		Size: props.Size ?? new UDim2(0, 300, 0, 50),
		AnchorPoint: props.AnchorPoint ?? new Vector2(0.5, 0.5),
		Position: props.Position ?? new UDim2(0.5, 0, 0.5, 0),
		Name: `AttributeControl_${props.attributeKey}`,
		LayoutOrder: props.LayoutOrder ?? 0,
		ZIndex: props.ZIndex ?? 1,
		Content: {
			Icon: icon,
			StateInfoDisplay: stateInfo,
			Controller: controller,
		},
	});
	return container;
}
