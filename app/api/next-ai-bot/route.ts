import { NextResponse } from "next/server";
import axios from "axios";

  /**
   * POST /api/next-ai-bot
   * 
   * The POST handler for the Next AI chatbot route.
   * 
   * @param {Request} req The incoming request object.
   * 
   * @returns {Promise<Response>} A promise that resolves to the response object.
   * 
   * @throws If there is an error with the request, such as a missing or invalid message.
   * @throws If there is an error with the API key, such as it not being present in the environment variables.
   * @throws If there is an error with the Mistral AI API, such as a network error or a bad response.
   */
export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    if (!message) {
      return NextResponse.json(
        { error: "⚠️ Message is required." },
        { status: 400 }
      );
    }

    const API_KEY = process.env.NEXT_PUBLIC_MISTRAL_API_KEY;
    if (!API_KEY) {
      return NextResponse.json(
        { error: "⚠️ API key is missing in .env file." },
        { status: 500 }
      );
    }

    const response = await axios.post(
      "https://api.mistral.ai/v1/chat/completions",
      {
        model: "mistral-small-latest",
        messages: [
          {
            role: "system",
            content: `You are **Next AI**, a professional virtual assistant designed to help users/parents/students with the Next Bench website.  
             -  🚀 Next Bench is an innovative platform designed to help parents find the best schools for their children. It allows users to explore, compare, and evaluate schools based on location, curriculum, and facilities.
             🔍 Key Features:
             🌍 Location-Based Search: Find nearby schools easily.
             📊 Compare Schools: Analyze ratings, reviews, and key features.
             🏫 Detailed School Profiles: Get insights on academics, infrastructure, and extracurriculars.
             🤖 Next AI Assistance: A smart chatbot (created by 🛠 Sonamii) to guide users.
             Next Bench simplifies school selection, making the process faster, smarter, and stress-free for parents.
            - 🛠 **Created by Sonamii** to assist users on **Next Bench**.  
            - 💡 Your job is to **help users navigate and use Next Bench** effectively.  
            - 🎯 Only answer **Next Bench-related questions**.  
            - 🔍 Use **short, clear paragraphs** with **line breaks** for readability.  
            - 😊 Include **friendly emojis** for an engaging experience.  
            - 🛑 If a user asks an unrelated question, politely inform them that you only assist with Next Bench.,
            - 🚨 Render the bold and italic using <b> and <i> and <br/><br/> ie 2 br for line break instead of using markdown. Do not use markdown. Use html tags`,
          
          },
          { role: "user", content: message },
        ],
      },
      { headers: { Authorization: `Bearer ${API_KEY}` } }
    );

    const formatResponse = (text: string) => {
    };

    return NextResponse.json({
      reply: formatResponse(response.data.choices[0].message.content),
    });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error:", error.response ? error.response.data : error.message);
    } else {
      console.error("Error:", error);
    }
    return NextResponse.json(
      { error: "❌ Failed to get response from Next AI." },
      { status: 500 }
    );
  }
}