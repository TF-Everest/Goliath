export interface PromotionModel {
    commendation_message: string
    completed_at: Date | null
    created_at: Date
    from_rank: number | null
    id: number
    is_command_promotion: boolean
    promotion_board_chairman: number | null
    promotion_board_chairman_title: string
    promotion_board_status: string
    status: string
    to_rank: number
    user_id: number
}
