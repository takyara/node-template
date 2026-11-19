import type { LogLevel } from "./env.ts";

const PRIORITY: Record<LogLevel, number> = { debug: 10, info: 20, warn: 30, error: 40 };

type LogFn = (msg: string, meta?: Record<string, unknown>) => void;
export type Logger = Record<LogLevel, LogFn>;

export interface LoggerOptions {
	/** Minimum level to output. */
	readonly level: LogLevel;
	/** Where to write each line (defaults to stdout). */
	readonly write?: (line: string) => void;
}

/**
 * Errors have no enumerable fields: without this they would be logged as `{}`.
 * BigInts are not supported by JSON: without this `JSON.stringify` would throw.
 */
function replacer(_key: string, value: unknown): unknown {
	if (value instanceof Error) {
		return { name: value.name, message: value.message, stack: value.stack, cause: value.cause };
	}
	if (typeof value === "bigint") return value.toString();
	return value;
}

/** Logging must never crash the app: unserializable metadata (e.g. circular) is dropped. */
function serialize(entry: Record<string, unknown>): string {
	try {
		return JSON.stringify(entry, replacer);
	} catch (error) {
		const { time, level, msg } = entry;
		return JSON.stringify({ time, level, msg, logError: String(error) });
	}
}

/**
 * Minimal dependency-free JSON logger: one JSON object per line.
 */
export function createLogger({
	level,
	write = (line) => process.stdout.write(`${line}\n`),
}: LoggerOptions): Logger {
	const log =
		(lvl: LogLevel): LogFn =>
		(msg, meta = {}) => {
			if (PRIORITY[lvl] < PRIORITY[level]) return;
			write(serialize({ ...meta, time: new Date().toISOString(), level: lvl, msg }));
		};

	return { debug: log("debug"), info: log("info"), warn: log("warn"), error: log("error") };
}
