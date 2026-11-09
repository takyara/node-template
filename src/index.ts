/**
 * Application entry point: loads the configuration, creates the logger
 * and starts the application.
 */
import { loadEnv } from "./env.ts";
import { greet } from "./greet.ts";
import { createLogger } from "./logger.ts";

const env = loadEnv();
const logger = createLogger({ level: env.logLevel });

logger.info("app started", { env: env.nodeEnv });
logger.info(greet("world"));
