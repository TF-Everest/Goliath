import { PositionModel } from "../models/PositionModel"
import { Queryable, TableRepository } from "strontium/lib/src"

export class PositionRepository extends TableRepository<PositionModel> {
    constructor(store: Queryable) {
        super(
            store,
            "positions",
            [
                "id",
                "callsign",
                "is_open",
                "is_platoon_leadership",
                "is_team_leadership",
                "name",
                "reports_to",
                "parent_formation",
            ],
            "id"
        )
    }
}
