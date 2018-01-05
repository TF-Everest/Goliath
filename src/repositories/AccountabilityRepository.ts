import { AccountabilityModel } from "../models/AccountabilityModel"
import { Queryable, TableRepository } from "strontium/lib/src"

export class AccountabilityRepository extends TableRepository<
    AccountabilityModel
> {
    constructor(store: Queryable) {
        super(
            store,
            "accountability",
            ["id", "reported_at", "reported_by", "user_id"],
            "id"
        )
    }
}
