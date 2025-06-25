import Fusion from "@rbxts/fusion";

export const PlayerHealth = {
	Current: Fusion.Value<number>(100),
	Max: Fusion.Value<number>(100),
};

export const PlayerMana = {
	Current: Fusion.Value<number>(100),
	Max: Fusion.Value<number>(100),
};

export const PlayerStamina = {
	Current: Fusion.Value<number>(100),
	Max: Fusion.Value<number>(100),
};

export const PlayerState = {
	Health: PlayerHealth,
	Mana: PlayerMana,
	Stamina: PlayerStamina,
};
