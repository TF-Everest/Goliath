import { UserModel } from "../models/UserModel"
import { Queryable, TableRepository } from "strontium/lib/src"

export class UserRepository extends TableRepository<UserModel> {
    constructor(store: Queryable) {
        super(
            store,
            "users",
            [
                "id",
                "created_at",
                "date_of_birth",
                "email_address",
                "first_name",
                "last_name",
                "locality",
                "nationality",
                "steam_id",
                "timezone",
                "is_administrator",
                "is_drill_instructor",
                "is_jag",
                "is_recruiter",
                "is_suspended",
                "updated_at",
            ],
            "id"
        )
    }
}
