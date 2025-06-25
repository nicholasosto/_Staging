import { AbilitiesMeta, AbilityKey } from "shared/data/AbilityData";
import { GamePanel, GameImage, GameText } from "../atoms";
import { New } from "@rbxts/fusion";
import { Layout } from "../tokens";

export interface AbilityInfoPanelProps {
	abilityKey: AbilityKey;
}

export function AbilityInfoPanel({ abilityKey }: AbilityInfoPanelProps) {
	const abilityMeta = AbilitiesMeta[abilityKey];

	const abilityIcon = GameImage({
		Name: `AbilityIcon-${abilityKey}`,
		Image: abilityMeta.iconId,
		Size: UDim2.fromScale(0.2, 1),
	});

	const abilityName = GameText({
		Name: `AbilityName-${abilityKey}`,
		Text: abilityMeta.displayName,
		Size: UDim2.fromScale(0.8, 1),
	});
	const abilityDescription = GameText({
		Name: `AbilityDescription-${abilityKey}`,
		Text: abilityMeta.description,
		Size: UDim2.fromScale(1, 0.3),
		TextWrapped: true,
	});
	const abilityCooldown = GameText({
		Name: `AbilityCooldown-${abilityKey}`,
		Text: `Cooldown: ${abilityMeta.cooldown} seconds`,
		Size: UDim2.fromScale(1, 0.3),
		BackgroundTransparency: 1,
		TextColor3: Color3.fromRGB(255, 100, 100), //
	});
	const abilityPower = GameText({
		Name: `AbilityPower-${abilityKey}`,
		Text: `Base Power: ${abilityMeta.basePower}`,
		BackgroundTransparency: 1,
		TextColor3: Color3.fromRGB(100, 255, 100), //
		Size: UDim2.fromScale(1, 0.3),
	});

	return GamePanel({
		Name: `AbilityInfoPanel-${abilityKey}`,
		Size: UDim2.fromOffset(300, 200),
		Layout: Layout.VerticalSet(2),

		Children: {
			TopRow: GamePanel({
				Name: `TopRow-${abilityKey}`,
				Layout: Layout.HorizontalSet(2),
				Size: UDim2.fromScale(1, 0.3),
				Children: {
					AbilityIcon: abilityIcon,
					AbilityName: abilityName,
				},
			}),
			BottomRow: GamePanel({
				Name: `BottomRow-${abilityKey}`,
				Layout: Layout.VerticalSet(2),
				Size: UDim2.fromScale(1, 0.7),
				Children: {
					AbilityDescription: abilityDescription,
					AbilityCooldown: abilityCooldown,
					AbilityPower: abilityPower,
				},
			}),
		},
	});
}
