import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
	const navigate = useNavigate();
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const token = sessionStorage.getItem("token");
		if (!token) {
			return setIsLoggedIn(false);
		} else {
			setIsLoggedIn(true);
		}
	}, []);

	const handleLogin = () => {
		setIsLoggedIn(true);
	};

	const handleLogout = () => {
		setIsLoggedIn(false);
		sessionStorage.clear();
		navigate("/");
	};

	return (
		<LoginContext.Provider value={{ isLoggedIn, handleLogin, handleLogout }}>
			{children}
		</LoginContext.Provider>
	);
};

export const useLogin = () => useContext(LoginContext);
