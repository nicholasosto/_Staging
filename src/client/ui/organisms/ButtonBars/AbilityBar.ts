/**
 * @file        AbilityBar.ts
 * @module      AbilityBar
 * @layer       Client/UI/Organisms
 * @description Contains buttons for various game events like spawning manifestations, increasing attributes, and creating gems
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 * @author Trembus
 * @license MIT
 * @since 0.2.0
 * @lastUpdated 2025-06-27 by Trembus – Initial creation
 * @dependencies
 *  @rbxts/fusion ^0.4.0
 * * @remarks
 *  This file defines the AbilityBar component, which displays a set of ability buttons for the player to interact with.
 *  Each button corresponds to an ability and includes a cooldown bar.
 *  The buttons are dynamically generated based on the abilities available to the player.
 *  The component uses Fusion for reactive UI updates and layout management.
 *  It is designed to be flexible and easily extendable for future abilities.
 *  The component is styled using the GamePanel atom for consistent UI appearance.
 *  The buttons are arranged horizontally with a set layout and spacing.
 *  The component is intended to be used within the player HUD screen, providing quick access to
 *  abilities during gameplay.
 */

import { Computed, Value } from "@rbxts/fusion";
import PlayerState from "client/states/PlayerState";
import { GamePanel } from "client/ui/atoms";
import { AbilityButton } from "client/ui/molecules";
import { Layout } from "client/ui/tokens";
import { AbilityKey } from "shared";

export class AbilityBarClass {
	private Bar: Computed<Frame>;

	private EquippedAbilities: Value<AbilityKey>[];

	constructor() {
		this.EquippedAbilities = PlayerState.getInstance().Abilities;

		this.Bar = Computed(
			() => {
				print(
					"Rendering AbilityBar:",
					this.EquippedAbilities.map((ability) => ability.get()),
				);
				const abilities: AbilityKey[] = [];
				this.EquippedAbilities.forEach((ability) => {
					abilities.push(ability.get());
				});
				return AbilityBarComponent(abilities);
			},
			(x) => this.DestroyComponent(x),
		);
	}
	public getBar(): Computed<Frame> {
		return this.Bar;
	}

	public getAbilityArray(): AbilityKey[] {
		return this.EquippedAbilities.map((ability) => ability.get());
	}

	public getAbilityStateArray(): Value<AbilityKey>[] {
		return this.EquippedAbilities;
	}
	public activateAbility(abilityKey: AbilityKey): void {
		// This method can be used to activate an ability when the button is clicked.
		print(`Activating ability: ${abilityKey}`);
		// Here you would typically trigger the ability's effect, such as spawning a manifestation or
	}
	public DestroyComponent = (x: Frame): void => {
		print("Destroying AbilityBar component");
		if (!x) {
			print("Attempted to destroy a null AbilityBar component.");
			return;
		}
		//x.Destroy();
	};
}
function AbilityBarComponent(abilityKeyArray: AbilityKey[]): Frame {
	return GamePanel({
		Name: "AbilityBar",
		Size: new UDim2(1, 0, 0, 100),
		AnchorPoint: new Vector2(0.5, 1),
		Position: new UDim2(0.5, 0, 1, -10),
		BackgroundTransparency: 0.5,
		Layout: Layout.HorizontalSet(10),
		Content: {
			Buttons: abilityKeyArray.map((ability) => {
				return AbilityButton({ abilityKey: ability });
			}),
		},
	});
}
