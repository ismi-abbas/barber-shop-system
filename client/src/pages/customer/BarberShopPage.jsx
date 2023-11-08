import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import Layout from "../../components/shared/Layout";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
	borderColor: "green",
	borderWidth: "4px",
};

const BarberShopPage = () => {
	let [color, setColor] = useState("#ffffff");

	const {
		data: barberShop,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["barbershop"],
		queryFn: async () => await axios.get("http://localhost:5640/shop/"),
	});

	return (
		<Layout>
			<div className="flex flex-col items-center p-10">
				<h1 className="font-bold text-4xl">Barbershop List</h1>
				<div className="flex flex-wrap gap-10 mt-4">
					<div className="flex flex-wrap -m-4">
						{isLoading ? (
							<div className="flex flex-col items-center justify-center">
								<ClipLoader
									loading={isLoading}
									cssOverride={override}
									color="white"
									size={100}
								/>
							</div>
						) : (
							barberShop?.data.data.map((shop) => (
								<div className="xl:w-1/4 md:w-1/2 p-4" key={shop.id}>
									<div className="bg-gray-100 p-6 rounded-lg">
										<img
											className="h-40 rounded w-full object-cover object-center mb-6"
											src="https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=2240&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
											alt="content"
										/>
										<h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
											{shop.location}
										</h3>
										<h2 className="text-lg text-gray-900 font-medium title-font mb-4">
											{shop.name}
										</h2>
										<p className="leading-relaxed text-base">
											Fingerstache flexitarian street art 8-bit waistcoat.
											Distillery hexagon disrupt edison bulbche.
										</p>
									</div>
								</div>
							))
						)}
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default BarberShopPage;
