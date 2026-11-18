import express from "express";
import { chatWithAssistant } from "../controllers/assistantController.js";

const router = express.Router();

// AI chat API
router.post("/chat", chatWithAssistant);

export default router;