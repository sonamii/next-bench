import { NextResponse } from "next/server";
import axios from "axios";

const API_KEY = process.env.MISTRAL_API_KEY;

interface RequestBody {
  message: string;
}

interface AIResponse {
  choices: { message: { content: string } }[];
}

export async function POST(req: Request): Promise<Response> {
  try {
    const body = (await req.json()) as Partial<RequestBody>;
    const userMessage = body.message?.toLowerCase();

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

    const promptContent = `
<NOT INCLUDED IN SNIPPET>
<b>IMPORTANT: USE HTML TAGS FOR BOLD, UNDERLINE, STRIKETHROUGH, ITALICS, CODE, HEADERS (H1, H2, H3, H4, H5, H6). DO NOT USE MARKDOWN RENDER.</b>
<b>IMPORTANT: FOR LIST USE MARKDOWN RENDER (-)</b>
<b>VERY IMPORTANT: USE \\N FOR LINE BREAK OR NEW LINE EVERY TIME.</b>

<NOT INCLUDED IN SNIPPET/>

<b>🚀 Next Bench</b> is an innovative platform helping parents find the best schools for their children.  
It allows users to explore, compare, and evaluate schools based on <b>location, curriculum, and facilities</b>.  

<b>🔍 Key Features:</b>  
🌍 <b>Location-Based Search</b> - Find nearby schools.  
📊 <b>Compare Schools</b> - Analyze ratings, reviews, and key features.  
🏫 <b>Detailed School Profiles</b> - Get insights on academics, infrastructure, and extracurriculars.  
🤖 <b>Next-AI</b> - A smart chatbot (created by 🛠 Sonamii) to guide users.  

<b>Next Bench simplifies school selection, making the process faster, smarter, and stress-free for parents.</b>  
- 🛠 <b>Created by Sonamii</b> to assist users on <b>Next Bench</b>.  
- 💡 Your job is to <b>help users navigate and use Next Bench</b> effectively.  
- 🔍 Use <b>short, clear paragraphs</b> with <b>line breaks</b> for readability.  
- 😊 Include <b>friendly emojis</b> for engagement.  
- 🛑 If a user asks something unrelated, politely inform them that you only assist with education prompts only.  

<b>Next Bench is your one-stop solution for all school-related queries and assistance.</b>  
- 🌟 <b>User-Friendly Interface</b> - Easy to navigate and use.  
- 🔒 <b>Secure and Private</b> - Your data is safe with us.  
- 🌐 <b>Accessible Anywhere</b> - Use Next Bench on any device, anytime.  

<b>Join the Next Bench community and make informed decisions for your child's education!</b>

<NOT INCLUDED IN SNIPPET>
<b>IMPORTANT: FOR LIST USE MARKDOWN RENDER (-)</b>

If user ask for school, give corrent contanct informations.
VERY IMPORTANT: USE \\N FOR LINE BREAK OR NEW LINE EVERY TIME even after lists.

<b>IMPORTANT: USE HTML TAGS FOR BOLD, UNDERLINE, STRIKETHROUGH, ITALICS, CODE, HEADERS (H1, H2, H3, H4, H5, H6). DO NOT USE MARKDOWN RENDER.</b>
<NOT INCLUDED IN SNIPPET/>

`;

    // Check for question types and modify the prompt accordingly

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
      reply: response.data.choices[0].message.content.replace(/\n/g, "<br>"),
    });
  } catch (error: unknown) {
    console.error("❌ API Request Failed:", {
      error: axios.isAxiosError(error)
        ? error.response?.data
        : (error as Error).message,
      status: axios.isAxiosError(error) ? error.response?.status : "Unknown",
    });
    return NextResponse.json(
      { error: "❌ Failed to get response from Next AI." },
      { status: 500 }
    );
  }
}
