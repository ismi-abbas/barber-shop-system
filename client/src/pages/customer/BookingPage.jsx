import { useState } from "react";
import Layout from "../../components/shared/Layout";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserBooking, updateBooking } from "../../api/booking";
import { format } from "date-fns";
import ActionModal from "../../components/shared/ActionModal";
import { Link } from "react-router-dom";

const BookingPage = () => {
	const [isOpen, openModal] = useState(false);
	const userId = sessionStorage.getItem("userId");
	const [bookingId, selectedBookingId] = useState();
	const queryClient = useQueryClient();

	const { mutate: updateBookingMutation } = useMutation({
		mutationFn: updateBooking,
		onSuccess: queryClient.invalidateQueries({
			queryKey: ["userBooking", userId]
		})
	});

	const { data: bookingInfo } = useQuery({
		queryKey: ["userBooking"],
		queryFn: () => getUserBooking(userId)
	});

	const handleCancelBooking = () => {
		updateBookingMutation({
			status: "cancelled",
			bookingId: bookingId
		});
		openModal(false);
	};

	return (
		<Layout>
			<div className="container mx-auto rounded-md">
				<div className="grid grid-cols-4 gap-4 mt-5">
					{bookingInfo?.data.length > 0 ? (
						bookingInfo?.data
							.sort(
								(a, b) => new Date(b.booking_date) - new Date(a.booking_date)
							)
							.map(
								({
									booking_id,
									barber_name,
									shop_name,
									location,
									booking_date,
									price,
									status,
									service_name
								}) => {
									return (
										<div
											key={booking_id}
											onClick={() => {
												if (status === "pending") {
													openModal(true);
													selectedBookingId(booking_id);
												}
											}}
											className={`flex bg-slate-200/20 border-2 border-gray-200/20 p-6 rounded-lg flex-wrap flex-col ${
												status === "pending"
													? "hover:ring-2 hover:ring-indigo-600 hover:cursor-pointer"
													: ""
											} `}>
											<ActionModal
												closeModal={() => openModal(false)}
												isOpen={isOpen}
												title="Cancel Booking"
												description="Are you sure to cancel this booking?"
												actionType="Confirm"
												action={handleCancelBooking}
											/>
											<div>
												<p className="bg-indigo-600 text-white font-medium rounded inline-block px-2 text-start leading-loose mb-5 text-sm">
													{format(new Date(booking_date), "dd MMM yy hh:mm aa")}
												</p>
											</div>
											<div className="rounded text-slate-700 overflow-scroll">
												<div>
													<p className="text-lg font-medium">
														{shop_name}, {location}
													</p>
												</div>
												<div className="mt-2">
													<p>
														<span className="font-semibold tracking-tighter">
															Barber:{" "}
														</span>{" "}
														{barber_name}
													</p>
													<p>
														<span className="font-semibold tracking-tighter">
															Service:{" "}
														</span>{" "}
														{service_name}
													</p>
													<p>
														<span className="font-semibold tracking-tighter">
															Price:{" "}
														</span>{" "}
														RM {price}
													</p>
												</div>

												<div
													className={`mt-5 inline-flex rounded-md px-2 py-1 text-sm capitalize ${
														status === "pending"
															? "bg-yellow-200 text-yellow-700"
															: status === "cancelled"
															? "bg-red-200 text-red-700"
															: "bg-green-200 text-green-700"
													}`}>
													{status}
												</div>
											</div>
										</div>
									);
								}
							)
					) : (
						<div className="flex flex-col col-span-4 items-center justify-center">
							<div className="text-2xl font-medium">
								No booking found for you!
							</div>
							<Link to="/barbershop" className="mt-4">
								<button className="inline-flex items-center bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded-md text-sm mt-4 md:mt-0 text-white">
									Browse shop
								</button>
							</Link>
						</div>
					)}
				</div>
			</div>
		</Layout>
	);
};

export default BookingPage;
