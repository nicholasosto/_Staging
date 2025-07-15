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
		this.projectile = new Instance("Part");
		this.projectile.Name = `Projectile-${this.def.texture}`;
		this.projectile.Size = new Vector3(1, 1, 1);
		this.projectile.Position = startPosition;
		this.projectile.Color = this.def.color;
		this.projectile.Anchored = false;
		this.projectile.CanCollide = true;
		this.projectile.Parent = Workspace;

		this.applyStatic(def);

		const hb = RunService.Heartbeat.Connect((dt) => this.onHeartbeat(dt));
		const onHit = this.projectile.Touched.Connect((hit) => {
			if (this.def.onHit) {
				this.def.onHit(this.projectile, hit);
			}
			//this.Destroy();
		});
		this.maid.GiveTask(hb); // auto-disconnect
		this.maid.GiveTask(this.projectile); // projectile freed on Destroy
		this.def.onStart?.(this.projectile); // call onStart hook if defined
	}

	private applyStatic(def: ProjectileDefinition): void {
		if (def.texture !== undefined) {
			const decal = new Instance("Decal");
			decal.Texture = def.texture;
			decal.Parent = this.projectile;
		}
	}

	private onHeartbeat(dt: number): void {
		this.elapsed += dt;

		if (this.def.onTick) {
			this.def.onTick(this.projectile, dt);
		}

		if (this.elapsed >= this.def.lifetime) {
			this.def.onEnd?.(this.projectile);
			this.Destroy();
			return;
		}

		TweenService.Create(
			this.projectile,

			this.def.tweenInfo,

			{
				Position: this.projectile.Position.add(this.projectile.CFrame.LookVector.mul(this.def.speed * dt)),
			},
		).Play();
	}

	public Destroy(): void {
		this.maid.DoCleaning();
	}
}
