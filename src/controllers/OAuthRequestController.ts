import { GoliathRequest } from "../middleware/GoliathRequest"
import { stringify } from "querystring"
import { ContentMoved, EndpointController } from "strontium/lib/src"

export class OAuthRequestController extends EndpointController<void> {
    async extract(request: GoliathRequest): Promise<void> {}

    async init(): Promise<void> {}

    async validate(): Promise<void> {
        return
    }

    async authorize(): Promise<boolean> {
        return true
    }

    async handle(): Promise<void> {
        // Configure a payload for the steam OpenID endpoint
        let steam_openid_configuration = {
            "openid.ns": "http://specs.openid.net/auth/2.0",
            "openid.claimed_id":
                "http://specs.openid.net/auth/2.0/identifier_select",
            "openid.identity":
                "http://specs.openid.net/auth/2.0/identifier_select",
            "openid.mode": "checkid_setup",
            "openid.return_to": `${process.env.API_URL}/openid/steam/response`,
            "openid.realm": process.env.API_URL,
        }

        // Use the configuration as querystrings in the redirect url
        let steam_parameters = stringify(steam_openid_configuration)

        let steam_url = `https://steamcommunity.com/openid/login?${steam_parameters}`

        throw new ContentMoved(steam_url)
    }
}
