import { useState } from "react";
import Layout from "../components/shared/Layout";
import { useMutation } from "@tanstack/react-query";
import { login } from "../api/users";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../context/LoginProvider";

const Login = () => {
	const { handleLogin: handleLoginContext } = useLogin();
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");

	const navigate = useNavigate();

	const { mutateAsync: loginMutation } = useMutation({
		mutationFn: login,
		onSuccess: () => {
			handleLoginContext();
			navigate("/barbershop");
		}
	});

	const handleLogin = async () => {
		try {
			loginMutation({ email, password }, false);
		} catch (error) {
			alert(error.message);
		}
	};

	return (
		<Layout>
			<div className="flex flex-col items-center justify-center border-2 border-gray-200 border-opacity-60 px-8 py-20 rounded-lg">
				<h1 className="font-semibold text-3xl text-center leading-9 text-gray-900">
					Login
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
							type="email"
							className="block w-full p-2 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 active:ring-purple-500 placeholder:text-gray-400 sm:text-sm sm:leading-6"
						/>
					</div>

					<div className="">
						<button
							onClick={() => handleLogin()}
							className="w-full p-2 border bg-indigo-600 text-white tracking-wide rounded-lg text-center mt-2 hover:mouse-pointer">
							Login
						</button>
					</div>
					<Link to="/login/manager">
						<button className="w-full text-gray hover:text-indigo-600  tracking-wide text-center hover:mouse-pointer underline underline-offset-2">
							Barbershop Login
						</button>
					</Link>
					<div className="flex items-center flex-col">
						<Link to="/register">
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

export default Login;
