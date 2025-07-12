import { ATTR_KEYS } from "shared";
import { ListContainer } from "../atoms";
import { AttributeControl, AttributePointsCard } from "../molecules";

import Fusion from "@rbxts/fusion";

export function AttributeControlCard(props: Fusion.PropertyTable<Frame>) {
	const attributeControls = ATTR_KEYS.map((key) => {
		return AttributeControl({ attributeKey: key });
	});

	const container = ListContainer({
		Name: "AttributeControlsContainer",
		Gap: 10,
		LayoutOrientation: "vertical",
		AlignmentType: Enum.VerticalAlignment.Center,
		Content: {
			AttributePoints: AttributePointsCard(),
			AttributeControls: attributeControls,
		},
		/* -- SPA -- */
		Size: props.Size ?? new UDim2(1, 0, 1, 0),
		AnchorPoint: props.AnchorPoint ?? new Vector2(0.5, 0.5),
		Position: props.Position ?? new UDim2(0.5, 0, 0.5, 0),

		/*-- Style --*/
		BackgroundTransparency: props.BackgroundTransparency ?? 1,
		LayoutOrder: props.LayoutOrder ?? 0,
		ZIndex: props.ZIndex ?? 1,
	});
	return container;
}
