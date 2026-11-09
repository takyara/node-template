/**
 * Allowed scopes. Add a new entry here when a new part of the project appears.
 * The scope stays optional: `chore: something` is still valid.
 */
const scopes = [
	// Source code (src/)
	"env",
	"logger",
	// Dependencies
	"deps",
	"deps-dev",
	// Tool configuration (ESLint, Prettier, TypeScript, Vitest, Husky, commitlint…)
	"tooling",
	// Version commits created by release-please
	"release",
];

export default {
	extends: ["@commitlint/config-conventional"],
	rules: {
		"scope-enum": [2, "always", scopes],
		"type-enum": [
			2,
			"always",
			[
				"build",
				"chore",
				"ci",
				"docs",
				"feat",
				"fix",
				"perf",
				"refactor",
				"revert",
				"style",
				"test",
			],
		],
		"subject-case": [2, "never", ["sentence-case", "start-case", "pascal-case", "upper-case"]],
		"header-max-length": [2, "always", 100],
		"body-max-line-length": [1, "always", 100],
	},
};
