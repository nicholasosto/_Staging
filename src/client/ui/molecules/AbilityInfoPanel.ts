import { AbilityCatalog, AbilityKey } from "shared/definitions";
import { BaseContainer, ListContainer, GameImage, GameText } from "../atoms";
import { New, Value } from "@rbxts/fusion";

export interface AbilityInfoPanelProps {
	abilityKey: AbilityKey;
}

export function AbilityInfoPanel({ abilityKey }: AbilityInfoPanelProps) {
	const abilityMeta = AbilityCatalog[abilityKey];

	const abilityIcon = GameImage({
		Name: `AbilityIcon-${abilityKey}`,
		Image: abilityMeta.iconId,
		Size: UDim2.fromScale(0.2, 1),
	});

	const abilityName = GameText({
		Name: `AbilityName-${abilityKey}`,
		TextState: Value(abilityMeta.displayName),
		Size: UDim2.fromScale(0.8, 1),
	});
	const abilityDescription = GameText({
		Name: `AbilityDescription-${abilityKey}`,
		TextState: Value(abilityMeta.description),
		Size: UDim2.fromScale(1, 0.3),
		TextWrapped: true,
	});
	const abilityCooldown = GameText({
		Name: `AbilityCooldown-${abilityKey}`,
		TextState: Value(`Cooldown: ${abilityMeta.cooldown} seconds`),
		Size: UDim2.fromScale(1, 0.3),
		BackgroundTransparency: 1,
		TextColor3: Color3.fromRGB(255, 100, 100), //
	});
	const abilityPower = GameText({
		Name: `AbilityPower-${abilityKey}`,
		TextState: Value(`Base Power: ${abilityMeta.basePower}`),
		BackgroundTransparency: 1,
		TextColor3: Color3.fromRGB(100, 255, 100), //
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
