/**
 * Application entry point.
 */
import { greet } from "./greet.ts";

process.stdout.write(`${greet("world")}\n`);
