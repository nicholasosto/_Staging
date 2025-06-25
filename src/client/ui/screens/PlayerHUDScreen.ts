import Fusion, { Children, Value } from "@rbxts/fusion";
import { Network } from "shared/network";
import { GamePanel, GameScreen } from "../atoms";
import { ResourceBars } from "../organisms";
import { CountdownTimer } from "../molecules";

export const PlayerHUDScreen = () => {
	const remaining = Value(0);
	const CountdownEvent = Network.Client.Get("RoomCountdown");
	CountdownEvent.Connect((_roomId, time) => remaining.set(time));

	return GameScreen({
		Name: "PlayerHUDScreen",
		Children: {
			ResourceContainer: ResourceBars(true),
			Countdown: CountdownTimer({ remaining }),
		},
	});
};
