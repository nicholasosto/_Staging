// src/shared/network/Definitions.ts
import Net from "@rbxts/net";

export const Network = Net.Definitions.Create({
	// fire-and-forget from client → server
	SpawnManifestation: Net.Definitions.ClientToServerEvent<[cframe: CFrame]>(),

	// server → client
	ProfileChanged: Net.Definitions.ServerToClientEvent<[data: unknown]>(),
});
