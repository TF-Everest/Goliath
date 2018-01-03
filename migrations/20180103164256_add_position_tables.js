
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('formations', function(table) {
            table.increments()
            table.string("name")
            table.string("callsign")
            table.integer("parent").unsigned().references("id").inTable("formations")
        }),
        knex.schema.createTable('positions', function(table) {
            table.increments()
            table.string("name")
            table.string("callsign")
            table.integer("reports_to").unsigned().references("id").inTable("positions")
            table.integer("occupied_by").unsigned().references("id").inTable("users").nullable()
            table.boolean("is_open").default(true)
            table.boolean("is_platoon_leadership").default(true)
            table.boolean("is_team_leadership").default(true)
        })
    ])
}

exports.down = function(knex, Promise) {

}
