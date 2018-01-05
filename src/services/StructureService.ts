import { AssignmentRepository } from "../repositories/AssignmentRepository"
import { PositionModel } from "../models/PositionModel"
import { PositionRepository } from "../repositories/PositionRepository"
import { UserService } from "./UserService"
import { Queryable } from "strontium/lib/src"

export class StructureService {
    private position_repository: PositionRepository
    private user_service: UserService
    private assignment_repository: AssignmentRepository

    constructor(private store: Queryable) {
        this.position_repository = new PositionRepository(this.store)
        this.assignment_repository = new AssignmentRepository(this.store)
        this.user_service = new UserService(this.store)
    }

    async assertChainOfCommand(
        subordinate_user: number,
        ranking_user: number
    ): Promise<boolean> {
        let root_reached = false
        let current_position = (await this.user_service.getCurrentPosition(
            subordinate_user
        )) as PositionModel
        let superiors = []

        while (!root_reached) {
            if (!current_position || current_position.reports_to === null) {
                root_reached = true
                break
            }

            let [next_position] = await this.position_repository.read([
                ["id", "=", current_position.reports_to],
            ])

            let occupant = await this.getCurrentPositionHolder(next_position.id)

            if (occupant) {
                superiors.push(occupant)
            }

            current_position = next_position
        }

        return superiors.indexOf(ranking_user) !== -1
    }

    async getCurrentPositionHolder(position_id: number): Promise<number> {
        let [assignment] = await this.assignment_repository.read([
            ["position_id", "=", position_id],
            ["assigned_at", "<", new Date()],
            ["relinquished_at", ">", new Date()],
            "OR",
            ["relinquished_at", "=", null],
        ])

        return assignment.user_id
    }
}
