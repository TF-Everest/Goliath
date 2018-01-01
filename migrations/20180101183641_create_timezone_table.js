
exports.up = function(knex) {
    return knex.schema.createTable('timezone', function (table) {
        table.increments()
        table.string("timezone_name").notNullable()
        table.string("letter", 1).notNullable()
        table.integer("utc_offset").unsigned().notNullable()
        table.timestamps()
    }).then(function () {
        knex("timezone")
            .insert([
                {
                    timezone_name: "Zulu",
                    letter: "Z",
                    utc_offset: 0
                }
            ])
    })
}

exports.down = function(knex) {

}
