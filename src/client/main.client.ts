import { GamePanel } from "./ui/atoms/GamePanel";
import { Children, New } from "@rbxts/fusion";
import { Players } from "@rbxts/services";

const playerGui = Players.LocalPlayer.WaitForChild("PlayerGui");

New("ScreenGui")({
	Name: "GamePanelGui",
	DisplayOrder: 1000,
	ResetOnSpawn: false,
	Parent: playerGui,
	[Children]: {
		GamePanel: GamePanel({
			Name: "GamePanel",
			Size: UDim2.fromOffset(800, 600),
		}),
	},
});
