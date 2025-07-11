/// <reference types="@rbxts/testez/globals" />
/// <reference types="@rbxts/types" />
import { ConstrictorBeam } from "./ConstrictorBeam";
import { Workspace as WorkspaceService } from "@rbxts/services";

export = () => {
	describe("ConstrictorBeam", () => {
		it("creates and cleans up constraints", () => {
			const p0 = new Instance("Part");
			const p1 = new Instance("Part");
			p0.Parent = WorkspaceService;
			p1.Parent = WorkspaceService;
			p1.Position = new Vector3(10, 0, 0);
			const a0 = new Instance("Attachment");
			const a1 = new Instance("Attachment");
			a0.Parent = p0;
			a1.Parent = p1;

			const handle = ConstrictorBeam(a0, a1, { durationSeconds: 0.1, tension: 0.5 });
			const prism = p0.FindFirstChildWhichIsA("PrismaticConstraint") as PrismaticConstraint | undefined;
			expect(prism).to.be.ok();

			task.wait(0.2);
			expect(prism?.Parent).to.equal(undefined);
			handle.destroy();
			p0.Destroy();
			p1.Destroy();
		});

		it("cleans up if attachments are removed", () => {
			const p0 = new Instance("Part");
			const p1 = new Instance("Part");
			p0.Parent = WorkspaceService;
			p1.Parent = WorkspaceService;
			const a0 = new Instance("Attachment");
			const a1 = new Instance("Attachment");
			a0.Parent = p0;
			a1.Parent = p1;

			const handle = ConstrictorBeam(a0, a1);
			const spring = p0.FindFirstChildWhichIsA("SpringConstraint") as SpringConstraint | undefined;
			expect(spring).to.be.ok();

			p0.Destroy();
			task.wait();
			expect(spring?.Parent).to.equal(undefined);
			handle.destroy();
			p1.Destroy();
		});
	});
};
