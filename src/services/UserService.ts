import { AccountabilityRepository } from "../repositories/AccountabilityRepository"
import { AssignmentRepository } from "../repositories/AssignmentRepository"
import { PositionModel } from "../models/PositionModel"
import { PositionRepository } from "../repositories/PositionRepository"
import { SteamService } from "./SteamService"
import { UserModel } from "../models/UserModel"
import { UserRepository } from "../repositories/UserRepository"
import { parseName } from "humanparser"
import * as Moment from "moment"
import { Queryable } from "strontium/lib/src"

export class UserService {
    private user_repository: UserRepository
    private position_repository: PositionRepository
    private assignment_repository: AssignmentRepository
    private accountability_repository: AccountabilityRepository
    private steam_service: SteamService

    constructor(private store: Queryable) {
        this.user_repository = new UserRepository(this.store)
        this.position_repository = new PositionRepository(this.store)
        this.assignment_repository = new AssignmentRepository(this.store)
        this.accountability_repository = new AccountabilityRepository(
            this.store
        )
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

    async verifyPermission(
        user_id: number,
        permission: string
    ): Promise<boolean> {
        let [user] = await this.user_repository.read([["id", "=", user_id]])

        if (!user) {
            return false
        }

        // Admin's can do whatever they want
        if (user.is_administrator) {
            return true
        }

        if (permission === "drill-instructor") {
            return user.is_drill_instructor
        } else {
            return false
        }
    }

    async getCurrentPosition(user_id: number): Promise<PositionModel | null> {
        let [current_assignment] = await this.assignment_repository.read([
            ["user_id", "=", user_id],
            ["assigned_at", "<", new Date()],
            ["relinquished_at", ">", new Date()],
            "OR",
            ["relinquished_at", "=", null],
        ])

        if (!current_assignment) {
            return null
        }

        let [position] = await this.position_repository.read([
            ["id", "=", current_assignment.position_id],
        ])
        return position
    }

    async getCurrentAccountabilityStatus(
        user_id: number
    ): Promise<"absent" | "present" | "excused"> {
        return this.getAccountabilityForTimePeriod(
            user_id,
            Moment()
                .day(-7)
                .toDate(),
            Moment()
                .day(+7)
                .toDate()
        )
    }

    async getAccountabilityForTimePeriod(
        user_id: number,
        date_from: Date,
        date_to: Date
    ): Promise<"absent" | "present" | "excused"> {
        let [present_period] = await this.accountability_repository.read(
            [
                ["user_id", "=", user_id],
                ["reported_at", ">", date_from],
                ["reported_at", "<", date_to],
            ],
            {
                order: ["reported_at", "DESC"],
                limit: 1,
            }
        )

        if (present_period) {
            return "present"
        } else {
            return "absent"
        }
    }
}
