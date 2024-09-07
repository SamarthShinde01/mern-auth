import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
const PORT = process.env.PORT;
import userRoutes from "./routes/userRoutes.js";

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //this will allow us to send formData

app.use("/api/users", userRoutes);

app.get("/", (req, res) => res.send("server is live"));

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
