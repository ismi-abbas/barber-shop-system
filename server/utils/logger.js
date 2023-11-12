const morgan = require("morgan");
const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, colorize } = format;

const timestampFormat = format.timestamp({
	format: "DD-MMM-YYYY HH:mm:ss.SSS",
});

const customFormat = printf(({ level, message, timestamp }) => {
	return `${timestamp} ${level}: ${message}`;
});

const debugFormat = printf(({ level, message, timestamp }) => {
	return `${timestamp} ${level}: ${JSON.stringify(message)}`;
});

const printFormat = combine(timestampFormat, customFormat);

const morganMiddleware = morgan(
	`:method :url :status :res[content-length] - :response-time ms`,
	{
		stream: {
			write: (message) => logger.http(message.trim()),
		},
	}
);

const logger = createLogger({
	format: printFormat,
	transports: [
		new transports.Console({
			level: "debug",
			colorize: true,
			format: debugFormat,
		}),
		new transports.Console({ level: "http" }),
		new transports.File({ filename: "combined.log" }),
	],
	exceptionHandlers: [
		new transports.Console({
			level: "error",
			format: printFormat,
		}),
		new transports.File({ filename: "exception.log" }), // Change the file name and path as needed
	],
});

module.exports = {
	logger,
	morganMiddleware,
};
