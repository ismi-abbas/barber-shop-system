import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Layout from "../components/shared/Layout";
import { registerManager } from "../api/manager";
import { useNavigate } from "react-router-dom";

const ManagerRegister = () => {
	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");

	const { mutateAsync: registerUserMutation } = useMutation({
		mutationFn: registerManager,
		onSuccess: () => {
			navigate("/login/manager");
		}
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
				<h1 className="font-semibold text-2xl text-center text-gray-900">
					Manager Register
				</h1>

				{/* Form */}
				<div className="flex flex-col w-96 gap-4 mt-4">
					<div className="flex flex-col gap-2">
						<label
							htmlFor="name"
							className="block text-sm font-medium leading-6 text-gray-900">
							Manager Name
							<input
								required
								type="text"
								name="name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								className="block w-full p-2 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 active:ring-purple-500 placeholder:text-gray-400 sm:text-sm sm:leading-6"
							/>
						</label>
					</div>

					{/* Email */}
					<div className="flex flex-col">
						<label
							htmlFor="name"
							className="block text-sm font-medium leading-6 text-gray-900">
							Manager Email
							<input
								name="email"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="block w-full p-2 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 active:ring-purple-500 placeholder:text-gray-400 sm:text-sm sm:leading-6"
							/>
						</label>
					</div>

					{/* Phone */}
					<div className="flex flex-col">
						<label
							htmlFor="name"
							className="block text-sm font-medium leading-6 text-gray-900">
							Phone
							<input
								name="phone"
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
								type="tel"
								className="block w-full p-2 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 active:ring-purple-500 placeholder:text-gray-400 sm:text-sm sm:leading-6"
							/>
						</label>
					</div>

					{/* Password */}
					<div className="flex flex-col">
						<label
							htmlFor="name"
							className="block text-sm font-medium leading-6 text-gray-900">
							Password
							<input
								name="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								type="password"
								className="block w-full p-2 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 active:ring-purple-500 placeholder:text-gray-400 sm:text-sm sm:leading-6"
							/>
						</label>
					</div>

					<div className="flex flex-col">
						<label
							htmlFor="name"
							className="block text-sm font-medium leading-6 text-gray-900">
							Confirm Password
							<input
								type="password"
								name="password"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								className="block w-full p-2 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 active:ring-purple-500 placeholder:text-gray-400 sm:text-sm sm:leading-6"
							/>
						</label>
					</div>

					{error && <div className="text-red-500 text-sm">{error}</div>}

					<div>
						<button
							className="w-full p-2 border bg-indigo-600 text-white tracking-wide rounded-lg text-center mt-2 hover:mouse-pointer"
							onClick={handleRegisterUser}>
							Register
						</button>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default ManagerRegister;
