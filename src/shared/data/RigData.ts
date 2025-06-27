/**
 * @module      RigTemplates
 * @author      Trembus
 * @layer       Data
 * @description Contains the canonical list of rig templates used in the game,
 *
 * ╭──────────────────────────────╮
 * │  Soul Steel · Coding Guide   │
 * │  Fusion v4 · Strict TS · ECS │
 * ╰──────────────────────────────╯
 *
 * @since        0.1.0
 * @lastUpdated  2025-06-10 by Trembus
 */

import { ReplicatedStorage } from "@rbxts/services";
const RigsFolder = ReplicatedStorage.WaitForChild("SS Game Package").WaitForChild("Rigs");
const BloodRigFolder = RigsFolder.WaitForChild("Blood");
const DecayRigsFolder = RigsFolder.WaitForChild("Decay");
const FatelessRigsFolder = RigsFolder.WaitForChild("Fateless");
const SpiritRigsFolder = RigsFolder.WaitForChild("Spirit");
const RoboticRigsFolder = RigsFolder.WaitForChild("Robots");

export const RIG_DOMAIN_KEYS = ["Blood", "Decay", "Fateless", "Spirit", "Robotic"] as const;
export type RigDomainKey = (typeof RIG_DOMAIN_KEYS)[number];
export type RigMap = Record<RigDomainKey, unknown>;

export const RigTemplates: RigMap = {
	Blood: {
		BloodToad: BloodRigFolder.WaitForChild("BloodToad"),
	},
	Decay: {
		Wendingo: DecayRigsFolder.WaitForChild("Wendigo"),
		ZombieHipster: DecayRigsFolder.WaitForChild("Zombie Hipster"),
		Zombie: DecayRigsFolder.WaitForChild("Zombie"),
	},
	Fateless: {
		Fateless: FatelessRigsFolder.WaitForChild("Fateless Master"),
	},
	Spirit: {
		AnimeFemale: SpiritRigsFolder.WaitForChild("Anime_Female"),
		DragonBoy: SpiritRigsFolder.WaitForChild("Dragon Boy"),
		DragonGirl: SpiritRigsFolder.WaitForChild("Dragon Girl"),
		Elemental: SpiritRigsFolder.WaitForChild("Elemental"),
	},
	Robotic: {
		Animatronic: RoboticRigsFolder.WaitForChild("Animatronic"),
		EvilLordHal2000: RoboticRigsFolder.WaitForChild("Evil Lord Hal 2000"),
		MechaMonkey: RoboticRigsFolder.WaitForChild("Mecha Monkey"),
		SteamBot: RoboticRigsFolder.WaitForChild("Steam Bot"),
		WorkerBot: RoboticRigsFolder.WaitForChild("Worker Bot"),
	},
};
