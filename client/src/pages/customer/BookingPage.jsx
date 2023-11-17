import React from "react";
import Layout from "../../components/shared/Layout";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addBooking, getUserBooking } from "../../api/booking";
import { format } from "date-fns";

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

	const capitalizeFirstWord = (str) =>
		str.replace(/(^\w|\.\s*\w)/g, (c) => c.toUpperCase());

	return (
		<Layout>
			<div className="container mx-auto rounded-md">
				<h1 className="font-medium text-lg text-center">
					Booking list for {bookingInfo?.data[0].customer_name}
				</h1>
				<div>
					{bookingInfo?.data.map(
						({
							booking_id,
							customer_id,
							barbershop_id,
							barber_id,
							customer_name,
							barber_name,
							shop_name,
							location,
							booking_date,
							status,
						}) => (
							<div
								key={booking_id}
								className="flex gap-2 border-2 border-gray-200 border-opacity-60 rounded-lg p-4 w-72 flex-wrap flex-col"
							>
								<h1>Barber: {barber_name}</h1>
								<h1>Shop: {shop_name}</h1>
								<h1>Location: {location}</h1>
								<h1>{format(new Date(booking_date), "dd-MMM-yy hh:mm aa")}</h1>
								<h1>Status: {capitalizeFirstWord(status)}</h1>
							</div>
						)
					)}
				</div>
			</div>
		</Layout>
	);
};

export default BookingPage;
