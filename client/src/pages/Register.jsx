import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Layout from "../components/shared/Layout";
import { registerUser } from "../api/users";
import { useNavigate } from "react-router-dom";

const Register = () => {
	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");

	const { mutateAsync: registerUserMutation } = useMutation({
		mutationFn: registerUser,
		onSuccess: () => {
			navigate("/login");
		},
	});

	const handleRegisterUser = async () => {
		try {
			if (!name || !password || !phone || !password) {
				setError("Please input all fields");
				return;
			}

			if (password !== confirmPassword) {
				setError("Passwords did not match");
				return;
			}

			await registerUserMutation({ name, email, phone, password });
			setEmail("");
			setName("");
			setPhone("");
			setPassword("");
		} catch (error) {
			console.log(error);
		}
	};

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
							name="name"
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
							Email
						</label>
						<input
							name="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
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
							name="phone"
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
							name="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							type="password"
							className="block w-full p-2 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 active:ring-purple-500 placeholder:text-gray-400 sm:text-sm sm:leading-6"
						/>
					</div>

					<div className="flex flex-col gap-2">
						<label
							htmlFor="name"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Confirm Password
						</label>
						<input
							type="password"
							name="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							className="block w-full p-2 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 active:ring-purple-500 placeholder:text-gray-400 sm:text-sm sm:leading-6"
						/>
					</div>

					{error && <div className="text-red-500 text-sm">{error}</div>}

					<div className="">
						<button
							className="w-full p-2 border bg-indigo-600 text-white tracking-wide rounded-lg text-center mt-2 hover:mouse-pointer"
							onClick={handleRegisterUser}
						>
							Register
						</button>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Register;
