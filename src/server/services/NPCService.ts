/// <reference types="@rbxts/types" />

/**
 * @file        NPCService.ts
 * @module      NPCService
 * @layer       Server/Services
 * @classType   Singleton
 * @description Spawns and tracks NPC instances using NPC definitions.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 *
 * @author       Trembus
 * @license      MIT
 * @since        0.2.0
 * @lastUpdated  2025-07-02 by Codex – Initial creation
 */

import { NPCKey } from "shared/definitions/NPC";
import { NPC } from "server/entity";

export class NPCService {
	private static _instance: NPCService | undefined;
	private readonly _npcs = new Set<NPC>();

	private constructor() {
		print("NPCService initialized.");
	}

	public static Start(): NPCService {
		if (!this._instance) {
			this._instance = new NPCService();
		}
		return this._instance;
	}

	public static Spawn(key: NPCKey, cFrame: CFrame): NPC {
		const svc = this.Start();
		const npc = new NPC(key, cFrame);
		svc._npcs.add(npc);
		return npc;
	}

	public static Remove(npc: NPC) {
		const svc = this.Start();
		if (svc._npcs.has(npc)) {
			svc._npcs.delete(npc);
			npc.Destroy();
		}
	}
}
