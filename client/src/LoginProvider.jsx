import React, { createContext, useContext, useEffect, useState } from "react";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
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
	};

	return (
		<LoginContext.Provider value={{ isLoggedIn, handleLogin, handleLogout }}>
			{children}
		</LoginContext.Provider>
	);
};

export const useLogin = () => useContext(LoginContext);
