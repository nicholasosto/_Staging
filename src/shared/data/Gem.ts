import { HttpService } from "@rbxts/services";
export type GemAbility = "Melee" | "Ranged" | "Fireball" | "Heal" | "Shield" | "Teleport" | "Supernova";
export type GemRarity = "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary";
export type GemBonus = "Health" | "Damage" | "Speed";

export interface GemDefinition {
	uuid: string; // Unique identifier for the gem
	rarity: GemRarity;
	abilities: GemAbility[]; // List of abilities the gem can provide
	bonuses: GemBonus[]; // List of bonuses the gem can provide
}
