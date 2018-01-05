export interface PositionModel {
    id: number

    name: string

    callsign: string

    reports_to: number

    is_open: boolean

    is_platoon_leadership: boolean

    is_team_leadership: boolean

    parent_formation: number
}
