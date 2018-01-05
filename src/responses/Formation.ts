import { FormationModel } from "../models/FormationModel"
import { Renderable } from "strontium/lib/src"

export class Formation extends Renderable {
    constructor(private formation: FormationModel) {
        super()
    }

    async render(): Promise<any> {
        return {
            id: this.formation.id,
            name: this.formation.name,
            callsign: this.formation.callsign,
            parent_formation: this.formation.parent,
        }
    }
}
