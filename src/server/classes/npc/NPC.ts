/// <reference types="@rbxts/types" />

/**
 * @file        NPC.ts
 * @module      NPC
 * @layer       Server/Entity
 * @description Runtime representation of an NPC spawned from NPCMetaMap.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 *
 * @author       Trembus
 * @license      MIT
 * @since        0.2.0
 * @lastUpdated  2025-07-02 by Codex – Redesigned to use new NPC definitions
 */

import { NPCKey, NPCMeta, NPCMetaMap, FIRST_NAMES, LAST_NAMES, MONIKERS } from "shared/definitions/NPC";
import { AbilitiesMeta, loadAnimation } from "shared";

export class NPC {
	public readonly key: NPCKey;
	public readonly meta: NPCMeta;
	public readonly model: Model;
	public readonly humanoid?: Humanoid;
	public readonly stats: Readonly<
		(typeof NPCMetaMap)[NPCKey] extends infer M ? (M extends { baseStats: infer B } ? B : never) : never
	>;
	public readonly name: string;

	constructor(key: NPCKey, cFrame: CFrame = new CFrame()) {
		this.key = key;
		this.meta = NPCMetaMap[key];
		this.model = this.meta.modelTemplate.Clone();
		this.humanoid = this.model.FindFirstChildOfClass("Humanoid") as Humanoid | undefined;
		this.stats = { ...this.meta.baseStats };
		this.name = NPC.generateName(key);

		this.model.Name = this.name;
		this.model.PivotTo(cFrame);
		this.model.Parent = game.Workspace;

		this.meta.abilities.forEach((abilityKey) => {
			loadAnimation(this.model, AbilitiesMeta[abilityKey]?.animationKey);
		});

		print(`NPC spawned: ${this.name} (${key})`);
	}

	public Destroy() {
		this.model.Destroy();
	}

	public MoveNPC(npc: NPC, cFrame: CFrame): void {
		if (!npc.model) {
			warn(`NPC model not found for ${npc.name}`);
			return;
		}
		npc.model.PivotTo(cFrame);
		print(`NPC ${npc.name} moved to ${cFrame.Position}`);
	}

	private static randomOf<T>(array: readonly T[]): T {
		return array[math.random(0, array.size() - 1)];
	}

	public static generateName(key: NPCKey): string {
		const first = this.randomOf(FIRST_NAMES);
		const last = this.randomOf(LAST_NAMES);
		const moniker = this.randomOf(MONIKERS[key]);
		return `${first} ${last} ${moniker}`;
	}
}
