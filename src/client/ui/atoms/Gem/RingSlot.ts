/// <reference types="@rbxts/types" />

/**
 * @file        RingSlot.ts
 * @module      RingSlot
 * @layer       Client/UI/Atoms
 * @description Circular drop slot used in the Gem Forge rings.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 *
 * @author       Codex
 * @license      MIT
 * @since        0.2.1
 * @lastUpdated  2025-07-01 by Codex – Initial creation
 *
 * @dependencies
 *   @rbxts/fusion ^0.4.0
 */
// #AGENT_ATOM
import Fusion, { New, OnEvent, Value, Computed, PropertyTable, Children } from "@rbxts/fusion";
import { GameImages } from "shared/assets";

export interface RingSlotProps extends PropertyTable<ImageButton> {
	Label?: string;
	HighlightColor?: Color3;
	OnDrop?: (gem: Instance) => void;
}

export function RingSlot(props: RingSlotProps) {
	const hovered = Value(false);
	const highlight = Computed(() =>
		hovered.get() ? (props.HighlightColor ?? new Color3(1, 1, 1)) : new Color3(1, 1, 1),
	);
	const transparency = Computed(() => (hovered.get() ? 0.4 : 0.8));
	return New("ImageButton")({
		Name: props.Name ?? "RingSlot",
		BackgroundTransparency: 1,
		Image: GameImages.TextureImage.Mystical, // #ASSETREQUEST - better ring art
		ImageColor3: highlight,
		ImageTransparency: transparency,
		ScaleType: Enum.ScaleType.Fit,
		Size: props.Size ?? UDim2.fromOffset(64, 64),
		[OnEvent("MouseEnter")]: () => hovered.set(true),
		[OnEvent("MouseLeave")]: () => hovered.set(false),
		[Children]: {},
	});
}
