import { PingController } from "../controllers/PingController"
import * as Express from "express"
import { Server } from "http"
import { ExpressExecutor, MySQLDatastore, Runtime } from "strontium/lib/src"

export class APIRuntime extends Runtime {
    private application: Express.Application
    private datastore: MySQLDatastore
    private executor: ExpressExecutor
    private server: Server

    async start(): Promise<void> {
        // Prep the datastore
        this.datastore = new MySQLDatastore(process.env
            .MYSQL_CONNECTION_STRING as string)
        await this.datastore.open()

        // Construct the Express Application
        this.application = Express()
        this.executor = new ExpressExecutor()

        this.application.get("/ping", this.executor.middleware(PingController))

        this.server = this.application.listen(
            process.env.HTTP_LISTEN_PORT || 8080
        )

        console.log(
            `[API Runtime] Goliath API Server loaded on ${
                process.env.HTTP_LISTEN_PORT
            }`
        )
    }

    async stop(): Promise<void> {
        this.server.close()

        await this.datastore.close()

        console.log(`[API Runtime] Goliath API Server stopped`)
    }
}
