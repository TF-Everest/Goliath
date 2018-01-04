
exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('formations').insert([
            {
                id: 1,
                callsign: "Castle",
                name: "Alpha Company"
            },
            {
                id: 2,
                callsign: "Warrior",
                name: "1st Platoon",
                parent: 1
            },
            {
                id: 3,
                callsign: "Warrior 1",
                name: "Alpha Team",
                parent: 1
            },
            {
                id: 4,
                callsign: "Warrior 2",
                name: "Bravo Team",
                parent: 1
            },
            {
                id: 5,
                callsign: "Warrior 3",
                name: "Charlie Team",
                parent: 1
            },
            {
                id: 6,
                callsign: "Warrior 4",
                name: "Delta Team",
                parent: 1
            }
        ])
    .then(function () {
        return knex('positions').insert([
            {
                id: 1,
                callsign: "Warrior 6",
                is_platoon_leadership: true,
                is_team_leadership: false,
                name: "Platoon Leader",
                occupied_by: 1
            },
            {
                id: 2,
                callsign: "Warrior 7",
                is_platoon_leadership: true,
                is_team_leadership: false,
                name: "Platoon Sergeant",
                reports_to: 1
            },
            {
                id: 3,
                callsign: "Warrior 1-7",
                is_platoon_leadership: false,
                is_team_leadership: true,
                name: "Team Leader",
                reports_to: 2
            },
            {
                id: 4,
                callsign: "Warrior 1-1",
                is_platoon_leadership: false,
                is_team_leadership: false,
                name: "Combat Medic",
                reports_to: 3
            },
            {
                id: 5,
                callsign: "Warrior 1-2",
                is_platoon_leadership: false,
                is_team_leadership: true,
                name: "Weapons Specialist",
                reports_to: 3
            },
            {
                id: 6,
                callsign: "Warrior 1-3",
                is_platoon_leadership: false,
                is_team_leadership: true,
                name: "Communication Specialist",
                reports_to: 3
            },
            {
                id: 7,
                callsign: "Warrior 2-7",
                is_platoon_leadership: false,
                is_team_leadership: true,
                name: "Team Leader",
                reports_to: 2
            },
            {
                id: 8,
                callsign: "Warrior 2-1",
                is_platoon_leadership: false,
                is_team_leadership: false,
                name: "Combat Medic",
                reports_to: 7
            },
            {
                id: 9,
                callsign: "Warrior 2-2",
                is_platoon_leadership: false,
                is_team_leadership: true,
                name: "Weapons Specialist",
                reports_to: 7
            },
            {
                id: 10,
                callsign: "Warrior 2-3",
                is_platoon_leadership: false,
                is_team_leadership: true,
                name: "Communication Specialist",
                reports_to: 7
            },
            {
                id: 11,
                callsign: "Warrior 3-7",
                is_platoon_leadership: false,
                is_team_leadership: true,
                name: "Team Leader",
                reports_to: 2
            },
            {
                id: 12,
                callsign: "Warrior 3-1",
                is_platoon_leadership: false,
                is_team_leadership: false,
                name: "Combat Medic",
                reports_to: 9
            },
            {
                id: 13,
                callsign: "Warrior 3-2",
                is_platoon_leadership: false,
                is_team_leadership: true,
                name: "Weapons Specialist",
                reports_to: 9
            },
            {
                id: 14,
                callsign: "Warrior 3-3",
                is_platoon_leadership: false,
                is_team_leadership: true,
                name: "Communication Specialist",
                reports_to: 9
            },
            {
                id: 15,
                callsign: "Warrior 4-7",
                is_platoon_leadership: false,
                is_team_leadership: true,
                name: "Team Leader",
                reports_to: 2
            },
            {
                id: 16,
                callsign: "Warrior 4-1",
                is_platoon_leadership: false,
                is_team_leadership: false,
                name: "Combat Medic",
                reports_to: 13
            },
            {
                id: 17,
                callsign: "Warrior 4-2",
                is_platoon_leadership: false,
                is_team_leadership: true,
                name: "Weapons Specialist",
                reports_to: 13
            },
            {
                id: 18,
                callsign: "Warrior 4-3",
                is_platoon_leadership: false,
                is_team_leadership: true,
                name: "Communication Specialist",
                reports_to: 13
            },
            {
                id: 19,
                callsign: "Menace",
                is_platoon_leadership: false,
                is_team_leadership: false,
                name: "Judge Advocate General",
                occupied_by: 2
            }
        ])
        })
}
