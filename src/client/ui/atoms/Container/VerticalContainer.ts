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
import { BaseContainer, BaseContainerProps } from "./BaseContainer";
import { Layout } from "../../tokens";

export interface VerticalContainerProps extends Partial<BaseContainerProps> {
	Gap?: number;
}

export const VerticalContainer = (props: VerticalContainerProps) => {
	const content = {
		Layout: Layout.VerticalSet(props.Gap),
		...(props.Content ?? {}),
	} as Fusion.ChildrenValue;

	return BaseContainer({
		...props,
		Content: content,
	});
};
