/// <reference types="@rbxts/types" />

/**
 * @file        GridContainer.ts
 * @module      GridContainer
 * @layer       Client/UI/Atoms
 * @description BaseContainer with grid layout helper.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 */

import Fusion from "@rbxts/fusion";
import { BaseContainer, BaseContainerProps } from "./BaseContainer";
import { Layout } from "../../tokens";

export interface GridContainerProps extends Partial<BaseContainerProps> {
	Gap?: number;
	CellSize?: UDim2;
}

export const GridContainer = (props: GridContainerProps) => {
	const content = {
		Layout: Layout.Grid(props.Gap, props.CellSize),
		...(props.Content ?? {}),
	} as Fusion.ChildrenValue;

	return BaseContainer({
		...props,
		Content: content,
	});
};
