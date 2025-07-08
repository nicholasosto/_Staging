/// <reference types="@rbxts/types" />

/**
 * @file        VerticalContainer.ts
 * @module      VerticalContainer
 * @layer       Client/UI/Atoms
 * @description Wrapper that stacks children vertically.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 */

import Fusion, { Children } from "@rbxts/fusion";
import { useToken } from "theme/hooks";

export interface ListContainerProps extends Partial<Fusion.PropertyTable<Frame>> {
	Gap?: number;
	LayoutOrientation: "vertical" | "horizontal";
	Content: Fusion.ChildrenValue;
	AlignmentType?: Enum.HorizontalAlignment | Enum.VerticalAlignment;
	Padding?: UIPadding;
}

export const ListContainer = (props: ListContainerProps) => {
	const bg = useToken("panelBg");
	const uiListLayout = Fusion.New("UIListLayout")({
		SortOrder: Enum.SortOrder.LayoutOrder,
		FillDirection:
			props.LayoutOrientation === "horizontal" ? Enum.FillDirection.Horizontal : Enum.FillDirection.Vertical,
		Padding: props.Gap ? new UDim(0, props.Gap) : undefined,
		HorizontalAlignment:
			props.AlignmentType === Enum.HorizontalAlignment.Center
				? Enum.HorizontalAlignment.Center
				: Enum.HorizontalAlignment.Left,
		VerticalAlignment:
			props.AlignmentType === Enum.VerticalAlignment.Center
				? Enum.VerticalAlignment.Center
				: Enum.VerticalAlignment.Top,
	});

	const Component = Fusion.New("Frame")({
		Name: "ListContainer",
		Size: props.Size ?? UDim2.fromScale(1, 1),
		Position: props.Position ?? UDim2.fromScale(0, 0),
		BackgroundColor3: props.BackgroundColor3 ?? bg,
		BackgroundTransparency: props.BackgroundTransparency ?? 1,
		AnchorPoint: props.AnchorPoint ?? new Vector2(0, 0),
		[Children]: {
			Layout: uiListLayout,
			Padding: props.Padding,
			...props.Content,
		},
	});

	return Component;
};
