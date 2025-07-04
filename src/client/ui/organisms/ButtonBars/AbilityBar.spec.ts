/// <reference types="@rbxts/testez/globals" />
import { Value } from "@rbxts/fusion";
import PlayerState from "client/states/PlayerState";
import { AbilityBarClass } from "client/ui/organisms";
export = () => {
	describe("AbilityBar UI", () => {
		it("shows equipped abilities in order", () => {
			const bar = new AbilityBarClass();
			PlayerState.getInstance().Abilities = [Value("fireball"), Value("earthquake"), Value("melee")];

			expect(bar.activateAbility("earthquake")).to.be.ok();
			expect(bar.getAbilityArray()).to.equal(["fireball", "earthquake", "melee"]);
			expect(bar.getAbilityStateArray()[0].get()).to.equal("fireball");

			PlayerState.getInstance().Abilities = [Value("fireball")];
			expect(bar.getAbilityArray()).to.equal(["fireball"]);
			expect(bar.getAbilityStateArray()[0].get()).to.equal("fireball");
			expect(bar.getBar().get()).to.be.ok();

			bar.activateAbility("fireball");
		});
	});
};
