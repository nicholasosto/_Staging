/// <reference types="@rbxts/types" />

/**
 * @file        HorizontalContainer.ts
 * @module      HorizontalContainer
 * @layer       Client/UI/Atoms
 * @description Wrapper that arranges children horizontally.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 */

import Fusion from "@rbxts/fusion";
import { BaseContainer, BaseContainerProps } from "./BaseContainer";
import { Layout } from "../../tokens";

export interface HorizontalContainerProps extends Partial<BaseContainerProps> {
	Gap?: number;
	LayoutOrder?: number;
}

export const HorizontalContainer = (props: HorizontalContainerProps) => {
	const content = {
		Layout: Layout.HorizontalSet(props.Gap),
		...(props.Content ?? {}),
	} as Fusion.ChildrenValue;

	return BaseContainer({
		...props,
		LayoutOrder: props.LayoutOrder ?? 0,
		Content: content,
	});
};
