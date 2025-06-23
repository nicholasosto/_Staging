export const RarityKeys = ["Common", "Uncommon", "Rare", "Epic", "Legendary"] as const;

export type Rarity = (typeof RarityKeys)[number];

export interface RarityMeta {
	displayName: string;
	color: Color3;
	BorderImage: string; // Asset ID for the rarity icon
}
