const express = require("express");
const {
	getAllBarbershop,
	getBarberShopById,
	createBarbershop,
	updateBarbershop,
	deleteBarbershop,
	getBarberList,
	uploadImage,
	getImage,
} = require("../controllers/barbershop.controller");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const barbershop = express.Router();

barbershop.get("/", async (_req, res) => {
	const response = await getAllBarbershop();
	res.status(response.statusCode).send(response);
});

barbershop.get("/:id", async (req, res) => {
	const { id } = req.params;
	const data = await getBarberShopById(id);
	res.status(data.statusCode).send(data);
});

barbershop.get("/barber/:id", async (req, res) => {
	const { id } = req.params;
	const response = await getBarberList(id);
	res.status(response.statusCode).send(response);
});

barbershop.post("/create", async (req, res) => {
	const { body } = req;
	const data = await createBarbershop(body);
	res.status(data.statusCode).send(data);
});

barbershop.put("/update", async (req, res) => {
	const { body } = req;
	const response = await updateBarbershop(body);
	res.send(response);
});

barbershop.delete("/:id", async (req, res) => {
	const { id } = req.params;
	const response = await deleteBarbershop(id);
	res.send(response);
});

barbershop.post(
	"/upload/:barbershopId",
	upload.single("image"),
	async (req, res) => {
		const { buffer, originalname } = req.file;

		const response = await uploadImage(originalname, buffer);

		res.send(response);
	}
);

barbershop.get("/image/:imageId", async (req, res) => {
	const { imageId } = req.params;
	const response = await getImage(imageId);

	const imageData = response.data[0].data;

	res.writeHead(response.statusCode, {
		"Content-Type": "image/jpeg", // Change this based on your image type
		"Content-Length": imageData.length,
	}).end(imageData);
});

module.exports = barbershop;
