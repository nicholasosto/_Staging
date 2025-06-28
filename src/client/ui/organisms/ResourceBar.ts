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
import { BarMeter } from "client/ui/molecules";
import PlayerState from "client/states/PlayerState";
import { ResourceKey, ResourceMeta } from "shared/data/ResourceData";
import { Computed } from "@rbxts/fusion";

// -------------- Local helpers --------------------------------------------- //
export function ResourceBar(resourceKey: ResourceKey) {
	const playerState = PlayerState.getInstance();

	const state = playerState.PlayerResources[resourceKey];
	const meta = ResourceMeta[resourceKey];
	const resourceBarContainer = GamePanel({
		Name: `${resourceKey}BarContainer`,
		Size: UDim2.fromScale(1, 0.3),
		Content: {
			FillBar: BarMeter({
				ProgressState: Computed(() => state.Current.get() / state.Max.get()),
				MaxValue: state.Max,
				Gradient: meta.gradient,
				Size: UDim2.fromScale(1, 1),
				Text: meta.displayName,
			}),
		},
	});
	return resourceBarContainer;
}
