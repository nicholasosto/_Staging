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

const SpawnProjectileProps: UIButtonProps = {
	Icon: GameImages.Ability.Lightning_Bolt,
	Label: "Spawn Lightning Bolt",
	Size: new UDim2(0, 50, 0, 50),
	Position: Computed(() => new UDim2(0, 250, 0, 10)),
	OnClick: () => {
		ClientSend.SpawnProjectile("LightningBolt");
	},
};

export function AdminBar() {
	const container = ListContainer({
		Name: "AdminBar",
		LayoutOrder: 1,
		LayoutOrientation: "horizontal",
		Size: new UDim2(1, 0, 0, 70),
		Gap: 10,
		Content: {
			SpawnRopeButton: UIButton(SpawnRopeProps),
			SpawnWeaponButton: UIButton(SpawnWeaponProps),
			SpawnNPCButton: UIButton(SpawnNPCProps),
			SpawnBeamButton: UIButton(SpawnBeamProps),
			SpawnProjectileButton: UIButton(SpawnProjectileProps),
		},
	});

	return container;
}
