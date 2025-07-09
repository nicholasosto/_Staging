/// <reference types="@rbxts/types" />

/**
 * @file        CharacterInfoCard.ts                     ◄────── must match filename
 * @module      CharacterInfoCard                        ◄────── public import name
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

import { Players } from "@rbxts/services";
import { ListContainer } from "../atoms";
import { AvatarBust } from "../molecules";
import { ResourceBars } from "./ResourceBar";
import { Badge } from "../atoms";
import { Value } from "@rbxts/fusion";

export const CharacterInfoCard = (layoutOrder?: number) => {
	/* Organism */
	const organism = ListContainer({
		Name: "CharacterInfoCard",
		Size: new UDim2(0, 300, 0, 105),
		BackgroundTransparency: 0.5,
		BorderSizePixel: 0,
		LayoutOrientation: "horizontal",
		LayoutOrder: layoutOrder ?? 1,
		Content: {
			Avatar: AvatarBust(Players.LocalPlayer.UserId),
			ResourceBars: ResourceBars(),
			
		},
	});

	return organism;
};
