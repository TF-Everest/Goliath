import { AssignmentModel } from "../models/AssignmentModel"
import { Queryable, TableRepository } from "strontium/lib/src"

export class AssignmentRepository extends TableRepository<AssignmentModel> {
    constructor(store: Queryable) {
        super(
            store,
            "assignments",
            [
                "id",
                "assigned_at",
                "assigned_by",
                "commendation_message",
                "position_id",
                "relinquished_at",
                "user_id",
            ],
            "id"
        )
    }
}
