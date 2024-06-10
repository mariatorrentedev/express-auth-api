import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import { PORT, NODE_ENV } from "./config";
import userRoutes from "./routes/user";
import authRoutes from "./routes/auth";
import blogRoutes from "./routes/blog";

// The minimal output for production, Standard Apache for dev.
const morganOption = NODE_ENV === "production" ? "tiny" : "common";

const app = express();

app.use(express.json());
// Logger middleware.
app.use(morgan(morganOption));
// Set HTTP response headers.
app.use(helmet());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/blog", blogRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
