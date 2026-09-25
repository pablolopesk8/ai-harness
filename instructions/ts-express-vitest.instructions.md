---
applyTo: "**/*.ts"
---

# Project Instructions

## Scope

This repository is a small ExpressJS + TypeScript server. Keep changes
consistent with the existing app layout: `src/app.ts` (Express app),
`src/server.ts` (entry point), `src/routes/` (route modules), and tests placed
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
- Use `npm start` to run the compiled server with `node dist/server.js`.
- Use `npm test` for a single test run, `npm run test:watch` for watch mode, and `npm run test:coverage` for a coverage report.
- Use `npm run lint` for ESLint checks and `npm run lint:fix` to auto-fix.
- Use `npm run format` to apply Prettier formatting and `npm run format:check` to validate without writing.
- `tsx` runs TypeScript directly; it does not generate JavaScript files. Only `tsc` emits files.
- This project uses `npm` as the package manager. Use `npm install` for dependencies and `npm run <script>` for all project commands.

## ESM Imports

- This project uses `"module": "NodeNext"`.
- Every relative import MUST include the `.js` extension, even when the source file is `.ts`. Example: `import app from './app.js'`.
- Do not rely on extensionless imports; `tsc` and `node` will fail at build or runtime.
- Use `import type` for type-only imports (`verbatimModuleSyntax` is enabled).

## Coding Expectations

- Prefer small, focused changes over broad refactors.
- Do not use `any`. Prefer `unknown` when the type is genuinely unknown.
- Use TypeScript idioms that match the current code style.
- Do not introduce extra frameworks or architectural patterns unless the task explicitly requires them.
- Keep the codebase consistent with `.prettierrc` and `eslint.config.js`.

## Lint and Format Standards

- ESLint is the source of truth for code quality; Prettier for formatting.
- Use `npm run lint` and `npm run lint:fix` for ESLint.
- Use `npm run format` and `npm run format:check` for Prettier.
- Do not hand-format code that Prettier can fix.

## Routes

- All Express routes live under `src/routes/`.
- One file per resource, named after the resource (e.g., `health.ts`, `users.ts`).
- Each route file exports a default `Router` from `express`.
- Register routers in `src/app.ts` via `app.use(...)`.
- Relative imports inside route files must include the `.js` extension.
- Route handlers stay thin: parse input, call a service, send the response. Business logic and external calls do not live in route files.

## External Calls and Services

- Code that talks to external APIs lives under `src/services/`.
- One file per external dependency, named after it (e.g., `weather.ts`, `payments.ts`).
- Services export plain async functions; they do not import Express types.
- Use the global `fetch` (Node 18+). Do not add an HTTP client library unless the task explicitly requires it.
- Every service function has an explicit return type. Never return `any`.
- Validate and parse the external response into a typed shape before returning; do not leak the raw API shape to callers.
- On non-2xx responses, throw an `Error` whose message includes the status code and the upstream URL. Do not swallow errors silently.
- Read API keys `process.env`. Never hardcode secrets. Document every required variable in `.env.example`.
- Example signature:

  ```ts
  export async function fetchUsers(): Promise<User[]> {
    const res = await fetch(`http://localhost:3000/users`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.API_KEY}`,
      },
    });
    if (!res.ok) {
      throw new Error(`GET ${res.url} failed with ${res.status}`);
    }
    return (await res.json()) as User[];
  }
  ```

## Error Handling

- Services and route handlers `throw Error` (or subclasses) on failure.
- The error middleware lives in `src/middleware/error-handler.ts` and is registered last in `src/app.ts`. Route handlers do not format error responses themselves.

## Types
- Shared types live in `src/types/`.
- Prefer interface for object shapes and type for unions and aliases.
- Array and async returns are typed explicitly, e.g. `Promise<User[]>`.
- Do not redefine a type that already exists in `src/types/`.

## Testing

- Use Vitest.
- Place test files next to the source file they cover, using the `*.test.ts` or `*.spec.ts` suffix.
- Run `npm test` for a single run, `npm run test:watch` for watch mode, and `npm run test:coverage` for a coverage report.
- Prefer mocks over real behavior tests.
- For external HTTP calls, mock fetch with `vi.stubGlobal('fetch', ...)` or `vi.spyOn(globalThis, 'fetch')`. Do not mock the service module itself, or the test proves nothing.
- Clear mocks in `beforeEach` with `vi.restoreAllMocks()`.
- Reset fetch mocks in `afterAll` with `vi.restoreAllMocks()`.
- Add or update tests when changing route behavior or startup expectations.
- Avoid test-only production code.


## Documentation

- Keep `README.md` and inline documentation accurate to the current codebase.
- Document new behavior or setup changes when they affect contributors.
- Whenever you add, remove, or change a project dependency, or add, remove, or rename a `package.json` script, you MUST:
  1. Update the `README.md` "Dependencies" section to reflect the current `package.json`.
  2. Update the `README.md` "Available Commands" section to reflect the current scripts.
  3. If the change introduces a new library, add a one-line explanation of why it is used.
