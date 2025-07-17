import { NextResponse } from "next/server";
import AIService from "@/services/AIService";
import ToolsService, { DateCheckerParams, InstitutionComparisonParams, DocumentGeneratorParams, PDFFormatterParams, TabularComparisonParams } from "@/services/ToolsService";

interface RequestBody {
  message: string;
}

function isContentAppropriate(message: string): boolean {
  const inappropriateKeywords = [
    'sex', 'sexual', 'porn', 'adult', 'xxx', 'nude', 'naked', 'erotic', 'dating', 'hookup',
    'violence', 'weapon', 'drug', 'alcohol', 'gambling', 'hack', 'illegal', 'criminal',
    'suicide', 'self-harm', 'politics', 'election', 'vote', 'government',
    'religion', 'god', 'allah', 'jesus', 'hindu', 'muslim', 'christian', 'race', 'racism'
  ];

  const lowerMessage = message.toLowerCase();
  return !inappropriateKeywords.some(keyword => lowerMessage.includes(keyword));
}

export async function POST(req: Request): Promise<Response> {
  try {
    const body = (await req.json()) as Partial<RequestBody>;
    const userMessage = body.message || '';

    if (!userMessage) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    // Content filtering check
    if (!isContentAppropriate(userMessage)) {
      return NextResponse.json({
        reply: "I'm designed to help with educational queries and Next Bench services only. Please ask about schools, colleges, courses, admissions, or career guidance. 📚✨"
      });
    }

    const toolType = ToolsService.detectToolRequest(userMessage);
    
    if (toolType) {
      let toolParams: DateCheckerParams | InstitutionComparisonParams | DocumentGeneratorParams | PDFFormatterParams | TabularComparisonParams = {};
      
      switch (toolType) {
        case 'date_checker':
          toolParams = ToolsService.extractDateCheckerParams(userMessage);
          break;
        case 'institution_comparison':
          toolParams = ToolsService.extractInstitutionComparisonParams(userMessage);
          break;
        case 'document_generator':
          toolParams = ToolsService.extractDocumentGeneratorParams(userMessage);
          break;
      }
      
      const toolResponse = await ToolsService.processToolRequest(
        { toolType, params: toolParams },
        userMessage
      );
      
      return NextResponse.json({
        reply: toolResponse,
        toolUsed: toolType
      });
    }
    
    const aiResponse = await AIService.getCompletion({
      message: userMessage
    });

    return NextResponse.json({
      reply: aiResponse.reply
    });
  } catch (error: unknown) {
    console.error("API Request Failed:", error);

    return NextResponse.json(
      { error: "Failed to get response from AI." },
      { status: 500 }
    );
  }
}
