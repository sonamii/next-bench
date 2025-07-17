import { NextResponse } from "next/server";
import AIService from "@/services/AIService";
import ToolsService, { DateCheckerParams, InstitutionComparisonParams, DocumentGeneratorParams, PDFFormatterParams, TabularComparisonParams } from "@/services/ToolsService";

interface RequestBody {
  message: string;
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
