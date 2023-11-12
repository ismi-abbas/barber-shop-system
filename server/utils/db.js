const mysql = require("mysql");
const _ = require("lodash");
const { logger } = require("./logger");

const dbConfig = { ...require("config").get("db") };
let pool;

const dbErrorHandler = () => {
	logger.error("DB Error Handler");
	try {
		pool.end((err) => {
			if (err) {
				logger.error("DB Error Closing Connection" + err);
			}
			connect();
		});
	} catch (err) {
		logger.error("DB Error Closing Connection" + _err.message);
		connect();
	}
};

const connect = () => {
	pool = mysql.createPool(dbConfig);

	pool.on("error", (err) => {
		logger.error("DB Pool Error", err);
		dbErrorHandler(err);
	});
};

const executeQuery = (query, data) => {
	logger.debug(query);
	return new Promise((resolve, reject) => {
		if (!pool) {
			connect();
		}

		pool.getConnection((err, connection) => {
			if (err) {
				logger.error("Error getting connection from pool", err);
				dbErrorHandler(err);
				reject(err);
				return;
			}

			if (data) {
				_.each(data, (value, key) => {
					connection.query("SET " + key + " = ?", value);
				});
			}

			connection.query(query, data, (err, results) => {
				connection.release();

				if (err) {
					logger.error("Error executing query", err);
					dbErrorHandler(err);
					reject(err);
				}

				logger.debug(results);

				resolve(results);
			});
		});
	});
};

module.exports.executeQuery = executeQuery;
