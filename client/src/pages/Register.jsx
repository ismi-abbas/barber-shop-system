import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import Layout from "../components/shared/Layout";
import { registerUser } from "../api/users";

const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("");

	const {
		data: userData,
		isLoading,
		isError,
	} = useQuery({
		queryFn: () => registerUser({ name, email, phone, password }),
		queryKey: ["customer"],
	});

	if (isLoading) {
		return <div>...loading</div>;
	}

	if (isError) {
		return <div>An Error Occured</div>;
	}

	return (
		<Layout>
			<div className="flex min-h-full flex-col items-center justify-center">
				<h1 className="font-bold text-2xl text-center leading-9 text-gray-900">
					Register
				</h1>
				{/* Form */}
				<div className="flex flex-col w-96 gap-4">
					<div className="flex flex-col gap-2">
						<label
							htmlFor="name"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Name
						</label>
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="block w-full p-2 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 active:ring-purple-500 placeholder:text-gray-400 sm:text-sm sm:leading-6"
						/>
					</div>
					{/* Email */}
					<div className="flex flex-col gap-2">
						<label
							htmlFor="name"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Name
						</label>
						<input
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							type="email"
							className="block w-full p-2 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 active:ring-purple-500 placeholder:text-gray-400 sm:text-sm sm:leading-6"
						/>
					</div>
					{/* Phone */}
					<div className="flex flex-col gap-2">
						<label
							htmlFor="name"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Phone
						</label>
						<input
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
							type="email"
							className="block w-full p-2 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 active:ring-purple-500 placeholder:text-gray-400 sm:text-sm sm:leading-6"
						/>
					</div>
					{/* Password */}
					<div className="flex flex-col gap-2">
						<label
							htmlFor="name"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Password
						</label>
						<input
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							type="email"
							className="block w-full p-2 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 active:ring-purple-500 placeholder:text-gray-400 sm:text-sm sm:leading-6"
						/>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Register;
