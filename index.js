require('dotenv').config()
const sql = require('mssql')
const countries = require('./countries.json')

const config = {
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD
}

const queryLoop = async () => {
  await countries.forEach(country => {
    new sql.ConnectionPool(`mssql://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`).connect().then(connection => {
      return connection.query`update allg_laender set land_lang = ${country.name.toUpperCase()} where land_kurz = ${country.alpha2.toUpperCase()}`
    }).then(result => {
      if (result.rowsAffected > 0) {
        console.log(`Successfully updated - ${country.name}`)
      } else {
        console.error('No rows affected!')
      }
    }).catch(err => {
      console.error(err)
    })
  })
}

queryLoop()
