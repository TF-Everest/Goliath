import { MySQLDatastore } from "strontium/lib/src"
import { Request } from "express-serve-static-core"

export interface GoliathRequest extends Request {
    mysql: MySQLDatastore
}
