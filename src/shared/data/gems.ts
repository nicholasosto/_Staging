import { GemSaveData } from "shared/types";

export const BasicGem: GemSaveData = {
	id: "basic_gem",
	displayName: "Basic Gem",
	metadataKey: "basic_gem",
	Rarity: "Common",
	Capacity: 1,
	AbilityIds: [],
	AttributeBonuses: {},
};

export const CommonGems: GemSaveData[] = [
	{
		id: "gem_1",
		displayName: "Gem 1",
		metadataKey: "gem_1",
		Rarity: "Common",
		Capacity: 1,
		AbilityIds: ["ability1"],
		AttributeBonuses: { Strength: 2 },
	},
	{
		id: "gem_2",
		displayName: "Gem 2",
		metadataKey: "gem_2",
		Rarity: "Common",
		Capacity: 1,
		AbilityIds: ["ability2"],
		AttributeBonuses: { Agility: 3 },
	},
];

export const RareGems: GemSaveData[] = [
	{
		id: "gem_3",
		displayName: "Gem 3",
		metadataKey: "gem_3",
		Rarity: "Rare",
		Capacity: 2,
		AbilityIds: ["ability3"],
		AttributeBonuses: { Intelligence: 4 },
	},
	{
		id: "gem_4",
		displayName: "Gem 4",
		metadataKey: "gem_4",
		Rarity: "Rare",
		Capacity: 2,
		AbilityIds: ["ability4"],
		AttributeBonuses: { Endurance: 5 },
	},
];
