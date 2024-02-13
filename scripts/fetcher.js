async function fetchData(url, options = {}) {
	try {
		const response = await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			...options,
		});

		if (!response.ok) {
			throw new Error(`HTTP error: ${response.status}`);
		}

		const data = await response.json(); // Assuming JSON response
		return data;
	} catch (error) {
		console.error(`Error fetching data: ${error}`);
		throw error; // Re-throw to allow for error handling at usage level
	}
}
