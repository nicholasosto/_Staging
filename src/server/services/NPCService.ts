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
import { NPC } from "server/classes/npc";
import { playAnimation } from "shared";
import { RunEffect } from "./VisualEffectsService";
import { setupSSEntity } from "./Internal";

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
		setupSSEntity(npc.model);
		playAnimation(npc.model, "GodLike"); // Example animation, replace with actual key
		RunEffect("ToxicCloud", npc.model, 55); // Example effect, replace with actual key
		return npc;
	}

	public static MoveNPC(npc: NPC, cFrame: CFrame): void {
		const svc = this.Start();
		if (svc._npcs.has(npc)) {
			npc.MoveNPC(npc, cFrame);
		} else {
			warn(`NPC ${npc.name} not found in service.`);
		}
	}

	public static Remove(npc: NPC) {
		const svc = this.Start();
		if (svc._npcs.has(npc)) {
			svc._npcs.delete(npc);
			npc.Destroy();
		}
	}
}

export const SpawnNPC = (key: NPCKey, cFrame: CFrame): NPC => {
	return NPCService.Spawn(key, cFrame);
};
