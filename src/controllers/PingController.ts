import { GoliathRequest } from "../middleware/GoliathRequest"
import { GoliathResponse } from "../responses/GoliathResponse"
import { EndpointController } from "strontium/lib/src"

export class PingController extends EndpointController<
    GoliathResponse<{
        message: string
    }>
> {
    async extract(request: GoliathRequest): Promise<void> {}

    async authorize(): Promise<boolean> {
        return true
    }

    // Skip validation because we have nothing to validate
    async validate(): Promise<void> {}

    async handle(): Promise<GoliathResponse<{ message: string }>> {
        return new GoliathResponse<{ message: string }>({
            message: "Pong!",
        })
    }
}
