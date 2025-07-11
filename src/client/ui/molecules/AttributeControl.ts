import { ATTR_KEYS, AttributeKey, AttributesMeta } from "shared";
import { GameImage, GameText, ListContainer } from "../atoms";
import { CombinedAdjustor } from "../molecules/ValueAdjustors";
import { PlayerStateInstance } from "client/states/PlayerState";

import { Value } from "@rbxts/fusion";

export interface AttributeControlsProps {
	attributeKey: AttributeKey;
}

export function AttributeControl(props: AttributeControlsProps) {
	const icon = GameImage({
		Size: new UDim2(0, 35, 0, 35),
		LayoutOrder: 0,
		Image: AttributesMeta[props.attributeKey].iconId,
	});

	const displayText = GameText({
		Size: new UDim2(0, 70, 1, 0),
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
		BackgroundColor3: new Color3(0.2, 0.2, 0.2),
		BackgroundTransparency: 0.5,
		Size: new UDim2(0, 300, 0, 50),
		AnchorPoint: new Vector2(0.5, 0.5),
		Position: new UDim2(0.5, 0, 0.5, 0),
		Name: `AttributeControl_${props.attributeKey}`,
		LayoutOrder: 0,
		Content: {
			Icon: icon,
			DisplayText: displayText,
			Controller: controller,
		},
	});
	return container;
}
