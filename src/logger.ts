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
			write(JSON.stringify({ time: new Date().toISOString(), level: lvl, msg, ...meta }));
		};

	return { debug: log("debug"), info: log("info"), warn: log("warn"), error: log("error") };
}
