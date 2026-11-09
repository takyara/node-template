import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		include: ["src/**/*.test.ts"],
		environment: "node",
		clearMocks: true,
		restoreMocks: true,
		coverage: {
			provider: "v8",
			include: ["src/**/*.ts"],
			// The entry point only wires things together: it is not unit-tested
			exclude: ["src/**/*.test.ts", "src/index.ts"],
			reporter: ["text", "html", "lcov"],
			thresholds: { lines: 80, functions: 80, branches: 80, statements: 80 },
		},
	},
});
