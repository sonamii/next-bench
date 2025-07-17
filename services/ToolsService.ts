import axios from 'axios';
import AIService from './AIService';

export enum ToolType {
  DATE_CHECKER = 'date_checker',
  INSTITUTION_COMPARISON = 'institution_comparison',
  DOCUMENT_GENERATOR = 'document_generator',
  PDF_FORMATTER = 'pdf_formatter',
  TABULAR_COMPARISON = 'tabular_comparison'
}

export interface DateCheckerParams {
  institutionName?: string;
  examName?: string;
  admissionType?: string;
}

export interface InstitutionComparisonParams {
  institutions: string[];
  criteria?: string[];
}

export interface DocumentGeneratorParams {
  documentType: 'study_plan' | 'application_draft' | 'personal_statement' | 'resume' | 'cover_letter';
  targetInstitution?: string;
  userBackground?: string;
  additionalInfo?: string;
}

export interface PDFFormatterParams {
  content: string;
  title?: string;
  includeHeader?: boolean;
  includeFooter?: boolean;
}

export interface TabularComparisonParams {
  institutions: string[];
  criteria: string[];
}

export interface ToolRequest {
  toolType: ToolType;
  params: DateCheckerParams | InstitutionComparisonParams | DocumentGeneratorParams | PDFFormatterParams | TabularComparisonParams;
}

export class ToolsService {
  public detectToolRequest(message: string): ToolType | null {
    const lowerMessage = message.toLowerCase();
    
    if (
      lowerMessage.includes('when is') || 
      lowerMessage.includes('deadline') || 
      lowerMessage.includes('last date') || 
      lowerMessage.includes('admission date') || 
      lowerMessage.includes('exam date') || 
      lowerMessage.includes('application deadline') ||
      lowerMessage.includes('important dates')
    ) {
      return ToolType.DATE_CHECKER;
    }
    
    if (
      (lowerMessage.includes('compare') && 
       (lowerMessage.includes('school') || lowerMessage.includes('college') || lowerMessage.includes('university'))) ||
      lowerMessage.includes('which is better') ||
      lowerMessage.includes('difference between') ||
      (lowerMessage.includes('vs') && 
       (lowerMessage.includes('school') || lowerMessage.includes('college') || lowerMessage.includes('university')))
    ) {
      return ToolType.INSTITUTION_COMPARISON;
    }
    
    if (
      lowerMessage.includes('create a') || 
      lowerMessage.includes('generate a') || 
      lowerMessage.includes('write a') || 
      lowerMessage.includes('draft a') ||
      lowerMessage.includes('study plan') ||
      lowerMessage.includes('application draft') ||
      lowerMessage.includes('personal statement') ||
      lowerMessage.includes('resume') ||
      lowerMessage.includes('cover letter')
    ) {
      return ToolType.DOCUMENT_GENERATOR;
    }
    
    if (
      lowerMessage.includes('pdf') || 
      lowerMessage.includes('format') || 
      lowerMessage.includes('download') || 
      lowerMessage.includes('printable')
    ) {
      return ToolType.PDF_FORMATTER;
    }
    
    if (
      (lowerMessage.includes('table') && lowerMessage.includes('compare')) ||
      lowerMessage.includes('tabular comparison') ||
      lowerMessage.includes('comparison table') ||
      lowerMessage.includes('side by side')
    ) {
      return ToolType.TABULAR_COMPARISON;
    }
    
    return null;
  }

  public extractDateCheckerParams(message: string): DateCheckerParams {
    const params: DateCheckerParams = {};
    
    // Extract institution name
    const institutionMatch = message.match(/\b(?:at|for|to|in)\s+([A-Za-z\s&]+?)(?:\s+(?:admission|exam|deadline|university|college|school))?\b/i);
    if (institutionMatch) {
      params.institutionName = institutionMatch[1].trim();
    }
    
    // Extract exam name
    const examMatch = message.match(/\b(JEE|NEET|CAT|GATE|GRE|GMAT|SAT|ACT|TOEFL|IELTS|CLAT|AILET|XAT|MAT|CMAT|SNAP|BITSAT|VITEEE|SRMJEEE|COMEDK|KEAM|KCET|WBJEE|UPSEE|MET|SUAT|KIITEE|SITEEE|AMUEEE|CUCET|LPUNEST|PESSAT|AEEE|JIPMER|AIIMS|NATA|JEE Advanced|JEE Main)\b/i);
    if (examMatch) {
      params.examName = examMatch[1];
    }
    
    // Extract admission type
    const admissionMatch = message.match(/\b(undergraduate|graduate|postgraduate|PhD|doctoral|bachelor|master|diploma|certificate|UG|PG)\b/i);
    if (admissionMatch) {
      params.admissionType = admissionMatch[1];
    }
    
    return params;
  }

