import { ReplicatedStorage, Workspace } from "@rbxts/services";
import { GameAudio } from "shared/assets";
import { SSEntity } from "shared/types";
const EFFECT_FOLDER = ReplicatedStorage.WaitForChild("SS Game Package").WaitForChild("VFXParts", 3) as Folder;
export const VFX_KEYS = ["FireAura", "HealingRing", "ToxicCloud", "TakeDamage", "CastingDefault", "CastFail"] as const;
export type VFXKey = (typeof VFX_KEYS)[number];

export interface VisualEffectMeta {
	/** Optional sound asset ID to play when the effect starts */
	soundId?: string;
	/** Function to create the effect on a given model */
	run: (target: SSEntity, duration: number) => void;
}

export const VisualEffectMetaMap: Record<VFXKey, VisualEffectMeta> = {
	CastingDefault: {
		soundId: "rbxassetid://1234567890", // Example sound
		run: (model, duration) => {
			const effectPart = EFFECT_FOLDER.FindFirstChild("Casting_Default")?.Clone() as Part;
			if (!effectPart) {
				warn("CastingDefault model not found in VFXParts.");
				return;
			}
			effectPart.Position = model.GetPivot().Position;
			effectPart.Parent = Workspace;
			// animate the effect if desired...
			task.delay(duration, () => {
				effectPart.Destroy();
			});
		},
	},
	CastFail: {
		soundId: "rbxassetid://1234567890", // Example sound
		run: (model, duration) => {
			const effectPart = EFFECT_FOLDER.FindFirstChild("Cast_Fail")?.Clone() as Part;
			if (!effectPart) {
				warn("CastFail model not found in VFXParts.");
				return;
			}
			effectPart.Position = model.GetPivot().Position;
			effectPart.Parent = Workspace;
			// animate the effect if desired...
			task.delay(duration, () => {
				effectPart.Destroy();
			});
		},
	},
	ToxicCloud: {
		soundId: "rbxassetid://1234567890", // Example sound
		run: (model, duration) => {
			const effectPart = EFFECT_FOLDER.FindFirstChild("Toxic_Cloud")?.Clone() as Part;
			if (!effectPart) {
				warn("ToxicCloud model not found in VFXParts.");
				return;
			}
			const prismaticConstraint = effectPart.FindFirstChildOfClass("PrismaticConstraint");
			const attachment = effectPart.FindFirstChild("Attachment") as Attachment | undefined;
			if (prismaticConstraint && attachment) {
				prismaticConstraint.Enabled = true; // Enable the constraint if it exists
				prismaticConstraint.Attachment1 = model.UpperTorso.WaistRigAttachment; // Attach to the NPC's torso
				attachment.Parent = model.HumanoidRootPart;
			}
			effectPart.Position = model.GetPivot().Position;
			effectPart.Parent = Workspace;
			// animate the effect if desired...
			task.delay(duration, () => {
				effectPart.Destroy();
			});
		},
	},
	FireAura: {
		soundId: "rbxassetid://7854285068", // reuse existing audio tokens:contentReference[oaicite:5]{index=5}
		run: (model, duration) => {
			const effectPart = EFFECT_FOLDER.FindFirstChild("Aura_Fire")?.Clone() as Part;
			const leftHandAttachment = effectPart?.FindFirstChild("Attachment")?.Clone() as Attachment | undefined;
			const rightHandAttachment = effectPart?.FindFirstChild("Attachment")?.Clone() as Attachment | undefined;
			if (!effectPart || !leftHandAttachment || !rightHandAttachment) {
				warn("FireAura model or attachments not found in VFXParts.");
				return;
			}
			leftHandAttachment.Parent = model.LeftHand;
			rightHandAttachment.Parent = model.RightHand;

			// Remove after duration
			task.delay(duration, () => {
				leftHandAttachment.Destroy();
				rightHandAttachment.Destroy();
			});
		},
	},
	HealingRing: {
		soundId: "rbxassetid://7854285068", // LevelUp sound:contentReference[oaicite:6]{index=6}
		run: (model, duration) => {
			warn(`Effect HealingRing started for: ${model.Name}`);
			const ring = EFFECT_FOLDER.FindFirstChild("Beam_Lava")?.Clone() as Part;
			if (!ring) {
				warn("HealingRing model not found in VFXParts.");
				return;
			}
			ring.Position = model.GetPivot().Position;
			ring.Parent = Workspace;
			// animate the ring if desired...
			task.delay(duration, () => {
				print("Removing HealingRing after duration");
				ring.Destroy();
			});
		},
	},
	TakeDamage: {
		soundId: GameAudio.ZombieTheme.Hurt, // Hurt sound:contentReference[oaicite:7]{index=7}
		run: (model, duration) => {
			const effectPart = EFFECT_FOLDER.FindFirstChild("Take_Damage")?.Clone() as Part;
			if (!effectPart) {
				warn("TakeDamage model not found in VFXParts.");
				return;
			}
			effectPart.Position = model.GetPivot().Position;
			effectPart.Parent = Workspace;
			// animate the effect if desired...
			task.delay(duration, () => {
				effectPart.Destroy();
			});
		},
	},
	// … other effects …
};
