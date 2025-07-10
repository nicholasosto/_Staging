import { ATTR_KEYS, AttributeKey, AttributesMeta } from "shared";
import { GameImage, GameText, ListContainer } from "../atoms";
import { CombinedAdjustor } from "../molecules";
import { PlayerStateInstance } from "client/states/PlayerState";

import { Value } from "@rbxts/fusion";
import { AttributesSlice } from "client/states";

interface AttributeControlsProps {
	attributeKey: AttributeKey;
}

function AttributeControl(props: AttributeControlsProps) {
	const icon = GameImage({
		LayoutOrder: 0,
		Image: AttributesMeta[props.attributeKey].iconId,
	});

	const displayText = GameText({
		LayoutOrder: 1,
		TextState: Value(AttributesMeta[props.attributeKey].displayName),
	});

	const controller = CombinedAdjustor({
		LayoutOrder: 2,
		value: PlayerStateInstance.Attributes.Attributes[props.attributeKey],
		amount: 1,
	});

	const container = ListContainer({
		Gap: 10,
		LayoutOrientation: "horizontal",
		AlignmentType: Enum.HorizontalAlignment.Center,
		Content: {
			Icon: icon,
			DisplayText: displayText,
			Controller: controller,
		},
		Size: new UDim2(1, 0, 0, 50),
		BackgroundTransparency: 1,
		AnchorPoint: new Vector2(0.5, 0.5),
		Position: new UDim2(0.5, 0, 0, 0),
		Name: `AttributeControl_${props.attributeKey}`,
		LayoutOrder: 0,
	});
	return container;
}

export interface AttributeContainerProps {
	AttributeSlice: AttributesSlice;
	Size?: UDim2;
	Position?: UDim2;
	BackgroundTransparency?: number;
	AnchorPoint?: Vector2;
	LayoutOrder?: number;
	ZIndex?: number;
}

export function AttributeControls(props: AttributeContainerProps) {
	const controls = ATTR_KEYS.map((key) => {
		return AttributeControl({ attributeKey: key });
	});

	const container = ListContainer({
		Gap: 10,
		LayoutOrientation: "vertical",
		AlignmentType: Enum.VerticalAlignment.Center,
		Content: controls,
		Size: props.Size ?? new UDim2(1, 0, 1, 0),
		BackgroundTransparency: props.BackgroundTransparency ?? 1,
		AnchorPoint: props.AnchorPoint ?? new Vector2(0.5, 0.5),
		Position: props.Position ?? new UDim2(0.5, 0, 0.5, 0),
		Name: "AttributeControlsContainer",
		LayoutOrder: 0,
	});
	return container;
}
