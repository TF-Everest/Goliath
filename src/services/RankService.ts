import { Queryable } from "strontium/lib/src"
import { RankModel } from "../models/RankModel"
import { PromotionRepository } from "../repositories/PromotionRepository"
import { RankRepository } from "../repositories/RankRepository"
import { UserRepository } from "../repositories/UserRepository"
import { SteamService } from "./SteamService"

export class RankService {
    private rank_repository: RankRepository
    private promotion_repository: PromotionRepository

    constructor(private store: Queryable) {
        this.rank_repository = new RankRepository(this.store)
        this.promotion_repository = new PromotionRepository(this.store)
    }

    async getCurrentRank(user_id: number): Promise<RankModel> {

        let [latest_promotion] = await this.promotion_repository.read([
            ["user_id", "=", user_id],
            ["completed_at", "!=", null],
            ["completed_at", "<", new Date()],
            ["status", "=", "complete"]
        ])

        let [latest_rank] = await this.rank_repository.read([
            ["id", "=", latest_promotion.to_rank]
        ])

        return latest_rank

    }
}