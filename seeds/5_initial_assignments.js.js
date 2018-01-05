
exports.seed = function(knex, Promise) {
  return knex('assignments').insert([
    {
        id: 1,
        position_id: 1,
        user_id: 1,
        assigned_at: new Date(),
        commendation_message: "Initial Assignment",
        assigned_by: 1
    }
  ])
}
