/// <reference types="@rbxts/testez/globals" />
import { calculateResources } from "./calculateResources";
import { DefaultAttributes } from "shared/definitions/ProfileDefinitions/Attributes";

export = () => {
	describe("calculateResources", () => {
		it("generates max values from attributes", () => {
			const result = calculateResources(DefaultAttributes, 1);
			expect(result.Health.max).to.equal(50 + DefaultAttributes.str * 10 + 1 * 5);
		});

		it("clamps current above max", () => {
			const prev = {
				Health: { current: 500, max: 500 },
				Mana: { current: 10, max: 10 },
				Stamina: { current: 10, max: 10 },
			} as const;
			const res = calculateResources(DefaultAttributes, 1, prev);
			expect(res.Health.current).to.equal(res.Health.max);
		});

		it("preserves zero health", () => {
			const prev = {
				Health: { current: 0, max: 100 },
				Mana: { current: 5, max: 5 },
				Stamina: { current: 5, max: 5 },
			} as const;
			const res = calculateResources(DefaultAttributes, 1, prev);
			expect(res.Health.current).to.equal(0);
		});
	});
};
