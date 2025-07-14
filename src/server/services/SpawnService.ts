import { CollectionService, RunService, Players } from "@rbxts/services";
import { ResourcesService } from "./ResourcesService";

interface PlayerConnections {
	CharacterAdded?: RBXScriptConnection;
	CharacterRemoving?: RBXScriptConnection;
	HumanoidDied?: RBXScriptConnection;
}
export class SpawnService {
	private static _instance: SpawnService | undefined;
	private static _connections: Map<Player, PlayerConnections> = new Map();

	private constructor() {
		if (RunService.IsStudio()) print("SpawnService started");
	}
	public static Start(): SpawnService {
		if (this._instance === undefined) {
			this._instance = new SpawnService();
		}
		return this._instance;
	}

	private static _spawnCharacter(player: Player): Model | undefined {
		print(`Spawned character for player: ${player.Name}`);
		player.LoadCharacter();
		const character = player.Character;
		if (character === undefined) {
			warn(`SpawnService: Failed to spawn character for player ${player.Name}. Character is undefined.`);
			return undefined;
		}
		const humanoid = character.FindFirstChildOfClass("Humanoid");
		if (humanoid === undefined) {
			warn(`SpawnService: Humanoid not found in character for player ${player.Name}.`);
			return undefined;
		}
		CollectionService.AddTag(character, "SSEntity");
		humanoid.Died.Connect(() => {
			print(`Humanoid died for player: ${player.Name}`);
            ResourcesService.Recalculate(player); // Recalculate resources on death
			this._spawnCharacter(player); // Respawn character on death
		});
		return character;
	}

	private static _characterAddedHandler(player: Player, character: Model) {
		CollectionService.AddTag(character, "SSEntity");
		print(`Character loaded[SpawnService]: ${character.Name} and tag added.`);
		player.CharacterRemoving.Connect((removedCharacter) => {
			if (removedCharacter === character) {
				print(`Character removed[SpawnService]: ${character.Name}`);
				this._connections.delete(player);
			}
		});
	}

	public static RegisterPlayer(player: Player): void {
		warn(`SpawnService: Registering player: ${player.Name}`);
		this._spawnCharacter(player);
		this._connections.set(player, {
			CharacterAdded: player.CharacterAdded.Connect((character) => {
				this._characterAddedHandler(player, character);
			}),
			CharacterRemoving: player.CharacterRemoving.Connect((character) => {
				print(`Character removing[SpawnService]: ${character.Name}`);
			}),
		});
	}
}
SpawnService.Start(); // Automatically start the service when this module is loaded
