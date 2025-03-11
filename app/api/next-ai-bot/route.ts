import { NextResponse } from "next/server";
import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_MISTRAL_API_KEY;

/**
 * RequestBody represents the structure of the request payload.
 *
 * It contains a single property `message` which is a string
 * expected to be sent in the request.
 */
interface RequestBody {
  message: string;
}

/**
 * AIResponse is the response from the AI service.
 *
 * It contains a single property `choices` which is an array of objects.
 * Each object contains a `message` property which has a `content` string property.
 * The `content` string is the response from the AI service.
 */
interface AIResponse {
  choices: { message: { content: string } }[];
}

/**
 * RequestBody represents the structure of the request payload.
 * It contains a single property `message` which is a string
 * expected to be sent in the request.
 */
interface RequestBody {
  message: string;
}

/**
 * AIResponse is the response from the AI service.
 * It contains a single property `choices` which is an array of objects.
 * Each object contains a `message` property which has a `content` string property.
 * The `content` string is the response from the AI service.
 */
interface AIResponse {
  choices: { message: { content: string } }[];
}

/**
 * Handles a POST request to interact with the AI service.
 * @param req - Incoming request object
 * @returns A response object containing a reply from the AI or an error message
 */
export async function POST(req: Request): Promise<Response> {
  try {
    // Parse the request body
    const body = (await req.json()) as Partial<RequestBody>;
    const userMessage = body.message?.toLowerCase();

    // Validate the user message
    if (!userMessage) {
      return NextResponse.json(
        { error: "⚠️ Message is required." },
        { status: 400 }
      );
    }

    // Check if API key is available
    if (!API_KEY) {
      return NextResponse.json(
        { error: "⚠️ API key is missing." },
        { status: 500 }
      );
    }

    // Prepare the prompt content for the AI service
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
- 💡 Your job is to <b>help users navigate and use Next Bench and answer study questions</b> effectively.  
- 🔍 Use <b>short, clear paragraphs</b> with <b>line breaks important</b> and bold,italics,underline for readability.  
- 😊 Include <b>friendly emojis</b> for engagement.  
- 🛑 If a user asks something UNRELATED, politely give a very brief introduction of what they asked and then say you can only assist with education,study and Next Bench.
- ⚒️ The team is planning to release the site in 3 months.  

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

    // Make a request to the AI service with the prompt and user message
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

    // Return the AI's response, replacing newlines with HTML line breaks
    return NextResponse.json({
      reply: response.data.choices[0].message.content.replace(/\n/g, "<br>"),
    });
  } catch (error: unknown) {
    // Log the error details for debugging
    console.error("❌ API Request Failed:", {
      error: axios.isAxiosError(error)
        ? error.response?.data
        : (error as Error).message,
      status: axios.isAxiosError(error) ? error.response?.status : "Unknown",
    });

    // Return a generic error response
    return NextResponse.json(
      { error: "❌ Failed to get response from Next AI." },
      { status: 500 }
    );
  }
}