  public extractInstitutionComparisonParams(message: string): InstitutionComparisonParams {
    const institutions: string[] = [];
    
    // Extract institutions being compared
    const vsPattern = /\b([A-Za-z\s&]+?)\s+(?:vs|versus|or|compared to|compared with|and)\s+([A-Za-z\s&]+?)(?:\s+(?:which|what|how|should|better|best|worse|worst|difference))?\b/i;
    const vsMatch = message.match(vsPattern);
    
    if (vsMatch) {
      institutions.push(vsMatch[1].trim());
      institutions.push(vsMatch[2].trim());
    }
    
    // Extract comparison criteria
    const criteriaPattern = /\b(?:compare|comparing|comparison)\s+(?:based on|using|with|by)\s+([\w\s,]+)\b/i;
    const criteriaMatch = message.match(criteriaPattern);
    
    let criteria: string[] = [];
    if (criteriaMatch) {
      criteria = criteriaMatch[1].split(/,|\sand\s/).map(c => c.trim());
    } else {
      // Default criteria
      criteria = ['fees', 'ranking', 'placement', 'facilities', 'faculty'];
    }
    
    return {
      institutions,
      criteria
    };
  }

  public extractDocumentGeneratorParams(message: string): DocumentGeneratorParams {
    let documentType: DocumentGeneratorParams['documentType'] = 'study_plan';
    
    // Determine document type
    if (message.includes('study plan')) {
      documentType = 'study_plan';
    } else if (message.includes('application') || message.includes('admission')) {
      documentType = 'application_draft';
    } else if (message.includes('personal statement')) {
      documentType = 'personal_statement';
    } else if (message.includes('resume') || message.includes('cv')) {
      documentType = 'resume';
    } else if (message.includes('cover letter')) {
      documentType = 'cover_letter';
    }
    
    // Extract target institution
    const institutionMatch = message.match(/\b(?:for|to|at)\s+([A-Za-z\s&]+?)(?:\s+(?:university|college|school))?\b/i);
    const targetInstitution = institutionMatch ? institutionMatch[1].trim() : undefined;
    
    return {
      documentType,
      targetInstitution,
      userBackground: '',
      additionalInfo: ''
    };
  }

  public async processToolRequest(toolRequest: ToolRequest, userMessage: string): Promise<string> {
    const { toolType, params } = toolRequest;
    
    let systemPrompt = '';
    let searchQuery = '';
    
    switch (toolType) {
      case ToolType.DATE_CHECKER:
        const dateParams = params as DateCheckerParams;
        systemPrompt = `You are helping a user find important dates for ${dateParams.institutionName || 'an educational institution'} ${dateParams.examName ? `related to ${dateParams.examName}` : ''} ${dateParams.admissionType ? `for ${dateParams.admissionType} admissions` : ''}. Format your response with clear headings, bullet points, and highlight the most important dates.`;
        searchQuery = `${dateParams.institutionName || ''} ${dateParams.examName || ''} ${dateParams.admissionType || ''} admission exam important dates deadline`;
        break;
        
      case ToolType.INSTITUTION_COMPARISON:
        const comparisonParams = params as InstitutionComparisonParams;
        systemPrompt = `You are comparing ${comparisonParams.institutions.join(' and ')} based on the following criteria: ${comparisonParams.criteria?.join(', ')}. Provide a detailed comparison with pros and cons for each institution. Use headings, bullet points, and highlight key differences.`;
        searchQuery = `compare ${comparisonParams.institutions.join(' vs ')} ${comparisonParams.criteria?.join(' ')}`;
        break;
        
      case ToolType.DOCUMENT_GENERATOR:
        const docParams = params as DocumentGeneratorParams;
        systemPrompt = `You are generating a ${docParams.documentType.replace('_', ' ')} ${docParams.targetInstitution ? `for ${docParams.targetInstitution}` : ''}. Create a professional, well-structured document that follows standard formatting conventions for this document type.`;
        searchQuery = `${docParams.documentType.replace('_', ' ')} template ${docParams.targetInstitution || ''} education`;
        break;
        
      case ToolType.PDF_FORMATTER:
        systemPrompt = `You are formatting content for PDF download. Create a clean, well-structured document with proper headings, spacing, and formatting that would look good when converted to PDF.`;
        // No search needed for PDF formatting
        break;
        
      case ToolType.TABULAR_COMPARISON:
        const tabularParams = params as TabularComparisonParams;
        systemPrompt = `You are creating a tabular comparison of ${tabularParams.institutions.join(', ')} based on ${tabularParams.criteria.join(', ')}. Create an HTML table with clear headers, rows for each criterion, and cells containing relevant information for each institution. Make sure the table is well-formatted and easy to read.`;
        searchQuery = `compare ${tabularParams.institutions.join(' vs ')} ${tabularParams.criteria.join(' ')}`;
        break;
    }
    
    try {
      const aiResponse = await AIService.getCompletion({
        message: userMessage,
        systemPrompt,
        maxTokens: 1500
      });
      
      return aiResponse.reply;
    } catch (error) {
      console.error('Error processing tool request:', error);
      return 'Sorry, I encountered an error while processing your request. Please try again.';
    }
  }
}

export default new ToolsService();