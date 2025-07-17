import axios from 'axios';

interface AIRequestOptions {
  message: string;
  systemPrompt?: string;
  maxTokens?: number;
}

interface AIResponse {
  reply: string;
  toolCalls?: any[];
}

export class AIService {
  private togetherApiKey: string;
  private serpApiKey: string;
  private model: string;

  constructor() {
    this.togetherApiKey = process.env.TOGETHER_API_KEY || '';
    this.serpApiKey = process.env.SERP_API_KEY || '';
    this.model = process.env.AI_MODEL || 'mistralai/Mixtral-8x7B-Instruct-v0.1';

    if (!this.togetherApiKey || !this.serpApiKey) {
      throw new Error('Required API keys are missing');
    }
  }

  private generateSystemPrompt(customPrompt?: string): string {
    const basePrompt = `
You are Next-AI, an educational assistant for Next Bench platform.

Next Bench helps students find and compare schools, colleges, and universities.
Provide helpful information about educational institutions, admissions, and academic guidance.

Respond with:
- Clear, concise answers
- Use HTML tags for formatting (bold, italic, underline)
- Include emojis when appropriate
- Keep responses friendly and informative
`;

    return customPrompt || basePrompt;
  }

  private async fetchSearchResults(query: string): Promise<string> {
    try {
      const response = await axios.get('https://serpapi.com/search', {
        params: {
          q: query,
          api_key: this.serpApiKey,
          location: 'India',
          hl: 'en',
        }
      });

      const results = response.data.organic_results || [];
      const topResults = results.slice(0, 3);

      let searchText = 'Search Results:\n';
      for (const result of topResults) {
        searchText += `${result.title}\n${result.snippet || ''}\nSource: ${result.link}\n\n`;
      }

      return searchText;
    } catch (error) {
      console.error('Search API Error:', error);
      return '';
    }
  }

  public async getCompletion(options: AIRequestOptions): Promise<AIResponse> {
    const { message, systemPrompt, maxTokens = 2048 } = options;

    try {
      const prompt = this.generateSystemPrompt(systemPrompt);
      const searchResults = await this.fetchSearchResults(message);

      const combinedPrompt = searchResults
        ? `${prompt}\n\nRelevant information:\n${searchResults.slice(0, 1500)}\nUse this information to help answer the user's question.`
        : prompt;

      const messages = [
        { role: 'system', content: combinedPrompt },
        { role: 'user', content: message }
      ];

      const response = await axios.post(
        'https://api.together.xyz/v1/chat/completions',
        {
          model: this.model,
          messages,
          max_tokens: maxTokens,
          temperature: 0.7,
        },
        {
          headers: {
            'Authorization': `Bearer ${this.togetherApiKey}`,
            'Content-Type': 'application/json',
          }
        }
      );

      const reply = response.data?.choices?.[0]?.message?.content || 'No response available.';

      return {
        reply: reply.replace(/\n/g, '<br>'),
      };

    } catch (error: any) {
      console.error('AI Service Error:', error.response?.data || error.message);
      throw new Error('Failed to get AI response');
    }
  }
}

export default new AIService();
