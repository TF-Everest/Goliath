import { FormationRepository } from "../repositories/FormationRepository"
import { GoliathRequest } from "../middleware/GoliathRequest"
import { GoliathResponse } from "../responses/GoliathResponse"
import { RankService } from "../services/RankService"
import { User } from "../responses/User"
import { UserRepository } from "../repositories/UserRepository"
import { UserService } from "../services/UserService"
import { EndpointController, MySQLDatastore } from "strontium/lib/src"
import { a, mustBe } from "zafiro-validators"

export class GetUserController extends EndpointController<
    GoliathResponse<User>
> {
    @mustBe(
        a
            .number()
            .positive()
            .integer()
    )
    private requested_user_id: number

    @mustBe(
        a.object().keys({
            user_id: a
                .number()
                .positive()
                .integer(),
            steam_id: a.string(),
        })
    )
    private authenticated_user: {
        user_id: number
        steam_id: string
    }

    @mustBe(a.any())
    private store: MySQLDatastore

    @mustBe(a.any())
    private user_store: UserRepository

    @mustBe(a.any())
    private rank_service: RankService

    @mustBe(a.any())
    private user_service: UserService

    @mustBe(a.any())
    private formation_store: FormationRepository

    async extract(req: GoliathRequest): Promise<void> {
        this.requested_user_id = req.params.user_id

        this.authenticated_user = req.authenticated_token

        this.store = req.mysql
    }

    async init(): Promise<void> {
        this.user_store = new UserRepository(this.store)
        this.rank_service = new RankService(this.store)
        this.user_service = new UserService(this.store)
        this.formation_store = new FormationRepository(this.store)
    }

    async authorize(): Promise<boolean> {
        return this.authenticated_user !== undefined
    }

    async handle(): Promise<GoliathResponse<User>> {
        let [user] = await this.user_store.read([
            ["id", "=", this.requested_user_id],
        ])

        let [authenticated_user] = await this.user_store.read([
            ["id", "=", this.authenticated_user.user_id],
        ])

        let current_rank = await this.rank_service.getCurrentRank(user.id)

        let current_position = await this.user_service.getCurrentPosition(
            user.id
        )

        let accountability_status = await this.user_service.getCurrentAccountabilityStatus(
            user.id
        )

        let permission_level = "public"

        if (user.id === this.requested_user_id) {
            permission_level = "owner"
        }

        if (authenticated_user.is_administrator) {
            permission_level = "admin"
        }

        if (current_position) {
            let [current_formation] = await this.formation_store.read([
                ["id", "=", current_position.parent_formation],
            ])
            return new GoliathResponse(
                new User(
                    permission_level,
                    user,
                    current_rank,
                    accountability_status,
                    current_position,
                    current_formation
                )
            )
        } else {
            return new GoliathResponse(
                new User(
                    permission_level,
                    user,
                    current_rank,
                    accountability_status
                )
            )
        }
    }
}
