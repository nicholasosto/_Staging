// server/services/BeamFactory.ts
import { BeamCatalog, BeamKey } from "shared/definitions/Beams";
import { BeamInstance } from "shared/classes/BeamInstance";
import Maid from "@rbxts/maid";
import { SSEntity } from "shared/types/SSEntity";

/**
 * Centralised factory + lifetime manager for beams.
 */
export class BeamFactory {
	/** Tracks every living beam so the arena can be wiped instantly. */
	private readonly janitor = new Maid();

	// ─── Public API ──────────────────────────────────────────────────────

	/** Generic creator used by convenience wrappers. */
	public createBeam<K extends BeamKey>(key: K, source: SSEntity, target: SSEntity): BeamInstance {
		const def = BeamCatalog[key];
		const [a0, a1] = this.getAttachments(source, target);

		const instance = new BeamInstance(def, a0, a1);
		print(`BeamFactory: Created beam ${key} from ${source.Name} to ${target.Name}`);

		// When the beam destroys itself, Maid will run our cleanup callback.
		this.janitor.GiveTask(() => instance.Destroy());
		return instance;
	}

	/** Convenience façades */
	public CreateConstrictorBeam(src: SSEntity, dst: SSEntity) {
		return this.createBeam("Constrictor", src, dst);
	}
	public CreateSoulDrainBeam(src: SSEntity, dst: SSEntity) {
		return this.createBeam("SoulDrain", src, dst);
	}
	public CreateIceChainBeam(src: SSEntity, dst: SSEntity) {
		return this.createBeam("IceChain", src, dst);
	}

	/** Clear *all* active beams—e.g. between match rounds. */
	public clearAll(): void {
		this.janitor.DoCleaning();
	}

	// ─── Helpers ─────────────────────────────────────────────────────────

	private getAttachments(src: SSEntity, dst: SSEntity): [Attachment, Attachment] {
		const srcAttachment = src.RightHand.RightGripAttachment as Attachment | undefined;
		const dstAttachment = dst.Head.FaceFrontAttachment as Attachment | undefined;
		if (!srcAttachment || !dstAttachment) {
			error(`BeamFactory: Missing attachments for source ${src.Name} or target ${dst.Name}`);
		}
		print(`BeamFactory: Using attachments ${srcAttachment.Name} and ${dstAttachment.Name}`);
		return [srcAttachment, dstAttachment];
	}
}

/**
 * Eager singleton—import anywhere to use.
 */
export const BeamFactoryService = new BeamFactory();
