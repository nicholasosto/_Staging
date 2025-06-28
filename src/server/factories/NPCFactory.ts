/// <reference types="@rbxts/types" />

/**
 * @file        src/server/factories/NPCFactory.ts
 * @module      NPCFactory
 * @layer       Server/Factories
 * @description Placeholder factory for creating NPC instances.
 */

import { NPC } from "../entity/npc";

/** Simple factory method for creating an NPC. */
export function createNPC(id: string, name: string, description: string): NPC {
	return new NPC(id, name, description);
}
