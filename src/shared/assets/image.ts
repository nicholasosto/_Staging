/**
 * @module      ImageAssets
 * @author      Trembus
 * @layer       Constants
 * @description List of image asset IDs used in the game, including icons and backgrounds.
 *
 * ╭──────────────────────────────╮
 * │  Soul Steel · Coding Guide   │
 * │  Fusion v4 · Strict TS · ECS │
 * ╰──────────────────────────────╯
 *
 * @since        0.1.0
 * @lastUpdated  2025-06-10 by Trembus
 */

export const GameImages = {
	Borders: {
		GothicMetal: "rbxassetid://80375133768026",
		RedThick: "rbxassetid://134322739825066",
	},
	Attrubutes: {
		Strength: "rbxassetid://127745571044516",
		Dexterity: "rbxassetid://73893872719367",
		Intelligence: "rbxassetid://107600003376684",
		Vitality: "rbxassetid://121291227474039",
		Luck: "rbxassetid://114767496083209",
	},
	Ability: {
		Unassigned: "rbxassetid://98384046526938",
		Flame_Sythe: "rbxassetid://108246514585300",
		HallowHold: "rbxassetid://79001631229851",
		Blood_Siphon: "rbxassetid://135950973087916",
		Blood_Horror: "rbxassetid://82257212198629",
		Blood_Elemental: "rbxassetid://122556254156811",
		Spirit_Circles: "rbxassetid://78703065651895",
	},
	Control: {
		Increment: "rbxassetid://102421835119714",
		Decrement: "rbxassetid://78091115085992",
		Close: "rbxassetid://91437543746962",
		TrippleArrow: "rbxassetid://136693752293641",
	},
	Currency: {
		Coins: "rbxassetid://127745571044516",
		Shards: "rbxassetid://73893872719367",
		Tombs: "rbxassetid://121291227474039",
	},
	TextureImage: {
		BoneDoily: "rbxassetid://108018297611555",
		Mystical: "rbxassetid://108018297611556",
	},
	SlotImage: {
		Unassigned: "rbxassetid://98384046526938",
		Helmet: "rbxassetid://98384046526938",
		Armor: "rbxassetid://98384046526938",
		Weapon: "rbxassetid://98384046526938",
		Accessory: "rbxassetid://98384046526938",
	},
} as const;

export type GameImageKey = keyof typeof GameImages;
export type GameImageSubKey = keyof (typeof GameImages)[GameImageKey];
