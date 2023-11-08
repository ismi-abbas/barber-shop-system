const utils = require("../utils");
const {
	findAll,
	findById,
	create,
	update,
	remove,
	login,
} = require("../models/customer.model");

const getAllCustomers = async () => {
	try {
		const response = await findAll();

		if (response) {
			return utils.prepareResponse(response, 200, "success");
		}
	} catch (error) {
		return utils.handleError(error);
	}
};

const getCustomerById = async (barberId) => {
	try {
		const response = await findById(barberId);

		if (response) {
			return utils.prepareResponse(response, 200, "success");
		}
	} catch (error) {
		utils.handleError(error);
	}
};

const createCustomer = async (data) => {
	const { password } = data;
	const hashedPassword = await utils.hashPasssword(password);
	data.password = hashedPassword;
	try {
		const response = await create(data);

		if (response) {
			return utils.prepareResponse(response, 200, "success");
		}
	} catch (error) {
		return utils.handleError(error);
	}
};

const updateCustomer = async (data) => {
	try {
		const response = await update(data);

		if (response) {
			return utils.prepareResponse(response, 200, "success");
		}
	} catch (error) {
		return utils.handleError(error);
	}
};

const deleteCustomer = async (barberId) => {
	try {
		const response = await remove(barberId);

		if (response) {
			return utils.prepareResponse(response, 200, "success");
		}
	} catch (error) {
		return utils.handleError(error);
	}
};

const customerLogin = async ({ email, password }) => {
	try {
		const response = await login(email);

		if (response.length > 0) {
			const data = response[0];
			console.log(data);

			if (utils.comparePasswords(password, data.password)) {
				return utils.prepareResponse(
					{
						id: data.id,
						name: data.name,
						email: data.email,
						phone: data.phone,
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
			return utils.handleError("User not found", 404, "User not found");
		}
	} catch (error) {
		return utils.handleError(error, 500);
	}
};

module.exports = {
	getAllCustomers,
	getCustomerById,
	createCustomer,
	updateCustomer,
	deleteCustomer,
	customerLogin,
};
