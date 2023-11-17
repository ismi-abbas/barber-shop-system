const express = require("express");
const config = require("config");
const barberRouter = require("./routes/barber.route");
const barberShopRouter = require("./routes/barbershop.route");
const customerRouter = require("./routes/customer.route");
const bookingRouter = require("./routes/booking.route");
const managerRouter = require("./routes/manager.route");
const serviceRouter = require("./routes/service.route");
const { logger, morganMiddleware } = require("./utils/logger");

const PORT = config.PORT;
const app = express();
app.use(morganMiddleware);

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	if (req.method === "OPTIONS") {
		res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
		return res.status(200).json({});
	}
	next();
});

app.use(express.json({ limit: "1mb" }));

app.use("/barber", barberRouter);
app.use("/booking", bookingRouter);
app.use("/customer", customerRouter);
app.use("/shop", barberShopRouter);
app.use("/manager", managerRouter);
app.use("/service", serviceRouter);

app.use("/", (_req, res) => {
	res.send("Server is working");
});

app.listen(PORT, () => {
	logger.info(`Server listening on ${PORT}`);
});
