import { Queryable, TableRepository } from "strontium/lib/src"
import { RankModel } from "../models/RankModel"

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
                "promotion_board_required"
            ],
            "id"
        )
    }

}