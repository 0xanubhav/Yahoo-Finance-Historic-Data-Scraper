const express = require("express");
const forexRoutes = require("./routes/forexRoutes");
const db = require("./db/db");
const cronJob = require("./cron/cronJob");

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use("/api", forexRoutes);

// Test route to verify server is working
app.get("/test", (req, res) => {
  res.send("Server is running and test route is working!");
});
// Initialize the database
db.init();

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Start CRON job for periodic scraping
cronJob.start();
