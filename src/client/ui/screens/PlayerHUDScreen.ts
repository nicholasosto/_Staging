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
			ResourceContainer: GamePanel({
				Name: "ResourceContainer",
				BackgroundTransparency: 1,
				Size: UDim2.fromOffset(250, 100),
				Position: UDim2.fromOffset(20, 20),
				Children: {
					Bars: ResourceBars(),
				},
			}),
			Countdown: GamePanel({
				Name: "CountdownPanel",
				BackgroundTransparency: 1,
				AnchorPoint: new Vector2(0.5, 0),
				Position: UDim2.fromScale(0.5, 0),
				Size: UDim2.fromOffset(200, 50),
				Children: {
					Timer: CountdownTimer({ remaining }),
				},
			}),
		},
	});
};
