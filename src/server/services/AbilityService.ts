import { GetSoulPlayer } from "server/entity/player/SoulPlayer";
import { AbilityKey } from "shared";

export function GetAbilities(player: Player): AbilityKey[] {
	const soulPlayer = GetSoulPlayer(player);
	if (soulPlayer) {
		return soulPlayer.Abilities;
	}
	return [];
}
