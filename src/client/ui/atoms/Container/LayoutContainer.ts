/// <reference types="@rbxts/types" />

/**
 * @file        LayoutContainer.ts
 * @module      LayoutContainer
 * @layer       Client/UI/Atoms
 * @description Container component to arrange items with preset layouts.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 */

/* =============================================== Imports =============================================== */
import Fusion, { ForKeys, ForValues } from "@rbxts/fusion";
import { getLayoutStyle, Layout, LayoutStyle } from "client/ui/style";
import { GameText } from "../Text";

const { New, Children, Computed, Value, OnEvent, ForPairs } = Fusion;

type DataItem = {
	Name: string;
	Data: {
		[key: string]: number;
	};
};

const testData: DataItem[] = [
	{
		Name: "Item 1",
		Data: {
			Value1: 10,
			Value2: 20,
		},
	},
	{
		Name: "Item 2",
		Data: {
			Value1: 30,
			Value2: 40,
		},
	},
];

/* =============================================== Props =============================================== */
export interface LayoutContainerProps {
	LayoutItems: Array<DataItem>;
	LayoutStyle: LayoutStyle;
	Size?: UDim2;
	Position?: UDim2;
	AnchorPoint?: Vector2;
}

/* =============================================== LayoutContainer Component =============================================== */
export const LayoutContainer = (props: LayoutContainerProps) => {
	const LayoutInstance = getLayoutStyle(props.LayoutStyle ?? "Vertical");
	const items = new Array<TextLabel>();
	ForValues(props.LayoutItems, (item) => {
		items.push(
			GameText({
				Name: item.Name,
				Text: item.Name,
			}),
		);
	});
	const Container = New("Frame")({
		Name: "VerticalLayoutContainer",
		BackgroundTransparency: 1,
		Size: props.Size ?? UDim2.fromScale(1, 1),
		Position: props.Position ?? UDim2.fromScale(0, 0),
		AnchorPoint: props.AnchorPoint ?? new Vector2(0, 0),
		[Children]: {
			Layout: LayoutInstance,
			Items: items,
		},
	});

	return Container;
};
