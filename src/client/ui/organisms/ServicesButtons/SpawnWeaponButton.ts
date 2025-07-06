/**
 *  * @file SpawnWeaponButton.ts
 *  * @module SpawnWeaponButton
 *  * @layer Client/UI/Organisms/ServicesButtons
 *  * @description Button to spawn a weapon for testing purposes.
 *  * @author Trembus
 *  * @license MIT
 */

import { GameButton } from "client/ui/atoms";
import { Players } from "@rbxts/services";
import { AdminNet, GameImages } from "shared";

export const SpawnWeaponButton = () =>
	GameButton({
		Name: "SpawnWeaponButton",
		Icon: GameImages.Ability.Flame_Sythe,
		Size: UDim2.fromOffset(50, 50),
		BackgroundColor3: Color3.fromRGB(255, 100, 100),
		OnClick: () => {
			const weaponId = "Whip"; // Replace with actual weapon ID logic
			const character = Players.LocalPlayer.Character || Players.LocalPlayer.CharacterAdded.Wait()[0];
			
			print(`Spawned weapon: ${weaponId}`);
		},
	});
