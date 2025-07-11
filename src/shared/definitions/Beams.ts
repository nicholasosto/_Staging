/**
 * @file        BeamDefinition.ts
 * @module      BeamDefinition
 * @layer       Shared/Definitions
 * @description Static metadata for each beam archetype used by the factory.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 *
 * @author        Trembus
 * @license       MIT
 * @since         0.2.1
 * @lastUpdated   2025-07-11 – Added sample beam catalog (3 entries)
 */

/** Blueprint for a beam archetype. */
export interface BeamDefinition {
	readonly texture?: string;
	readonly color: ColorSequence;
	readonly width0: number;
	readonly width1: number;
	readonly segments?: number;
	readonly lifetime: number; // seconds
	readonly tweenInfo?: TweenInfo; // optional pulse / wobble
	readonly onTick?: (beam: Beam, dt: number) => void; // runtime hook
}

/**
 * Central catalogue of beams.
 * Extend or replace at data‑load time if you allow designer auth assets.
 */
export const BeamCatalog = {
	/**
	 * Blood‑red constrictor that pulses wider then shrinks, simulating a snake.
	 */
	Constrictor: <BeamDefinition>{
		texture: "rbxassetid://123456789", // placeholder
		color: new ColorSequence(Color3.fromRGB(180, 40, 40), Color3.fromRGB(80, 5, 5)),
		width0: 0.4,
		width1: 0.4,
		lifetime: 5,
		tweenInfo: new TweenInfo(0.6, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut, -1, true),
	},

	/**
	 * Violet soul‑drain beam that slowly narrows while draining.
	 */
	SoulDrain: <BeamDefinition>{
		texture: "rbxassetid://987654321", // placeholder
		color: new ColorSequence(Color3.fromRGB(140, 0, 255), Color3.fromRGB(60, 0, 80)),
		width0: 0.3,
		width1: 0.15,
		lifetime: 6,
		onTick: (beam, dt) => {
			// Gradually thin out to emphasise depletion
			beam.Width0 = math.max(0.05, beam.Width0 - dt * 0.02);
			beam.Width1 = beam.Width0;
		},
	},

	/**
	 * Icy chain that flickers between light blue & white segments.
	 */
	IceChain: <BeamDefinition>{
		texture: "rbxassetid://24682468", // placeholder
		color: new ColorSequence(Color3.fromRGB(200, 235, 255), Color3.fromRGB(150, 220, 255)),
		width0: 0.25,
		width1: 0.25,
		segments: 10,
		lifetime: 4,
		onTick: (beam, dt) => {
			// shimmer by offsetting texture
			beam.TextureSpeed = 2;
		},
	},
} as const;

export type BeamKey = keyof typeof BeamCatalog;
