require("dotenv").config();
const sql = require("mssql");
const countries = require("./countries.json");

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

async function writeCountry() {
	await poolConnect;
	try {
		const request = pool.request();
		const result = await request.query(`update allg_laender set land_lang = '${country.name.toUpperCase()}' where land_kurz like '${country.alpha2.toUpperCase()}'`)
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
	for await (country of countries) {
		await writeCountry(country)
	}
}

// Workaround for missing top-level await
main()

