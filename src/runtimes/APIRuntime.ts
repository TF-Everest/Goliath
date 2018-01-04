import { GetUserController } from "../controllers/GetUserController"
import { JWTParser } from "../middleware/JWTParser"
import { OAuthResponseController } from "../controllers/OAuthResponseController"
import { RequestInjector } from "../middleware/RequestInjector"
import * as cors from "cors"
import * as Express from "express"
import { Server } from "http"
import { ExpressExecutor, MySQLDatastore, Runtime } from "strontium/lib/src"

import { OAuthRequestController } from "../controllers/OAuthRequestController"
import { PingController } from "../controllers/PingController"

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

        let request_injector = new RequestInjector(this.datastore)
        this.application.use(request_injector.middleware())

        let jwt_parser = new JWTParser(process.env
            .AUTHENTICATION_TOKEN_SECRET as string)
        this.application.use(jwt_parser.middleware())

        this.application.use(cors())

        // Setup routing
        this.application.get("/ping", this.executor.middleware(PingController))

        this.application.get(
            "/openid/steam",
            this.executor.middleware(OAuthRequestController)
        )
        this.application.get(
            "/openid/steam/response",
            this.executor.middleware(OAuthResponseController)
        )

        this.application.get(
            "/users/:user_id",
            this.executor.middleware(GetUserController)
        )

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
