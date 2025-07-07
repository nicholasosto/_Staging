import { AbilityKey, AttributeKey, ResourceKey, SettingKey } from "shared";
import {
	AbilityService,
	ProgressionService,
	BattleRoomService,
	ResourcesService,
	SettingsService,
	AttributesService,
} from "./services";

export class ServiceWrapper {
	private static _instance: ServiceWrapper | undefined;

	private constructor() {
		print("ServiceWrapper initialized.");
	}

	public static GetInstance(): ServiceWrapper {
		if (this._instance === undefined) {
			this._instance = new ServiceWrapper();
		}
		return this._instance;
	}

	public static AbilityService = {
		AddAbility: (player: Player, abilityKey: AbilityKey) => {
			AbilityService.AddAbility(player, abilityKey);
		},
		RemoveAbility: (player: Player, abilityKey: AbilityKey) => {
			AbilityService.RemoveAbility(player, abilityKey);
		},
		SetAbilities: (player: Player, abilities: AbilityKey[]) => {
			AbilityService.SetAbilities(player, abilities);
		},
		CastAbility: (player: Player, abilityKey: AbilityKey) => {
			AbilityService.Activate(player, abilityKey);
		},
	};

	public static ProgressionService = {
		AddExperience: (player: Player, amount: number) => {
			return ProgressionService.AddExperience(player, amount);
		},
		GetProgression: (player: Player) => {
			return ProgressionService.Get(player);
		},
	};

	public static BattleRoomService = {
		CreateBattleRoom: (hostPlayer: Player) => {
			return BattleRoomService.CreateRoom(hostPlayer);
		},
		JoinBattleRoom: (roomId: string, player: Player) => {
			return BattleRoomService.JoinRoom(player, roomId);
		},
	};

	public static ResourcesService = {
		GetResources: (player: Player, resourceKey: string) => {
			return ResourcesService.GetResources(player);
		},
		ModifyResource: (player: Player, resourceKey: ResourceKey, amount: number) => {
			return ResourcesService.ModifyResource(player, resourceKey, amount);
		},
		RecalculateResources: (player: Player) => {
			return ResourcesService.Recalculate(player);
		},
	};

	public static SettingsService = {
		GetSettings: (player: Player) => {
			return SettingsService.GetSettings(player);
		},
		UpdateSetting: (player: Player, key: SettingKey, value: boolean | string) => {
			return SettingsService.SetSettings(player, key, value);
		},
	};

	public static AttributesService = {
		IncreaseAttribute: (player: Player, attributeKey: AttributeKey, amount: number) => {
			return AttributesService.Increase(player, attributeKey, amount);
		},
		GetAttributesDTO: (player: Player) => {
			return AttributesService.Get(player);
		},
	};
}
