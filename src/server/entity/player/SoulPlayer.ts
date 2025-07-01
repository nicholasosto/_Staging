import { AbilitiesMeta, AbilityKey, PlayerDataDTO } from "shared";
import { loadAnimation, playAnimation } from "shared/assets/animations";
import { DataProfileController, PlayerProfile } from "server/services";
import { Profile } from "@rbxts/profileservice/globals";

/**
 * SoulPlayer class represents a base player entity in the game.
 * Its a container for the persistent data of a player, such as their abilities, stats, equipment, inventory, and more.
 */
const testAbilities: AbilityKey[] = ["fireball", "ice_shard", "lightning_bolt", "earthquake", "melee"];

/* ============================================= Player Registry <userId, SoulPlayer> ====================================================== */
export const PlayerRegistry = new Map<number, SoulPlayer>();

/* Get SoulPlayer by Player */
export function GetSoulPlayer(player: Player): SoulPlayer | undefined {
	if (PlayerRegistry.has(player.UserId)) {
		return PlayerRegistry.get(player.UserId);
	}
	return undefined;
}

export default class SoulPlayer {
	/* Static Properties */
	public static readonly Binder = new Map<number, SoulPlayer>();
	/* Static Methods */
	public static GetSoulPlayer(player: Player): SoulPlayer | undefined {
		return SoulPlayer.Binder.get(player.UserId);
	}

	/* Instance Properties - Private */
	private userId: number;
	private readonly profile?: Profile<PlayerProfile>;

	/* Instance Properties - Public */
	public readonly Player: Player;
	public CharacterModel?: Model;
	public readonly Abilities: AbilityKey[] = testAbilities; // Default abilities for testing

	/* Constructor */
	constructor(player: Player) {
		this.Player = player;
		this.userId = player.UserId;
		this.profile = DataProfileController.GetProfile(player);
		this.CharacterModel = player.Character;

		this.Player.CharacterAppearanceLoaded.Connect((character) => this.CharacterAppearanceLoaded(character));

		// Register the player in the registry
		SoulPlayer.Binder.set(this.userId, this);
		print(`SoulPlayer created for ${this.Player.Name} with UserId: ${this.userId}`, this.profile);
	}

	private CharacterAppearanceLoaded(character: Model) {
		this.CharacterModel = character;
		this._loadAnimations();
	}

	public ActivateAbility(abilityKey: AbilityKey) {
		if (this.Abilities.includes(abilityKey)) {
			const animationKey = AbilitiesMeta[abilityKey]?.animationKey;
			const character = this.CharacterModel;
			if (character) {
				playAnimation(character, animationKey);
			} else {
				warn(`Character model not found for ${this.Player.Name}`);
			}
		} else {
			warn(`Ability ${abilityKey} is not available for player ${this.Player.Name}`);
		}
	}

	/* Instance Methods */
	/**
	 * Increases the player's attribute by a specified amount.
	 * @param attributeKey The key of the attribute to increase.
	 * @param amount The amount to increase the attribute by.
	 */
	public IncreaseAttribute(attributeKey: string, amount: number) {
		// Logic to increase the player's attribute
		print(`Increasing attribute ${attributeKey} by ${amount} for player ${this.Player.Name}`);
		// Here you would typically update the player's profile or stats
	}

	private _loadAnimations() {
		if (!this.CharacterModel) {
			warn(`Character model for player ${this.Player.Name} is not loaded.`);
			return;
		}

		print(`Loading animations for player ${this.Player.Name}...`, this.Abilities);
		// Animations
		this.Abilities.forEach((abilityKey) => {
			if (this.CharacterModel === undefined) {
				warn(`Character model for player ${this.Player.Name} is undefined.`);
				return;
			}
			loadAnimation(this.CharacterModel, AbilitiesMeta[abilityKey]?.animationKey);
		});
	}

	private died() {
		// Handle player death logic here
		warn(`Player ${this.Player.Name} has died.`);
		SoulPlayer.Binder.delete(this.userId);
	}
}
