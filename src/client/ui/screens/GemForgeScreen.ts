/**
 * @file        GemForgeScreen.ts
 * @module      GemForgeScreen
 * @layer       Client/UI/Screens
 * @description Screen for the Gem Forge UI, allowing players to combine and upgrade gems.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 *
 * @author       Trembus
 * @license      MIT
 * @since        0.2.1
 * @lastUpdated  2025-05-29 by Trembus – Initial creation
 *
 * @dependencies
 *   @rbxts/fusion ^0.4.0
 *
 */
import Fusion, { New, Children } from "@rbxts/fusion";
import { GamePanel, BorderImage } from "../atoms";

export const GemForgeScreen = () => {
	return GamePanel({
		Name: "GemForgeScreen",
		Size: UDim2.fromScale(1, 1),
		Children: {
			ForgePanel: GamePanel({
				Name: "ForgePanel",
				Size: UDim2.fromScale(0.5, 0.5),
				Position: UDim2.fromScale(0.5, 0.5),
				AnchorPoint: new Vector2(0.5, 0.5),
				BorderImage: BorderImage.GothicMetal(),
			}),
		},
	});
};
