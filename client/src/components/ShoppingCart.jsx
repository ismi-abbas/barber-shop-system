import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Layout from "./shared/Layout";

const ShoppingCart = () => {
	const { cart, removeItem, clearCart } = useCart();

	const calculateTotalPrice = () => {
		return cart.reduce((total, item) => total + item.price * item.quantity, 0);
	};

	return (
		<Layout>
			<div className="w-1/2">
				<h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>

				<div className="border p-6 rounded-md">
					{cart.length === 0 ? (
						<p>Your cart is empty.</p>
					) : (
						<>
							<ul>
								{cart.map((item, index) => (
									<li
										key={item.id}
										className="flex justify-between items-center border-b py-2">
										<div>
											<span className="font-base mr-2">{index + 1}.</span>
											<span className="font-semibold">
												{item.item_name} - RM {item.price}
											</span>
											<span className="ml-2 text-gray-500">
												x{item.quantity}
											</span>
										</div>
										<button
											onClick={() => removeItem(item)}
											className="text-red-600 hover:text-red-700 ml-4">
											Remove
										</button>
									</li>
								))}
							</ul>
							<div className="flex justify-between items-center mt-4">
								<span className="font-semibold">Total Price:</span>
								<span className="text-lg font-bold">
									RM {calculateTotalPrice().toFixed(2)}
								</span>
							</div>
							<div className="flex space-x-2">
								<button
									onClick={clearCart}
									className="mt-4 bg-red-600 text-white px-2 py-1 rounded-md hover:bg-red-700">
									Clear Cart
								</button>

								<Link
									className="mt-4 text-gray-900 inline-flex items-center hover:underline"
									to="/checkout">
									Proceed to Checkout
								</Link>
							</div>
						</>
					)}
				</div>
			</div>
		</Layout>
	);
};

export default ShoppingCart;
