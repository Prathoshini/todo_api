import express from "express";
import cors from "cors";

import todoRoutes from "./routes/todoRoutes.js";
import assistantRoutes from "./routes/assistantRoutes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/todos", todoRoutes);
app.use("/api/assistant", assistantRoutes);

export default app;