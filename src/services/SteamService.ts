import Axios from "axios"

export class SteamService {
    constructor() {}

    async getSteamProfile(
        steam_id: string
    ): Promise<{
        full_name: string
        current_game_id: number
    }> {
        let resp = await Axios.get(
            `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${
                process.env.STEAM_API_KEY
            }&steamids=${steam_id}`
        )

        return {
            full_name: resp.data.realname,
            current_game_id: resp.data.gameid,
        }
    }
}
