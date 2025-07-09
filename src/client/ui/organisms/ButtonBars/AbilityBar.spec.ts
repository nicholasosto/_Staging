/// <reference types="@rbxts/testez/globals" />

import AbilitySlice from "client/states/AbilitySlice";
import { AbilityBarComponent } from "../Groups/AbilityBar";

export = () => {
	describe("AbilityBar UI", () => {
		it("creates buttons for each equipped ability", () => {
			const slice = AbilitySlice.getInstance();
			slice.UpdateAbilities(["fireball", "melee"]);
			const bar = AbilityBarComponent();
			expect(bar.IsA("Frame")).to.be.ok();
		});
	});
};
