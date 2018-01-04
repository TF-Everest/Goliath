import { PromotionModel } from "../models/PromotionModel"
import { SteamService } from "./SteamService"
import { UserModel } from "../models/UserModel"
import { UserRepository } from "../repositories/UserRepository"
import { parseName } from "humanparser"
import { Queryable } from "strontium/lib/src"

export class UserService {
    private user_repository: UserRepository
    private steam_service: SteamService

    constructor(private store: Queryable) {
        this.user_repository = new UserRepository(this.store)
        this.steam_service = new SteamService()
    }

    async getUserBySteamID(steam_id: string): Promise<UserModel> {
        let [user] = await this.user_repository.read([
            ["steam_id", "=", steam_id],
        ])

        return user
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

            let { firstName, lastName } = parseName(steam_profile.full_name)

            return await this.user_repository.create({
                first_name: firstName,
                last_name: lastName,
                steam_id: steam_id,
            })
        }
    }
    
}
