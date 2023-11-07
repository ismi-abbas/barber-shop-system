import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
	return (
		<div className="w-full h-screen bg-white flex flex-col">
			<Header />
			<div className="h-auto">{children}</div>
			<Footer />
		</div>
	);
};

export default Layout;
