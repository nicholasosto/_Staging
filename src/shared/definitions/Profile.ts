import { AbilityKey } from ".";
import { AttributesDTO } from "./Attributes";

// shared/ProfileDataTypes.ts
export const ProfileDataKeys = ["Abilities", "Attributes"] as const;
export type ProfileDataKey = (typeof ProfileDataKeys)[number];

/** Shape of each bucket inside the player’s ProfileService blob */
export interface ProfileDataMap {
	Abilities: AbilityKey[];
	Attributes: AttributesDTO;
}
