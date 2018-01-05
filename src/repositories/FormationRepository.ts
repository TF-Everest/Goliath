import { FormationModel } from "../models/FormationModel"
import { Queryable, TableRepository } from "strontium/lib/src"

export class FormationRepository extends TableRepository<FormationModel> {
    constructor(store: Queryable) {
        super(store, "formations", ["id", "callsign", "name", "parent"], "id")
    }
}
