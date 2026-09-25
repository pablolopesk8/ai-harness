---
name: sql-database-commands
description: 'Write pure SQL statements and parameterized SQL templates for TypeScript applications. Use for SQL, database queries, schema changes, migrations, indexes, and PostgreSQL, MySQL, SQLite, or SQL Server tasks. Do not generate ORM/driver-specific code unless explicitly requested.'
---

# SQL Database Commands

Use this skill when creating or working with SQL statements, database schemas, migrations, indexes, or SQL-related application code.

## Workflow

1. Identify the database engine and version from project configuration, dependencies, connection settings, or existing SQL. Do not assume a dialect. If it cannot be established and the answer depends on it, ask the user.
2. Inspect relevant schema, migrations, and nearby queries before proposing changes. Use actual database identifiers. Respect the project's mapping between TypeScript properties and database columns. Do not invent mappings; ask if the mapping is unknown.
3. Write pure SQL for the identified dialect. Do not use ORM, query-builder, or driver-specific APIs unless the user explicitly asks for them. Call out dialect-specific syntax when it affects portability. Use explicit columns instead of `SELECT *` when the result shape matters.
4. Bind values through placeholders, not interpolation. Use the placeholder style for the identified dialect:
   - PostgreSQL: `$1`, `$2`, ...
   - MySQL/MariaDB: `?`
   - SQLite: `?` or `:name`
   - SQL Server: `@p1`, `@p2`, ...
   Include a parameter mapping table for TypeScript consumption: placeholder, TypeScript mapped property, database column, type, and notes. Identifiers such as table and column names generally cannot be bound; validate them against an allowlist when they must vary.
5. Atomicity: When more than one statement is requested for the same logical operation, return one atomic unit. Prefer a single statement or CTE when possible. Otherwise wrap related statements in a transaction:
   - PostgreSQL/SQLite: `BEGIN; ...; COMMIT;` with a rollback note.
   - SQL Server: `BEGIN TRANSACTION; ...; COMMIT;` with a rollback note.
   - MySQL/MariaDB: `START TRANSACTION; ...; COMMIT;` but note that DDL may cause an implicit commit.
   If the dialect cannot make the requested statements atomic, say so and provide the safest alternative.
6. For data changes, state the affected rows and conditions clearly. Prefer a transaction for related multi-statement changes when supported, and include a way to verify the result or roll back where appropriate.
7. Treat `DELETE`, `UPDATE`, `DROP`, `TRUNCATE`, destructive migrations, and production database commands as high impact. Inspect the target and scope first; do not execute them without explicit user authorization. Prefer a preview or read-only check before mutation.
8. Validate syntax and behavior using the project's available database tooling, tests, or a non-destructive query. Do not claim execution or verification that did not happen.

## Output

- State the assumed database dialect.
- Provide pure SQL only. Do not include ORM, driver, or query-builder code unless explicitly requested.
- Use placeholders for values and include a parameter mapping table for TypeScript consumption.
- If more than one statement is requested, present them as one atomic unit or explain why that is not possible in the identified dialect.
- Explain important assumptions, especially table shape, null handling, duplicate handling, and transaction behavior.
- For a change to an existing project, include migration implications and rollback or verification notes.
- Keep examples minimal and avoid presenting destructive SQL as safe to run without reviewing its target and scope.