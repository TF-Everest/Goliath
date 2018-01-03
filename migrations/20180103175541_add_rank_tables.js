
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('ranks', function(table) {
            table.increments()
            table.string("name")
            table.string("abbreviation")
            table.string("paygrade")
            table.integer("priority")
            table.integer("days_in_grade")
            table.integer("days_in_service")
            table.boolean("promotion_board_required")
        }),
        knex.schema.createTable('promotions', function(table) {
            table.increments()
            table.integer("user_id").unsigned().references("id").inTable("users")
            table.integer("to_rank").unsigned().references("id").inTable("ranks")
            table.integer("from_rank").unsigned().references("id").inTable("ranks")
            table.string("status")
            table.timestamp("created_at").defaultTo(knex.fn.now())
            table.timestamp("completed_at").nullable()
            table.boolean("is_command_promotion")
            table.integer("promotion_board_chairman").unsigned().references("id").inTable("users")
            table.string("promotion_board_chairman_title")
            table.string("promotion_board_status")
            table.text("commendation_message")
        })
    ])
}

exports.down = function(knex, Promise) {

}
