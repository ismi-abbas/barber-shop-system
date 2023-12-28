import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
	addShopItem,
	deleteShopItem,
	getShopItems,
	updateShopItem
} from "../api/barbershop";

export default function AddShopItem() {
	const client = useQueryClient();
	const shopId = JSON.parse(sessionStorage.getItem("shopId") || "");

	const [item, setItem] = useState({
		item_name: "",
		price: 0,
		quantity: 0
	});

	const [editableItem, setEditableItem] = useState({
		item_name: "",
		price: 0,
		quantity: 0
	});
	const [editableId, setEditableId] = useState(null);

	const { data: itemList } = useQuery({
		queryKey: ["itemList"],
		queryFn: async () => getShopItems(shopId)
	});

	const { mutate: addItemMutation } = useMutation({
		mutationKey: ["addItem"],
		mutationFn: addShopItem,
		onSuccess: () => client.invalidateQueries({ queryKey: ["itemList"] })
	});

	const { mutate: updateItemMutation } = useMutation({
		mutationFn: updateShopItem,
		mutationKey: ["editItem"],
		onSuccess: () => client.invalidateQueries({ queryKey: ["itemList"] })
	});

	const { mutate: deleteItemMutation } = useMutation({
		mutationFn: deleteShopItem,
		mutationKey: ["deleteItem"],
		onSuccess: () => client.invalidateQueries({ queryKey: ["itemList"] })
	});

	const handleDelete = (id) => {
		deleteItemMutation({
			shopId,
			itemId: id
		});
	};

	const handleAddItem = () => {
		addItemMutation({
			shopId,
			item
		});
	};

	const handleEditClick = (item) => {
		setEditableId(item.id);
		setEditableItem({
			item_name: item.item_name,
			quantity: item.quantity,
			price: item.price
		});
	};

	const handleUpdateItem = () => {
		updateItemMutation({
			shopId,
			itemId: editableId,
			itemData: editableItem
		});
		setEditableId(null);
	};

	return (
		<div className="grid grid-cols-3 w-full space-x-4">
			<table className="divide-y divide-gray-200 border min-w-full col-span-2">
				<thead>
					<tr className="">
						<th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-semibold text-gray-500 uppercase tracking-wider border">
							Item Name
						</th>
						<th className="py-3 bg-gray-50 text-center text-xs leading-4 font-semibold text-gray-500 uppercase tracking-wider border">
							Price(RM)
						</th>
						<th className="py-3 bg-gray-50 text-center text-xs leading-4 font-semibold text-gray-500 uppercase tracking-wider border">
							Quantity(PCS)
						</th>
						<th className="py-3 bg-gray-50 text-center text-xs leading-4 font-semibold text-gray-500 uppercase tracking-wider border">
							Action
						</th>
					</tr>
				</thead>
				<tbody>
					{itemList?.data.map((item) => (
						<tr key={item.id} className="bg-white">
							{/* Item Name */}
							<td className="py-3 px-6 border-gray-200 border w-1/2">
								<input
									type="text"
									disabled={editableId !== item.id}
									value={
										editableId === item.id
											? editableItem.item_name
											: item.item_name
									}
									onChange={(e) =>
										setEditableItem({
											...editableItem,
											item_name: e.target.value
										})
									}
									onKeyDown={(e) => {
										if (e.key === "Enter") {
											handleUpdateItem();
										}
									}}
									className={`bg-white appearance-none text-sm ${
										editableId === item.id
											? "p-2 text-sm border-b text-gray-900 font-medium"
											: ""
									}`}
								/>
							</td>
							{/*	Item Price*/}
							<td className="py-3 px-6 border-gray-200 border">
								<input
									type="number"
									disabled={editableId !== item.id}
									value={
										editableId === item.id ? editableItem.price : item.price
									}
									onChange={(e) =>
										setEditableItem({
											...editableItem,
											price: parseInt(e.target.value, 10)
										})
									}
									onKeyDown={(e) => {
										if (e.key === "Enter") {
											handleUpdateItem();
										}
									}}
									className={`bg-white text-sm w-20 ${
										editableId === item.id
											? "p-2 text-sm border-b text-gray-900 font-medium"
											: ""
									}`}
								/>
							</td>
							{/*	Item Quantity */}
							<td className="py-3 px-6 border-gray-200 border">
								<input
									type="number"
									disabled={editableId !== item.id}
									value={
										editableId === item.id
											? editableItem.quantity
											: item.quantity
									}
									onChange={(e) =>
										setEditableItem({
											...editableItem,
											quantity: parseInt(e.target.value, 10)
										})
									}
									onKeyDown={(e) => {
										if (e.key === "Enter") {
											handleUpdateItem();
										}
									}}
									className={`bg-white text-sm w-20 ${
										editableId === item.id
											? "p-2 text-sm border-b text-gray-900 font-medium"
											: ""
									}`}
								/>
							</td>
							<td className="border border-gray-200 text-center w-52">
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
											onClick={handleUpdateItem}>
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
				<h2 className="font-semibold text-lg">Add Shop Item</h2>
				<input
					type="text"
					placeholder="Item name"
					value={item.item_name}
					onChange={(e) => setItem({ ...item, item_name: e.target.value })}
					className="border rounded-md p-2 mr-4 w-full"
				/>
				<input
					type="number"
					placeholder="Price"
					value={item.price}
					onChange={(e) =>
						setItem({ ...item, price: parseInt(e.target.value, 10) })
					}
					className="border rounded-md p-2 w-full"
				/>
				<input
					type="number"
					placeholder="Quantity"
					value={item.quantity}
					onChange={(e) =>
						setItem({ ...item, quantity: parseInt(e.target.value, 10) })
					}
					className="border rounded-md p-2 w-full"
				/>
				<div className="flex justify-end">
					<button
						onClick={() => handleAddItem()}
						className="bg-green-500 text-white px-2 py-1 rounded-md block">
						Add Item
					</button>
				</div>
			</div>
		</div>
	);
}
