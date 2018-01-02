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
                "updated_at",
            ],
            "id"
        )
    }
}
