require("dotenv").config();
const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const client = new OpenAI({
  apiKey: process.env.FUTUREX_API_KEY,
  baseURL: "https://api.futurexailab.com/v1"
});

let chatHistory = [
  { role: "system", content: "You are a friendly AI Study Buddy." }
];

app.post("/ask", async (req, res) => {
  const question = req.body.question;
  if (!question) return res.json({ answer: "Please ask a question." });

  chatHistory.push({ role: "user", content: question });

  const response = await client.responses.create({
    model: "gpt-5-mini",
    input: chatHistory
  });

  const answer =
    response.output?.[0]?.content?.[0]?.text ||
    response.output_text ||
    "AI could not generate an answer.";

  chatHistory.push({ role: "assistant", content: answer });
  res.json({ answer });
});

app.post("/reset", (req, res) => {
  chatHistory = [
    { role: "system", content: "You are a friendly AI Study Buddy." }
  ];
  res.json({ message: "Chat reset done ✅" });
});

/* Use dynamic port for cloud deployment */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`📘 Server running on port ${PORT}`));
