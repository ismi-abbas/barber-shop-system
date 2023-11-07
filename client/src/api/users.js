export const registerUser = async (userData) => {
	try {
		const response = await fetch("http://localhost:5640", {
			method: "POST",
			headers: {
				"Content-Type": "application/json", // Assuming userData is in JSON format
			},
			body: JSON.stringify(userData),
		});

		if (response.ok) {
			const data = await response.json();
			console.log("Data:", data);
		} else {
			throw new Error("Failed to register user");
		}
	} catch (error) {
		// Handle any network errors or exceptions
		console.error("Error:", error);
	}
};
