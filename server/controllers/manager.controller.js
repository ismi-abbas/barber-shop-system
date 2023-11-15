const { findBookingByShopId } = require("../models/booking.model");
const { login } = require("../models/manager.model");
const utils = require("../utils");

const managerLogin = async ({ email, password }) => {
	try {
		const response = await login(email);

		if (response.length > 0) {
			const data = response[0];

			console.log({ data });

			if (utils.comparePasswords(password, data.password)) {
				const token = await utils.generateJWTToken(data);

				return utils.prepareResponse(
					{
						id: data.id,
						name: data.name,
						email: data.email,
						phone: data.phone,
						barbershop_id: data.barbershop_id,
						token: token,
					},
					200,
					"success"
				);
			} else {
				return utils.handleError(
					"Invalid password",
					403,
					"Invalid password"
				);
			}
		} else {
			return utils.handleError(
				"Manager not found",
				404,
				"User not found"
			);
		}
	} catch (error) {
		return utils.handleError(error, 500);
	}
};

const getAllBookings = async (shopId) => {
	try {
		const response = await findBookingByShopId(shopId);
		if (response) {
			return utils.prepareResponse(response, 200, "success");
		}
	} catch (error) {
		utils.handleError(error);
	}
};

module.exports = {
	managerLogin,
	getAllBookings,
};
