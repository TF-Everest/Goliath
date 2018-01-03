import { GoliathRequest } from "./GoliathRequest"
import { unauthorized } from "boom"
import { Request, Response } from "express"
import { verify } from "jsonwebtoken"

export class JWTParser {
    constructor(private secret_key: string) {}

    middleware(): (req: Request, res: Response, next: () => void) => void {
        return (req: Request, res: Response, next: () => void) => {
            let cast_req = req as GoliathRequest

            if (cast_req.headers.authorization) {
                try {
                    let valid_token: any = verify(
                        cast_req.headers.authorization.split(" ")[1],
                        this.secret_key
                    )
                    ;(req as GoliathRequest).authenticated_token = {
                        user_id: valid_token.user_id,
                        steam_id: valid_token.steam_id,
                    }

                    next()
                } catch (e) {
                    res
                        .status(401)
                        .send(
                            unauthorized(
                                "The JWT token provided was not valid."
                            )
                        )
                }
            } else {
                next()
            }
        }
    }
}
