import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/shared/Layout";
import { useQuery } from "@tanstack/react-query";
import { getBarberList, getBarberShopInfo } from "../../api/barbershop";

const BarbershopInfo = () => {
	const { id: shopId } = useParams();
	const navigate = useNavigate();

	const { data: shopInfo } = useQuery({
		queryKey: ["shopInfo", shopId],
		queryFn: () => getBarberShopInfo(shopId),
	});

	const { data: barberList } = useQuery({
		queryKey: ["shopBarberList", shopId],
		queryFn: () => getBarberList(shopId),
	});

	return (
		<Layout>
			<section className="w-full h-full flex-col justify-center items-center gap-4 px-20">
				<div className="mt-4">
					<h1 className="font-semibold text-3xl text-gray-900">
						{shopInfo?.data[0].name}
					</h1>
					<p className="text-lg">
						Location:{" "}
						<span className="font-semibold">{shopInfo?.data[0].location} </span>{" "}
					</p>
				</div>
				<div className="flex flex-row gap-4">
					<img
						className="object-cover h-96 w-96 rounded-lg"
						src="https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
						alt=""
					/>
					<div>
						<h2 className="mb-2 text-lg font-medium">Barber List</h2>
						<div className="w-96 flex flex-col bg-gray-100 p-4 rounded-md">
							<ul className="flex flex-col gap-2">
								{barberList?.data.map((barber) => (
									<div key={barber.id} className="flex justify-between">
										<li className="text-base font-normal tracking-tight">
											{barber.name}
										</li>
										<button
											onClick={() => console.log(barber.id)}
											className="items-center bg-indigo-500 border-0 py-1 px-3 focus:outline-none hover:bg-indigo-300 rounded text-sm mt-4 md:mt-0 text-white"
										>
											Book
										</button>
									</div>
								))}
							</ul>
						</div>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default BarbershopInfo;
