import Fusion from "@rbxts/fusion";
import { New, Children, Computed, Value, OnEvent, PropertyTable } from "@rbxts/fusion";
import { GamePanel } from "./GamePanel";
import { BorderImage } from "../Image";
import { ItemButton } from "../Button";

const GridLayout = New("UIGridLayout")({
	Name: "GridLayout",
	CellSize: UDim2.fromOffset(100, 100), // Default cell size
	CellPadding: UDim2.fromOffset(10, 10), // Default cell padding
	SortOrder: Enum.SortOrder.LayoutOrder,
});

export interface GridContainerProps extends PropertyTable<Frame> {
	NumItems?: Value<number>; // Number of items in the grid
	Content?: Fusion.ChildrenValue; // Children to be displayed in the grid
	OnChildAdded?: (child: Instance) => void; // Callback when a child is added
	OnChildRemoved?: (child: Instance) => void; // Callback when a child is removed
}

export const GridContainer = (props: GridContainerProps) => {
	/* ----- State Setup ----- */
	const numItems = Computed(() => props.NumItems?.get() ?? 0);

	const ContentContainer = New("ScrollingFrame")({
		Name: "ContentContainer",
		BackgroundTransparency: 0.9,
		Size: UDim2.fromScale(1, 1),
		[OnEvent("ChildAdded")]: (child: Instance) => {
			print(`Child added: ${child.Name}`);
			if (props.OnChildAdded) {
				props.OnChildAdded(child);
			}
		},
		[OnEvent("ChildRemoved")]: (child: Instance) => {
			print(`Child removed: ${child.Name}`);
			if (props.OnChildRemoved) {
				props.OnChildRemoved(child);
			}
		},
		[Children]: {
			Layout: GridLayout,
			...props.Content,
		},
	});

	/* ----- Component Creation ----- */
	const component = GamePanel({
		Name: props.Name ?? "GridContainer",
		BorderImage: BorderImage.GothicMetal(),
		Content: {
			Content: ContentContainer,
		},
		Size: props.Size ?? UDim2.fromScale(1, 1),
		Transparency: props.Transparency ?? 0,
		BackgroundColor3: props.BackgroundColor3 ?? Color3.fromRGB(30, 30, 30),
	});

	return component;
};

export const DefaultGridContainer = (props: GridContainerProps) => {
	return GridContainer({
		...props,
		Size: props.Size ?? UDim2.fromOffset(450, 450), // Default size
		AnchorPoint: props.AnchorPoint ?? new Vector2(0.5, 0.5), // Default anchor point
		Position: props.Position ?? UDim2.fromScale(0.5, 0.5), // Default position
		BackgroundColor3: props.BackgroundColor3 ?? Color3.fromRGB(40, 40, 40), // Default background color
		NumItems: Value(0), // Default to 0 items
		Content: props.Content ?? {},
	});
};
