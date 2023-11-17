import { Navigate, useLocation } from "react-router-dom";
import { useLogin } from "./context/LoginProvider";

const ProtectedRoute = ({ children }) => {
	const { isLoggedIn } = useLogin();
	let location = useLocation();

	if (!isLoggedIn) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}
	return children;
};

export default ProtectedRoute;
