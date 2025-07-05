/// <reference types="@rbxts/types" />

import { ScreenKey } from "client/states";

/**
 * @file        image.ts
 * @module      GameImages
 * @layer       shared/assets
 * @description List of image asset IDs used in the game.
 *
 * ╭──────────────────────────────╮
 * │  Soul Steel · Coding Guide   │
 * │  Fusion v4 · Strict TS · ECS │
 * ╰──────────────────────────────╯
 *
 * @author       Trembus
 * @license      MIT
 * @since        0.1.0
 * @lastUpdated  2025-06-10 by Trembus
 *
 * @dependencies
 *   client/states
 */
/* =============================================== Image Constants =============================================== */

export const MenuButtonImageMap: Record<ScreenKey, string> = {
	Settings: "rbxassetid://122289639886993",
	Inventory: "rbxassetid://132702292243603",
	Character: "rbxassetid://100274464430589",
	Quests: "rbxassetid://129030346503415",
	Shop: "rbxassetid://101998590177560",
	Teleport: "rbxassetid://127118741571164",
	GemForge: "rbxassetid://116506062642047",
} as const;

export const GameImages = {
	MenuButtonImage: "rbxassetid://79163709624038",
	DefaultUnassigned: "rbxassetid://117838504772569",
	Ability: {
		Background: "rbxassetid://91419725020401",
		Unassigned: "rbxassetid://98384046526938",
		Flame_Sythe: "rbxassetid://108246514585300",
		HallowHold: "rbxassetid://79001631229851",
		Fireball: "rbxassetid://108246514585301",
		Ice_Shard: "rbxassetid://77085115837905",
		Lightning_Bolt: "rbxassetid://84562572112570",
		Earthquake: "rbxassetid://72703784685790",
		Melee: "rbxassetid://114327486101696",
		Blood_Siphon: "rbxassetid://135950973087916",
		Blood_Horror: "rbxassetid://82257212198629",
		Blood_Elemental: "rbxassetid://122556254156811",
		Spirit_Circles: "rbxassetid://78703065651895",
	},
	Attributes: {
		Strength: "rbxassetid://127745571044516",
		Dexterity: "rbxassetid://73893872719367",
		Intelligence: "rbxassetid://107600003376684",
		Vitality: "rbxassetid://121291227474039",
		Luck: "rbxassetid://114767496083209",
	},
	Borders: {
		GothicMetal: "rbxassetid://80375133768026",
		RedThick: "rbxassetid://134322739825066",
		CommonSet: "rbxassetid://85778039199330",
		RareSet: "rbxassetid://82228066842612",
		EpicSet: "rbxassetid://135166624307221",
		LegendarySet: "rbxassetid://85570068018789",
	},
	/* Buttons and UI controls */
	Control: {
		Increment: "rbxassetid://102421835119714",
		Decrement: "rbxassetid://78091115085992",
		Close: "rbxassetid://91437543746962",
		TripleArrow: "rbxassetid://136693752293641",
	},
	Currency: {
		Coins: "rbxassetid://127745571044516",
		Shards: "rbxassetid://73893872719367",
		Tombs: "rbxassetid://121291227474039",
	},
	Gems: {
		Colorable: "rbxassetid://71842732472075",
		Common: "rbxassetid://71842732472075",
		Uncommon: "rbxassetid://71842732472075",
		Rare: "rbxassetid://71842732472075",
		Epic: "rbxassetid://119000054151103",
		Legendary: "rbxassetid://71842732472075",
	},
	SlotImage: {
		Unassigned: "rbxassetid://98384046526938",
		Helmet: "rbxassetid://98384046526938",
		Armor: "rbxassetid://98384046526938",
		Weapon: "rbxassetid://98384046526938",
		Accessory: "rbxassetid://98384046526938",
	},
	TextureImage: {
		BoneDoily: "rbxassetid://108018297611555",
		Mystical: "rbxassetid://108018297611556",
		WavyMetal: "rbxassetid://99123505462124",
	},
} as const;

export type GameImageKey = keyof typeof GameImages;
export type GameImageSubKey = keyof (typeof GameImages)[GameImageKey];
