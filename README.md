# Wallet MVP — TECOPOS Technical Test

A mobile e-wallet application for tracking financial operations across multiple accounts. Built as a technical evaluation for TECOPOS.

---

## Features

### Mandatory (per spec)
- **Fake login** — credential-based login (no real backend). Authorised users defined in a static allow-list.
- **Accounts list** — view all accounts with their derived balance.
- **Operations list** — view all operations for a selected account.
- **Create operation** — validated form (amount, type, currency, date, description) with over-balance warning.

### Client extras
- **Authorised-user gate** — only users in the allow-list can log in; rejects unknown credentials.
- **Multi-currency** — accounts and operations each carry their own ISO 4217 currency; balances are derived per-account without cross-currency conversion.
- **Date-range summary** — filter operations by start/end date and aggregate income/expense per currency.
- **Income / expense categorisation** — operations are typed as `income` or `expense` and rendered with visual cues.

---

## Tech Stack

| Library / Tool | Version | Why |
|---|---|---|
| Expo SDK | ~56 | Managed workflow; handles native modules without bare React Native |
| Expo Router | ~4 | File-system routing with typed routes; clean navigation tree |
| React Native | 0.85 | Cross-platform mobile UI |
| TypeScript | ~6 | Type safety across all layers |
| Zustand | ^5 | Lightweight, boilerplate-free global state (auth + filters) |
| TanStack Query | ^5 | Server-state caching, background refetch, and cache invalidation |
| react-hook-form + zod | ^7 / ^3 | Declarative form validation with schema-first approach |
| expo-secure-store | ~14 | Encrypted session persistence on-device |
| Moti | ^0.30 | Declarative animations built on Reanimated |
| Jest + jest-expo | ^29 / ~56 | Unit testing; preset handles Metro transforms |

---

## Architecture

The project follows a **Clean / Hexagonal** architecture with four layers and Dependency Inversion (the domain owns its repository interfaces; data provides the implementations).

```
┌──────────────────────────────────────────────────────┐
│  UI (src/ui)                                         │
│  Atomic Design — atoms → molecules → organisms →     │
│  templates. Presentational components only.          │
└───────────────────┬──────────────────────────────────┘
                    │ calls
┌───────────────────▼──────────────────────────────────┐
│  Application (src/application)                       │
│  Zustand stores, TanStack Query hooks, RHF schemas.  │
│  Orchestrates use-cases and wires UI to data.        │
└───────────┬───────────────────────┬──────────────────┘
            │ uses                  │ injects
┌───────────▼───────────┐  ┌───────▼──────────────────┐
│  Domain (src/domain)  │  │  Data (src/data)          │
│  Entities, repo       │  │  mockapi.io client,       │
│  interfaces,          │  │  DTOs, mappers,           │
│  pure use-cases.      │◄─┤  repository impls.        │
│  Zero framework deps. │  │  Satisfies domain         │
└───────────────────────┘  │  interfaces (DIP).        │
                           └──────────────────────────┘
```

**Key design decisions:**
- **DIP** — `AccountRepository` and `OperationRepository` interfaces live in `src/domain`; `AccountRepositoryImpl` / `OperationRepositoryImpl` in `src/data` implement them.
- **Derived balance** — computed client-side via `computeBalance` pure use-case; never stored on the server.
- **TanStack Query caching** — accounts and operations are cached with typed query keys; `create-operation` invalidates the relevant operation list on success.
- **Client-side date-range filtering** — `filterOperationsByRange` use-case runs on the cached operation list; no extra network call.
- **Flat API shape** — mockapi.io returns operations as a flat collection; filtered by `?accountId=` query param.

---

## Prerequisites

- **Node.js** — 18 LTS or later (project has no `engines` field; Node 18+ recommended for Expo SDK 56)
- **Expo CLI** — `npm i -g expo` (or use `npx expo` without a global install)
- **Android device / emulator** OR the **Expo Go** app on your phone

---

## Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/lazaroadrian/tecopos-wallet-mvp
cd wallet-mvp

# 2. Install dependencies
#    The project requires legacy peer deps.
#    .npmrc already sets legacy-peer-deps=true, so npm install picks it up automatically.
npm install

# 3. Configure environment
#    Copy .env.example to .env — the example already contains the working public
#    mockapi URL, so the app runs out of the box without any edits.
cp .env.example .env

# 4. Start the dev server
npx expo start
```

Once the Metro bundler is running:
- Press **`a`** to open on a connected Android device/emulator.
- Scan the QR code with the **Expo Go** app on your phone.

---

## Demo Credentials

> **Important:** The login is **fully simulated** — there is no real authentication backend. Credentials are validated against a hardcoded allow-list per the technical test requirements (spec A5). Never use this pattern in production.

| Username | Password |
|----------|----------|
| `admin`  | `tecopos` |
| `user`   | `tecopos` |

Any other combination is rejected.

---

## API / Data

The app consumes a live, public **mockapi.io** instance:

- **Base URL:** `https://6a2c70d53e2b60ab038fbfb8.mockapi.io/api/prueba`
- **Resources:** `accounts`, `operations`
- **Filtering:** operations are queried with `?accountId=<id>` (flat collection — no nested routes)
- **No auth required** — the API is fully public for this evaluation

