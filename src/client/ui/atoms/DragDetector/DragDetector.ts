/// <reference types="@rbxts/types" />

/**
 * @file        DragDetector.ts
 * @module      DragDetector
 * @layer       Client/UI/Atoms
 * @description Wrapper component for `UIDragDetector` with typed events.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 *
 * @author       Trembus
 * @license      MIT
 * @since        0.2.1
 * @lastUpdated  2025-07-03 by Codex – Added documentation header
 *
 * @dependencies
 *   @rbxts/fusion ^0.4.0
 */

import { New, OnEvent, Children, PropertyTable } from "@rbxts/fusion";

export interface DragDetectorEvents {
	OnDragStart?: (pos: Vector2) => void;
	OnDragContinue?: (pos: Vector2) => void;
	OnDragEnd?: (pos: Vector2) => void;
}

export type DragDetectorProps = Partial<
	Pick<
		UIDragDetector,
		| "Enabled"
		| "DragAxis"
		| "DragRelativity"
		| "BoundingUI"
		| "BoundingBehavior"
		| "DragStyle"
		| "DragSpace"
		| "ReferenceUIInstance"
	>
> &
	DragDetectorEvents &
	PropertyTable<UIDragDetector>; // pass-through for everything else

export function DragDetector(props: DragDetectorProps) {
	const { OnDragStart, OnDragContinue, OnDragEnd } = props;

	return New("UIDragDetector")({
		Name: props.Name ?? "DragDetectorZ",
		Enabled: props.Enabled ?? false,
		DragAxis: props.DragAxis ?? Vector2.one,
		DragRelativity: props.DragRelativity ?? Enum.UIDragDetectorDragRelativity.Absolute,
		DragStyle: props.DragStyle ?? Enum.UIDragDetectorDragStyle.Scriptable,
		BoundingUI: props.BoundingUI ?? undefined,

		[Children]: props[Children],

		//――――― Events ―――――――――――――――――――――――――――――――――――――――――――――――
		[OnEvent("DragStart")]: OnDragStart,
		[OnEvent("DragContinue")]: OnDragContinue,
		[OnEvent("DragEnd")]: OnDragEnd,
	});
}
