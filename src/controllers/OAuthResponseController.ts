import { GoliathRequest } from "../middleware/GoliathRequest"
import { UserService } from "../services/UserService"
import Axios from "axios"
import { sign } from "jsonwebtoken"
import { stringify } from "qs"
import {
    ContentMoved,
    EndpointController,
    MySQLDatastore,
} from "strontium/lib/src"
import { a, mustBe } from "zafiro-validators"

export class OAuthResponseController extends EndpointController<void> {
    @mustBe(a.string().required())
    private signed_content: string

    @mustBe(a.string().required())
    private signature: string

    @mustBe(a.string().uri())
    private op_endpoint: string

    @mustBe(a.string())
    private claimed_id: string

    @mustBe(a.string())
    private identity: string

    @mustBe(a.string())
    private return_to: string

    @mustBe(a.string())
    private response_nonce: string

    @mustBe(a.string())
    private assoc_handle: string

    @mustBe(a.any())
    private store: MySQLDatastore

    @mustBe(a.any())
    private user_service: UserService

    async extract(request: GoliathRequest): Promise<void> {
        this.store = request.mysql

        this.signed_content = request.query["openid.signed"]
        this.signature = request.query["openid.sig"]
        this.op_endpoint = request.query["openid.op_endpoint"]
        this.claimed_id = request.query["openid.claimed_id"]
        this.identity = request.query["openid.identity"]
        this.return_to = request.query["openid.return_to"]
        this.response_nonce = request.query["openid.response_nonce"]
        this.assoc_handle = request.query["openid.assoc_handle"]
    }

    async init(): Promise<void> {
        this.user_service = new UserService(this.store)
    }

    async validate(): Promise<void> {
        return
    }

    async authorize(): Promise<boolean> {
        return true
    }

    async handle(): Promise<void> {
        let steam_payload = stringify({
            "openid.ns": "http://specs.openid.net/auth/2.0",
            "openid.mode": "check_authentication",
            "openid.op_endpoint": this.op_endpoint,
            "openid.claimed_id": this.claimed_id,
            "openid.identity": this.identity,
            "openid.return_to": this.return_to,
            "openid.response_nonce": this.response_nonce,
            "openid.assoc_handle": this.assoc_handle,
            "openid.signed": this.signed_content,
            "openid.sig": this.signature,
        })

        let response = await Axios.post(
            "https://steamcommunity.com/openid/login",
            steam_payload
        )

        // Verify that the response was valid
        if (response.data.includes("is_valid:true")) {
            // Extract the steamid from the claimed_id
            let id_parser = /http:\/\/steamcommunity\.com\/openid\/id\/(.*)/g.exec(
                this.claimed_id
            ) as Array<string>

            let claimed_id = id_parser[1]

            // Lookup the steam profile of the user
            let user = await this.user_service.createOrRetrieveUserBySteamID(
                claimed_id
            )

            // The authentication was valid - issue a JWT token confirming this information
            let access_token = await sign(
                {
                    steam_id: user.steam_id,
                    user_id: user.id,
                },
                process.env.AUTHENTICATION_TOKEN_SECRET as string
            )

            // The login was valid - redirect to the success page for the client app to handle
            throw new ContentMoved(
                `${
                    process.env.FRONTEND_URL
                }/app/auth/success?token=${access_token}`
            )
        } else {
            // The login was not valid - redirect to the failed page
            throw new ContentMoved(
                `${process.env.FRONTEND_URL}/app/auth/failure`
            )
        }
    }
}
