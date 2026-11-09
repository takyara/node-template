# node-template

A strict **Node.js 26 + TypeScript** starter that follows
[Conventional Commits](https://www.conventionalcommits.org/) and releases itself.

## Features

| Area         | Tooling                                                              |
| ------------ | -------------------------------------------------------------------- |
| Runtime      | Node.js 26, ES modules, native TypeScript execution in development   |
| Language     | TypeScript 6 in strict mode                                          |
| Code quality | ESLint (strict type-checked rules) + Prettier                        |
| Tests        | Vitest with V8 coverage (80% minimum)                                |
| Unused code  | Knip                                                                 |
| Git hooks    | Husky + lint-staged + commitlint                                     |
| Releases     | release-please: version bump, `CHANGELOG.md`, tag and GitHub Release |
| CI           | GitHub Actions: quality checks and pull request title check          |
| Dependencies | Dependabot, weekly, with conventional commit messages                |

## Getting started

Requirements: Node.js 26 (`nvm use` reads `.nvmrc`) and npm 11.

```bash
npm install            # also installs the Git hooks
cp .env.example .env   # then adjust the values
npm run dev
```

## Scripts

| Command                 | Description                                            |
| ----------------------- | ------------------------------------------------------ |
| `npm run dev`           | Run `src/index.ts` and restart on every change         |
| `npm run build`         | Compile `src/` to `dist/`                              |
| `npm start`             | Run the compiled app from `dist/`                      |
| `npm run typecheck`     | Check types                                            |
| `npm run lint`          | Lint (fails on any warning)                            |
| `npm run lint:fix`      | Lint and fix what can be fixed                         |
| `npm run format`        | Format every file                                      |
| `npm run format:check`  | Check formatting without changing files                |
| `npm test`              | Run tests once                                         |
| `npm run test:watch`    | Run tests on every change                              |
| `npm run test:coverage` | Run tests with a coverage report                       |
| `npm run knip`          | Find unused files, exports and dependencies            |
| `npm run commit`        | Write a conventional commit with an interactive prompt |

## Project structure

```
src/
├── index.ts     # entry point: wires everything together
├── env.ts       # reads and validates environment variables
├── logger.ts    # dependency-free JSON logger
└── greet.ts     # example module, replace with your own code
```

Tests live next to the code they test (`*.test.ts`).

## Environment variables

| Variable    | Values                              | Default       |
| ----------- | ----------------------------------- | ------------- |
| `NODE_ENV`  | `development`, `test`, `production` | `development` |
| `LOG_LEVEL` | `debug`, `info`, `warn`, `error`    | `info`        |

## Releases

Every push to `main` updates a `chore(release): release x.y.z` pull request generated from
the commit history. Merging it bumps the version, updates `CHANGELOG.md`, creates the Git tag
and publishes a GitHub Release.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

[MIT](./LICENSE) © Takyara Studio
