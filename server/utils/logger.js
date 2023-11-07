const morgan = require("morgan");
const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, colorize } = format;

const sampleFormat = printf(({ level, message, timestamp }) => {
	return `${timestamp} ${level}: ${message}`;
});

const morganMiddleware = morgan(
	":method :url :status :res[content-length] - :response-time ms",
	{
		stream: {
			write: (message) => logger.http(message.trim()),
		},
	}
);

const logger = createLogger({
	format: combine(timestamp(), sampleFormat),
	transports: [
		new transports.Console(),
		new transports.Console({ level: "http" }),
		new transports.File({ filename: "combined.log" }), // Change the file name and path as needed
	],
	exceptionHandlers: [
		new transports.Console(),

		new transports.File({ filename: "exception.log" }), // Change the file name and path as needed
	],
});

module.exports = {
	logger,
	morganMiddleware,
};
