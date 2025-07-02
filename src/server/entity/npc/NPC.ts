/// <reference types="@rbxts/types" />

/**
 * @file        NPC.ts
 * @module      NPC
 * @layer       Server/Entity
 * @description Basic non-player character with attributes.
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
 */

import { createAttributes } from "shared";
import { ReplicatedStorage } from "@rbxts/services";
const Rigs = ReplicatedStorage.WaitForChild("SS Game Package").WaitForChild("Rigs");
export class NPC {
	// NPC properties
	public readonly id: string;
	public readonly name: string;
	public readonly description: string;
	public readonly Attributes = createAttributes({
		str: 10,
		agi: 10,
		vit: 12,
	});
	public readonly model?: Model;

	constructor(id: string, name: string, description: string) {
		this.id = id;
		this.name = name;
		this.description = description;

		print(`NPC created: ${this.name} (${this.id}) - ${this.description}`);
	}
}
