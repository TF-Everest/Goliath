export interface UserModel {
    id: number

    first_name: string
    last_name: string

    steam_id: string
    email_address: string

    locality: string
    nationality: string
    date_of_birth: Date

    timezone: number

    is_administrator: boolean
    is_drill_instructor: boolean
    is_jag: boolean
    is_recruiter: boolean
    is_suspended: boolean

    created_at: Date
    updated_at: Date
}
