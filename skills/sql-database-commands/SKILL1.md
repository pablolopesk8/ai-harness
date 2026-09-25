---
name: sql-database-commands
description: 'Write pure SQL statements and parameterized SQL templates for TypeScript applications. Use for SQL, database queries, schema changes, migrations, indexes, and PostgreSQL, MySQL, SQLite, or SQL Server tasks. Do not generate ORM/driver-specific code.'
---

# SQL Database Commands

Use this skill when creating or working with SQL statements, database schemas, migrations, indexes, or SQL-related application code.

## Workflow

1. Identify the database engine and version from project configuration, dependencies, connection settings, or existing SQL. Do not assume a dialect. If it cannot be established and the answer depends on it, ask the user.
2. Inspect relevant schema, migrations, and nearby queries before proposing changes. Use the repository's existing database library and conventions; do not add a driver or ORM just to answer a SQL question.
3. Write SQL for the identified dialect. Call out dialect-specific syntax when it affects portability. Use explicit columns instead of `SELECT *` when the result shape matters.
4. For application code, bind values through the database library's parameterized-query API. Never interpolate untrusted values into SQL. Identifiers such as table and column names generally cannot be bound; validate them against an allowlist when they must vary.
5. For data changes, state the affected rows and conditions clearly. Prefer a transaction for related multi-statement changes when supported, and include a way to verify the result or roll back where appropriate.
6. Treat `DELETE`, `UPDATE`, `DROP`, `TRUNCATE`, destructive migrations, and production database commands as high impact. Inspect the target and scope first; do not execute them without explicit user authorization. Prefer a preview or read-only check before mutation.
7. Validate syntax and behavior using the project's available database tooling, tests, or a non-destructive query. Do not claim execution or verification that did not happen.

## Output

- Provide a complete, runnable statement or command and name the assumed database dialect.
- Explain important assumptions, especially table shape, null handling, duplicate handling, and transaction behavior.
- For a change to an existing project, include the application integration and migration implications, not only the SQL fragment.
- Keep examples minimal and avoid presenting destructive SQL as safe to run without reviewing its target and scope.
