// src/server/services/VisualEffectService.ts
import { VisualEffectMetaMap, VFXKey } from "shared/definitions";
import { GameAudio } from "shared/assets/audio";
import { SSEntity } from "shared";

export type VFXPartWithAttachment = Part & { Attachment: Attachment };

export class VisualEffectService {
	private static _instance: VisualEffectService;
	private constructor() {}
	public static Start() {
		return (this._instance ??= new VisualEffectService());
	}

	public RunEffect(effectKey: VFXKey, character: Model, duration: number) {
		print(`Running visual effect: ${effectKey} for character: ${character.Name} for duration: ${duration}s`);
		const meta = VisualEffectMetaMap[effectKey];
		if (meta === undefined) return;

		// Play optional sound on character
		if (meta.soundId !== undefined) {
			const sound = new Instance("Sound");
			sound.SoundId = meta.soundId;
			sound.Parent = character;
			sound.Play();
			sound.Ended.Once(() => sound.Destroy());
		}
		// Attachments are not always present, so we check
		const ssEntity = character as SSEntity;
		if(ssEntity === undefined) {
			warn(`SSEntity not found for character: ${character.Name}`);
			return;
		}
		// Spawn particles/models
		meta.run(ssEntity, duration);
		print(`Effect ${effectKey} completed for character: ${character.Name}`);
	}

	/** For non‑character models (e.g. projectiles), similar API */
	public RunModelEffect(effectKey: VFXKey, model: Model, duration: number) {
		return this.RunEffect(effectKey, model, duration);
	}
}

// Auto-start like StatusEffectService:contentReference[oaicite:8]{index=8}
VisualEffectService.Start();
export const RunEffect = (k: VFXKey, c: Model, d: number) => VisualEffectService.Start().RunEffect(k, c, d);
export const RunModelEffect = (k: VFXKey, m: Model, d: number) => VisualEffectService.Start().RunModelEffect(k, m, d);
