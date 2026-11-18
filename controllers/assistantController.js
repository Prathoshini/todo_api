
import { GoogleGenAI } from "@google/genai";

export const chatWithAssistant = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please enter a message"
      });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: message
    });

    return res.status(200).json({
      success: true,
      reply: response.text
    });

  } catch (error) {
  console.error("Gemini API Error:", error);

  return res.status(error.status || 500).json({
    success: false,
    message:
      error.status === 503
        ? "Gemini is temporarily busy. Please try again after some time."
        : "Something went wrong while connecting to Gemini."
  });
}
};
