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
		// const result = await request.query(`update allg_laender set land_lang = '${country.name.toUpperCase()}' where land_kurz like '${country.alpha2.toUpperCase()}'`)
		const result = await request.query(`SELECT TOP (10) * FROM bestell_kopf`)
		console.log(result)
		if (result.rowsAffected > 0) {
			console.log(`Successfully updated - ${country.name}`);
		} else {
			console.error("No rows affected!");
		}
	} catch (err) {
		console.error('SQL error', err.originalError.info.message);
	}
}

const main = async () => {
	await writeBestellung()
    // try {
    //     // make sure that any items are correctly URL encoded in the connection string
    //     await sql.connect('mssql://sa:$gonnewtelcotest2$@GOLIATHSQL/GONNEWTELCOTEST2')
    //     const result = await sql.query`select top 10 * from bestell_kopf`
    //     console.dir(result)
    // } catch (err) {
    //     // ... error checks
    // }
}

// Workaround for missing top-level await
main()

