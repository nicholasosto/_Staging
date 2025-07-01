import { AbilityKey, AbilitiesMeta } from "shared/definitions";
import { loadAnimation } from "shared/assets/animations";

// Entity Helpers
export function LoadAbilityAnimations(character: Model, abilities: AbilityKey[]) {
	if (character === undefined) {
		warn(`Character model is undefined.`);
		return;
	}
	abilities.forEach((abilityKey) => {
		loadAnimation(character, AbilitiesMeta[abilityKey]?.animationKey);
	});
}
