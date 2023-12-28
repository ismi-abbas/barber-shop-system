const { executeQuery } = require("../utils/db");
const { logger } = require("../utils/logger");

const findAll = async () => {
	try {
		const query = `SELECT * FROM barber_shop.Bookings;`;
		const response = await executeQuery(query, null);
		return response;
	} catch (error) {
		logger.error(`Error fetching bookings: ${error.message}`);
	}
};

const findById = async (id) => {
	try {
		const query = `SELECT * FROM barber_shop.Bookings WHERE id = ?`;
		const data = [id];
		const response = await executeQuery(query, data);
		return response;
	} catch (error) {
		logger.error(`Error fetching bookings: ${error.message}`);
	}
};

const create = async ({
	barberId,
	barbershopId,
	customerId,
	serviceId,
	servicePrice,
	date,
	status
}) => {
	try {
		const bookingQuery =
			"INSERT INTO Bookings (barber_id, customer_id, date_time, status, barbershop_id, service_id) VALUES (?, ?, ?, ?, ?, ?)";
		const bookingData = [
			barberId,
			customerId,
			new Date(date),
			status,
			barbershopId,
			serviceId
		];

		const bookingResponse = await executeQuery(bookingQuery, bookingData);

		if (bookingResponse.affectedRows > 0) {
			const lastBookingId = bookingResponse.insertId;

			const salesQuery =
				"INSERT INTO Sales (barbershop_id, date, amount, service_id, barber_id, payment_status, booking_id, is_cancelled) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
			const salesData = [
				barbershopId,
				new Date(),
				servicePrice,
				serviceId,
				barberId,
				"unpaid",
				lastBookingId,
				0
			];

			const salesResponse = await executeQuery(salesQuery, salesData);

			if (salesResponse.affectedRows > 0) {
				return "Booking and sales created successfully";
			} else {
				return "Error creating sales";
			}
		} else {
			return "Error creating booking";
		}
	} catch (error) {
		return error;
	}
};

const update = async ({
	bookingId,
	barberId,
	customerId,
	date_time,
	status
}) => {
	try {
		let query = "UPDATE Bookings SET ";
		const data = [];

		if (barberId) {
			query += "barber_id = ?, ";
			data.push(barberId);
		}
		if (customerId) {
			query += "customer_id = ?, ";
			data.push(customerId);
		}
		if (date_time) {
			query += "date_time = ?, ";
			data.push(date_time);
		}

		if (status) {
			query += "status = ?, ";
			data.push(status);
		}

		query = query.slice(0, -2) + " WHERE id = ?";
		data.push(bookingId);

		const response = await executeQuery(query, data);

		if (response) {
			return response;
		} else {
			return "Error updating booking";
		}
	} catch (error) {
		return error;
	}
};

const remove = async (bookingId) => {
	try {
		const query = "DELETE FROM barber_shop.Bookings WHERE id = ?";
		const data = [bookingId];

		const response = await executeQuery(query, data);

		if (response) {
			return response;
		} else {
			return "Error deleting booking";
		}
	} catch (error) {
		return error;
	}
};

const findByCustomerId = async (customerId) => {
	try {
		const query = `SELECT B.id as booking_id,
			customer_id,
			B.barbershop_id,
			B.barber_id,
			C.name as customer_name,
			BB.name as barber_name,
			BS.name as shop_name,
			BS.location,
			B.date_time as booking_date,
			B.status,
			S.price,
			S.service_name,
			SS.payment_status
			FROM Bookings B
			  INNER JOIN Customer C on C.id = B.customer_id
			  INNER JOIN Barber BB ON BB.id = B.barber_id
			  INNER JOIN Barbershop BS ON BS.id = B.barbershop_id
			  INNER JOIN Services S ON S.id = B.service_id
			  INNER JOIN Sales SS ON SS.booking_id = B.id
			WHERE customer_id = ?`;
		const data = [customerId];

		const response = await executeQuery(query, data);

		if (response) {
			return response;
		} else {
			return "Error getting customer bookings";
		}
	} catch (error) {
		return error;
	}
};

const findBookingByShopId = async (shopId) => {
	try {
		const query = `
		SELECT B.id,
		B.customer_id,
		B.barbershop_id,
		B.date_time     as booking_date,
		BS.name         as barbershop_name,
		BS.location     as shop_location,
		BB.name         as barber_name,
		BB.phone        as barber_phone,
		BB.availability as barbershop_availability,
		C.name          as customer_name,
		C.phone         as customer_phone,
		C.email         as customer_email,
		S.service_name,
		B.status,
		SS.payment_status,
		SS.id			as sales_id
		FROM Bookings B
			INNER JOIN Customer C ON B.customer_id = C.id
        	INNER JOIN Barbershop BS ON B.barbershop_id = BS.id
        	INNER JOIN Barber BB ON B.barber_id = BB.id
        	INNER JOIN Services S ON S.id = B.service_id
			INNER JOIN Sales SS ON SS.booking_id = B.id
		WHERE B.barbershop_id = ?`;

		const data = [shopId];

		const response = await executeQuery(query, data);

		if (response) {
			return response;
		} else {
			return "Error getting customer bookings";
		}
	} catch (error) {
		return error;
	}
};

module.exports = {
	findAll,
	findById,
	create,
	update,
	remove,
	findByCustomerId,
	findBookingByShopId
};
