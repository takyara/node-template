/** @type {import("prettier").Config} */
export default {
	useTabs: true,
	tabWidth: 2,
	printWidth: 100,
	singleQuote: false,
	semi: true,
	trailingComma: "all",
	endOfLine: "lf",
	overrides: [
		{
			// YAML forbids tabs and Markdown renders them poorly
			files: ["*.yml", "*.yaml", "*.md"],
			options: { useTabs: false },
		},
	],
};
