import { NextResponse } from "next/server";
import axios from "axios";
import roadmaps from "./roadmaps.json";

const API_KEY = process.env.NEXT_PUBLIC_MISTRAL_API_KEY;

interface RequestBody {
  message: string;
}

interface AIResponse {
  choices: { message: { content: string } }[];
}

export async function POST(req: Request): Promise<Response> {
  try {
    const { message }: RequestBody = await req.json();
    const userMessage = message?.toLowerCase();

    if (!userMessage) {
      return NextResponse.json(
        { error: "⚠️ Message is required." },
        { status: 400 }
      );
    }

    if (!API_KEY) {
      return NextResponse.json(
        { error: "⚠️ API key is missing." },
        { status: 500 }
      );
    }

    let promptContent = `
    
    **IMPORTANT: Use HTML tags for <b></b><i></i><u></u> instead of rendering it as markdown**
  
  🚀 **Next Bench** is an innovative platform helping parents find the best schools for their children.  
  It allows users to explore, compare, and evaluate schools based on **location, curriculum, and facilities**.  

  🔍 **Key Features:**  
  🌍 **Location-Based Search** - Find nearby schools.  
  📊 **Compare Schools** - Analyze ratings, reviews, and key features.  
  🏫 **Detailed School Profiles** - Get insights on academics, infrastructure, and extracurriculars.  
  🤖 **Next-AI** - A smart chatbot (created by 🛠 Sonamii) to guide users.  

  **Next Bench simplifies school selection, making the process faster, smarter, and stress-free for parents.**  

  - 🛠 **Created by Sonamii** to assist users on **Next Bench**.  
  - 💡 Your job is to **help users navigate and use Next Bench** effectively.  
  - 🎯 Only answer **Next Bench-related questions**.  
  - 🔍 Use **short, clear paragraphs** with **line breaks** for readability.  
  - 😊 Include **friendly emojis** for engagement.  
  - 🛑 If a user asks something unrelated, politely inform them that you only assist with Next Bench.  

  **Next Bench is your one-stop solution for all school-related queries and assistance.**  
  - 🌟 **User-Friendly Interface** - Easy to navigate and use.  
  - 🔒 **Secure and Private** - Your data is safe with us.  
  - 🌐 **Accessible Anywhere** - Use Next Bench on any device, anytime.  

  **IMPORTANT: Use HTML tags for <b></b><i></i><u></u> instead of rendering it as markdown**

  **Join the Next Bench community and make informed decisions for your child's education!**`;

    const response = await axios.post<AIResponse>(
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

    return NextResponse.json({
      reply: response.data.choices[0].message.content,
    });
  } catch (error: unknown) {
    console.error(
      "❌ Error:",
      axios.isAxiosError(error)
        ? error.response?.data
        : (error as Error).message
    );
    return NextResponse.json(
      { error: "❌ Failed to get response from Next AI." },
      { status: 500 }
    );
  }
}
