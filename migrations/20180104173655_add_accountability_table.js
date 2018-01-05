
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('accountability', function(table) {
            table.increments()
            table.integer("user_id").unsigned().references("id").inTable("users")
            table.timestamp("reported_at")
            table.integer("reported_by").unsigned().references("id").inTable("users")
        })
    ])
}

exports.down = function(knex, Promise) {

}
