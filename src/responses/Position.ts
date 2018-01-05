import { Formation } from "./Formation"
import { FormationModel } from "../models/FormationModel"
import { PositionModel } from "../models/PositionModel"
import { Renderable } from "strontium/lib/src"

export class Position extends Renderable {
    constructor(
        private position: PositionModel,
        private formation: FormationModel
    ) {
        super()
    }

    async render(): Promise<any> {
        return {
            id: this.position.id,
            name: this.position.name,
            callsign: this.position.callsign,
            reports_to: this.position.reports_to,
            is_open: !!this.position.is_open,
            permissions: {
                is_platoon_leadership: !!this.position.is_platoon_leadership,
                is_team_leadership: !!this.position.is_team_leadership,
            },
            parent_formation: await new Formation(this.formation).render(),
        }
    }
}
