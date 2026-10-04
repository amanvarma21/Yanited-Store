// Yanited Store Express backend entry point.
// Runs independently from the React/Vite frontend.
//   Frontend: http://localhost:5173
//   Backend:  http://localhost:5000

const express = require("express");
const cors = require("cors");

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // allow the React frontend to talk to this API
app.use(express.json()); // parse JSON request bodies


// Root route
app.get("/", (req, res) => {
  res.send("Yanited Store API is running.");
});


// Feature routes
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Yanited Store API running on http://localhost:${PORT}`);
});
