import { useQuery } from "@tanstack/react-query";
import Layout from "../../components/shared/Layout";
import { useCart } from "../../context/CartContext";
import { toast } from "react-toastify";
import { getStoreItems } from "../../api/store";

export default function Store() {
	const notify = (text) =>
		toast.success(text, {
			position: "top-center",
			autoClose: 1000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: false,
			progress: undefined,
			theme: "light"
		});

	const { data: shopItemsList } = useQuery({
		queryKey: ["shopItems"],
		queryFn: getStoreItems
	});

	const { addItem } = useCart();

	return (
		<Layout>
			<div className="text-2xl font-semibold mb-4">Store</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
				{shopItemsList?.data
					.filter((item) => item.quantity > 0)
					.map((item) => (
						<div
							className="bg-white border rounded-md overflow-hidden p-4"
							key={item.id}>
							<img
								src="https://down-my.img.susercontent.com/file/my-11134207-7qul1-lhwbf1a5ueot76"
								alt="sample pomade"
							/>
							<div className="mb-4 mt-2">
								<h2 className="font-semibold uppercase">{item.item_name}</h2>
								<p className="text-gray-600 text-base">RM {item.price}</p>
								<p className="text-gray-600 text-base">
									{item.quantity} {item.quantity > 1 ? "pcs" : "pc"} left
								</p>
							</div>

							<div className="flex justify-end">
								<button
									onClick={() => {
										addItem(item);
										notify("Added to cart");
									}}
									className="bg-indigo-600 text-white px-2 py-1 rounded-md text-sm  hover:bg-indigo-700">
									Add To Cart
								</button>
							</div>
						</div>
					))}
			</div>
		</Layout>
	);
}
