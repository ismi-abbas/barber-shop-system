const { findBookingByShopId } = require("../models/booking.model");
const { login, create } = require("../models/manager.model");
const utils = require("../utils");

const managerLogin = async ({ email, password }) => {
	try {
		const response = await login(email);

		if (response) {
			if (utils.comparePasswords(password, response.password)) {
				const token = await utils.generateJWTToken(response);

				return utils.prepareResponse(
					{
						id: response.id,
						name: response.name,
						email: response.email,
						phone: response.phone,
						barbershop_id: response.barbershop_id,
						token: token
					},
					200,
					"success"
				);
			} else {
				return utils.handleError("Invalid password", 403, "Invalid password");
			}
		} else {
			return utils.handleError("Manager not found", 404, "User not found");
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

const managerRegister = async ({
	name,
	email,
	password,
	phone,
	barbershop_id
}) => {
	const hashedPassword = await utils.hashPasssword(password);

	try {
		const response = await create({
			name,
			email,
			password: hashedPassword,
			phone,
			barbershop_id
		});

		return utils.prepareResponse(response, 200, "success");
	} catch (error) {
		utils.handleError(error);
	}
};

module.exports = {
	managerLogin,
	getAllBookings,
	managerRegister
};
