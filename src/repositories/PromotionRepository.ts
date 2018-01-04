import { Queryable, TableRepository } from "strontium/lib/src"
import { PromotionModel } from "../models/PromotionModel"

export class PromotionRepository extends TableRepository<PromotionModel> {
    constructor(store: Queryable) {
        super(
            store,
            "promotions",
            [
                "commendation_message",
                "completed_at",
                "created_at",
                "from_rank",
                "id",
                "is_command_promotion",
                "promotion_board_chairman",
                "promotion_board_chairman_title",
                "promotion_board_status",
                "status",
                "to_rank",
                "user_id"
            ],
            "id"
        )
    }
}