// @ts-check
import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
	// Generated files are never linted
	{ ignores: ["dist", "coverage"] },

	// Base rule sets
	js.configs.recommended,
	tseslint.configs.strictTypeChecked,
	tseslint.configs.stylisticTypeChecked,

	// Project settings
	{
		languageOptions: {
			globals: globals.node,
			parserOptions: {
				projectService: { allowDefaultProject: ["*.js"] },
				tsconfigRootDir: import.meta.dirname,
			},
		},
		rules: {
			"@typescript-eslint/consistent-type-imports": "error",
			"@typescript-eslint/consistent-type-exports": "error",
			"@typescript-eslint/no-import-type-side-effects": "error",
			"@typescript-eslint/switch-exhaustiveness-check": "error",
			"@typescript-eslint/restrict-template-expressions": ["error", { allowNumber: true }],
			"@typescript-eslint/no-unused-vars": [
				"error",
				{ argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
			],
			eqeqeq: ["error", "always"],
			"no-console": "error",
		},
	},

	// Config files (*.js) are not type-checked
	{
		files: ["**/*.js"],
		extends: [tseslint.configs.disableTypeChecked],
	},

	// Must stay last: turns off rules that conflict with Prettier
	prettier,
);
