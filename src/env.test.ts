import { describe, expect, it } from "vitest";
import { EnvError, loadEnv } from "./env.ts";

describe("loadEnv", () => {
	it("uses defaults when variables are missing", () => {
		expect(loadEnv({})).toEqual({ nodeEnv: "development", logLevel: "info" });
	});

	it("reads provided values", () => {
		expect(loadEnv({ NODE_ENV: "production", LOG_LEVEL: "warn" })).toEqual({
			nodeEnv: "production",
			logLevel: "warn",
		});
	});

	it("treats empty strings as missing", () => {
		expect(loadEnv({ LOG_LEVEL: "" }).logLevel).toBe("info");
	});

	it("rejects an unknown value", () => {
		expect(() => loadEnv({ LOG_LEVEL: "verbose" })).toThrow(EnvError);
	});

	it("returns a frozen object", () => {
		expect(Object.isFrozen(loadEnv({}))).toBe(true);
	});
});
