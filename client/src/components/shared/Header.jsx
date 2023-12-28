import { Link, NavLink } from "react-router-dom";
import { useLogin } from "../../context/LoginProvider";

const Header = () => {
	const { isLoggedIn, handleLogout } = useLogin();
	const isManager = JSON.parse(sessionStorage.getItem("isManager"));

	return (
		<header className="text-gray-600 body-font">
			<div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
				<div className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0 cursor-pointer">
					<span className="ml-3 text-xl">
						<Link
							to={
								!isLoggedIn ? "/" : isManager ? "/appointment" : "/barbershop"
							}>
							BarberBook
						</Link>
					</span>
				</div>
				<nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
					{isLoggedIn ? (
						isManager === true ? (
							<ManagerNavbar />
						) : (
							<CustomerNavbar />
						)
					) : (
						<Navbar />
					)}
				</nav>

				<div className="flex flex-row gap-4">
					{!isLoggedIn ? (
						<button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
							<Link to="/register">Register</Link>
						</button>
					) : (
						<></>
					)}

					{isLoggedIn ? (
						<button
							onClick={() => handleLogout()}
							className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
							Logout
						</button>
					) : (
						<Link to="/login">
							<button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
								Login
							</button>
						</Link>
					)}
				</div>
			</div>
		</header>
	);
};

const CustomerNavbar = () => {
	const activeClass = "border-b-2 border-indigo-600 text-indigo-600 px-2";

	return (
		<div className="gap-4 flex items-center">
			<NavLink
				className={({ isActive }) => (isActive ? activeClass : "px-2")}
				to="/barbershop">
				Barbershops
			</NavLink>
			<NavLink
				className={({ isActive }) => (isActive ? activeClass : "px-2")}
				to="/store">
				Store
			</NavLink>
			<NavLink
				className={({ isActive }) => (isActive ? activeClass : "px-2")}
				to="/booking">
				Bookings
			</NavLink>
			<NavLink
				className={({ isActive }) => (isActive ? activeClass : "px-2")}
				to="/cart">
				Cart
			</NavLink>
		</div>
	);
};

const ManagerNavbar = () => {
	const activeClass = "border-b-2 border-indigo-600 text-indigo-600 px-2";
	return (
		<div className="gap-4 flex items-center">
			<NavLink
				// className="mr-5 hover:text-gray-900"
				className={({ isActive }) => (isActive ? activeClass : "px-2")}
				to="/appointment">
				Appointments
			</NavLink>
			<NavLink
				className={({ isActive }) => (isActive ? activeClass : "px-2")}
				to="/manage-shop">
				Manage
			</NavLink>
			<NavLink
				className={({ isActive }) => (isActive ? activeClass : "px-2")}
				to="/analytics">
				Analytics
			</NavLink>
		</div>
	);
};

const Navbar = () => {
	const activeClass = "border-b-2 border-indigo-600 text-indigo-600 px-2";
	return (
		<div className="gap-4 flex items-center">
			<NavLink
				className={({ isActive }) => (isActive ? activeClass : "px-2")}
				to="/about">
				About
			</NavLink>
			<NavLink
				className={({ isActive }) => (isActive ? activeClass : "px-2")}
				to="/features">
				Features
			</NavLink>
			<NavLink
				className={({ isActive }) => (isActive ? activeClass : "px-2")}
				to="/reviews">
				Reviews
			</NavLink>
			<NavLink
				className={({ isActive }) => (isActive ? activeClass : "px-2")}
				to="/contact">
				Contact
			</NavLink>
		</div>
	);
};

export default Header;
