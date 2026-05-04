const express = require("express");
const app = express();

// Best Practice: Versioning or standardizing the route (e.g., /health or /api/health)
app.get("/health", (req, res) => {
	try {
		res.status(200).json({
			success: true,
			status: 200,
			message: "OK",
			data: {
				uptime: process.uptime(),
			},
			timestamp: Date.now(),
		});
	} catch (error) {
		// Catch-all for unexpected internal errors
		res.status(503).json({
			success: false,
			status: 503,
			message: "Service Unavailable",
			error: error.message,
			timestamp: Date.now(),
		});
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
