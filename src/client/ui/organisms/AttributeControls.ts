import { ATTR_KEYS } from "shared";
import { ListContainer } from "../atoms";
import { AttributeControl } from "../molecules";
import { AttributesSlice } from "client/states";

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
