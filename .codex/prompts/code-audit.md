# Code‑Audit Prompt

You are an expert Roblox‑TS architect.  
Below is a repo map, review rubric, and questions.  
Respond with a markdown report:

1. **Overview** – high‑level health check  
2. **Findings** – numbered list; each finding links to rubric rule  
3. **Refactor plan** – ordered by ROI; include sample diffs if helpful

## 📂 Repository Map

### Root Structure

```text
e:\_Staging/
├── .codex/                     # Editor configuration and agent instructions
├── .github/                    # GitHub workflows and templates
├── .vscode/                    # VS Code settings and extensions
├── build/                      # Build outputs and Roblox place files
├── Documents/                  # Project documentation
├── include/                    # External Lua dependencies
├── scripts/                    # Build and utility scripts
├── src/                        # Source code (TypeScript)
│   ├── client/                 # Client-side code
│   ├── server/                 # Server-side code (THIS DIRECTORY)
│   ├── shared/                 # Shared code between client/server
│   ├── tasks/                  # Development tasks and templates
│   └── theme/                  # UI theme definitions
├── tasks/                      # Task management and CLI tools
├── tools/                      # Nx project configuration
└── types/                      # Global TypeScript type definitions
```

### Server Directory Structure (`src/server/`)

```text
server/
├── index.ts                    # Barrel export for server modules
├── main.server.ts              # Server entry point and bootstrap
├── ServiceWrapper.ts           # Service management wrapper
├── classes/                    # Server-side class definitions
│   ├── index.ts               # Barrel export
│   ├── components/            # ECS-style components
│   │   ├── index.ts
│   │   └── HazardComponent.ts
│   ├── EnvironmentEffects/    # Environmental hazard system
│   │   ├── index.ts
│   │   └── Hazard.ts
│   ├── npc/                   # Non-player character system
│   │   ├── index.ts
│   │   └── NPC.ts
│   └── playground/            # Development/testing classes
│       ├── index.ts
│       ├── AlienBob.ts
│       ├── AlienOrganism.ts
│       ├── Manifestation.ts
│       └── OrganismFood.ts
├── entity/                     # Entity management system
│   ├── index.ts               # Barrel export
│   └── EvolvingOrganism.ts    # Core organism entity
├── genetics/                   # Genetics and evolution system
│   ├── index.ts               # Barrel export
│   └── CodonExpressions.ts    # Genetic code expressions
├── network/                    # Server networking layer
│   ├── index.ts               # Barrel export
│   ├── listener.server.ts     # Network event listener
│   └── ServerNetwork.ts       # Network service
├── services/                   # Core game services
│   ├── index.ts               # Barrel export
│   ├── AGENTS.md              # Service-specific documentation
│   ├── AbilityService.ts      # Player ability management
│   ├── AttributesService.ts   # Player attribute system
│   ├── BattleRoomService.ts   # Combat arena management
│   ├── DataService.ts         # Player data persistence
│   ├── NPCService.ts          # NPC behavior management
│   ├── OrganismService.ts     # Organism lifecycle management
│   ├── ProgressionService.ts  # Player progression tracking
│   ├── ResourcesService.ts    # Resource management
│   ├── SettingsService.ts     # Game settings management
│   ├── SSEntityService.ts     # Entity state service
│   ├── StatusEffectService.ts # Status effect system
│   └── WeaponService.ts       # Weapon and combat system
└── zones/                      # Game zone management
    ├── index.ts               # Barrel export
    ├── BattleZone.ts          # Combat zone implementation
    ├── LobbyZone.ts           # Lobby/hub zone
    ├── ZoneBase.ts            # Base zone class
    └── zone.server.ts         # Zone server entry point
```

### Related Directories

#### Client Directory (`src/client/`)

```text
client/
├── index.ts                   # Client barrel export
├── main.client.ts             # Client entry point
├── network/                   # Client networking
├── states/                    # Client state management
└── ui/                        # User interface components
    ├── atoms/                 # Basic UI components
    ├── molecules/             # Composite UI components
    ├── organisms/             # Complex UI systems
    ├── screens/               # Full screen UIs
    └── tokens/                # Design tokens and styles
```

#### Shared Directory (`src/shared/`)

```text
shared/
├── index.ts                   # Shared barrel export
├── assets/                    # Game assets (images, audio, etc.)
├── calculations/              # Shared calculations
├── classes/                   # Shared class definitions
├── constants/                 # Game constants
├── definitions/               # Type definitions and interfaces
├── factory/                   # Object factory functions
├── genetics/                  # Shared genetics system
├── helpers/                   # Utility functions
├── network/                   # Network protocol definitions
└── physics/                   # Physics utilities
```

## Rubric

1. Folder layout matches “Shared / Client / Server” split we agreed on.
2. Services follow these rules:
   - Thin façade; heavy logic sits in dedicated System classes.
   - Single Responsibility + Dependency‑injection friendly.
3. UI respects Atomic Design & Fusion best practices.
4. No client‑side access to server‑only state.
5. TypeScript strict‑null‑checks, no `any` except intentional FFI shims.

## Questions

1. Which services appear redundant or could merge?
2. Do any services violate rule #2 (SRP, DI)?
3. Is the Networking layer leaking domain logic?
4. Flag any circular dependencies (hint: use `npx nx dep-graph`)
5. Suggest a refactor plan (max 10 bullet points, highest ROI first)
