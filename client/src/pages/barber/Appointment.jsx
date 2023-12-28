import { format } from "date-fns";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllAppointments, updateBooking } from "../../api/booking";
import Layout from "../../components/shared/Layout";
import { updateSale } from "../../api/sales";

const Appointment = () => {
	const shopId = sessionStorage.getItem("shopId");
	const queryClient = useQueryClient();

	const { data: allAppointment } = useQuery({
		queryKey: ["allAppointment"],
		queryFn: () => getAllAppointments(shopId)
	});

	const { mutateAsync: updateBookingMutation } = useMutation({
		mutationFn: updateBooking,
		mutationKey: ["updateBooking"],
		onSuccess: queryClient.invalidateQueries({ queryKey: ["allAppointment"] })
	});

	const { mutate: updateSaleMutation } = useMutation({
		mutationFn: updateSale,
		mutationKey: ["updateSale"],
		onSuccess: queryClient.invalidateQueries({
			queryKey: ["allAppointment"]
		})
	});

	return (
		<Layout>
			<div>
				<h1 className="font-semibold text-2xl">Customer&apos;s Appointment</h1>
			</div>
			<div className="grid grid-cols-3 container gap-4 mt-4">
				{allAppointment?.data.map(
					({
						id,
						booking_date,
						barber_name,
						customer_name,
						service_name,
						payment_status,
						sales_id,
						status
					}) => (
						<div
							className="flex flex-row border-2 border-gray-200/60 rounded-md h-72 p-4"
							key={id}>
							<div className="w-40 flex flex-col mx-4 rounded-lg">
								<div>
									<div className="bg-indigo-500 text-white py-1 px-2 rounded-md text-sm">
										{format(new Date(booking_date), "MMMM dd")}
									</div>
									<div className="bg-indigo-500 text-white py-1 px-2 rounded-md mt-1 text-sm">
										{format(new Date(booking_date), "hh:mm aaaa")}
									</div>
								</div>
								<div className="mt-2">
									<img
										className="object-cover rounded-md"
										src="https://cdn4.vectorstock.com/i/1000x1000/53/48/trendy-barber-man-vector-35975348.jpg"
										alt="barbershop image"
									/>
								</div>
							</div>
							<div className="w-3/5 gap-2 flex flex-col">
								<div className="mb-4">
									<h3 className="font-base text-gray-900">
										Customer: {customer_name}
									</h3>
									<h3>Barber: {barber_name}</h3>
									<h3>Services: {service_name}</h3>
								</div>
								<div className="flex gap-2">
									<div
										className={`flex px-2 border-0 rounded-md text-sm ${
											payment_status === "paid"
												? "text-sky-700 bg-sky-200"
												: "text-red-700 bg-red-200 "
										}`}>
										{payment_status === "paid" ? "Paid" : "Unpaid"}
									</div>
									{payment_status === "unpaid" ? (
										<>
											<button
												onClick={() =>
													updateSaleMutation({
														paymentStatus: "paid",
														salesId: sales_id
													})
												}
												className="px-4 border rounded-md bg-indigo-500 hover:bg-indigo-600 text-white text-sm">
												Pay
											</button>
										</>
									) : null}
								</div>
								<div className="flex gap-2">
									{status === "pending" ? (
										<>
											<button
												onClick={() => {
													updateBookingMutation({
														status: "approved",
														bookingId: id
													});
												}}
												className="text-white bg-green-600 px-3 py-1 focus:outline-none hover:bg-green-700 rounded-md text-sm">
												Accept
											</button>
											<button
												onClick={() => {
													updateBookingMutation({
														status: "rejected",
														bookingId: id
													});
												}}
												className="text-white bg-red-500 px-3 py-1 focus:outline-none hover:bg-red-600 rounded-md text-sm">
												Reject
											</button>
										</>
									) : status === "approved" ? (
										<>
											<h3 className="text-sm text-green-700 bg-green-100 px-4 border-0 rounded-md">
												Approved
											</h3>
										</>
									) : (
										<>
											<h3 className="text-sm text-red-700 bg-red-100 px-4 border-0 rounded-md">
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
