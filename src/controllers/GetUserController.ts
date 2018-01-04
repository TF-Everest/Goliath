import { GoliathRequest } from "../middleware/GoliathRequest"
import { GoliathResponse } from "../responses/GoliathResponse"
import { User } from "../responses/User"
import { UserRepository } from "../repositories/UserRepository"
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
        a
            .number()
            .positive()
            .integer()
    )
    private authenticated_user: number

    @mustBe(a.any())
    private store: MySQLDatastore

    @mustBe(a.any())
    private user_store: UserRepository

    async extract(req: GoliathRequest): Promise<void> {
        this.requested_user_id = req.params.user_id

        this.authenticated_user = req.authenticated_token.user_id

        this.store = req.mysql
    }

    async init(): Promise<void> {
        this.user_store = new UserRepository(this.store)
    }

    async authorize(): Promise<boolean> {
        return true
    }

    async handle(): Promise<GoliathResponse<User>> {
        let [user] = await this.user_store.read([
            ["id", "=", this.requested_user_id],
        ])

        let [authenticated_user] = await this.user_store.read([
            ["id", "=", this.authenticated_user],
        ])

        let permission_level = "public"

        if (user.id === this.requested_user_id) {
            permission_level = "owner"
        }

        if (authenticated_user.is_administrator) {
            permission_level = "admin"
        }

        return new GoliathResponse(new User(permission_level, user))
    }
}
