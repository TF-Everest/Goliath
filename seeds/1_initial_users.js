
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del().then(function() {
      return knex('users').insert([
        {
            email_address: "striker.a@tf-everest.com",
            date_of_birth: "1996-08-13",
            first_name: "Alexander",
            last_name: "Christie",
            nationality: "British",
            locality: "Great Britain",
            steam_id: "76561198021531457",
            is_administrator: true,
            is_drill_instructor: true,
            is_recruiter: true,
            is_jag: true
        },
        {
            email_address: "rodriguez.g@tf-everest.com",
            date_of_birth: "1995-04-29",
            first_name: "Guillermo",
            last_name: "Rodriguez",
            nationality: "American",
            locality: "United States of America",
            steam_id: "76561198011615406",
            is_administrator: true,
            is_drill_instructor: false,
            is_recruiter: false,
            is_jag: true
        }
      ])
  })
}
