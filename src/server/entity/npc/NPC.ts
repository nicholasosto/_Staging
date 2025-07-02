/// <reference types="@rbxts/types" />

/**
 * @file        NPC.ts
 * @module      NPC
 * @layer       Server/Entity
 * @description Basic non-player character with attributes.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 *
 * @author       Trembus
 * @license      MIT
 * @since        0.2.0
 * @lastUpdated  2025-06-25 by Trembus – Initial creation
 */

import { createAttributes, NPCKey, NPCMeta, NPCMetaMap } from "shared";
import { ReplicatedStorage } from "@rbxts/services";
export class NPC {
	// NPC properties
	public readonly meta: NPCMeta;
	public readonly name: string;
	public readonly model: Model;
	constructor(key: NPCKey, cFrame: CFrame = new CFrame()) {
		this.meta = NPCMetaMap[key];
		this.name = this.meta.displayName;
		this.model = this.meta.modelTemplate.Clone();
		this.model.PivotTo(cFrame);
		this.model.Parent = game.Workspace;
		warn(`NPC created: ${this.name} at`, cFrame);
	}
}
