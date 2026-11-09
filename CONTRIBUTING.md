# Contributing

## Setup

1. Use Node.js 26: `nvm use`
2. Install dependencies (this also installs the Git hooks): `npm install`
3. Create your local environment file: `cp .env.example .env`

## Workflow

1. Create a branch from `main`: `feat/short-description`, `fix/short-description`…
2. Make your changes, with tests.
3. Commit using [Conventional Commits](#commit-messages).
4. Push and open a pull request. **Its title must also be a conventional commit message**:
   pull requests are squash-merged and the title becomes the commit on `main`.
5. Wait for CI to pass, then merge.

## Commit messages

```
type(scope): short description in lowercase

Optional body explaining what and why.

Optional footer, e.g. BREAKING CHANGE: …
```

### Types

| Type       | Use for                                   | Release |
| ---------- | ----------------------------------------- | ------- |
| `feat`     | A new feature                             | minor   |
| `fix`      | A bug fix                                 | patch   |
| `perf`     | A performance improvement                 | patch   |
| `refactor` | Code change that doesn't change behaviour | —       |
| `docs`     | Documentation only                        | —       |
| `test`     | Adding or fixing tests                    | —       |
| `build`    | Build system or dependencies              | —       |
| `ci`       | CI configuration                          | —       |
| `style`    | Formatting only                           | —       |
| `chore`    | Other maintenance                         | —       |
| `revert`   | Reverting a previous commit               | depends |

Add `!` after the type (`feat!: …`) or a `BREAKING CHANGE:` footer for a breaking change.

### Scopes

Scopes are optional, but when used they must be one of the values listed in
[`commitlint.config.js`](./commitlint.config.js): `env`, `logger`, `deps`, `deps-dev`,
`tooling`, `release`. Add a new scope there when a new part of the project appears.

### Examples

```
feat(env): add port variable
fix(logger): escape newlines in messages
chore(tooling): enable stricter eslint rules
feat!: require node 26
```

Not sure how to phrase it? Run `npm run commit` for an interactive prompt.

## Git hooks

| Hook         | Runs                                |
| ------------ | ----------------------------------- |
| `pre-commit` | ESLint and Prettier on staged files |
| `commit-msg` | commitlint on the commit message    |
| `pre-push`   | Type checking and tests             |

## Before opening a pull request

```bash
npm run typecheck && npm run lint && npm run format:check && npm run knip && npm run test:coverage && npm run build
```
