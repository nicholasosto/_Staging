/**
 * @file        src/shared/classes/Projectile.ts
 * @module      Projectile
 * @layer       Shared/Classes
 * @description Base class for all projectile types in the game.
 *
 */

import Maid from "@rbxts/maid";
import { RunService, TweenService, Workspace } from "@rbxts/services";
import { ProjectileDefinition } from "shared/definitions/Projectile";

export class ProjectileInstance {
	private readonly maid = new Maid();
	private elapsed = 0;
	private readonly projectile: BasePart;

	constructor(
		private readonly def: ProjectileDefinition,
		startPosition: Vector3,
	) {
		this.projectile = def.part.Clone();
		const hb = RunService.Heartbeat.Connect((dt) => this.onHeartbeat(dt));
		const onHit = this.projectile.Touched.Connect((hit) => {
			if (this.def.onHit) {
				this.def.onHit(this.projectile, hit);
				print(`Projectile hit: ${hit.Name}`);
			}
			//this.Destroy();
		});
		this.projectile.Parent = Workspace;
		this.projectile.PivotTo(new CFrame(startPosition));
		this.maid.GiveTask(hb); // auto-disconnect
		this.maid.GiveTask(this.projectile); // projectile freed on Destroy
		this.def.onStart?.(this.projectile); // call onStart hook if defined
	}

	private onHeartbeat(dt: number): void {
		this.elapsed += dt;
		/* -- Call the onTick hook if defined -- */
		if (this.def.onTick) {
			this.def.onTick(this.projectile, dt);
		}

		/* -- Check if the projectile has exceeded its lifetime -- */
		if (this.elapsed >= this.def.lifetime) {
			this.def.onEnd?.(this.projectile);
			this.Destroy();
			return;
		}
		/*-- Create a tween to move the projectile smoothly --*/
		const tween = TweenService.Create(this.projectile, this.def.tweenInfo, {
			Position: this.projectile.Position.add(this.projectile.CFrame.LookVector.mul(this.def.speed * dt)),
		});

		tween.Play();
	}

	public Destroy(): void {
		this.maid.DoCleaning();
	}
}
