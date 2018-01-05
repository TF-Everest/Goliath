import { RankModel } from "../models/RankModel"
import { Queryable, TableRepository } from "strontium/lib/src"

export class RankRepository extends TableRepository<RankModel> {
    constructor(store: Queryable) {
        super(
            store,
            "ranks",
            [
                "abbreviation",
                "days_in_grade",
                "days_in_service",
                "id",
                "name",
                "paygrade",
                "priority",
                "promotion_board_required",
            ],
            "id"
        )
    }
}
