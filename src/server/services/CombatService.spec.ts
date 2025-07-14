/// <reference types="@rbxts/testez/globals" />
import { Workspace } from "@rbxts/services";
import { CombatService } from "./CombatService";
import { createDamageBucket } from "shared/combat";
import { SSEntity } from "shared/types/SSEntity";

function createEntity(name: string): SSEntity {
	const model = new Instance("Model");
	model.Name = name;
	const humanoid = new Instance("Humanoid");
	humanoid.Parent = model;
	const hrp = new Instance("Part");
	hrp.Name = "HumanoidRootPart";
	hrp.Parent = model;
	(model as unknown as { Humanoid: Humanoid; HumanoidRootPart: BasePart; PrimartyPart: BasePart }).Humanoid =
		humanoid;
	(model as unknown as { HumanoidRootPart: BasePart }).HumanoidRootPart = hrp;
	(model as unknown as { PrimartyPart: BasePart }).PrimartyPart = hrp;
	model.Parent = Workspace;
	return model as unknown as SSEntity;
}

export = () => {
	describe("CombatService", () => {
		it("awards kill credit to highest contributor", () => {
			const attacker = createEntity("A");
			const defender = createEntity("D");
			CombatService.RegisterEntity(attacker);
			CombatService.RegisterEntity(defender);
			let result: unknown;
			const conn = CombatService.onDeath((sum) => (result = sum));
			CombatService.CombatEvent(attacker, defender, createDamageBucket(50, "Blood"));
			defender.Humanoid.Health = 0;
			task.wait();
			expect((result as { victim: SSEntity }).victim).to.equal(defender);
			expect((result as { killer?: SSEntity }).killer).to.equal(attacker);
			conn.Disconnect();
			attacker.Destroy();
			defender.Destroy();
		});

		it("requires minimum share for credit", () => {
			const atk1 = createEntity("atk1");
			const atk2 = createEntity("atk2");
			const def = createEntity("def");
			CombatService.RegisterEntity(atk1);
			CombatService.RegisterEntity(atk2);
			CombatService.RegisterEntity(def);
			let res: unknown;
			const conn = CombatService.onDeath((s) => (res = s));
			CombatService.CombatEvent(atk1, def, createDamageBucket(5, "Blood"));
			CombatService.CombatEvent(atk2, def, createDamageBucket(20, "Blood"));
			def.Humanoid.Health = 0;
			task.wait();
			expect((res as { killer?: SSEntity }).killer).to.equal(atk2);
			conn.Disconnect();
			atk1.Destroy();
			atk2.Destroy();
			def.Destroy();
		});
	});
};
