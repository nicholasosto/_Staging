/// <reference types="@rbxts/types" />

/**
 * @file        ServiceWrapper.ts
 * @module      ServiceWrapper
 * @layer       Server/Services
 * @classType   Facade
 * @description Pure wrapper that routes lifecycle calls to PlayerLifeCycle.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 *
 * @author       Codex
 * @license      MIT
 * @since        0.2.0
 * @lastUpdated  2025-07-08 by Codex – Refactored from PlayerLifecycleService
 *
 * @dependencies
 *   ./PlayerLifeCycle
 */

import { PlayerLifeCycle } from "./PlayerLifeCycle";
import { CombatService } from "./services";

export class ServiceWrapper {
	/** Start the player lifecycle service. */
	public static Start(debug = false) {
		PlayerLifeCycle.Start(debug);
	}

	/** Register a player with the lifecycle service. */
	public static RegisterPlayer(player: Player) {
		PlayerLifeCycle.RegisterPlayer(player);
	}

	/** Unregister a player from the lifecycle service. */
	public static UnregisterPlayer(player: Player) {
		PlayerLifeCycle.UnregisterPlayer(player);
	}
}
