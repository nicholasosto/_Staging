import { AbilitiesMeta, AbilityKey } from "shared/definitions/ProfileDefinitions/Ability";
import { BaseContainer, ListContainer, GameImage, GameText } from "../atoms";
import { New, Value, Computed } from "@rbxts/fusion";
import { useToken } from "theme/hooks";

export interface AbilityInfoPanelProps {
	abilityKey: AbilityKey;
	CooldownColor?: Color3 | Computed<Color3>;
	PowerColor?: Color3 | Computed<Color3>;
}

export function AbilityInfoPanel({ abilityKey, CooldownColor, PowerColor }: AbilityInfoPanelProps) {
	const abilityMeta = AbilitiesMeta[abilityKey];

	const abilityIcon = GameImage({
		Name: `AbilityIcon-${abilityKey}`,
		Image: abilityMeta.iconId,
		Size: UDim2.fromScale(0.2, 1),
	});

	const abilityName = GameText({
		Name: `AbilityName-${abilityKey}`,
		TextStateValue: Value(abilityMeta.displayName),
		Size: UDim2.fromScale(0.8, 1),
	});
	const abilityDescription = GameText({
		Name: `AbilityDescription-${abilityKey}`,
		TextStateValue: Value(abilityMeta.description),
		Size: UDim2.fromScale(1, 0.3),
		TextWrapped: true,
	});
	const cooldownColor = CooldownColor ?? useToken("healthFill");
	const powerColor = PowerColor ?? useToken("staminaFill");

	const abilityCooldown = GameText({
		Name: `AbilityCooldown-${abilityKey}`,
		TextStateValue: Value(`Cooldown: ${abilityMeta.cooldown} seconds`),
		Size: UDim2.fromScale(1, 0.3),
		BackgroundTransparency: 1,
		TextColor3: cooldownColor,
	});
	const abilityPower = GameText({
		Name: `AbilityPower-${abilityKey}`,
		TextStateValue: Value(`Base Power: ${abilityMeta.basePower}`),
		BackgroundTransparency: 1,
		TextColor3: powerColor,
		Size: UDim2.fromScale(1, 0.3),
	});

	return ListContainer({
		Name: `AbilityInfoPanel-${abilityKey}`,
		Size: UDim2.fromOffset(300, 200),
		LayoutOrientation: "vertical",
		Gap: 2,

		Content: {
			TopRow: ListContainer({
				Name: `TopRow-${abilityKey}`,
				LayoutOrientation: "horizontal",
				Gap: 2,
				Size: UDim2.fromScale(1, 0.3),
				Content: {
					AbilityIcon: abilityIcon,
					AbilityName: abilityName,
				},
			}),
			BottomRow: ListContainer({
				Name: `BottomRow-${abilityKey}`,
				LayoutOrientation: "vertical",
				Gap: 2,
				Size: UDim2.fromScale(1, 0.7),
				Content: {
					AbilityDescription: abilityDescription,
					AbilityCooldown: abilityCooldown,
					AbilityPower: abilityPower,
				},
			}),
		},
	});
}
