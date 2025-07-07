/**
 * @file WeaponService.ts
 * @module WeaponService
 * @layer Server/Services
 * @classType Singleton
 * @description Manages weapon creation and spawning for players.
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 * @author       Trembus
 * @license      MIT
 * @since        0.2.0
 * @lastUpdated  2025-07-06 by Trembus – Initial creation
 * @dependencies
 *  @rbxts/fusion ^0.4.0
 * *  @rbxts/types ^0.4.0
 * * @description
 * This service handles the creation and management of weapon instances, allowing players to spawn and equip weapons.
 */

import { Workspace } from "@rbxts/services";
import { SpawnModel } from "shared";

class Whip {
	public Character: Model;
	private defaultSegments: number = 10; // Default number of segments for the whip

	constructor(character: Model) {
		this.Character = character;
		const rightGripAttachment = this.Character.FindFirstChild("RightGripAttachment", true) as Attachment;

		const whipModel = new Instance("Model");
		whipModel.Name = "Whip";

		/* Handle */
		const handle = new Instance("Part");
		handle.Name = "Handle";
		handle.Shape = Enum.PartType.Cylinder;
		handle.Size = new Vector3(0.2, 0.2, 10);
		handle.Anchored = false;
		handle.CanCollide = false;
		handle.Parent = whipModel;

		/* Handle Attachment */
		const handleAttachment = new Instance("Attachment");
		handleAttachment.Name = "RightGripAttachment";
		handleAttachment.Position = new Vector3(0, 0, -5);
		handleAttachment.Parent = handle;

		/* Segments */
		for (let i = 0; i < this.defaultSegments; i++) {
			/* Create each segment of the whip */
			/* Segment Part */
			const segment = new Instance("Part");
			segment.Name = `Segment${i + 1}`;
			segment.Shape = Enum.PartType.Cylinder;
			segment.Size = new Vector3(0.1, 0.1, 2);
			segment.Anchored = false;
			segment.CanCollide = false;
			segment.Position = new Vector3(0, 0, -5 - i * 2); // Position segments along the whip
			segment.Parent = whipModel;

			/* Segment Attachment */
			const segmentAttachment = new Instance("Attachment");
			segmentAttachment.Name = `SegmentAttachment${i + 1}`;
			segmentAttachment.Position = new Vector3(0, 0, 0); // Position
			segmentAttachment.Parent = segment;

			/* Rope Constraint */
			const ropeConstraint = new Instance("RopeConstraint");
			ropeConstraint.Name = `RopeConstraint${i + 1}`;
			if (i === 0) {
				ropeConstraint.Attachment0 = handleAttachment; // Attach first segment to handle
			} else {
				const previousSegment = whipModel.FindFirstChild(`Segment${i}`, true) as Part;
				const previousAttachment = previousSegment.FindFirstChild(`SegmentAttachment${i}`, true) as Attachment;
				ropeConstraint.Attachment0 = previousAttachment; // Attach to previous segment
			}
			ropeConstraint.Attachment1 = segmentAttachment; // Attach to current segment
			ropeConstraint.Length = 2; // Length of each segment
			ropeConstraint.Visible = true; // Make the rope visible for debugging
			ropeConstraint.Parent = segment;
		}
		whipModel.Parent = this.Character;
		print(`Whip created for ${this.Character.Name} with ${this.defaultSegments} segments.`);
	}

	public OnEquip(): void {
		print(`${this.Character.Name} has equipped the weapon.`);
	}

	public OnUnequip(): void {
		print(`${this.Character.Name} has unequipped the weapon.`);
	}

	public OnAttack(target: Model): void {
		print(`${this.Character.Name} attacks ${target.Name}.`);
	}
}

export class WeaponService {
	private static _instance: WeaponService | undefined;

	private constructor() {
		print("WeaponService initialized.");
	}

	public static Start(): WeaponService {
		if (!this._instance) {
			this._instance = new WeaponService();
		}
		return this._instance;
	}

	/* ------------------------------- Public API ---------------------------------------- */
	public static SpawnWeapon(position: Vector3): void {
		print("Spawning weapon...");
		const newWeapon = new SpawnModel("Whip", position);
		newWeapon.Model.Parent = Workspace;
		//newWeapon.GrowModel(1.5); // Example scale factor
		task.delay(1, () => {
			newWeapon.GrowModel(1.5);
			newWeapon.SetPosition(position.add(new Vector3(0, 150, 0))); // Spawn above the ground
		});
		//newWeapon.SetPosition(position.add(new Vector3(0, 55, 0))); // Spawn above the ground
	}
}
