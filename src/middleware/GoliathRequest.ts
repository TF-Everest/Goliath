import { Request } from "express-serve-static-core"
import { MySQLDatastore } from "strontium/lib/src"

export interface GoliathRequest extends Request {
    mysql: MySQLDatastore
    authenticated_token: {
        user_id: number
        steam_id: string
    }
}
