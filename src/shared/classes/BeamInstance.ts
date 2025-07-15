/**
 * @file        BeamInstance.ts
 * @module      BeamInstance
 * @layer       Server/FX
 * @description Runtime wrapper around a Roblox `Beam` that automatically
 *              updates, self-destructs after a configured lifetime, and can be
 *              recycled by a factory-level object pool.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 *
 * @author        Trembus
 * @license       MIT
 * @since         0.2.1
 * @lastUpdated   2025-07-11 – Import style fixed (Maid as default)
 *
 * @dependencies
 *   @rbxts/maid ^1.1.0   (default export)
 *   @rbxts/services      (HttpService, RunService, TweenService)
 */

import Maid from "@rbxts/maid";
import { HttpService, RunService, TweenService } from "@rbxts/services";
import { BeamDefinition } from "shared/definitions/Beams";

/** Live wrapper that owns a single `Beam` instance. */
export class BeamInstance {
	/** Diagnostic GUID for logs / debugging */
	private readonly id = HttpService.GenerateGUID(false);

	private readonly maid = new Maid();
	private elapsed = 0;
	private readonly beam: Beam;

	constructor(
		private readonly def: BeamDefinition,
		a0: Attachment,
		a1: Attachment,
	) {
		this.beam = new Instance("Beam");
		this.beam.Name = `BeamInstance-${this.id}`;
		this.beam.Parent = a0.Parent; // Attach to the same parent as the first attachment
		this.beam.FaceCamera = true;

		this.applyStatic(def);
		this.rebind(a0, a1);

		const hb = RunService.Heartbeat.Connect((dt) => this.onHeartbeat(dt));
		this.maid.GiveTask(hb); // auto-disconnect
		this.maid.GiveTask(this.beam); // beam freed on Destroy
		this.def.onStart?.(this.beam); // call onStart hook if defined
	}

	/** Re-use this object with new attachments (called by the pool). */
	public rebind(a0: Attachment, a1: Attachment): void {
		this.elapsed = 0;
		this.beam.Attachment0 = a0;
		this.beam.Attachment1 = a1;

		// Reset dynamic props that the tween/onTick may have changed
		this.beam.Width0 = this.def.width0;
		this.beam.Width1 = this.def.width1;
	}

	/** Maid recognises `Destroy`, so call this to clean up early. */
	public Destroy(): void {
		this.maid.DoCleaning();
	}

	// ────────────────────────────────────────────────────────────────────────
	// Internals
	// ────────────────────────────────────────────────────────────────────────

	private applyStatic(def: BeamDefinition): void {
		const b = this.beam;

		b.Texture = def.texture ?? "";
		b.Color = def.color;
		b.Width0 = def.width0;
		b.Width1 = def.width1;
		if (def.segments !== undefined) b.Segments = def.segments;

		if (def.tweenInfo) {
			const tween = TweenService.Create(b, def.tweenInfo, {
				Width0: def.width0 * 1.3,
				Width1: def.width1 * 1.3,
			});
			tween.Play();
			this.maid.GiveTask(tween);
		}
	}

	private onHeartbeat(dt: number): void {
		this.elapsed += dt;
		this.def.onTick?.(this.beam, dt);

		if (this.elapsed >= this.def.lifetime) {
			this.def.onEnd?.(this.beam);
			this.Destroy();
		}
	}
}
