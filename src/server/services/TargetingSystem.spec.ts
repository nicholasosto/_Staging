/// <reference types="@rbxts/testez/globals" />
import { Workspace } from "@rbxts/services";
import { TargetingService } from "./TargetingService";
import { SSEntity } from "shared/types/SSEntity";

function createEntity(pos: Vector3): SSEntity {
    const model = new Instance("Model");
    const humanoid = new Instance("Humanoid");
    humanoid.Parent = model;
    const root = new Instance("Part");
    root.Name = "HumanoidRootPart";
    root.Position = pos;
    root.Parent = model;
    (model as unknown as { Humanoid: Humanoid; HumanoidRootPart: BasePart }).Humanoid = humanoid;
    (model as unknown as { HumanoidRootPart: BasePart }).HumanoidRootPart = root;
    model.PrimaryPart = root;
    model.Parent = Workspace;
    return model as unknown as SSEntity;
}

function createPlayer(pos: Vector3): Player {
    const player = {} as Player;
    const char = new Instance("Model");
    const hrp = new Instance("Part");
    hrp.Name = "HumanoidRootPart";
    hrp.Position = pos;
    hrp.Parent = char;
    char.PrimaryPart = hrp;
    char.Parent = Workspace;
    (player as unknown as { Character: Model }).Character = char;
    return player;
}

export = () => {
    describe("TargetingService", () => {
        it("selects targets in range and LOS", () => {
            const svc = TargetingService.Start();
            const player = createPlayer(new Vector3(0,0,0));
            const target = createEntity(new Vector3(0,0,-10));
            svc.registerEntity(target);
            (svc as unknown as { handleSelect(p: Player, e: SSEntity): void }).handleSelect(player, target);
            const state = (svc as unknown as { playerState: Map<Player, { target?: SSEntity }> }).playerState.get(player);
            expect(state?.target).to.equal(target);
            player.Destroy();
            target.Destroy();
        });

        it("rejects targets out of range", () => {
            const svc = TargetingService.Start();
            const player = createPlayer(new Vector3(0,0,0));
            const target = createEntity(new Vector3(100,0,0));
            svc.registerEntity(target);
            (svc as unknown as { handleSelect(p: Player, e: SSEntity): void }).handleSelect(player, target);
            const state = (svc as unknown as { playerState: Map<Player, { target?: SSEntity }> }).playerState.get(player);
            expect(state).never.to.be.ok();
            player.Destroy();
            target.Destroy();
        });

        it("clears a selected target", () => {
            const svc = TargetingService.Start();
            const player = createPlayer(new Vector3(0,0,0));
            const target = createEntity(new Vector3(0,0,-5));
            svc.registerEntity(target);
            (svc as unknown as { handleSelect(p: Player, e: SSEntity): void }).handleSelect(player, target);
            svc.clearTarget(player);
            const state = (svc as unknown as { playerState: Map<Player, { target?: SSEntity }> }).playerState.get(player);
            expect(state?.target).never.to.be.ok();
            player.Destroy();
            target.Destroy();
        });
    });
};
