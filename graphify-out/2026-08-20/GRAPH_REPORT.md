# Graph Report - ucompensar-trabajos-grado-react  (2026-08-19)

## Corpus Check
- 54 files · ~23,567 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 305 nodes · 451 edges · 27 communities (22 shown, 5 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3907a130`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- ui/index.ts
- App.tsx
- devDependencies
- What You Must Do When Invoked
- dependencies
- compilerOptions
- Badge.tsx
- DashboardSection.tsx
- UCompensar — Sistema de Gestión de Trabajos de Grado
- LoginScreen.tsx
- graphify reference: extra exports and benchmark
- compilerOptions
- graphify reference: query, path, explain
- graphify reference: add a URL and watch a folder
- graphify reference: commit hook and native CLAUDE.md integration
- graphify reference: incremental update and cluster-only
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- CLAUDE.md
- .claude/CLAUDE.md
- extraction-spec.md

## God Nodes (most connected - your core abstractions)
1. `cn()` - 20 edges
2. `compilerOptions` - 18 edges
3. `What You Must Do When Invoked` - 12 edges
4. `/graphify` - 11 edges
5. `Button()` - 10 edges
6. `useAppStore` - 9 edges
7. `UCompensar — Sistema de Gestión de Trabajos de Grado` - 9 edges
8. `Card()` - 8 edges
9. `useThemeStore` - 8 edges
10. `graphify reference: extra exports and benchmark` - 8 edges

## Surprising Connections (you probably didn't know these)
- `NavItem` --calls--> `cn()`  [EXTRACTED]
  src/components/layout/Sidebar.tsx → src/utils/cn.ts
- `LoginScreen()` --calls--> `cn()`  [EXTRACTED]
  src/components/auth/LoginScreen.tsx → src/utils/cn.ts
- `SidebarProps` --references--> `User`  [EXTRACTED]
  src/components/layout/Sidebar.tsx → src/types/index.ts
- `Sidebar()` --calls--> `cn()`  [EXTRACTED]
  src/components/layout/Sidebar.tsx → src/utils/cn.ts
- `TopbarProps` --references--> `NavSection`  [EXTRACTED]
  src/components/layout/Topbar.tsx → src/types/index.ts

## Import Cycles
- None detected.

## Communities (27 total, 5 thin omitted)

### Community 0 - "ui/index.ts"
Cohesion: 0.09
Nodes (33): ReportesSection(), BuscarSection(), docList, NuevoTramiteSection(), TramitesSection(), AlertBanner(), AlertBannerProps, Badge() (+25 more)

### Community 1 - "App.tsx"
Cohesion: 0.14
Nodes (21): App(), DashboardLayout(), DashboardLayoutProps, NAV_ITEMS, NavItem, NavItemProps, NavItemType, Sidebar() (+13 more)

### Community 2 - "devDependencies"
Cohesion: 0.07
Nodes (27): autoprefixer, eslint, devDependencies, autoprefixer, eslint, postcss, tailwindcss, @types/node (+19 more)

### Community 3 - "What You Must Do When Invoked"
Cohesion: 0.07
Nodes (26): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+18 more)

### Community 4 - "dependencies"
Cohesion: 0.08
Nodes (24): clsx, lucide-react, dependencies, clsx, lucide-react, react, react-dom, react-router-dom (+16 more)

### Community 5 - "compilerOptions"
Cohesion: 0.08
Nodes (24): DOM, DOM.Iterable, ES2020, src, compilerOptions, allowImportingTsExtensions, baseUrl, isolatedModules (+16 more)

### Community 6 - "Badge.tsx"
Cohesion: 0.11
Nodes (21): DocumentosSection(), BadgeProps, BadgeVariant, statusMap, TipoBadge(), variantMap, AuthMethod, AuthStep (+13 more)

### Community 7 - "DashboardSection.tsx"
Cohesion: 0.17
Nodes (12): AuthOverlay(), AuthOverlayProps, DashboardSection(), DOCS, STEPS, TrazabilidadSection(), StatusBadge(), AUTH_STEPS (+4 more)

### Community 8 - "UCompensar — Sistema de Gestión de Trabajos de Grado"
Cohesion: 0.14
Nodes (13): Colores principales, Componentes UI, 🔑 Credenciales de Prueba (Demo), 📁 Estructura del Proyecto, 🔧 Extensión Recomendada (VS Code), 🚀 Instalación y Uso, 📄 Licencia, Pasos (+5 more)

### Community 9 - "LoginScreen.tsx"
Cohesion: 0.18
Nodes (9): CredentialsForm(), CredentialsFormProps, features, LoginPanel(), LoginScreen(), LoginScreenProps, TabType, SSOForm() (+1 more)

### Community 10 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 11 - "compilerOptions"
Cohesion: 0.22
Nodes (8): vite.config.ts, compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, skipLibCheck, include

### Community 12 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 13 - "graphify reference: add a URL and watch a folder"
Cohesion: 0.50
Nodes (3): For /graphify add, For --watch, graphify reference: add a URL and watch a folder

### Community 14 - "graphify reference: commit hook and native CLAUDE.md integration"
Cohesion: 0.50
Nodes (3): For git commit hook, For native CLAUDE.md integration, graphify reference: commit hook and native CLAUDE.md integration

### Community 15 - "graphify reference: incremental update and cluster-only"
Cohesion: 0.50
Nodes (3): For --cluster-only, For --update (incremental re-extraction), graphify reference: incremental update and cluster-only

## Knowledge Gaps
- **148 isolated node(s):** `name`, `version`, `private`, `description`, `dev` (+143 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `ui/index.ts` to `LoginScreen.tsx`, `App.tsx`, `Badge.tsx`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `devDependencies` to `dependencies`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **What connects `name`, `version`, `private` to the rest of the system?**
  _148 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `ui/index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0927536231884058 - nodes in this community are weakly interconnected._
- **Should `App.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.13793103448275862 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Should `What You Must Do When Invoked` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._