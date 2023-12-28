import { toast } from "react-toastify";
import { useCart } from "../context/CartContext";
import Layout from "./shared/Layout";
import { useMutation } from "@tanstack/react-query";
import { addStoreSales } from "../api/store";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
	const { cart, clearCart } = useCart();
	const navigate = useNavigate();

	const calculateTotalPrice = () => {
		return cart.reduce((total, item) => total + item.price * item.quantity, 0);
	};

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

	const { mutate: checkoutMutation } = useMutation({
		mutationKey: ["Checkout"],
		mutationFn: addStoreSales
	});

	const handleCheckout = () => {
		cart.forEach((c) => {
			checkoutMutation({
				customerId: JSON.parse(sessionStorage.getItem("userId")),
				barbershopId: c.barbershop_id,
				itemId: c.id,
				quantity: c.quantity,
				total: c.price * c.quantity
			});
		});
		clearCart();
		notify("Order placed successfully! Cart cleared.");
		navigate("/cart");
	};

	return (
		<Layout>
			<div className="w-1/2">
				<h2 className="text-2xl font-semibold mb-4">Checkout</h2>

				<div className="border p-6 rounded-md">
					{cart.length === 0 ? (
						<p>Your cart is empty. Add items before checking out.</p>
					) : (
						<>
							<ul>
								{cart.map((item) => (
									<li
										key={item.id}
										className="flex justify-between items-center border-b py-2">
										<div>
											<span className="font-semibold">
												{item.item_name} - RM {item.price}
											</span>
											<span className="ml-2 text-gray-500">
												x{item.quantity}
											</span>
										</div>
									</li>
								))}
							</ul>
							<div className="flex justify-between items-center mt-4">
								<span className="font-semibold">Total Price:</span>
								<span className="text-lg font-bold">
									RM {calculateTotalPrice().toFixed(2)}
								</span>
							</div>
							<button
								onClick={handleCheckout}
								className="mt-4 bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600">
								Checkout
							</button>
						</>
					)}
				</div>
			</div>
		</Layout>
	);
};

export default Checkout;
