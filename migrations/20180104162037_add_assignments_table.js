
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('positions', function(table) {
            table.dropForeign("occupied_by", "positions_occupied_by_foreign")
            table.dropColumn("occupied_by")
            table.integer("parent_formation").unsigned().references("id").inTable("formations")
        }),
        knex.schema.createTable("assignments", function(table) {
            table.increments()
            table.integer("position_id").unsigned().references("id").inTable("positions")
            table.integer("user_id").unsigned().references("id").inTable("users")
            table.timestamp("assigned_at").nullable()
            table.timestamp("relinquished_at").nullable()
            table.string("commendation_message")
            table.integer("assigned_by").unsigned().references("id").inTable("users")
        })
    ])
}

exports.down = function(knex, Promise) {

}
