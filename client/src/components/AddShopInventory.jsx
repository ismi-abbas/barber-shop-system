import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	addInventoryItem,
	deleteInventoryItem,
	getInventoryItems,
	updateInventoryItem
} from "../api/barbershop";
import { useState } from "react";

export default function AddShopInventory() {
	const shopId = sessionStorage.getItem("shopId");
	const client = useQueryClient();

	const [inventory, setInventory] = useState({
		inventory_name: "",
		quantity: 0
	});
	const [editableInventory, setEditableInventory] = useState({
		inventory_name: "",
		quantity: 0
	});

	const [editableId, setEditableId] = useState(null);

	const { data: shopInventory } = useQuery({
		queryKey: ["shopInventory"],
		queryFn: () => getInventoryItems(shopId)
	});

	const { mutate: addInventoryMutation } = useMutation({
		mutationFn: addInventoryItem,
		mutationKey: ["addInventory"],
		onSuccess: () => client.invalidateQueries({ queryKey: ["shopInventory"] })
	});

	const { mutate: deleteInventoryMutation } = useMutation({
		mutationFn: deleteInventoryItem,
		mutationKey: ["deleteInventory"],
		onSuccess: () => client.invalidateQueries({ queryKey: ["shopInventory"] })
	});

	const { mutate: editInventoryMutation } = useMutation({
		mutationFn: updateInventoryItem,
		mutationKey: ["editInventory"],
		onSuccess: () => client.invalidateQueries({ queryKey: ["shopInventory"] })
	});

	const handleDelete = (id) => {
		deleteInventoryMutation({
			shopId,
			itemId: id
		});
	};

	const handleAddInventory = () => {
		addInventoryMutation({
			shopId,
			inventoryItem: inventory
		});

		setInventory({ inventory_name: "", quantity: 0 });
	};

	const handleUpdateInventory = () => {
		editInventoryMutation({
			shopId: shopId,
			inventoryItem: editableInventory,
			itemId: editableId
		});
		setEditableId(null);
	};

	const handleEditClick = (inventory) => {
		setEditableId(inventory.id);
		setEditableInventory({
			inventory_name: inventory.inventory_name,
			quantity: inventory.quantity
		});
	};

	return (
		<div className="grid grid-cols-3 w-full space-x-4">
			<table className="divide-y divide-gray-200 border min-w-full col-span-2">
				<thead>
					<tr className="">
						<th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-semibold text-gray-500 uppercase tracking-wider border">
							Inventory
						</th>
						<th className="py-3 bg-gray-50 text-center text-xs leading-4 font-semibold text-gray-500 uppercase tracking-wider border">
							Quantity
						</th>
						<th className="py-3 bg-gray-50 text-center text-xs leading-4 font-semibold text-gray-500 uppercase tracking-wider border">
							Action
						</th>
					</tr>
				</thead>
				<tbody>
					{shopInventory?.data.map((item) => (
						<tr key={item.id}>
							{/* Inventory */}
							<td className="py-3 px-6 border-gray-200 border w-2/3">
								<input
									type="text"
									disabled={editableId !== item.id}
									value={
										editableId === item.id
											? editableInventory.inventory_name
											: item.inventory_name
									}
									onChange={(e) =>
										setEditableInventory({
											...editableInventory,
											inventory_name: e.target.value
										})
									}
									onKeyDown={(e) => {
										if (e.key === "Enter") {
											handleUpdateInventory();
										}
									}}
									className={`bg-white appearance-none text-sm${
										editableId === item.id
											? "p-2 text-sm border-b text-gray-900 font-medium"
											: ""
									}`}
								/>
							</td>
							{/* Quantity */}
							<td className="py-3 px-6 whitespace-no-wrap border-b border-gray-200">
								<input
									type="number"
									disabled={editableId !== item.id}
									value={
										editableId === item.id
											? editableInventory.quantity
											: item.quantity
									}
									onChange={(e) =>
										setEditableInventory({
											...editableInventory,
											quantity: parseInt(e.target.value, 10)
										})
									}
									onKeyDown={(e) => {
										if (e.key === "Enter") {
											handleUpdateInventory();
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
											onClick={handleUpdateInventory}>
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
				<h2 className="font-semibold text-lg">Add Shop Inventory</h2>
				<input
					type="text"
					placeholder="Item name"
					value={inventory.inventory_name}
					onChange={(e) => {
						setEditableId(null);
						setInventory({ ...inventory, inventory_name: e.target.value });
					}}
					className="border rounded-md p-2 mr-4 w-full"
				/>
				<input
					type="number"
					placeholder="Quantity"
					value={inventory.quantity}
					onChange={(e) => {
						setEditableId(null);
						setInventory({
							...inventory,
							quantity: parseInt(e.target.value, 10)
						});
					}}
					className="border rounded-md p-2 w-full"
				/>
				<div className="flex justify-end">
					<button
						onClick={() => handleAddInventory()}
						className="bg-green-500 text-white px-2 py-1 rounded-md block">
						Add Inventory
					</button>
				</div>
			</div>
		</div>
	);
}
