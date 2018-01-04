import { RankModel } from "../models/RankModel"
import { UserModel } from "../models/UserModel"
import * as Moment from "moment"
import { Renderable } from "strontium/lib/src"
import { Rank } from "./Rank"

export class User extends Renderable {
    constructor(private viewer: string, private user: UserModel, private rank: RankModel) {
        super()
    }

    async render(): Promise<any> {
        return {
            name: {
                first: this.user.first_name,
                last: this.user.last_name,
                full: `${this.user.first_name} ${this.user.last_name}`,
            },
            email_address:
                this.viewer === "owner" || this.viewer === "admin"
                    ? this.user.email_address
                    : undefined,
            steam_id: this.user.steam_id,
            age: Moment().diff(Moment(this.user.date_of_birth), "years"),
            location: this.user.locality,
            rank: await new Rank(this.rank).render(),
            permissions: {
                is_recruiter: !!this.user.is_recruiter,
                is_drill_instructor: !!this.user.is_drill_instructor,
                is_administrator: !!this.user.is_administrator,
                is_suspended: !!this.user.is_suspended,
            },
        }
    }
}
