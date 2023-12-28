const { getAll, add } = require("../models/store.model");
const utils = require("../utils");

const getStoreSales = async () => {
	try {
		const response = await getAll();

		if (response) {
			return utils.prepareResponse(response, 200, "success");
		}
	} catch (error) {
		utils.handleError(error);
	}
};

const addStoreSales = async ({
	customerId,
	itemId,
	quantity,
	total,
	barbershopId
}) => {
	try {
		const response = await add({
			customerId,
			itemId,
			quantity,
			total,
			barbershopId
		});

		if (response) {
			return utils.prepareResponse(response, 201, "success");
		}
	} catch (error) {
		utils.handleError(error);
	}
};

module.exports = {
	getStoreSales,
	addStoreSales
};
