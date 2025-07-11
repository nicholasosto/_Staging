import { CollectionService, RunService } from "@rbxts/services";
import Signal from "@rbxts/signal";
import { SSEntity } from "shared/types/SSEntity";

const RIG_TAG = "CharacterRig";
type RigAddedSignal = (rig: SSEntity) => void;

class RigRegistry {
	private rigs = new Set<SSEntity>();
	private rigAddedSignals = new Signal<RigAddedSignal>();

	constructor() {
		// bootstrap existing rigs
		CollectionService.GetTagged(RIG_TAG).forEach((value) => this.addRig(value as SSEntity));

		// listen for future rigs
		CollectionService.GetInstanceAddedSignal(RIG_TAG).Connect((inst) => this.addRig(inst as SSEntity));
		CollectionService.GetInstanceRemovedSignal(RIG_TAG).Connect((inst) => this.removeRig(inst as SSEntity));
	}

	/** Returns *copy* to keep internal set safe */
	public getAll(): SSEntity[] {
		return [...this.rigs];
	}

	public onRigAdded(cb: RigAddedSignal) {
		return this.rigAddedSignals.Connect(cb);
	}

	private addRig(rig: SSEntity) {
		this.rigs.add(rig);
		this.rigAddedSignals.Fire(rig);
	}
	private removeRig(rig: SSEntity) {
		this.rigs.delete(rig);
	}
}

export const rigRegistry = new RigRegistry(); // singleton
