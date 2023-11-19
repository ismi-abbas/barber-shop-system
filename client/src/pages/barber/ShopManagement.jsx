import { useState } from "react";
import Layout from "../../components/shared/Layout";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { editBarber, getShopBarber } from "../../api/barbershop";

const ShopManagement = () => {
	const barberShopId = sessionStorage.getItem("shopId");
	const client = useQueryClient();

	const { data: barberList } = useQuery({
		queryKey: ["barberList"],
		queryFn: () => getShopBarber(barberShopId)
	});

	const { mutate: editBarberMutation } = useMutation({
		mutationFn: editBarber,
		mutationKey: ["editBarber"],
		onSuccess: client.invalidateQueries({
			queryKey: ["barberList"]
		})
	});

	const [editableId, setEditableId] = useState(null);
	const [editedName, setEditedName] = useState("");
	const [editedPhone, setEditedPhone] = useState("");

	const handleEditClick = (barber) => {
		setEditableId(barber.id);
		setEditedName(barber.name);
		setEditedPhone(barber.phone);
	};

	const handleSaveClick = () => {
		editBarberMutation({
			barberId: editableId,
			name: editedName,
			phone: editedPhone
		});
		setEditableId(null);
	};

	return (
		<Layout>
			<div className="text-3xl font-semibold mb-6">Shop Management</div>
			<div className="flex flex-row w-full justify-center gap-4">
				<div className="flex flex-col w-1/2">
					<div className="text-xl font-semibold">Manage Barber</div>
					<div className="text-sm text-gray-700">Click to edit information</div>
					<div className="flex flex-col gap-2 mt-4">
						{barberList?.data.map((barber) => (
							<div
								key={barber.id}
								className="w-full bg-white p-4 rounded-md border-2 border-gray-200/60 flex justify-between items-center"
							>
								{editableId === barber.id ? (
									<div className="flex items-center">
										<input
											type="text"
											value={editedName}
											onChange={(e) => setEditedName(e.target.value)}
											className="border rounded-md p-1 mr-4"
										/>
										<input
											type="text"
											value={editedPhone}
											onChange={(e) => setEditedPhone(e.target.value)}
											className="border rounded-md p-1"
										/>
									</div>
								) : (
									<div
										onClick={() => handleEditClick(barber)}
										className="cursor-pointer flex  items-center gap-2"
									>
										<div className="text-lg font-medium">{barber.name}</div>
										<div className="text-gray-600">{barber.phone}</div>
									</div>
								)}

								{editableId === barber.id && (
									<button
										onClick={handleSaveClick}
										className="bg-indigo-500 text-white px-4 py-1 rounded-md"
									>
										Save
									</button>
								)}
							</div>
						))}
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default ShopManagement;
