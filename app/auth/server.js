//Uploading data in roadmaps.json later
require("dotenv").config();
const express = require("express");
const axios = require("axios");
const fs = require("fs");

const app = express();
app.use(express.json());

const API_KEY = process.env.MISTRAL_API_KEY;

// Load roadmap data
let roadmapData = {};
try {
  roadmapData = JSON.parse(fs.readFileSync("roadmaps.json", "utf8"));
} catch (error) {
  console.error("⚠️ Error loading roadmaps.json:", error.message);
}

// Endpoint to handle Next AI queries
app.post("/ask-next-ai", async (req, res) => {
  try {
    const userMessage = req.body.message?.toLowerCase();

    if (!userMessage) {
      return res.status(400).json({ error: "⚠️ Message is required." });
    }

    if (!API_KEY) {
      return res.status(500).json({ error: "⚠️ API key is missing in .env file." });
    }

    // Check if the user asks for a roadmap
    const roadmapKeys = Object.keys(roadmapData);
    const matchedRoadmap = roadmapKeys.find((key) =>
      userMessage.includes(key.toLowerCase())
    );

    // System prompt for AI
    let promptContent = `
🚀 **Next Bench** is an innovative platform helping parents find the best schools for their children.  
It allows users to explore, compare, and evaluate schools based on **location, curriculum, and facilities**.  

🔍 **Key Features:**  
🌍 **Location-Based Search** – Find nearby schools.  
📊 **Compare Schools** – Analyze ratings, reviews, and key features.  
🏫 **Detailed School Profiles** – Get insights on academics, infrastructure, and extracurriculars.  
🤖 **Next AI Assistance** – A smart chatbot (created by 🛠 Sonamii) to guide users.  

**Next Bench simplifies school selection, making the process faster, smarter, and stress-free for parents.**  

- 🛠 **Created by Sonamii** to assist users on **Next Bench**.  
- 💡 Your job is to **help users navigate and use Next Bench** effectively.  
- 🎯 Only answer **Next Bench-related questions**.  
- 🔍 Use **short, clear paragraphs** with **line breaks** for readability.  
- 😊 Include **friendly emojis** for engagement.  
- 🛑 If a user asks something unrelated, politely inform them that you only assist with Next Bench.  
    `;

    // If user asks for a roadmap, add roadmap-specific instructions
    if (matchedRoadmap) {
      promptContent += `\n\n📌 **User requested the "${matchedRoadmap}" roadmap.**  
🔹 Below is the raw roadmap data:  
\`\`\`json  
${JSON.stringify(roadmapData[matchedRoadmap], null, 2)}  
\`\`\`  
🔹 **Your task:** Convert this raw data into a **step-by-step, structured roadmap**.  
🔹 Use **bullet points** and **clear formatting** so it's easy to understand.  
🔹 Keep it **concise and engaging** with emojis where relevant.  
      `;
    } else {
      promptContent += `\n\n💬 **User asked:** "${userMessage}".  
👉 **Answer based on your Next Bench knowledge.**  
      `;
    }

    // Send request to Mistral AI
    const response = await axios.post(
      "https://api.mistral.ai/v1/chat/completions",
      {
        model: "mistral-small-latest",
        messages: [
          { role: "system", content: promptContent },
          { role: "user", content: userMessage },
        ],
      },
      { headers: { Authorization: `Bearer ${API_KEY}` } }
    );

    res.json({ reply: response.data.choices[0].message.content });

  } catch (error) {
    console.error("❌ Error:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "❌ Failed to get response from Next AI." });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
