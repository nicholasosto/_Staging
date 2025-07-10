import { AbilityKey, AttributeKey, ResourceKey, SettingKey } from "shared";
import { ResourcesService, DataService } from "./services";
import { ServerSend } from "./network";

export class ServiceWrapper {
	private static _instance: ServiceWrapper | undefined;

	private constructor() {
		DataService.Start(); // Initialize the data profile controller
	}

	public static RegisterPlayer(player: Player) {
		while (!DataService.GetProfile(player)) {
			warn(`Waiting for data profile for player: ${player.Name}`);
			task.wait(1);
		}
		warn(`Data profile loaded for player: ${player.Name}`);
		ServerSend.GameStateUpdated(player, true, true); // Notify client that data is loaded
		player.CharacterAdded.Connect((character) => {
			const humanoid = character.WaitForChild("Humanoid") as Humanoid;
			humanoid.Died.Connect(() => {
				ResourcesService.ModifyResource(player, "Health", 100); // Reset health or any other resource
				task.delay(2, () => {
					ResourcesService.ModifyResource(player, "Health", 100); // Reset health or any other resource
					player.LoadCharacter();
				});
			});
		});
		player.LoadCharacterWithHumanoidDescription(new Instance("HumanoidDescription"));
	}

	public static UnregisterPlayer(player: Player) {
		warn(`2 - ServiceWrapper: Unregistering player ${player.Name}`);
	}

	public static GetInstance(): ServiceWrapper {
		if (this._instance === undefined) {
			this._instance = new ServiceWrapper();
		}
		return this._instance;
	}
}
