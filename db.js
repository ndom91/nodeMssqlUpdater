const sql = require('mssql')
require('dotenv').config()
const countriesList = require('./countries.json')

const config = {
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD
}

const loopCountries = async () => {
  await countriesList.forEach(country => {
    new sql.ConnectionPool(`mssql://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`).connect().then(pool => {
      return pool.query`update allg_laender set land_lang = ${country.name.toUpperCase()} where land_kurz = ${country.alpha2.toUpperCase()}`
    }).then(result => {
      console.dir(result)
    }).catch(err => {
      console.error(err)
    })
  })
}

loopCountries()
