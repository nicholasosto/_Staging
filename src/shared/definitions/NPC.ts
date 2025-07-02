/**
 * @file        NPCDefinitions.ts
 * @module      DataDefinitions/NPC
 * @layer       Shared
 * @description Static NPC template catalogue.
 */

import { AbilityKey } from "./Ability";
import { LootTableKey } from "./Loot";
import { AnimationKey } from "../assets";

export const NPC_KEYS = ["GOBLIN_SCOUT", "GOBLIN_ARCHER", "SKELETON_WARRIOR", "CRYSTAL_GOLEM"] as const;

export type NPCKey = (typeof NPC_KEYS)[number];

/** Compile-time template metadata */
export interface NPCMeta {
	/** Display name for UI & lore */
	displayName: string;
	/** rbxassetid of the base model stored in ReplicatedStorage */
	modelAssetId: string;
	/** Core stats used by combat systems */
	baseStats: {
		maxHealth: number;
		attack: number;
		defense: number;
		speed: number;
	};
	/** Abilities (by key) that the AI can invoke */
	abilities: AbilityKey[];
	/** Loot-table key rolled on death */
	lootTable: LootTableKey;
	/** Animation set reference for the AnimationController binder */

	/** Optional behaviour flags or AI profiles */
	aiProfile?: "melee" | "ranged" | "caster" | "tank";
	/** Cosmetic tag for the Nametag component, VFX themes, etc. */
	theme?: "undead" | "goblin" | "construct";
}

export const NPCMetaMap: Readonly<Record<NPCKey, NPCMeta>> = {
	GOBLIN_SCOUT: {
		displayName: "Goblin Scout",
		modelAssetId: "rbxassetid://1234567890", // Replace with actual asset ID
		baseStats: {
			maxHealth: 50,
			attack: 10,
			defense: 5,
			speed: 1.2,
		},
		abilities: ["fireball", "ice_shard"],
		lootTable: "GOBLIN_COMMON",
		aiProfile: "ranged",
		theme: "goblin",
	},
	GOBLIN_ARCHER: {
		displayName: "Goblin Archer",
		modelAssetId: "rbxassetid://1234567891", // Replace with actual asset ID
		baseStats: {
			maxHealth: 60,
			attack: 15,
			defense: 7,
			speed: 1.1,
		},
		abilities: ["lightning_bolt"],
		lootTable: "GOBLIN_ELITE",
		aiProfile: "ranged",
	},
	SKELETON_WARRIOR: {
		displayName: "Skeleton Warrior",
		modelAssetId: "rbxassetid://1234567892", // Replace with actual asset ID
		baseStats: {
			maxHealth: 80,
			attack: 20,
			defense: 10,
			speed: 0.9,
		},
		abilities: ["earthquake"],
		lootTable: "SKELETON_COMMON",
	},
	CRYSTAL_GOLEM: {
		displayName: "Crystal Golem",
		modelAssetId: "rbxassetid://1234567893", // Replace with actual asset ID
		baseStats: {
			maxHealth: 150,
			attack: 30,
			defense: 20,
			speed: 0.8,
		},
		abilities: ["melee"],
		lootTable: "CRYSTAL_GOLEM",
	},
} as const;
