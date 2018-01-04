
exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('ranks').insert([
            {
                id: 1,
                abbreviation: "PVT",
                days_in_grade: 0,
                days_in_service: 0,
                name: "Private",
                paygrade: "E1",
                priority: 1,
                promotion_board_required: false
            },
            {
                id: 2,
                abbreviation: "CPT",
                days_in_grade: 45,
                days_in_service: 180,
                name: "Captain",
                paygrade: "O3",
                priority: 2,
                promotion_board_required: true
            },
            {
                id: 3,
                abbreviation: "MAJ",
                days_in_grade: 45,
                days_in_service: 270,
                name: "Major",
                paygrade: "O4",
                priority: 3,
                promotion_board_required: true
            }
        ])
    .then(function () {
        return knex('promotions').insert([
            {
                id: 1,
                commendation_message: "Initial Promotion",
                is_command_promotion: true,
                completed_at: new Date(),
                created_at: new Date(),
                to_rank: 2,
                status: "complete",
                user_id: 1
            },
            {
                id: 2,
                commendation_message: "Initial Promotion",
                is_command_promotion: true,
                completed_at: new Date(),
                created_at: new Date(),
                to_rank: 3,
                status: "complete",
                user_id: 2
            }
        ])
    })
}
