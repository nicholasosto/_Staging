/**
 * @file        AdminBar.ts
 * @module      AdminBar
 * @layer       Client/UI/Organisms
 * @description Contains buttons for various admin actions like spawning NPCs, managing players, and viewing analytics
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 * @author Trembus
 * @license MIT
 * @since 0.2.0
 * @lastUpdated 2025-07-02 by Trembus – Initial creation
 * @dependencies
 *  @rbxts/fusion ^0.4.0

 */

import { Value } from "@rbxts/fusion";
import PlayerState from "client/states/PlayerState";
import { GameButton, GamePanel } from "client/ui/atoms";
import { AbilityButton } from "client/ui/molecules";
import { Layout } from "client/ui/tokens";
import { AbilityKey, GameImages, TestNetwork } from "shared";

/* =============================================== Client to Server Events =============================================== */

const SpawnNPCEvent = TestNetwork.Client.Get("SPAWN_NPC");

/* =============================================== Admin Bar =============================================== */

export function AdminBar(visibleState: Value<boolean>) {
	const adminButtons = {
		SpawnNPCButton: GameButton({
			Icon: GameImages.DefaultUnassigned,
			Name: "SpawnNPCButton",
			Size: new UDim2(0, 50, 0, 50),
			OnClick: () => {
				print("Spawn NPC button clicked");
				// Logic to spawn an NPC
				SpawnNPCEvent.SendToServer("GOBLIN_SCOUT");
			},
		}),
	};
	return GamePanel({
		Name: "AdminBar",
		Size: new UDim2(1, 0, 0, 100),
		AnchorPoint: new Vector2(0.5, 1),
		Position: new UDim2(0.5, 0, 1, -110),
		BackgroundTransparency: 0.5,
		Layout: Layout.HorizontalSet(10),
		Content: {
			Buttons: adminButtons,
		},
	});
}
