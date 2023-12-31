import { useState } from "react";
import Layout from "../components/shared/Layout";
import { useMutation } from "@tanstack/react-query";
import { login } from "../api/manager";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../context/LoginProvider";

const ManagerLogin = () => {
	const { handleLogin: handleLoginContext } = useLogin();
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");

	const navigate = useNavigate();

	const { mutateAsync: loginMutation } = useMutation({
		mutationFn: login,
		mutationKey: ["login"],
		onSuccess: () => {
			handleLoginContext();
			navigate("/appointment");
		}
	});

	const handleLogin = async () => {
		try {
			await loginMutation({ email, password, isManager: true });
		} catch (error) {
			alert(error.message);
		}
	};

	return (
		<Layout>
			<div className="flex flex-col items-center justify-center border-2 border-gray-200 border-opacity-60 px-8 py-20 rounded-lg">
				<h1 className="font-semibold text-3xl text-center leading-9 text-gray-900">
					Barbershop Login
				</h1>
				<div className="flex flex-col w-96 gap-4">
					<div className="flex flex-col gap-2">
						<label
							htmlFor="name"
							className="block text-sm font-medium leading-6 text-gray-900">
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
					<div className="flex flex-col gap-2">
						<label
							htmlFor="name"
							className="block text-sm font-medium leading-6 text-gray-900">
							Password
						</label>
						<input
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							type="password"
							className="block w-full p-2 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 active:ring-purple-500 placeholder:text-gray-400 sm:text-sm sm:leading-6"
						/>
					</div>

					<button
						onClick={() => handleLogin()}
						className="w-full p-2 border bg-indigo-600 text-white tracking-wide rounded-lg text-center mt-2 hover:mouse-pointer">
						Login as Barbershop
					</button>

					<Link
						to="/login"
						className="w-full hover:text-indigo-600 text-gray tracking-wide text-center hover:mouse-pointer underline underline-offset-2">
						Customer Login
					</Link>

					<div className="flex items-center flex-col">
						<Link to="/register/manager">
							<p>
								Dont have an account?{" "}
								<span className="underline underline-offset-2 text-indigo-600 hover:cursor-pointer">
									Register
								</span>{" "}
								here
							</p>
						</Link>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default ManagerLogin;
