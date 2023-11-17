import { useState, Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/shared/Layout";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getBarberList, getBarberShopInfo } from "../../api/barbershop";
import { addBooking, getAllAppointments } from "../../api/booking";
import { RadioGroup, Listbox, Transition } from "@headlessui/react";
import { Calendar } from "react-calendar";
import { getServices } from "../../api/services";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { format } from "date-fns";
import InfoModal from "../../components/shared/InfoModal";

const timeSlot = [
	{
		value: "09:00",
		available: true
	},
	{
		value: "09:30",
		available: true
	},
	{
		value: "10:00",
		available: true
	},
	{
		value: "10:30",
		available: true
	},
	{
		value: "11:00",
		available: false
	},
	{
		value: "11:30",
		available: false
	},
	{
		value: "12:00",
		available: true
	},
	{
		value: "12:30",
		available: true
	},
	{
		value: "14:00",
		available: true
	},
	{
		value: "14:30",
		available: true
	},
	{
		value: "15:00",
		available: true
	},
	{
		value: "15:30",
		available: true
	},
	{
		value: "16:00",
		available: true
	},
	{
		value: "16:30",
		available: true
	},
	{
		value: "17:00",
		available: true
	},
	{
		value: "17:30",
		available: true
	},
	{
		value: "18:00",
		available: true
	},
	{
		value: "18:30",
		available: true
	},
	{
		value: "20:00",
		available: true
	},
	{
		value: "20:30",
		available: true
	},
	{
		value: "21:00",
		available: true
	},
	{
		value: "21:30",
		available: true
	}
];

const BarbershopInfo = () => {
	const { id: shopId } = useParams();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const userId = sessionStorage.getItem("userId");
	const [isOpen, setIsOpen] = useState(false);
	const [selectedBarber, setSelectBarber] = useState(null);
	const [date, setDate] = useState(new Date());
	const [time, setTime] = useState(timeSlot[0]);
	const [dateTime, setDateTime] = useState(new Date().toISOString());
	const [service, setService] = useState();

	function closeModal() {
		setIsOpen(false);
	}

	function openModal() {
		setIsOpen(true);
	}

	function handleSelectBarber(barber) {
		setSelectBarber(barber);
	}

	const { data: shopInfo } = useQuery({
		queryKey: ["shopInfo", shopId],
		queryFn: () => getBarberShopInfo(shopId)
	});

	const { data: barberList } = useQuery({
		queryKey: ["shopBarberList", shopId],
		queryFn: () => getBarberList(shopId)
	});

	const { data: allServices } = useQuery({
		queryFn: getServices,
		queryKey: ["allServices", shopId],
		onError: (err) => console.error("Error fetching services:", err)
	});

	const { mutateAsync: createBooking } = useMutation({
		mutationFn: addBooking,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["userBooking", "bookingList"]
			});
			navigate("/booking");
		}
	});

	const { data: bookingList, refetch: refetchBookingList } = useQuery({
		queryKey: ["bookingList", shopId, date, date.toISOString()],
		queryFn: () => getAllAppointments(shopId)
	});

	const handleTimeSelection = (time) => {
		setTime(time);
		if (date.toISOString() && time) {
			const combined = new Date(date);
			const [hours, minutes] = time.value.split(":").map(Number);
			combined.setHours(hours, minutes);
			setDateTime(combined);
		}
	};

	const handleDateChange = (newDate) => {
		setDate(newDate);
		refetchBookingList();
	};

	const cancelBooking = () => {
		setSelectBarber(null);
		setDate(new Date());
		setTime(timeSlot[0]);
		setDateTime(new Date().toISOString());
		setService(null);
	};

	return (
		<Layout>
			<section className="w-full flex-col lg:px-20">
				<div className="lg:grid lg:grid-cols-3 items-start flex">
					<div className="flex flex-col col-span-3">
						<h1 className="font-semibold text-3xl text-gray-900">
							{shopInfo?.data[0].name}
						</h1>
						<p className="text-xl">
							Location:{" "}
							<span className="font-semibold">
								{shopInfo?.data[0].location}{" "}
							</span>{" "}
						</p>
					</div>
					<div className="col-span-1 mt-4 mr-2">
						<img
							className="object-cover h-96 w-full rounded-lg"
							src="https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
							alt=""
						/>
					</div>
					<div className="col-span-1 mt-4 mx-2">
						<div className="h-96 overflow-y-auto">
							<div className="flex flex-col rounded-md">
								<div className="flex flex-col gap-2">
									{barberList?.data.map((barber) => (
										<div
											onClick={() => handleSelectBarber(barber)}
											key={barber.id}
											className={`flex justify-between items-center border rounded-lg p-3 mr-3 hover:cursor-pointer hover:ring-2 hover:ring-inset hover:ring-indigo-600 ${
												selectedBarber === barber
													? "ring-indigo-500 ring-2 ring-inset"
													: ""
											}`}
										>
											<div className="text-base text-gray-900 font-medium">
												{barber.name}
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
					<div className="col-span-1 mt-4">
						<Calendar onChange={handleDateChange} value={date} />
						<div>
							<div className="mt-2">
								<h3 className="font-medium text-lg">Time Slot</h3>
								<div>
									<TimeSlot
										selectedTime={time}
										selectedDate={date}
										setSelectedTime={handleTimeSelection}
										timeSlot={timeSlot}
										bookingList={bookingList ? bookingList : {}}
									/>
								</div>
							</div>
						</div>
					</div>
					<div className="mt-2 col-span-2 mr-4">
						<h3 className="text-lg font-medium text-gray-900">
							Select Service
						</h3>
						{allServices ? (
							<SelectService
								services={allServices}
								service={service}
								setService={setService}
							/>
						) : (
							<></>
						)}
					</div>
					<div className="col-span-1 mt-4 flex justify-end gap-2">
						<InfoModal
							closeModal={closeModal}
							openModal={openModal}
							description="Kindly check all the info before continuing"
							title="Confirm booking"
							isOpen={isOpen}
							info={{
								date: dateTime,
								serviceName: service?.service_name,
								price: service?.price,
								barberName: selectedBarber?.name
							}}
							isConfirmed={() =>
								createBooking({
									barberId: selectedBarber.id,
									barbershopId: shopId,
									customerId: userId,
									date: dateTime,
									serviceId: service.id,
									status: "pending"
								})
							}
						/>
						<button
							onClick={() => openModal()}
							className="inline-flex items-center bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded-md text-sm mt-4 md:mt-0 text-white"
						>
							Confirm
						</button>

						<button
							onClick={() => cancelBooking()}
							className="inline-flex items-center bg-red-500 border-0 py-2 px-4 focus:outline-none hover:bg-red-600 rounded-md text-sm mt-4 md:mt-0 text-white"
						>
							Cancel
						</button>
					</div>
				</div>
			</section>
		</Layout>
	);
};

function SelectService({ services, service, setService }) {
	return (
		<div>
			<RadioGroup value={service} onChange={setService}>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
					{services?.data.map((service) => (
						<RadioGroup.Option
							key={service.id}
							value={service}
							className={({ active, checked }) =>
								`${
									active
										? "ring-2 ring-white/60 ring-offset-2 ring-offset-indigo-300"
										: ""
								} ${
									checked ? "bg-indigo-500 text-white" : "bg-gray-200"
								} relative flex cursor-pointer rounded-lg px-5 py-4 focus:outline-none`
							}
						>
							{({ checked }) => (
								<>
									<div className="flex w-full items-center justify-between">
										<div className="flex items-center">
											<div className="text-sm">
												<RadioGroup.Label
													as="p"
													className={`font-medium  ${
														checked ? "text-white" : "text-gray-900"
													}`}
												>
													{service.service_name}
												</RadioGroup.Label>
												<RadioGroup.Description
													as="span"
													className={`inline ${
														checked ? "text-sky-100" : "text-gray-900"
													}`}
												>
													<h3>RM {service.price}</h3>
												</RadioGroup.Description>
											</div>
										</div>
									</div>
								</>
							)}
						</RadioGroup.Option>
					))}
				</div>
			</RadioGroup>
		</div>
	);
}

function TimeSlot({
	selectedTime,
	selectedDate,
	setSelectedTime,
	timeSlot,
	bookingList
}) {
	const isTimeSlotAvailable = (time, bookings) => {
		if (!bookings) {
			return true;
		}

		const selectedDateTime = new Date(selectedDate);
		const [hours, minutes] = time.value.split(":").map(Number);
		selectedDateTime.setHours(hours, minutes);

		const endTime = new Date(selectedDateTime);
		endTime.setMinutes(endTime.getMinutes() + 30);

		for (const booking of bookings) {
			const bookingStart = new Date(booking.booking_date);
			const bookingEnd = new Date(booking.booking_date);
			bookingEnd.setMinutes(bookingEnd.getMinutes() + 30);

			if (
				(selectedDateTime >= bookingStart && selectedDateTime < bookingEnd) ||
				(endTime > bookingStart && endTime <= bookingEnd) ||
				(selectedDateTime <= bookingStart && endTime >= bookingEnd)
			) {
				return false;
			}
		}

		return true;
	};

	return (
		<Listbox value={selectedTime} onChange={setSelectedTime}>
			<div className="relative mt-1">
				<Listbox.Button className="relative w-full cursor-default rounded-lg bg-gray-100/60 border py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
					<span className="block truncate">
						{format(new Date(`2000-01-01T${selectedTime.value}`), "hh:mm a")}
					</span>
					<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
						<ChevronUpDownIcon
							className="h-5 w-5 text-gray-400"
							aria-hidden="true"
						/>
					</span>
				</Listbox.Button>
				<Transition
					as={Fragment}
					leave="transition ease-in duration-100"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white border  py-1 text-base ring-1 ring-black/5 focus:outline-none sm:text-sm">
						{timeSlot.map((slot, idx) => (
							<Listbox.Option
								disabled={
									!isTimeSlotAvailable(
										slot,
										bookingList?.data?.filter(
											(booking) => booking.status !== "cancelled"
										)
									)
								}
								key={idx}
								className={({ active, disabled }) =>
									`relative cursor-default select-none py-2 pl-10 pr-4 ${
										active ? "bg-indigo-200 text-indigo-900" : "text-gray-900"
									} ${disabled ? "bg-red-100 text-red-900" : "text-gray-900"}`
								}
								value={slot}
							>
								{({ selected }) => (
									<>
										<span
											className={`block truncate ${
												selected ? "font-medium" : "font-normal"
											}`}
										>
											{format(new Date(`2000-01-01T${slot.value}`), "hh:mm a")}
										</span>
										{selected ? (
											<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
												<CheckIcon className="h-5 w-5" aria-hidden="true" />
											</span>
										) : null}
									</>
								)}
							</Listbox.Option>
						))}
					</Listbox.Options>
				</Transition>
			</div>
		</Listbox>
	);
}

export default BarbershopInfo;
