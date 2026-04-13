import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from API" });
});

const PORT = process.env.PORT || 5000;

export default app;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});