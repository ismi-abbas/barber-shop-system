import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<header className="text-gray-600 body-font">
			<div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
				<a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0 cursor-pointer">
					<span className="ml-3 text-xl">
						<Link to="/">BarberBook.co</Link>
					</span>
				</a>
				<nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
					<Link className="mr-5 hover:text-gray-900" to="/about">
						About
					</Link>
					<Link className="mr-5 hover:text-gray-900" to="/feautures">
						Features
					</Link>
					<Link className="mr-5 hover:text-gray-900" to="/reviews">
						Reviews
					</Link>
					<Link className="mr-5 hover:text-gray-900" to="/contact">
						Contact
					</Link>
					<Link className="mr-5 hover:text-gray-900" to="/book">
						Book Now
					</Link>
					<Link className="mr-5 hover:text-gray-900" to="/barbershop">
						Barbershop
					</Link>
				</nav>
				<div className="flex flex-row gap-4">
					<Link to="/register">
						<button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
							Register
						</button>
					</Link>

					<Link to="/login">
						<button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
							Login
						</button>
					</Link>
				</div>
			</div>
		</header>
	);
};

export default Header;
