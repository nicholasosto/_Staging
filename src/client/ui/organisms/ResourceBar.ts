/// <reference types="@rbxts/types" />

/**
 * @file        ResourceBars.ts                     ◄────── must match filename
 * @module      ResourceBars                        ◄────── public import name
 * @layer       Client/Organisms
 * @description Composite organism that shows the
 *              player's Health, Mana & Stamina.
 *
 * ╭───────────────────────────────────────────────╮
 * │  Soul Steel · Coding Guide                   │
 * │  Fusion v4 · Strict TS · ECS                 │
 * ╰───────────────────────────────────────────────╯
 *
 * @author       Trembus
 * @license      MIT
 * @since        0.2.1
 * @lastUpdated  2025-06-25 by Luminesa – Comment revamp
 *
 * @dependencies
 *   @rbxts/fusion ^0.4.0
 */

// -------------- Imports ----------------------------------------------------- //
import { GamePanel } from "client/ui/atoms"; // absolute alias
import { BarMeter } from "client/ui/molecules/FillBar/BarMeter";
import ResourceSlice from "client/states/ResourceSlice";
import { ResourceKey, ResourceMeta } from "shared/definitions/Resources";
import { Computed } from "@rbxts/fusion";

// -------------- Local helpers --------------------------------------------- //
export function ResourceBar(resourceKey: ResourceKey) {
    const state = ResourceSlice.getInstance().Resources[resourceKey];
	const meta = ResourceMeta[resourceKey];
	const resourceBarContainer = GamePanel({
		Name: `${resourceKey}BarContainer`,
		Size: UDim2.fromScale(1, 0.3),
		LayoutOrder: meta.layoutOrder,
		Content: {
			FillBar: BarMeter({
				ProgressState: state.Percent,
				MaxValue: state.Max,
				Gradient: meta.gradient,
				Size: UDim2.fromScale(1, 1),
				Text: meta.displayName,
			}),
		},
	});
	return resourceBarContainer;
}
