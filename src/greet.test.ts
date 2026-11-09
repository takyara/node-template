import { describe, expect, it } from "vitest";
import { greet } from "./greet.ts";

describe("greet", () => {
	it("greets the given name", () => {
		expect(greet("Alice")).toBe("Hello, Alice!");
	});

	it("handles an empty name", () => {
		expect(greet("")).toBe("Hello, !");
	});
});
