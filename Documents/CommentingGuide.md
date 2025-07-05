# AGENTS TypeScript Commenting Guide

*A shared standard for humans + LLM agents*&#x20;

---

## 1 Why we comment

| Goal                    | What comments add                                                                            |
| ----------------------- | -------------------------------------------------------------------------------------------- |
| **Codex comprehension** | Natural‑language context that narrows intent and signals invariants.                         |
| **Human onboarding**    | <1‑minute orientation to unfamiliar modules.                                                 |
| **Autogen artefacts**   | Accurate unit‑test, task, and doc generation from LLMs.                                      |
| **Prevent regressions** | “Enforceable truths” (pre‑/post‑conditions, side‑effects) surfaced in tests and review bots. |

> **Litmus test** – If removing the comment would make it harder for *either* a new teammate **or** Codex to extend the code safely, keep it.

---

## 2 Scope & placement

| Code element                             | Required comment?                                     | Notes |
| ---------------------------------------- | ----------------------------------------------------- | ----- |
| **Public modules / classes / functions** | **YES** – full TSDoc block                            |       |
| **Exported constants / enums**           | Concise single‑line doc unless self‑evident           |       |
| **Internal helpers**                     | Optional; use `@internal` to hide from docs           |       |
| **Trivial getters / setters**            | Skip unless non‑obvious side‑effect                   |       |
| **Auto‑gen files**                       | Skip (add `/* eslint‑disable jsdoc/require-jsdoc */`) |       |

---

## 3 TSDoc style rules

1. **First sentence = elevator pitch** (max 120 chars).
2. **Use canonical tags** in this order:
   `@param` → `@returns` → `@throws` → `@remarks` → `@example` → `@see` → `@deprecated`.
3. **Document edge cases** (“0 duration rejects…”) – Codex learns constraints.
4. **Embed one minimal `@example`** for public APIs.
5. **Link out** (`@see ./design/EffectsPanel.md`) instead of huge prose blocks.
6. **ISO‑8601 dates** in prose for timeline clarity.
7. **Keep source immutable facts**; move opinions / history to PR description.

### Allowed tags cheatsheet

| Tag           | Purpose          | LLM impact                       |
| ------------- | ---------------- | -------------------------------- |
| `@function`   | Function name    | Improves Codex understanding     |
| `@interface`  | Type definition  | Helps Codex infer structure      |
| `@param`      | Input contract   | Improves autocomplete accuracy   |
| `@returns`    | Output guarantee | Guides test generation           |
| `@throws`     | Error surface    | Reduces hallucinated paths       |
| `@remarks`    | Extra context    | Rich explanation for reviewers   |
| `@example`    | Canonical usage  | High‑signal for pattern learning |
| `@see`        | Deep dive links  | Keeps main comment lean          |
| `@deprecated` | Migration cue    | Steering future code away        |

---

## 4 Usage scenarios unlocked

1. **“Write tests for X”** – Codex mines `@example` + `@throws` to scaffold cases.
2. **Task Auto‑generation** – Agents convert TODO prose in `@remarks` to YAML tasks.
3. **Doc site** – Typedoc converts comments → interactive API portal in CI.
4. **Schema validation** – ESLint/TS‑rules flag type‑comment mismatches before merge.

---

## 5 Tooling & enforcement

* **ESLint**

  ```jsonc
  "plugins": ["jsdoc"],
  "rules": {
    "jsdoc/require-jsdoc": ["error", { "publicOnly": true }],
    "jsdoc/check-tag-names": "error"
  }
  ```

* **Typedoc** – `npx typedoc src --excludeInternal --out docs/api`.
* **Pre‑commit** – `husky` hook runs `npm run lint && npm run build`.
* **CI gate** – PR must pass `npm run docs:check` which diff‑checks generated docs.

---

## 6 Templates

### 6.1 Module header

```ts
/**
 * <Punchy one‑liner>.
 *
 * @packageDocumentation
 */
```

### 6.2 Function/class

````ts
/**
 * Calculates the player’s effective critical‑strike chance.
 * @function calcCrit
 * @param baseChance - Raw % before buffs.
 * @param modifiers  - Flat additions (0–100) and multipliers (≥ 0).
 * @returns Final chance clamped between 0 and 100.
 * @throws RangeError If a multiplier is negative.
 *
 * @example
 * ```ts
 * const crit = calcCrit(5, { flat: 20, mult: 1.5 });
 * // => 37.5
 * ```
 *
 * @remarks
 * Keeps precision to 1 decimal to match UI label.
 */
export function calcCrit(…)
````

---

## 7 Concrete examples

Below are three canonical files following the guide.

> **Note:** Type imports trimmed for brevity.

* **Function** - UpdateResource:

    ```ts
    /**
     * @function UpdateResource
     * @description Updates a player's resource and sends the updated values to the player.
     * @param player - The player whose resource is being updated.
     * @param resourceKey - The key of the resource to update.
     * @param current - The current amount of the resource.
     * @param max - The maximum amount of the resource.
     */
    export const UpdateResource = (player: Player, resourceKey: ResourceKey, current: number, max: number) => {
        //print(`Updating resource for player ${player.Name}: ${resourceKey} - Current: ${current}, Max: ${max}`);
        ResourceUpdated.SendToPlayer(player, resourceKey, current, max);
    };
    ```

- **Service** - ResourceService:

    ```ts
    /**
     * @service ResourceService
     * @description Manages player resources, including updating and retrieving resource values.
     */
    export class ResourceService {
        /**
         * Updates a player's resource and sends the updated values to the player.
         * @param player - The player whose resource is being updated.
         * @param resourceKey - The key of the resource to update.
         * @param current - The current amount of the resource.
         * @param max - The maximum amount of the resource.
         */
        public static UpdateResource(player: Player, resourceKey: ResourceKey, current: number, max: number) {
            UpdateResource(player, resourceKey, current, max);
        }
    }
    ```

- **Function - GetPlayerResource**:

    ```ts
    /**
    * @function GetPlayerResource
    * @description Retrieves the current resource value for a player.
    * @param player - The player whose resource is being retrieved.
    * @param resourceKey - The key of the resource to retrieve.
    * @returns The current amount of the resource.
    */
    export const GetPlayerResource = (player: Player, resourceKey: ResourceKey) => {
        return ResourceData.Get(player, resourceKey);
    };

---

## 8 Agent‑friendly commenting checklist

| ✔︎             | Question                                                     |
| -------------- | ------------------------------------------------------------ |
| **Context**    | Does the first line nail *what this is*?                     |
| **Contract**   | Are all params, returns, errors documented?                  |
| **Edge‑cases** | Are pre‑/post‑conditions explicit?                           |
| **Example**    | Is there at least one runnable snippet?                      |
| **Link‑outs**  | Is bulky rationale moved to `@see` docs?                     |
| **Keep‑fresh** | Has the comment been updated alongside the last code change? |

Run this table mentally (or via a commit‑msg bot) before merging.

---

## 9 Next steps

1. **Copy guide to `/docs/COMMENTING_GUIDE.md`** and link from the root README.
2. **Add ESLint + Typedoc rules** to enforce.
3. **Update PR template** with the checklist from §8.
4. **Refactor legacy files** incrementally—start with public APIs.

*Consistent, high‑signal comments are force multipliers for both your human and AI teammates—invest the few extra lines, reap compounding clarity.*
