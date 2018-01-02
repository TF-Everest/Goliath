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

    created_at: Date
    updated_at: Date
}
