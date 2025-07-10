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
import { ListContainer } from "client/ui/atoms";
import { AvatarBust } from "client/ui/molecules";
import { ResourceBars } from "client/ui/organisms/ResourceBar";

export interface CharacterInfoCardProps {
	Size?: UDim2;
	Position?: UDim2;
	AnchorPoint?: Vector2;
	LayoutOrder?: number;
}

export const CharacterInfoCard = (props: CharacterInfoCardProps) => {
	/* Organism */
	const organism = ListContainer({
		Name: "CharacterInfoCard",
		Size: props.Size ?? new UDim2(0, 300, 0, 105),
		Position: props.Position ?? new UDim2(0, 10, 0, 10),
		AnchorPoint: props.AnchorPoint ?? new Vector2(0, 0),
		BorderSizePixel: 0,
		LayoutOrientation: "horizontal",
		LayoutOrder: props.LayoutOrder ?? 1,
		Content: {
			Avatar: AvatarBust(Players.LocalPlayer.UserId, 0),
			ResourceBars: ResourceBars(1),
		},
	});

	return organism;
};