The URL is stored in `EXPO_PUBLIC_MOCKAPI_URL` (set via `.env`).

---

## Testing

```bash
npx jest --watchAll=false
```

**77 tests across 8 suites:**
- Domain use-cases: `computeBalance` (10), `filterOperationsByRange` (9), `summarizeByCurrency` (11)
- Data mappers: `account.mapper` (5), `operation.mapper` (6)
- Data repositories: `AccountRepositoryImpl` (4), `OperationRepositoryImpl` (4)
- Application validation: `createOperationSchema` (27) — M4 form validation

Also available via npm scripts:
```bash
npm test           # same as jest --passWithNoTests
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
```

---

## Build APK (Local)

The APK is built **locally** on your machine — no Expo cloud account or EAS credits required.

### Prerequisites

- **Node.js** 18 LTS or later
- **JDK 17** (required by Gradle; `java -version` should report 17)
- **Android SDK** — install via [Android Studio](https://developer.android.com/studio) and make sure `ANDROID_HOME` is set
- The first local build downloads extra Gradle and Android toolchain bits (~several hundred MB)

### Option A — EAS local build (recommended)

Uses the existing `preview` profile in `eas.json` (outputs APK, not AAB):

```bash
# 1. Install EAS CLI globally
npm i -g eas-cli

# 2. Build locally — does NOT consume Expo cloud credits
eas build -p android --profile preview --local
```

The resulting APK is placed in the project root (EAS names it `build-*.apk`).

### Option B — Bare Gradle build

```bash
# 1. Generate the native android/ folder
npx expo prebuild --platform android

# 2. Build the release APK
cd android
./gradlew assembleRelease
```

The APK lands at:
```
android/app/build/outputs/apk/release/app-release.apk
```

### Distributing the APK

Once built, the APK can be shared by attaching it to a **GitHub Release** of this repository (`https://github.com/lazaroadrian/tecopos-wallet-mvp/releases`). Download it from the Releases page of that repo.

---

## AI Assistance Disclosure

Per the technical test requirement to mark AI-generated fragments:

- AI assistance (Claude / Anthropic) was used throughout this project via a structured **Spec-Driven Development (SDD)** workflow.
- Every source file that was substantially generated or scaffolded with AI assistance carries a header comment:
  ```
  // AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by <author>.
  ```
- Architecture decisions, design tradeoffs, and the overall structure were directed and reviewed by the author; AI served as an execution tool, not a decision-maker.

**Author / reviewer:** Lázaro Adrian

---

## Project Structure

```
wallet-mvp/
├── app/                          # Expo Router file-system routes
│   ├── _layout.tsx               # Root layout (QueryClient, SafeArea)
│   ├── index.tsx                 # Redirect to accounts or login
│   ├── (auth)/
│   │   ├── _layout.tsx           # Redirects authenticated users away
│   │   └── login.tsx             # Login screen
│   └── (app)/
│       ├── _layout.tsx           # Auth guard + tab/drawer shell
│       ├── accounts/
│       │   ├── index.tsx         # Accounts list
│       │   └── [id]/
│       │       ├── index.tsx     # Operations list for an account
│       │       └── create.tsx    # Create operation (container)
│       └── summary.tsx           # Date-range summary screen
│
└── src/
    ├── constants/                # Config, auth allow-list, currency symbols
    ├── domain/
    │   ├── entities/             # Account, Operation, Auth (pure TypeScript)
    │   ├── repositories/         # Repository interfaces (DIP boundary)
    │   └── use-cases/            # computeBalance, filterOperationsByRange,
    │                             #   summarizeByCurrency (+ tests)
    ├── data/
    │   ├── api/                  # mockapi.io fetch client + endpoint fns
    │   ├── dtos.ts               # Raw API response types
    │   ├── mappers/              # DTO → domain entity (+ tests)
    │   ├── repositories/         # Repository implementations (+ tests)
    │   └── query-keys/           # TanStack Query key factories
    ├── application/
    │   ├── hooks/                # useAccounts, useOperations, useSummary,
    │   │                         #   useAccountsWithBalances, useOverBalanceWarning
    │   ├── store/                # auth.store, filters.store (Zustand)
    │   └── validation/           # createOperationSchema + zod (+ tests)
    └── ui/
        ├── atoms/                # Button, Input, Text, CurrencyAmount,
        │                         #   Badge, SkeletonBlock, Icon, Spinner
        ├── molecules/            # FormField, OperationRow, AccountCard,
        │                         #   SummaryByCurrency, DateRangePicker,
        │                         #   EmptyState, SkeletonList, TypeSelector
        ├── organisms/            # BalanceHeader, AccountList, OperationList,
        │                         #   SummaryPanel, CreateOperationForm
        ├── templates/            # ScreenTemplate, AuthTemplate
        └── theme/                # Design tokens, useResponsive hook
```
