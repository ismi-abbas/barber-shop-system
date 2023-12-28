import { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	editBarber,
	getShopBarber,
	addBarber,
	createShop,
	deleteBarber
} from "../../api/barbershop";
import AddShopItem from "../../components/AddShopItem";
import AddShopInventory from "../../components/AddShopInventory";
import AddBarber from "../../components/AddBarber.jsx";

const ShopManagement = () => {
	const barberShopId = JSON.parse(sessionStorage.getItem("shopId") || "");
	const managerId = JSON.parse(sessionStorage.getItem("userId") || "");

	const client = useQueryClient();

	const [editableId, setEditableId] = useState(null);
	const [location, setLocation] = useState("");
	const [shopName, setShopName] = useState("");
	const [shopId, setShopId] = useState(barberShopId);

	const [editableBarber, setEditableBarber] = useState({
		barberId: "",
		name: "",
		phone: ""
	});

	useEffect(() => {
		try {
			if (barberShopId) {
				setShopId(barberShopId);
			}
		} catch (error) {
			console.log(error);
		}
	}, [barberShopId]);

	const { mutate: createShopMutation } = useMutation({
		mutationFn: createShop,
		mutationKey: ["editBarber"],
		onSuccess: async (data) => {
			await client.invalidateQueries({ queryKey: ["barberList"] });
			setShopId(data.shopId);
			window.location.reload();
		}
	});

	const { data: barberList } = useQuery({
		queryKey: ["barberList"],
		queryFn: () => getShopBarber(shopId)
	});

	const { mutate: editBarberMutation } = useMutation({
		mutationFn: editBarber,
		mutationKey: ["editBarber"],
		onSuccess: () => client.invalidateQueries({ queryKey: ["barberList"] })
	});

	const { mutate: deleteBarberMutation } = useMutation({
		mutationFn: deleteBarber,
		mutationKey: ["deleteBarber"],
		onSuccess: () => client.invalidateQueries({ queryKey: ["barberList"] })
	});

	const { mutate: addBarberMutation } = useMutation({
		mutationFn: addBarber,
		mutationKey: ["addBarber"],
		onSuccess: () => client.invalidateQueries({ queryKey: ["barberList"] })
	});

	const handleDeleteBarber = () => {
		deleteBarberMutation({
			barberId: editableId
		});
		setEditableId(null);
	};

	const handleAddShop = () => {
		createShopMutation({
			name: shopName,
			location,
			managerId
		});

		setShopName("");
		setLocation("");
	};

	return (
		<Layout>
			<div className="text-2xl font-semibold">Shop Management</div>
			<div className="mt-5">
				{shopId ? (
					<ManageBarber />
				) : (
					<CreateShop
						client={client}
						shopName={shopName}
						setShopName={setShopName}
						location={location}
						setLocation={setLocation}
						handleAddShop={handleAddShop}
					/>
				)}
			</div>
		</Layout>
	);
};

export default ShopManagement;

function CreateShop({
	shopName,
	setShopName,
	location,
	setLocation,
	handleAddShop
}) {
	return (
		<div className="flex flex-col w-full justify-center gap-4">
			<div className="flex min-h-full flex-col items-center justify-center">
				<p className="text-sm text-center">
					No shop found, you need to register one
				</p>
				<div className="flex flex-col w-96 mt-2">
					<div className="space-y-2">
						<div className="flex flex-col">
							<label
								htmlFor="name"
								className="block text-sm font-medium leading-6 text-gray-900">
								Shop Name
							</label>
							<input
								value={shopName}
								onChange={(e) => setShopName(e.target.value)}
								id="name"
								placeholder="FR Barber"
								className="block w-full p-2 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 active:ring-purple-500 placeholder:text-gray-400 sm:text-sm sm:leading-6"
								required
							/>
						</div>
						<div className="flex flex-col">
							<label
								htmlFor="location"
								className="block text-sm font-medium leading-6 text-gray-900">
								Location
							</label>
							<input
								value={location}
								onChange={(e) => setLocation(e.target.value)}
								id="location"
								placeholder="Kuala Lumpur, Malaysia"
								required
								type="text"
								className="block w-full p-2 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 active:ring-purple-500 placeholder:text-gray-400 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>
					<div className="flex justify-center mt-4">
						<button
							onClick={handleAddShop}
							type="submit"
							className="w-52 py-2 rounded-md bg-indigo-600 text-white">
							Register Shop
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

function ManageBarber() {
	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-xl font-medium text-gray-900 mb-2">Barber</h2>
				<AddBarber />
			</div>

			<div>
				<h2 className="text-xl font-medium text-gray-900 mb-2">Shop</h2>
				<AddShopItem />
			</div>

			<div>
				<div className="text-xl font-medium text-gray-900 mb-2">Inventory</div>
				<AddShopInventory />
			</div>
		</div>
	);
}
