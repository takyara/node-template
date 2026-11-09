import { describe, expect, it, vi } from "vitest";
import type { LogLevel } from "./env.ts";
import { createLogger } from "./logger.ts";

function setup(level: LogLevel) {
	const lines: string[] = [];
	const logger = createLogger({ level, write: (line) => lines.push(line) });
	const entries = () => lines.map((line) => JSON.parse(line) as Record<string, unknown>);
	return { logger, entries };
}

describe("createLogger", () => {
	it("writes one JSON line with time, level, message and metadata", () => {
		const { logger, entries } = setup("debug");
		logger.info("user created", { id: 42 });

		const [entry] = entries();
		expect(entries()).toHaveLength(1);
		expect(entry).toMatchObject({ level: "info", msg: "user created", id: 42 });
		expect(typeof entry?.["time"]).toBe("string");
	});

	it("skips messages below the configured level", () => {
		const { logger, entries } = setup("warn");
		logger.debug("a");
		logger.info("b");
		logger.warn("c");
		logger.error("d");

		expect(entries().map((e) => e["msg"])).toEqual(["c", "d"]);
	});

	it("writes to stdout by default", () => {
		const spy = vi.spyOn(process.stdout, "write").mockReturnValue(true);
		createLogger({ level: "info" }).info("hello");

		expect(spy).toHaveBeenCalledWith(expect.stringContaining('"msg":"hello"'));
	});
});
