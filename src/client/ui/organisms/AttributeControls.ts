import { ATTR_KEYS, AttributeKey, AttributesMeta } from "shared";
import { CombinedAdjustor, CombinedAdjustorProps } from "../molecules/Controls";
import PlayerState from "client/states/PlayerState";
import { GameImage, GameText, HorizontalContainer, VerticalContainer } from "../atoms";
import { Value } from "@rbxts/fusion";

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
		TextStateValue: Value(AttributesMeta[props.attributeKey].displayName),
	});

	const controller = CombinedAdjustor({
		LayoutOrder: 2,
		value: PlayerState.getInstance().Attributes.Attributes[props.attributeKey],
		amount: 1,
	});

	const container = HorizontalContainer({
		Name: `AttributeControl-${props.attributeKey}`,
		Size: new UDim2(1, 0, 0, 50),
		BackgroundTransparency: 1,
		Gap: 10,
		Content: {
			Icon: icon,
			Text: displayText,
			Controller: controller,
		},
	});
	return container;
}

export function AttributeControls() {
	const controls = ATTR_KEYS.map((key) => {
		return AttributeControl({ attributeKey: key });
	});

	const container = VerticalContainer({
		Name: "AttributeControls",
		Size: new UDim2(0, 200, 0, 300),
		AnchorPoint: new Vector2(0.5, 0.5),
		Position: new UDim2(0.5, 0, 0.5, 0),
		LayoutOrder: 1,
		BackgroundTransparency: 1,
		Gap: 10,
		Content: [...controls],
	});

	return container;
}
