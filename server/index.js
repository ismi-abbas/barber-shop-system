const express = require("express");
const config = require("config");
const barberRouter = require("./routes/barber.route");
const barberShopRouter = require("./routes/barbershop.route");
const customerRouter = require("./routes/customer.route");
const bookingRouter = require("./routes/booking.route.js");
const logger = require("./utils/logger");

const app = express();
const PORT = config.PORT;

app.use(express.json({ limit: "1mb" }));

app.use("/api/barber", barberRouter);
app.use("/api/shop", barberShopRouter);
app.use("/api/customer", customerRouter);
app.use("/api/booking", bookingRouter);

app.use("/", (req, res) => {
	res.send("Server is working");
});

app.listen(PORT, () => {
	logger.info(`Server listening on ${PORT}`);
});
