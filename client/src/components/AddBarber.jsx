import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	addBarber,
	deleteBarber,
	editBarber,
	getShopBarber
} from "../api/barbershop.js";
import { useState } from "react";

export default function AddBarber() {
	const shopId = sessionStorage.getItem("shopId");
	const client = useQueryClient();

	const [editableId, setEditableId] = useState(null);
	const [barber, setBarber] = useState({
		name: "",
		phone: "",
		email: ""
	});
	const [editableBarber, setEditableBarber] = useState({
		name: "",
		shopId: shopId,
		phone: ""
	});

	const { data: barberList } = useQuery({
		queryKey: ["barberList"],
		queryFn: () => getShopBarber(shopId)
	});

	const { mutate: addBarberMutation } = useMutation({
		mutationKey: ["addBarber"],
		mutationFn: addBarber,
		onSuccess: () => client.invalidateQueries({ queryKey: ["barberList"] })
	});

	const { mutate: editBarberMutation } = useMutation({
		mutationKey: ["editBarber"],
		mutationFn: editBarber,
		onSuccess: () => client.invalidateQueries({ queryKey: ["barberList"] })
	});

	const { mutate: deleteBarberMutation } = useMutation({
		mutationKey: ["deleteBarber"],
		mutationFn: deleteBarber,
		onSuccess: () =>
			client.invalidateQueries({
				queryKey: ["barberList"]
			})
	});

	const handleUpdateBarber = () => {
		editBarberMutation({
			barberId: editableId,
			name: editableBarber.name,
			phone: editableBarber.phone
		});

		setEditableId(null);
	};

	const handleDelete = () => {
		deleteBarberMutation({
			barberId: editableId
		});
	};

	const handleAddBarber = () => {
		console.log({
			name: barber.name,
			phone: barber.phone,
			email: barber.email,
			shopId
		});
		addBarberMutation({
			name: barber.name,
			phone: barber.phone,
			email: barber.email,
			shopId
		});

		setBarber({
			email: "",
			name: "",
			phone: ""
		});
	};

	const handleEditClick = (barber) => {
		setEditableId(barber.id);
		setEditableBarber({
			name: barber.name,
			phone: barber.phone
		});
	};

	return (
		<div className="grid grid-cols-3 space-x-4">
			<table className="divide-y divide-gray-200 border min-w-full col-span-2">
				<thead>
					<tr className="">
						<th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-semibold text-gray-500 uppercase tracking-wider border">
							Name
						</th>
						<th className="py-3 bg-gray-50 text-center text-xs leading-4 font-semibold text-gray-500 uppercase tracking-wider border">
							Phone
						</th>
						<th className="py-3 bg-gray-50 text-center text-xs leading-4 font-semibold text-gray-500 uppercase tracking-wider border">
							Action
						</th>
					</tr>
				</thead>
				<tbody>
					{barberList?.data.map((item) => (
						<tr key={item.id} className="bg-white">
							<td className="py-3 px-6 border-gray-200 border">
								<input
									type="text"
									disabled={editableId !== item.id}
									value={
										editableId === item.id ? editableBarber.name : item.name
									}
									onChange={(e) =>
										setEditableBarber({
											...editableBarber,
											name: e.target.value
										})
									}
									onKeyDown={(e) => {
										if (e.key === "Enter") {
											handleUpdateBarber();
										}
									}}
									className={`bg-white appearance-none text-sm ${
										editableId === item.id
											? "p-2 text-sm border-b text-gray-900 font-medium"
											: ""
									}`}
								/>
							</td>
							<td className="py-3 px-6 border-gray-200 border">
								<input
									type="text"
									disabled={editableId !== item.id}
									value={
										editableId === item.id ? editableBarber.phone : item.phone
									}
									onChange={(e) =>
										setEditableBarber({
											...editableBarber,
											phone: e.target.value
										})
									}
									onKeyDown={(e) => {
										if (e.key === "Enter") {
											handleUpdateBarber();
										}
									}}
									className={`bg-white appearance-none text-sm ${
										editableId === item.id
											? "p-2 text-sm border-b text-gray-900 font-medium"
											: ""
									}`}
								/>
							</td>
							{/* Action */}
							<td className="border border-gray-200 text-center w-40">
								{editableId !== item.id ? (
									<button
										className="bg-indigo-600 text-white px-2 rounded-md text-sm w-16"
										onClick={() => handleEditClick(item)}>
										Edit
									</button>
								) : (
									<div className="gap-2 flex items-center justify-center">
										<button
											className="bg-green-600 text-white px-2 rounded-md text-sm w-16"
											onClick={() => handleUpdateBarber()}>
											Save
										</button>
										<button
											className="bg-red-600 text-white px-2 rounded-md text-sm w-16"
											onClick={() => {
												handleDelete(item.id);
												setEditableId(null);
											}}>
											Delete
										</button>
									</div>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className="space-y-2 p-4 rounded-md border">
				<h2 className="font-semibold text-lg">Add Barber</h2>
				<input
					type="text"
					placeholder="Item name"
					value={barber.name}
					onChange={(e) => {
						setBarber({
							...barber,
							name: e.target.value
						});
					}}
					className="border rounded-md p-2 mr-4 w-full"
				/>
				<input
					type="tel"
					placeholder="Phone number"
					value={barber.phone}
					onChange={(e) => {
						setEditableId(null);
						setBarber({
							...barber,
							phone: e.target.value
						});
					}}
					className="border rounded-md p-2 w-full"
				/>
				<input
					type="email"
					placeholder="Email address"
					value={barber.email}
					onChange={(e) => {
						setEditableId(null);
						setBarber({
							...barber,
							email: e.target.value
						});
					}}
					className="border rounded-md p-2 w-full"
				/>
				<div className="flex justify-end">
					<button
						onClick={() => handleAddBarber()}
						className="bg-green-500 text-white px-2 py-1 rounded-md block">
						Add Barber
					</button>
				</div>
			</div>
		</div>
	);
}
