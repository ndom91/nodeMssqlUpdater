#!/usr/bin/env node

require("dotenv").config();
const sql = require("mssql");

const config = {
	server: process.env.MSSQL_HOST,
	database: process.env.MSSQL_DATABASE,
	port: parseInt(process.env.MSSQL_PORT, 10),
	user: process.env.MSSQL_USER,
	password: process.env.MSSQL_PASSWORD
};

const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

pool.on('error', err => {
	console.error('Err: ', err)
})

async function writeBestellung() {
	await poolConnect;
	try {
		const request = pool.request();
		const result = await request.query(`SELECT TOP (10) * FROM bestell_kopf`)
		// console.log(result)
		// console.log(typeof result)

		if (result.rowsAffected === 0) {
			console.error("No rows found")
			return 
		}

		result.recordset.forEach(record => {
			const bestHinweis = record.best_hinweis.substr(0,5)
			console.log(bestHinweis)
			console.log(typeof parseInt(bestHinweis))
			console.log(" ")
			if (typeof bestHinweis === 'number') {
				console.log("number!")
			}
		})

	} catch (err) {
		console.error('SQL error', err.originalError.info.message);
	}
	pool.close()
}

const main = async () => {
	await writeBestellung()
}

main()

