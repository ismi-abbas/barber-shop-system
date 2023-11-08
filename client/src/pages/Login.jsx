import React, { useState } from "react";
import Layout from "../components/shared/Layout";
import { useMutation } from "@tanstack/react-query";
import { login } from "../api/users";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");

	const navigate = useNavigate();

	const {
		mutateAsync: loginMutation,
		data,
		error,
	} = useMutation({
		mutationFn: login,
	});

	const handleLogin = async () => {
		try {
			await loginMutation({ email, password });

			if (data?.statusCode === 200) {
				navigate("/barbershop");
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Layout>
			<div className="flex min-h-full flex-col items-center justify-center">
				<h1 className="font-bold text-2xl text-center leading-9 text-gray-900">
					Login
				</h1>
				<div className="flex flex-col w-96 gap-4">
					<div className="flex flex-col gap-2">
						<label
							htmlFor="name"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Email
						</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="block w-full p-2 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 active:ring-purple-500 placeholder:text-gray-400 sm:text-sm sm:leading-6"
						/>
					</div>
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

					<div className="">
						<button
							onClick={() => handleLogin()}
							className="w-full p-2 border bg-indigo-600 text-white tracking-wide rounded-lg text-center mt-2 hover:mouse-pointer"
						>
							Login
						</button>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Login;
