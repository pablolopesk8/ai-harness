# {{PROJECT_NAME}}

A TypeScript + Express API with Vitest, Prettier, and ESLint.

## Stack

| Library | Why |
| --- | --- |
| `express` | HTTP server and routing |
| `typescript` | Static typing |
| `tsx` | Run TypeScript directly in development with hot-reload |
| `vitest` | Unit testing with native ESM and TypeScript support |
| `prettier` | Code formatting |
| `eslint` + `typescript-eslint` | Linting for TypeScript |

## Requirements

- Node.js 24+
- npm 11+

## Setup

```bash
npm install
```

## Available Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the server in development with hot-reload |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run the compiled server in production |
| `npm test` | Run unit tests once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run lint` | Lint source files |
| `npm run lint:fix` | Lint and auto-fix issues |
| `npm run format` | Format source files with Prettier |
| `npm run format:check` | Check formatting without writing |

## Project Structure

```text
src/
├── routes/
│   └── health.ts       # /health route
├── app.ts              # Express app definition and router registration
├── app.test.ts         # Unit tests for app.ts (same level as source)
└── server.ts           # Entry point (starts the server)
```

- All Express routes live under `src/routes/`, one file per resource.
- Tests live next to the files they cover, using the `*.test.ts` suffix.

## Conventions

- ESM (`"type": "module"`)
- Semicolons and single quotes enforced by Prettier
- Relative imports include the `.js` extension (required by `NodeNext`)
