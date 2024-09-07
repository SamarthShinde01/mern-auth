import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
const PORT = process.env.PORT;
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use("/api/users", userRoutes);

app.get("/", (req, res) => res.send("server is live"));

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
