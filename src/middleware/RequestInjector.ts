import { GoliathRequest } from "./GoliathRequest"
import { MySQLDatastore } from "strontium/lib/src"

export class RequestInjector {
    constructor(private store: MySQLDatastore) {
        this.middleware = this.middleware.bind(this)
    }

    middleware(req: Express.Request, res: Express.Response, next: () => void) {
        (req as GoliathRequest).mysql = this.store

        next()
    }
}
