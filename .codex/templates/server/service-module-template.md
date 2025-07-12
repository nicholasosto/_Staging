# Service Module Template

> **Scope**: Server‑side services that manage game state, player data, or long‑running processes in a Roblox‑TS project.  
> **Pattern**: Singleton · TSDoc‑commented · Explicit bootstrap (`Start`) · Clean shutdown (`Destroy`).

---

## Folder & Naming Conventions

| Aspect              | Guideline (Why)                                |
|---------------------|------------------------------------------------|
| **Directory**       | `src/server/services/`                         |
| **File name**       | `<Feature>Service.ts` (discoverable)           |
| **Export**          | Default export a *singleton* class             |
| **Suffix**          | Always end with `Service` to disambiguate      |
| **Tests**           | Mirror path under `tests/`                     |

---

## Minimal Contract (✔ Must Haves)

1. **Singleton Instance** – `private static _instance`  
2. **Bootstrap** – `public static Start(): Service`  
3. **Shutdown** – `public static Destroy(): void`  
4. **Typed Data Store** – `Map<Player, Data>` or custom store  
5. **TSDoc Header** – Describe intent, imports, & versioning

---

## Recommended Additions (➕ May Haves)

| Category          | Explanation                                                                                 |
|-------------------|---------------------------------------------------------------------------------------------|
| **Events**        | Use [`@rbxts/signal`](https://github.com/Sleitnick/rbx-ts-signal) for decoupled callbacks    |
| **Networking**    | Inject `ServerNetwork` (rbxts/net) to raise remote events                                   |
| **OnPlayer**      | Automatically create & clean up per‑player state via `Players.PlayerAdded/Removing`         |
| **Periodic Task** | Hoist RunService/Heartbeat loops into private helpers & return RBXScriptConnection for GC   |
| **Config Schema** | Accept a readonly configuration object in `Start(config?)`                                  |
| **Debug Hooks**   | `print`/`warn` behind `if (RunService.IsStudio())` guards                                    |

---

## Complete Template

```ts
/// <reference types="@rbxts/types" />

/**
 * ### ${SERVICE_NAME}
 * Server‑side service template.
 *
 * @module     Server/Services/${SERVICE_NAME}
 * @owner      Trembus
 * @since      0.1.0
 * @lastUpdate 2025‑07‑12
 *
 * @remarks
 * Replace **PlayerData** with the shape you need and flesh out lifecycle hooks.
 */
import { Players, RunService } from "@rbxts/services";
import Signal from "@rbxts/signal";
// import ServerNetwork from "Server/Network"; // ← optional dependency

/*──── Types ───────────────────────────────────────────────────────────*/
type PlayerData = {
    stamina: number;
    lastAction: number;
};

/*──── Constants ──────────────────────────────────────────────────────*/
const SERVICE_NAME = "ExampleService";

/*──── Service Class ──────────────────────────────────────────────────*/
export default class ExampleService {
    /*─ Singleton Instance ─*/
    private static _instance?: ExampleService;
    public static Start(): ExampleService {
        if (!this._instance) this._instance = new ExampleService();
        return this._instance;
    }
    public static Destroy(): void {
        this._instance?.destroyInternal();
        this._instance = undefined;
    }

    /*─ Events ─*/
    public readonly StaminaChanged = new Signal<(plr: Player, value: number) => void>();

    /*─ State ─*/
    private readonly _data = new Map<Player, PlayerData>();

    /*─ Private Ctor ─*/
    private constructor() {
        if (RunService.IsStudio()) print(`${SERVICE_NAME} started`);
        Players.PlayerAdded.Connect(p => this.onPlayerAdded(p));
        Players.PlayerRemoving.Connect(p => this.onPlayerRemoving(p));
    }

    /*─ Public API ─*/
    /** Grants stamina and fires a StaminaChanged event. */
    public GiveStamina(player: Player, amount: number) {
        const data = this._data.get(player);
        if (!data) return;
        data.stamina = math.clamp(data.stamina + amount, 0, 100);
        this.StaminaChanged.Fire(player, data.stamina);
    }

    /*─ Private Helpers ─*/
    private onPlayerAdded(player: Player) {
        this._data.set(player, { stamina: 100, lastAction: os.time() });
    }
    private onPlayerRemoving(player: Player) {
        this._data.delete(player);
    }
    private destroyInternal() {
        this.StaminaChanged.Destroy();
        this._data.clear();
        if (RunService.IsStudio()) warn(`${SERVICE_NAME} destroyed`);
    }
}
```

---

## Quick Usage

```ts
// bootstrap in ServerApp.ts
import ExampleService from "Server/Services/ExampleService";
ExampleService.Start();
```

---

## Author Checklist

- [ ] Replace `${SERVICE_NAME}` & `ExampleService` with real name  
- [ ] Swap **PlayerData** for domain‑specific interface  
- [ ] Wire up networking events if needed  
- [ ] Write unit tests for public API  
- [ ] Update docs & changelog when modifying

---

## Changelog

| Version | Date (UTC) | Notes                |
|---------|------------|----------------------|
| 0.1.0   | 2025‑07‑12 | Initial template     |
