import React, { useState, Fragment } from "react";
import { format, formatDistance, formatRelative, subDays } from "date-fns";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllShop, getBarberList } from "../../api/barbershop";
import { getAllAppointments, updateBooking } from "../../api/booking";
import Layout from "../../components/shared/Layout";

const Appointment = () => {
	const userId = sessionStorage.getItem("userId");
	const queryClient = useQueryClient();

	const { data: allBarbers } = useQuery({
		queryKey: ["allBarbers"],
		queryFn: () => getBarberList(1),
	});

	const { data: allAppointment } = useQuery({
		queryKey: ["allAppointment"],
		queryFn: getAllAppointments,
	});

	const { mutateAsync } = useMutation({
		mutationFn: updateBooking,
		onSuccess: queryClient.invalidateQueries({ queryKey: ["allAppointment"] }),
	});

	return (
		<Layout>
			<div>
				<h1 className="font-semibold text-2xl">Customer's Appointment</h1>
			</div>
			<div className="grid grid-cols-1 w-full items-center justify-center px-10 gap-4 mt-4">
				{allAppointment?.data.map(
					({
						id,
						customer_id,
						barbershop_id,
						booking_date,
						barbershop_name,
						shop_location,
						barber_name,
						barber_phone,
						barbershop_availability,
						customer_name,
						customer_email,
						service_name,
						status,
					}) => (
						<div className="flex flex-row p-4 rounded-lg gap-2" key={id}>
							<div className="w-40 flex flex-col mx-4 rounded-lg">
								<div>
									<div className="bg-gray-100 py-1 px-2 rounded-md text-sm">
										{format(new Date(booking_date), "MMMM dd")}
									</div>
									<div className="bg-gray-100 py-1 px-2 rounded-md mt-1 text-sm">
										{format(new Date(booking_date), "hh:mm aaaa")}
									</div>
								</div>
								<div className="mt-2">
									<img
										className="h-20 object-cover rounded-md"
										src="https://cdn4.vectorstock.com/i/1000x1000/53/48/trendy-barber-man-vector-35975348.jpg"
										alt="barbershop image"
									/>
								</div>
							</div>
							<div className="w-3/5 gap-2 flex flex-col justify-between">
								<div className="text-gray-900 py-2 border-2 border-gray-200 border-opacity-60 rounded-md px-4">
									Customer: {customer_name}
								</div>
								<div className="text-gray-900 py-2 border-2 border-gray-200 border-opacity-60 rounded-md px-4">
									Barber: {barber_name}
								</div>
								<div className="text-gray-900 py-2 border-2 border-gray-200 border-opacity-60 rounded-md px-4">
									Services: {service_name}
								</div>
								<div className="flex flex-row self-end gap-2">
									{status === "pending" ? (
										<>
											<button
												onClick={() =>
													mutateAsync({
														status: "approved",
														bookingId: id,
													})
												}
												className="flex mx-auto text-white bg-indigo-500 border-0 px-4 focus:outline-none hover:bg-indigo-600 rounded text-sm"
											>
												Accept
											</button>
											<button
												onClick={() =>
													mutateAsync({
														status: "rejected",
														bookingId: id,
													})
												}
												className="flex mx-auto text-white bg-red-500 border-0 px-4 focus:outline-none hover:bg-red-600 rounded text-sm"
											>
												Reject
											</button>
										</>
									) : status === "approved" ? (
										<>
											<h3 className="flex mx-auto text-sm text-green-700 bg-green-100 px-4 border-0 rounded-md">
												Approved
											</h3>
										</>
									) : (
										<>
											<h3 className="flex mx-auto text-sm text-red-700 bg-red-100 px-4 border-0 rounded-md">
												Rejected
											</h3>
										</>
									)}
								</div>
							</div>
						</div>
					)
				)}
			</div>
		</Layout>
	);
};

export default Appointment;
