import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
	return (
		<div className="flex flex-col min-h-screen">
			<div>
				<Header />
			</div>
			<div className="flex-1 flex flex-col justify-center items-center m-10">
				{children}
			</div>
			<div>
				<Footer />
			</div>
		</div>
	);
};

export default Layout;
