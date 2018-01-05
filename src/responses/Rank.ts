import { RankModel } from "../models/RankModel"
import { Renderable } from "strontium/lib/src"

export class Rank extends Renderable {
    constructor(private rank: RankModel) {
        super()
    }

    async render(): Promise<any> {
        return {
            id: this.rank.id,
            name: this.rank.name,
            paygrade: this.rank.paygrade,
            priority: this.rank.priority,
            requirements: {
                time_in_grade: this.rank.days_in_grade,
                time_in_service: this.rank.days_in_service,
                promotion_board: !!this.rank.promotion_board_required,
            },
        }
    }
}
