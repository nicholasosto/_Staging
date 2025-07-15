import Fusion from "@rbxts/fusion";
import { ClientSend } from "client/network";

import { UIButton, ListContainer, UIButtonProps } from "client/ui/atoms";
import { GameImages } from "shared";

const { Spring } = Fusion;
const { Children, Computed, Value } = Fusion;

/*-- Button Props -------------------------------------------------*/
const SpawnRopeProps: UIButtonProps = {
	Icon: GameImages.Ability.Blood_Horror,
	Label: "Spawn Rope",
	Size: new UDim2(0, 50, 0, 50),
	Position: Computed(() => new UDim2(0, 10, 0, 10)),
	OnClick: () => {
		ClientSend.SpawnRope("Strong");
	},
};

const SpawnWeaponProps: UIButtonProps = {
	Icon: GameImages.Ability.Blood_Horror,
	Label: "Spawn Weapon",
	Size: new UDim2(0, 50, 0, 50),
	Position: Computed(() => new UDim2(0, 70, 0, 10)),
	OnClick: () => {
		ClientSend.SpawnWeapon();
	},
};

const SpawnNPCProps: UIButtonProps = {
	Icon: GameImages.Ability.Blood_Horror,
	Label: "Spawn Blood Toad",
	Size: new UDim2(0, 50, 0, 50),
	Position: Computed(() => new UDim2(0, 130, 0, 10)),
	OnClick: () => {
		ClientSend.SpawnNPC("BLOOD_TOAD");
	},
};

export function AdminBar() {
	const container = ListContainer({
		Name: "AdminBar",
		LayoutOrder: 1,
		LayoutOrientation: "horizontal",
		Size: new UDim2(0, 200, 0, 50),
		Position: new UDim2(0.5, -100, 0, 0),
		Content: {
			SpawnRopeButton: UIButton(SpawnRopeProps),
			SpawnWeaponButton: UIButton(SpawnWeaponProps),
			SpawnNPCButton: UIButton(SpawnNPCProps),
		},
	});

	return container;
}
