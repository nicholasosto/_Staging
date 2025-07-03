/// <reference types="@rbxts/types" />

/**
 * @file        src/server/entity/Manifestation.ts
 * @module      Manifestation
 * @layer       Server/Entity
 * @description Handles the manifestation of game objects.
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
 *
 * @dependencies
 *   @rbxts/fusion ^0.4.0
 */

export function CreateManifestationGem(dataGems: unknown): Model {
	const gem = new Instance("Model");
	gem.Name = "ManifestationGem";

	const basePart = new Instance("Part");
	basePart.Name = "Base";
	basePart.Size = new Vector3(1, 1, 1);
	basePart.Anchored = true;
	basePart.CanCollide = false;
	basePart.BrickColor = BrickColor.random();
	basePart.Material = Enum.Material.Plastic;
	gem.PrimaryPart = basePart;
	return gem;
}
