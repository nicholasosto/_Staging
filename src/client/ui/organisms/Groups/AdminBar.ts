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

const SpawnBeamProps: UIButtonProps = {
	Icon: GameImages.Ability.Ice_Shard,
	Label: "Spawn Ice Beam",
	Size: new UDim2(0, 50, 0, 50),
	Position: Computed(() => new UDim2(0, 190, 0, 10)),
	OnClick: () => {
		ClientSend.SpawnBeam("IceChain");
	},
};

export function AdminBar() {
	const container = ListContainer({
		Name: "AdminBar",
		LayoutOrder: 1,
		LayoutOrientation: "horizontal",
		Size: new UDim2(1, 0, 0, 70),
		Position: new UDim2(0.5, -100, 0, 0),
		Gap: 10,
		Content: {
			SpawnRopeButton: UIButton(SpawnRopeProps),
			SpawnWeaponButton: UIButton(SpawnWeaponProps),
			SpawnNPCButton: UIButton(SpawnNPCProps),
			SpawnBeamButton: UIButton(SpawnBeamProps),
		},
	});

	return container;
}
