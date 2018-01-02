import { SteamService } from "./SteamService"
import { UserModel } from "../models/UserModel"
import { UserRepository } from "../repositories/UserRepository"
import { Queryable } from "strontium/lib/src"

export class UserService {
    private user_repository: UserRepository
    private steam_service: SteamService

    constructor(private store: Queryable) {
        this.user_repository = new UserRepository(this.store)
        this.steam_service = new SteamService()
    }

    async createOrRetrieveUserBySteamID(steam_id: string): Promise<UserModel> {
        let [user] = await this.user_repository.read([
            ["steam_id", "=", steam_id],
        ])

        if (user) {
            return user
        } else {
            let steam_profile = await this.steam_service.getSteamProfile(
                steam_id
            )

            let created_id = await this.user_repository.create({
                first_name: steam_profile.full_name.split(" ")[0],
                last_name: steam_profile.full_name
                    .split(" ")
                    .slice(1)
                    .join(" "),
                steam_id: steam_id,
            })

            let [created_user] = await this.user_repository.read([
                ["id", "=", created_id],
            ])

            return created_user
        }
    }
}
