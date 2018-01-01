#!/usr/bin/env node

// Bootstrap environment from .env first
import { config } from "dotenv"
config()

// Load the global reflection lib
require("reflect-metadata")

import { APIRuntime } from "./runtimes/APIRuntime"
import { argv } from "yargs"

// Switch the Runtime based on the parameters
if (argv.api || argv.a) {
    let runtime = new APIRuntime()
    runtime.start()

    process.once("SIGTERM", () => {
        runtime.stop()
    })
}
