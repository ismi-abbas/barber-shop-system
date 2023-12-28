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
	getShopItems,
	addShopItem,
	addInventoryItem,
	deleteInventoryItem,
	getInventoryItems,
	updateInventoryItem,
	updateShopItem,
	removeShopItem,
	getAllShopItems
} = require("../controllers/barbershop.controller");
const multer = require("multer");
const { deleteShopItem } = require("../models/barbershop.model");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const barbershop = express.Router();

barbershop.get("/", async (_req, res) => {
	const response = await getAllBarbershop();
	res.status(response.statusCode).send(response);
});

barbershop.get("/items/getAll", async (_, res) => {
	const response = await getAllShopItems();
	res.status(response.statusCode).send(response);
});

barbershop.get("/:id", async (req, res) => {
	const { id } = req.params;
	const data = await getBarberShopById(id);
	res.status(data.statusCode).send(data);
});

barbershop.get("/items/:shopId", async (req, res) => {
	const { shopId } = req.params;
	const response = await getShopItems(shopId);
	res.status(response.statusCode).send(response);
});

barbershop.get("/barber/:id", async (req, res) => {
	const { id } = req.params;
	const response = await getBarberList(id);
	res.status(response.statusCode).send(response);
});

barbershop.post("/items/add", async (req, res) => {
	const response = await addShopItem(req.body);
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

	res
		.writeHead(response.statusCode, {
			"Content-Type": "image/jpeg",
			"Content-Length": imageData.length
		})
		.end(imageData);
});

barbershop.get("/inventory/:shopId", async (req, res) => {
	const { shopId } = req.params;

	const response = await getInventoryItems(shopId);

	res.status(response.statusCode).send(response);
});

barbershop.post("/inventory/add", async (req, res) => {
	const response = await addInventoryItem(req.body);
	res.status(response.statusCode).send(response);
});

barbershop.delete("/inventory/delete/:shopId/:itemId", async (req, res) => {
	const { shopId, itemId } = req.params;
	const response = await deleteInventoryItem(shopId, itemId);
	res.status(response.statusCode).send(response);
});

barbershop.put("/inventory/update/:shopId/:itemId", async (req, res) => {
	const { itemId } = req.params;
	const response = await updateInventoryItem({ ...req.body, itemId: itemId });
	res.status(response.statusCode).send(response);
});

barbershop.put("/items/update/:itemId", async (req, res) => {
	const { itemId } = req.params;
	const { item_name, quantity, price } = req.body;
	const response = await updateShopItem({ itemId, item_name, quantity, price });
	res.status(response.statusCode).send(response);
});

barbershop.delete("/items/delete/:shopId/:itemId", async (req, res) => {
	const { shopId, itemId } = req.params;
	const response = await removeShopItem(shopId, itemId);
	res.status(response.statusCode).send(response);
});

module.exports = barbershop;
