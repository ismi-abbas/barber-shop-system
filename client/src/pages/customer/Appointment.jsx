import React from "react";
import Layout from "../../components/shared/Layout";
import { useQuery } from "@tanstack/react-query";
import { getUserBooking } from "../../api/booking";
import { getAllBarber } from "../../api/barbershop";

const Appointment = () => {
	const userId = sessionStorage.getItem("userId");

	const { data: bookingInfo } = useQuery({
		queryKey: ["userBooking"],
		queryFn: () => getUserBooking(userId),
	});

	const { data: allBarbers } = useQuery({
		queryKey: ["allBarbers"],
		queryFn: getAllBarber,
	});

	return (
		<Layout>
			<div className="flex items-center justify-center text-4xl font-bold">
				Appointment
			</div>
			<div className="mt-10 text-lg">
				<div>
					<h1 className="font=bold">Current Appointments</h1>
				</div>
				<h1>Shop Name: {bookingInfo?.data[0].shop_name}</h1>
				<h1>Location: {bookingInfo?.data[0].location}</h1>
				<h1>Barber Name: {bookingInfo?.data[0].barber_name}</h1>
				<h1>Date: {bookingInfo?.data[0].booking_date}</h1>
			</div>
		</Layout>
	);
};

export default Appointment;
