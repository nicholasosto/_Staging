/// <reference types="@rbxts/types" />

/**
 * @file        GemForgeScreen.ts
 * @module      GemForgeScreen
 * @layer       Client/UI/Screens
 * @description UI screen for forging manifestation gems.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 *
 * @author       Codex
 * @license      MIT
 * @since        0.2.1
 * @lastUpdated  2025-07-01 by Codex – Reconstructed screen
 *
 * @dependencies
 *   @rbxts/fusion ^0.4.0
 */

import Fusion, { Children, New, Value, Computed, OnEvent } from "@rbxts/fusion";
import { Players } from "@rbxts/services";
import { GamePanel, RingSlot } from "../atoms";
import { InventoryGrid } from "../organisms";
import { BarMeter } from "../molecules";
import { Layout, Padding } from "../tokens";
import { GameImages } from "shared/assets";
import { RarityKey } from "shared/data";

export const GemForgeScreen = () => {
	const playerGui = Players.LocalPlayer.WaitForChild("PlayerGui");

	// sample gem store for display
	const gemStore = new Map<string, { icon: string; rarity: RarityKey }>();
	gemStore.set("1", { icon: GameImages.Gems.Colorable, rarity: "Common" });
	gemStore.set("2", { icon: GameImages.Gems.Colorable, rarity: "Rare" });
	gemStore.set("3", { icon: GameImages.Gems.Colorable, rarity: "Epic" });

	const capacity = Value(30);
	const maxCapacity = Value(100);
	const formFilled = Value(false);
	const abilityFilled = Value(false);
	const bonusFilled = Value(false);

	const canForge = Computed(
		() => formFilled.get() && abilityFilled.get() && bonusFilled.get() && capacity.get() <= maxCapacity.get(),
	);

	const screen = New("ScreenGui")({
		Name: "GemForgeScreen",
		Parent: playerGui,
		ResetOnSpawn: false,
		DisplayOrder: 1000,
		Enabled: true,
		[Children]: {
			MainFrame: GamePanel({
				Name: "ForgeMainFrame",
				Size: UDim2.fromOffset(800, 600),
				Position: UDim2.fromScale(0.5, 0.5),
				AnchorPoint: new Vector2(0.5, 0.5),
				Padding: Padding(6),
				Children: {
					Layout: Layout.HorizontalSet(10),
					Inventory: InventoryGrid({ items: gemStore }),
					ForgeArea: GamePanel({
						Name: "ForgeArea",
						Size: UDim2.fromOffset(400, 400),
						BackgroundTransparency: 1,
						Children: {
							FormSlot: RingSlot({
								Name: "FormSlot",
								Size: UDim2.fromOffset(64, 64),
								Position: UDim2.fromOffset(308, 168),
							}),
							AbilitySlot: RingSlot({
								Name: "AbilitySlot",
								Size: UDim2.fromOffset(64, 64),
								Position: UDim2.fromOffset(98, 289),
							}),
							BonusSlot: RingSlot({
								Name: "BonusSlot",
								Size: UDim2.fromOffset(64, 64),
								Position: UDim2.fromOffset(98, 47),
							}),
						},
					}),
					Preview: GamePanel({
						Name: "Preview",
						Size: UDim2.fromOffset(220, 350),
						BackgroundTransparency: 0.2,
					}),
					Meter: BarMeter({ value: capacity, max: maxCapacity, Size: UDim2.fromOffset(300, 20) }),
					ConfirmButton: New("TextButton")({
						Name: "ConfirmButton",
						Text: "FORGE",
						Size: UDim2.fromOffset(150, 40),
						AnchorPoint: new Vector2(0.5, 0),
						Position: UDim2.fromScale(0.5, 1),
						BackgroundColor3: Color3.fromRGB(60, 60, 60),
						TextColor3: Color3.fromRGB(255, 255, 255),
						[OnEvent("Activated")]: () => print("Forge sent"),
						Active: canForge,
					}),
				},
			}),
		},
	});
	return screen;
};
