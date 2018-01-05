import { AccountabilityRepository } from "../repositories/AccountabilityRepository"
import { GoliathRequest } from "../middleware/GoliathRequest"
import { GoliathResponse } from "../responses/GoliathResponse"
import { StructureService } from "../services/StructureService"
import { UserRepository } from "../repositories/UserRepository"
import {
    EndpointController,
    MySQLDatastore,
} from "strontium/lib/src"
import { a, mustBe } from "zafiro-validators"

export class ReportInController extends EndpointController<
    GoliathResponse<{
        accepted: boolean
    }>
> {
    @mustBe(
        a
            .number()
            .positive()
            .integer()
    )
    private target_user: number

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
    private structure_store: StructureService

    @mustBe(a.any())
    private user_store: UserRepository

    @mustBe(a.any())
    private accountability_store: AccountabilityRepository

    async extract(req: GoliathRequest): Promise<void> {
        this.target_user = req.params.user_id

        this.authenticated_user = req.authenticated_token

        this.store = req.mysql
    }

    async init(): Promise<void> {
        this.structure_store = new StructureService(this.store)
        this.user_store = new UserRepository(this.store)
        this.accountability_store = new AccountabilityRepository(this.store)
    }

    async authorize(): Promise<boolean> {
        // If the user requesting is the user acting then proceed
        if (this.target_user === this.authenticated_user.user_id) {
            return true
        }

        // If the user is in the chain of command of the target then proceed
        if (
            await this.structure_store.assertChainOfCommand(
                this.target_user,
                this.authenticated_user.user_id
            )
        ) {
            return true
        }

        // If the user is an admin proceed
        let [user] = await this.user_store.read([
            ["id", "=", this.authenticated_user.user_id],
        ])

        if (user.is_administrator) {
            return true
        }

        return false
    }

    async handle(): Promise<GoliathResponse<{ accepted: boolean }>> {
        // Insert an accountability record for the user
        await this.accountability_store.create({
            reported_by: this.authenticated_user.user_id,
            reported_at: new Date(),
            user_id: this.target_user,
        })

        return new GoliathResponse({
            accepted: true,
        })
    }
}
