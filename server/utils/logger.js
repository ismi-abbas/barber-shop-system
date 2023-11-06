const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf } = format;

const sampleFormat = printf(({ level, message, timestamp }) => {
	return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
	format: combine(timestamp(), sampleFormat),
	transports: [
		new transports.Console(),

		new transports.File({ filename: "combined.log" }), // Change the file name and path as needed
	],
	exceptionHandlers: [
		new transports.Console(),

		new transports.File({ filename: "exception.log" }), // Change the file name and path as needed
	],
});

module.exports = logger;
