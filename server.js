const express = require("express");
const app = express();

// Best Practice: Versioning or standardizing the route (e.g., /health or /api/health)
app.get("/health", (req, res) => {
	const healthCheck = {
		uptime: process.uptime(),
		message: "OK",
		timestamp: Date.now(),
		// You can also add DB connection status here if applicable
	};

	try {
		res.status(200).json(healthCheck);
	} catch (error) {
		// Catch-all for unexpected internal errors
		healthCheck.message = error;
		res.status(503).json(healthCheck);
	}
});

// Only start the server if this script is run directly (useful for testing)
if (require.main === module) {
	const PORT = process.env.PORT || 3000;
	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
}

module.exports = app;
