import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BarberShopPage from "./pages/customer/BarberShopPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import About from "./pages/About";
import Appointment from "./pages/barber/Appointment";
import { LoginProvider } from "./context/LoginProvider";
import Features from "./pages/Features";
import Reviews from "./pages/Reviews";
import Contacts from "./pages/Contacts";
import BarbershopInfo from "./pages/customer/BarbershopInfo";
import BookingPage from "./pages/customer/BookingPage";
import NotFound from "./pages/NotFound";
import ManagerLogin from "./pages/ManagerLogin";
import ShopManagement from "./pages/barber/ShopManagement";
import Analytics from "./pages/barber/Analytics";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<LoginProvider>
				<Routes>
					<Route path="*" element={<NotFound />} />
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/barbershop" element={<BarberShopPage />} />
					<Route path="/about" element={<About />} />
					<Route path="/features" element={<Features />} />
					<Route path="/reviews" element={<Reviews />} />
					<Route path="/contact" element={<Contacts />} />
					<Route path="/shop-info/:id" element={<BarbershopInfo />} />
					<Route path="/appointment" element={<Appointment />} />
					<Route path="/book" element={<BookingPage />} />
					<Route path="/book-barber/:barberId" element={<BookingPage />} />
					<Route path="/login/manager" element={<ManagerLogin />} />
					<Route path="/booking" element={<BookingPage />} />
					<Route path="/manage-shop" element={<ShopManagement />} />
					<Route path="/analytics" element={<Analytics />} />
				</Routes>
			</LoginProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

export default App;
