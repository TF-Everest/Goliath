
exports.up = function(knex) {
    return knex.schema.createTable('users', function (table) {
        table.increments()
        table.string("first_name").notNullable()
        table.string("last_name").notNullable()
        table.string("steam_id", 17).notNullable().index().unique()
        table.integer("timezone").unsigned().references("id").inTable("timezone")
        table.string("email_address").index()
        table.date("date_of_birth")
        table.string("nationality")
        table.string("locality")
        table.timestamps()

        table.boolean("is_recruiter").default(false)
        table.boolean("is_drill_instructor").default(false)
        table.boolean("is_jag").default(false)
        table.boolean("is_administrator").default(false)
        table.boolean("is_suspended").default(false)
    })
}

exports.down = function(knex) {

}
