# Project Instructions

## Scope

This repository is a small ExpressJS + TypeScript server. Keep changes
consistent with the existing app layout: `src/app.ts` (Express app),
`src/index.ts` (entry point), `src/routes/` (route modules), and tests placed
next to the files they cover.

## Stack

- ExpressJS + TypeScript
- ESM (`"type": "module"`, `"module": "NodeNext"`)
- Vitest for testing
- `tsx` to run TypeScript in development
- `tsc` to compile to JavaScript in `dist/` for production

## Running the Project

- Use `npm run dev` to start the server in development with hot-reload (`tsx watch`).
- Use `npm run build` to compile TypeScript to `dist/` with `tsc`.
- Use `npm start` to run the compiled server with `node dist/index.js`.
- `tsx` runs TypeScript directly; it does not generate JavaScript files.
  Only `tsc` emits files.

## ESM Imports

- This project uses `"module": "NodeNext"`.
- Every relative import MUST include the `.js` extension, even when the source
  file is `.ts`. Example: `import app from './app.js'`.
- Do not rely on extensionless imports; `tsc` and `node` will fail at build
  or runtime.

## Package Manager

- This project uses `npm` as the package manager.
- Use `npm install` for dependency installation.
- Use `npm run <script>` for all project commands.

## Coding Expectations

- Prefer small, focused changes over broad refactors.
- Do not use `any`. Prefer `unknown` when the type is genuinely unknown.
- Use TypeScript idioms that match the current code style.
- Do not introduce extra frameworks or architectural patterns unless the task
  explicitly requires them.
- Match the repo's configured formatting and linting standards: Prettier for
  formatting and ESLint for code quality.
- Use `import type` for type-only imports (`verbatimModuleSyntax` is enabled).

## Lint and Format Standards

- Use `npm run lint` for ESLint checks.
- Use `npm run lint:fix` to auto-fix lint issues.
- Use `npm run format` to apply Prettier formatting.
- Use `npm run format:check` when validating formatting without writing files.
- Keep the codebase consistent with `.prettierrc` and `eslint.config.js`.

## Routes

- All Express routes live under `src/routes/`.
- One file per resource, named after the resource (e.g., `health.ts`, `users.ts`).
- Each route file exports a default `Router` from `express`.
- Register routers in `src/app.ts` via `app.use(...)`.
- Relative imports inside route files must include the `.js` extension.

## Testing

- Use Vitest.
- Run `npm test` for a single run, `npm run test:watch` for watch mode,
  and `npm run test:coverage` for a coverage report.
- Place test files next to the source file they cover, using the
  `*.test.ts` or `*.spec.ts` suffix.
- Prefer real behavior tests over mocks.
- Add or update tests when changing route behavior or startup expectations.
- Avoid test-only production code.

## Documentation

- Keep `README.md` and inline documentation accurate to the current codebase.
- Document new behavior or setup changes when they affect contributors.
- Whenever you add, remove, or change a project dependency, or add, remove,
  or rename a `package.json` script, you MUST:
  1. Update the `README.md` "Dependencies" section to reflect the current `package.json`.
  2. Update the `README.md` "Available Commands" section to reflect the current scripts.
  3. If the change introduces a new library, add a one-line explanation of why it is used.