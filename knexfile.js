require("dotenv").config()

module.exports = {

  development: {
    client: 'mysql',
    connection: process.env.MYSQL_CONNECTION_STRING,
    migrations: {
      tableName: 'knex_migrations'
    }
  }

}
