import React from "react";
import Layout from "../../components/shared/Layout";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addBooking, getUserBooking } from "../../api/booking";

const BookingPage = () => {
	const { barberId } = useParams();
	const userId = sessionStorage.getItem("userId");

	const { mutateAsync: BookingMutation } = useMutation({
		mutationFn: addBooking,
	});

	const { data: bookingInfo } = useQuery({
		queryKey: ["userBooking"],
		queryFn: () => getUserBooking(userId),
	});

	return (
		<Layout>
			<div className="flex">
				<div>
					<div>
						<div>
							<h1>Current Bookings</h1>
						</div>
						<h1>Shop Name: {bookingInfo?.data[0].shop_name}</h1>
						<h1>Location: {bookingInfo?.data[0].location}</h1>
						<h1>Barber Name: {bookingInfo?.data[0].barber_name}</h1>
						<h1>Date: {bookingInfo?.data[0].booking_date}</h1>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default BookingPage;
