/// <reference types="@rbxts/types" />

import Fusion, { Children, Value } from "@rbxts/fusion";
import { EquipmentSlotKey, EquipmentSlotMeta } from "shared/data/PanelSelectorData";
import { GameButton, GameText } from "../atoms";

/**
 * @file        src/client/ui/molecules/PanelSelector.ts
 * @module      PanelSelector
 * @layer       Client/UI/Molecules
 * @description Rectangular panel with an imagebutton that opens a grid of selectable items. Once selected, the panel displays the selected item and its metadata.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 *
 * @author       Codex
 * @license      MIT
 * @since        0.2.1
 * @lastUpdated  2025-07-02 by Codex – Initial creation
 *
 * @dependencies
 *   @rbxts/fusion ^0.4.0
 */

export interface PanelSelectorProps extends Fusion.PropertyTable<Frame> {
	SelectorKey: EquipmentSlotKey;
}

export const PanelSelector = (props: PanelSelectorProps) => {
	const SelectorMetaData = EquipmentSlotMeta[props.SelectorKey];

	const CategoryText = GameText({
		TextStateValue: Value(SelectorMetaData.displayName),
		TextSize: 14,
		TextColor3: Color3.fromRGB(255, 255, 255),
		TextXAlignment: Enum.TextXAlignment.Left,
		TextYAlignment: Enum.TextYAlignment.Top,
		Size: new UDim2(1, -10, 1, -10),
		Position: new UDim2(0, 5, 0, 5),
		BackgroundTransparency: 1,
		Font: Enum.Font.Gotham,
	});
	const SelectorButton = GameButton({
		Name: `${props.SelectorKey}SelectorButton`,
		Size: new UDim2(1, 0, 0, 50),
		BackgroundColor3: Color3.fromRGB(50, 50, 50),
		BorderSizePixel: 0,
		Image: SelectorMetaData.iconId,
		ImageColor3: Color3.fromRGB(255, 255, 255),
		[Children]: {
			CategoryText: CategoryText,
		},
	});

	return SelectorButton;
};
