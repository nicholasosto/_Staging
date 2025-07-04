# AGENTS_TASK_TEMPLATE.md

## 🍿 Feature / Fix Title

*A one-sentence, action-oriented headline (verb + object).*

---

### 1 • Context
>
> Briefly explain **why** this change matters.  
> Include links / snippets of prior art or specs.

### 2 • Goal

- **What should exist when Codex is done?**  
  Example: “Create a typed `CooldownTimer` utility usable by any ability button.”

### 3 • Deliverables

| ID | Item | Format | Notes |
|----|------|--------|-------|
| D1 | `CooldownTimer.ts` | code file | Must compile under `strict`. |
| D2 | `CooldownTimer.spec.ts` | Jest tests | Cover happy path & boundary. |
| D3 | Docs block | JSDoc | Show example usage. |

### 4 • Acceptance Criteria (AC)

1. Builds with `npm run build` ☐  
2. All unit tests pass (`npm test`) ☐  
3. Matches style guide (`eslint --fix`) ☐  
4. Public API exactly matches **Interface** section ☐  
5. No TODOs / console logs in final diff ☐  

### 5 • Interface (source of truth)

```ts
export function CooldownTimer(durationMs: number): {
  isReady(): boolean;
  reset(): void;
  onReady(cb: () => void): () => void; // returns disconnect
};
