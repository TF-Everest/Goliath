import { UserRepository } from "../repositories/UserRepository"
import { Queryable } from "strontium/lib/src"

export class PermissionService {
    private user_store: UserRepository

    constructor(private store: Queryable) {
        this.user_store = new UserRepository(this.store)
    }

    async verifyPermission(user_id: number, permission: string) {
        let [user] = await this.user_store.read([["id", "=", user_id]])

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
}
