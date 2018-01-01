import { GoliathRequest } from "./GoliathRequest"
import { MySQLDatastore } from "strontium/lib/src"

export class RequestInjector {
    constructor(private store: MySQLDatastore) {}

    middleware(): (
        req: Express.Request,
        res: Express.Response,
        next: () => void
    ) => void {
        return (
            req: Express.Request,
            res: Express.Response,
            next: () => void
        ) => {
            ;(req as GoliathRequest).mysql = this.store

            next()
        }
    }
}
