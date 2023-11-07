import React from "react";
import Layout from "../components/shared/Layout";

const Home = () => {
	return (
		<Layout>
			<div className="flex flex-col items-center">
				<div className="font-extrabold text-4xl">Welcome to Barbershop.co</div>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque sit
					labore cum fugiat odio iste? Qui vero quas incidunt. Atque officia non
					labore quis odit cumque magni sunt eaque! Ut?
				</p>
				<div className="w-full flex justify-center h-96 mt-4">
					<img
						className="object-cover"
						height={400}
						width={400}
						src="https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
						alt="barber"
					/>
				</div>
			</div>
		</Layout>
	);
};

export default Home;
