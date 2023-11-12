import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BarberShopPage from "./pages/customer/BarberShopPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import About from "./pages/customer/About";
import Appointment from "./pages/customer/Appointment";
import ProtectedRoute from "./protectedRoute";
import { LoginProvider } from "./LoginProvider";
import Features from "./pages/Features";
import Reviews from "./pages/Reviews";
import Contacts from "./pages/Contacts";
import BarbershopInfo from "./pages/customer/BarbershopInfo";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<LoginProvider>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/barbershop" element={<BarberShopPage />} />
					<Route path="/about" element={<About />} />
					<Route path="/features" element={<Features />} />
					<Route path="/reviews" element={<Reviews />} />
					<Route path="/contact" element={<Contacts />} />
					<Route path="/shop-info/:id" element={<BarbershopInfo />} />

					<Route
						path="/book"
						element={
							<ProtectedRoute>
								<Appointment />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</LoginProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

export default App;
