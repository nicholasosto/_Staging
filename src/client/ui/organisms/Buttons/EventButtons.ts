/**
 * @file EventButtons.tsx
 * @module EventButtons
 * @layer Client/UI/Organisms
 * @description Contains buttons for various game events like spawning manifestations, increasing attributes, and creating gems
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 * @author Trembus
 * @license MIT
 * @since 0.2.0
 * @lastUpdated 2025-06-25 by Trembus – Initial creation
 * @dependencies
 *   @rbxts/fusion ^0.4.0
 */

import { GamePanel, GameButton } from "../../atoms";
import { GameImages, Network } from "shared";
import { Layout } from "../../tokens";
/*================================================ Network Definitions =============================================*/
const SpawnManifestationEvent = Network.Client.Get("SpawnManifestation");
const IncreaseAttributeEvent = Network.Client.Get("IncreaseAttribute");
const AddGemEvent = Network.Client.Get("AddGem");

/*================================================ UI Components ==================================================*/
export const EventButtons = () => {
	const container = GamePanel({
		Name: "EventButtons",
		Size: UDim2.fromOffset(100, 400),
		DragEnabled: true,
		Scrolling: true,
		Layout: Layout.VerticalScroll(3),
		Content: {
			SpawnManifestationButton: GameButton({
				Name: "SpawnManifestationButton",
				Image: GameImages.Currency.Tombs,
				OnClick: () => {
					const formId = "exampleForm"; // Replace with actual form ID
					const abilityId = "exampleAbility"; // Replace with actual ability ID
					const bonusId = "exampleBonus"; // Replace with actual bonus ID
					SpawnManifestationEvent.SendToServer(formId, abilityId, bonusId);
				},
			}),
			IncreaseAttributeButton: GameButton({
				Name: "IncreaseAttributeButton",
				Image: GameImages.Attributes.Dexterity,
				OnClick: () => {
					const attributeKey = "str"; // Replace with actual attribute key
					const amount = 1; // Replace with actual amount
					IncreaseAttributeEvent.SendToServer(attributeKey, amount);
				},
			}),
			CreateGemButton: GameButton({
				Name: "CreateGemButton",
				Image: GameImages.Gems.Colorable,
				OnClick: () => {
					const gemId = "exampleGem"; // Replace with actual gem ID
					AddGemEvent.SendToServer(gemId);
				},
			}),
		},
	});

	return container;
};
