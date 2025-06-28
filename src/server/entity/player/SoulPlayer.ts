import { AbilityKey } from "shared";

/**
 * SoulPlayer class represents a base player entity in the game.
 * Its a container for the persistent data of a player, such as their abilities, stats, equipment, inventory, and more.
 */
const testAbilities: AbilityKey[] = ["fireball", "ice_shard", "lightning_bolt", "earthquake", "melee"];

/* ============================================= Player Registry ====================================================== */
export const PlayerRegistry = new Map<number, SoulPlayer>();

/* Get SoulPlayer by Player */
export function GetSoulPlayer(player: Player): SoulPlayer | undefined {
	if (PlayerRegistry.has(player.UserId)) {
		return PlayerRegistry.get(player.UserId);
	}
	return undefined;
}

export default class SoulPlayer {
	private userId: number;
	public readonly Player: Player;
	public readonly CharacterModel?: Model;
	public readonly Abilities: AbilityKey[] = testAbilities; // Default abilities for testing

	constructor(player: Player) {
		this.Player = player;
		this.userId = player.UserId;
		this.CharacterModel = player.Character || player.CharacterAdded.Wait()[0];

		// Initialize player properties
		this.initializePlayerProperties();

		// Register the player in the registry
		this.registerSoulPlayer();
	}

	private registerSoulPlayer() {
		if (!PlayerRegistry.has(this.userId)) {
			PlayerRegistry.set(this.userId, this);
		} else {
			warn(`SoulPlayer for userId ${this.userId} is already registered.`);
		}
	}

	private deregisterSoulPlayer() {
		if (PlayerRegistry.has(this.userId)) {
			PlayerRegistry.delete(this.userId);
		} else {
			warn(`SoulPlayer for userId ${this.userId} is not registered.`);
		}
	}

	private initializePlayerProperties() {
		// Ensure the character model is loaded
		if (!this.CharacterModel) {
			warn(`Character model for player ${this.Player.Name} is not loaded.`);
			return;
		}
	}

	private died() {
		// Handle player death logic here
		warn(`Player ${this.Player.Name} has died.`);
		this.deregisterSoulPlayer();
	}
}
