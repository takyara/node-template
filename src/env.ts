const NODE_ENVS = ["development", "test", "production"] as const;
const LOG_LEVELS = ["debug", "info", "warn", "error"] as const;

type NodeEnv = (typeof NODE_ENVS)[number];
export type LogLevel = (typeof LOG_LEVELS)[number];

export interface Env {
	readonly nodeEnv: NodeEnv;
	readonly logLevel: LogLevel;
}

export class EnvError extends Error {
	override name = "EnvError";
}

/** Returns `value` if it is one of `allowed`, `fallback` if unset, throws otherwise. */
function oneOf<T extends string>(
	name: string,
	value: string | undefined,
	allowed: readonly T[],
	fallback: T,
): T {
	if (value === undefined || value === "") return fallback;
	if ((allowed as readonly string[]).includes(value)) return value as T;
	throw new EnvError(`${name} must be one of: ${allowed.join(", ")} (got "${value}")`);
}

/**
 * Reads and validates environment variables.
 * Throws an EnvError at startup if a value is invalid.
 */
export function loadEnv(source: NodeJS.ProcessEnv = process.env): Env {
	return Object.freeze({
		nodeEnv: oneOf("NODE_ENV", source["NODE_ENV"], NODE_ENVS, "development"),
		logLevel: oneOf("LOG_LEVEL", source["LOG_LEVEL"], LOG_LEVELS, "info"),
	});
}
