/**
 * @file        GamePanel.ts
 * @module      ResourceBars
 * @layer       Client/Organisms
 * @description Organism component that displays resource bars for the player, such as health, mana, and stamina.
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 *
 * @author       Trembus
 * @license      MIT
 * @since        0.2.1
 * @lastUpdated  2025-05-29 by Trembus – Update
 *
 * @dependencies
 *   @rbxts/fusion ^0.4.0
 *
 */

import { New } from "@rbxts/fusion";
import { GamePanel } from "../atoms";
import { Layout } from "../style";

/* =============================================== Resource Bars Component ========================================= */
export const ResourceBars = () => {
	return GamePanel({
		Name: "ResourceBars",
		Layout: Layout.VerticalSet(5),
		Children: {
			HealthBar: GamePanel({
				Name: "HealthBar",
				BackgroundColor3: new Color3(1, 0, 0),
				Size: UDim2.fromScale(1, 0.2),
			}),
			ManaBar: GamePanel({
				Name: "ManaBar",
				BackgroundColor3: new Color3(0, 0, 1),
				Size: UDim2.fromScale(1, 0.2),
			}),
			StaminaBar: GamePanel({
				Name: "StaminaBar",
				BackgroundColor3: new Color3(0, 1, 0),
				Size: UDim2.fromScale(1, 0.2),
			}),
		},
	});
};
