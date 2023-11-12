import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/shared/Layout";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl, login } from "../../api/users";

const BarbershopInfo = () => {
	const { id: shopId } = useParams();

	useEffect(() => {
		console.log(shopId);
	}, []);

	const navigate = useNavigate();

	const {
		data: shopInfo,
		isLoading: shopInfoLoading,
		isError: shopInfoError,
	} = useQuery({
		queryKey: ["shopInfo", shopId],
		queryFn: () => axios.get(`${baseUrl}/shop/${shopId}`),
	});

	if (shopInfo) {
		console.log(shopInfo.data.data);
	}

	const {
		data: barberList,
		isLoading: barberListLoading,
		isError: barberListError,
	} = useQuery({
		queryKey: ["shopBarberList", shopId],
		queryFn: () => axios.get(`${baseUrl}/shop/barber/${shopId}`),
	});

	if (barberList) {
		console.log(barberList.data.data);
	}

	return (
		<Layout>
			<section className="w-full h-full flex flex-col">
				<div>
					<button
						onClick={() => navigate("/barbershop")}
						className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
					>
						Back
					</button>
				</div>
				<div className="mt-4">
					<h1 className="font-medium text-4xl text-gray-900">
						{shopInfo?.data.data[0].name}
					</h1>
					<div className="inline-block mt-4 text-lg tracking-tight">
						<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel
							ipsum, velit, ex beatae harum perferendis veritatis eos veniam
							delectus repellendus explicabo odit, officiis adipisci? Ipsum
							adipisci voluptate asperiores at voluptates.
						</p>
						<div className="flex justify-between gap-4 mt-10">
							<div className="items-center justify-start">
								<img
									className="object-cover h-96 w-96 rounded-lg"
									src="https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
									alt=""
								/>
							</div>
							{/* Barber list */}
							<div className="flex flex-col w-full">
								<div class="flex flex-col w-full">
									<h1 class="sm:text-3xl text-2xl font-medium mb-4 text-gray-900">
										Available barbers
									</h1>
								</div>
								<div class="flex flex-row flex-wrap -m-2">
									{barberList?.data.data.map((barber) => (
										<div class="p-2 lg:w-1/3 md:w-1/2 w-full" key={barber.id}>
											<div class="h-full flex items-center border-gray-200 border p-4 rounded-lg">
												<img
													alt="team"
													class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
													src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
												/>
												<div class="flex-grow">
													<h2 class="text-gray-900 title-font font-medium">
														{barber.name}
													</h2>
													<p class="text-gray-500">Phone: {barber.phone}</p>
												</div>
												<div>
													<button
														onClick={() => navigate(`/book-shop/${shopId}`)}
														className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
													>
														Book Now
													</button>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default BarbershopInfo;
