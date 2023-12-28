import { createContext, useReducer, useContext } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
	switch (action.type) {
		case "ADD_ITEM": {
			const existingItemIndex = state.items.findIndex(
				(item) => item.id === action.payload.id
			);

			if (existingItemIndex !== -1) {
				const updatedItems = [...state.items];
				updatedItems[existingItemIndex].quantity += 1;

				return {
					...state,
					items: updatedItems
				};
			} else {
				return {
					...state,
					items: [...state.items, { ...action.payload, quantity: 1 }]
				};
			}
		}

		case "REMOVE_ITEM": {
			const updatedItems = state.items.map((item) =>
				item.id === action.payload.id
					? { ...item, quantity: Math.max(0, item.quantity - 1) }
					: item
			);

			return {
				...state,
				items: updatedItems.filter((item) => item.quantity > 0)
			};
		}

		case "CLEAR_CART":
			return {
				...state,
				items: []
			};

		default:
			return state;
	}
};

const CartProvider = ({ children }) => {
	const [cartState, dispatch] = useReducer(cartReducer, { items: [] });

	const addItem = (item) => {
		dispatch({ type: "ADD_ITEM", payload: item });
	};

	const removeItem = (item) => {
		dispatch({ type: "REMOVE_ITEM", payload: item });
	};

	const clearCart = () => {
		dispatch({ type: "CLEAR_CART" });
	};

	return (
		<CartContext.Provider
			value={{ cart: cartState.items, addItem, removeItem, clearCart }}>
			{children}
		</CartContext.Provider>
	);
};

const useCart = () => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error("useCart must be used within a CartProvider");
	}
	return context;
};

export { CartProvider, useCart };
