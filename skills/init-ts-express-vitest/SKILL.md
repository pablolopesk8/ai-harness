---
name: init-ts-express-vitest
description: >
  Initialize a TypeScript project with ExpressJS, Vitest, Prettier, and ESLint.
  Use when the user asks to create a new TypeScript backend project, set up Express with TypeScript, or mentions "setup ts express".
---

# Skill: TypeScript + Express + tsx + Vitest Project Initialization

## Inputs

- **Project name** (required): provided as `$ARGUMENTS` by the prompt. If missing
  or empty, ask the user for a name before proceeding. The name must be a valid
  npm package name (lowercase, no spaces, may contain hyphens).

## Goal

Set up a complete TypeScript project with ExpressJS, Vitest, Prettier, and ESLint
using the conventions: `semi: true`, `singleQuote: true`, ESM (`"type": "module"`),
and unit tests at the same level as source files. Use `tsx` to run the application
in development.

## Step by Step

### 1. Prepare

Determine the project name:

- If `$ARGUMENTS` is provided and non-empty, use it.
- Otherwise, ask the user: "What is the project name?" and wait for the answer.

Run:

```bash
npm init -y
```

Then edit `package.json` to set the project name and ESM fields:

```json
{
  "name": "<project-name>",
  "version": "0.1.0",
  "type": "module",
  "main": "dist/server.js",
  "engines": {
    "node": ">=24.0.0 <25.0.0"
  }
}
```

If the directory is not empty, ask the user whether to overwrite or use a subfolder.

### 2. Install Dependencies

```bash
npm install express
npm install -D typescript tsx @types/node @types/express
npm install -D vitest @vitest/coverage-v8
npm install -D prettier eslint @eslint/js typescript-eslint eslint-config-prettier globals
```

### 3. Create Configuration Files

Copy each template from the skill's `templates/` folder to the project root:

| Destination | Template |
|---|---|
| `.npmrc` | `templates/npmrc` |
| `.nodeversion` | `templates/nodeversion` |
| `.gitignore` | `templates/gitignore` |
| `tsconfig.json` | `templates/tsconfig.json` |
| `.prettierrc` | `templates/prettierrc.json` |
| `.prettierignore` | `templates/prettierignore` 
| `eslint.config.js` | `templates/eslint.config.js` |
| `vitest.config.ts` | `templates/vitest.config.ts` |

### 4. Create Source Files

Create the `src/` folder and the `src/routes/` subfolder. Copy:

| Destination | Template |
|---|---|
| `src/app.ts` | `templates/app.ts` |
| `src/app.test.ts` | `templates/app.test.ts` |
| `src/server.ts` | `templates/server.ts` |
| `src/routes/health.ts` | `templates/routes-health.ts` |

**Important:** With `"module": "NodeNext"`, every relative import **must**
include the `.js` extension, even though the source file is `.ts`. Example:
`import app from './app.js'` and `import healthRouter from './routes/health.js'`.

**Convention:** All Express routes live under `src/routes/`, one file per
resource, each exporting an Express `Router`. Register routers in `src/app.ts`
via `app.use(...)`.

### 5. Update `package.json` Scripts

Add:

```json
{
  "scripts": {
	"dev": "tsx watch src/server.ts",
	"build": "tsc",
	"start": "node dist/server.js",
	"test": "vitest run",
	"test:watch": "vitest",
	"test:coverage": "vitest run --coverage",
	"lint": "eslint src/**/*.ts",
	"lint:fix": "eslint src/**/*.ts --fix",
	"format": "prettier --write \"src/**/*.ts\"",
	"format:check": "prettier --check \"src/**/*.ts\""
  }
}
```

### 6. Validate

Run:

```bash
npm run format:check
npm run lint
npm test
npm run build
```

Fix any errors. Display a summary of created files and available commands.

### 7. Create README.md

Copy `templates/README.md` to the project root as `README.md`, replacing
`{{PROJECT_NAME}}` with the project name provided in Step 1.

The README must document:

- A short project description
- The full stack with a one-line reason for each library
- Node.js and npm requirements
- Setup instructions
- All available npm scripts (matching `package.json`)
- Project structure
- Coding conventions

After writing the README, verify that every script listed in the "Available
Commands" table exists in `package.json`. If any script is missing or renamed,
update the README before finishing.