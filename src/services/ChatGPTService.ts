import axios from 'axios';
import config from '../config';
import Translation from '../models/Translation';
import { IUser } from '../models/User';

class ChatGPTService {
  public static getInstance(): ChatGPTService {
    if (!ChatGPTService.instance) {
      ChatGPTService.instance = new ChatGPTService();
    }
    return ChatGPTService.instance;
  }
  private static instance: ChatGPTService;

  public async soundSmarter(user: IUser, options: {
    message: string,
    negatives: string,
    positives: string,
    actor?: string,
    gender?: string,
    tone?: string,
    language?: string,
    to?: string
  }) {
    const prompt = `
    Improve the following message to sound smarter and more sophisticated:

    Message: ${options.message}

    Negatives to avoid: ${options.negatives}

    Positives to include: ${options.positives}

    ${options.actor ? `Actor: ${options.actor}` : ''}
    ${options.gender ? `Gender: ${options.gender}` : ''}
    ${options.tone ? `Tone: ${options.tone}` : ''}
    ${options.language ? `Language: ${options.language}` : ''}
    ${options.to ? `To: ${options.to}` : ''}
    `;

    const translation = await this.query(prompt, [{ content: 'I will only give the message and no other feedback', role: 'assistant' }]);
    const entry = {
      userId: user._id,
      message: options.message,
      translation,
      settings: {
        positives: options.positives,
        negatives: options.negatives,
        actor: options.actor,
        gender: options.gender,
        tone: options.tone,
        language: options.language,
        to: options.to,
      }
    };
    await Translation.insertMany([entry]);

    return entry;
  }

  private async query(prompt: string, messages?: any[]): Promise<string> {
    try {
      const response = await axios.post(
        config.chatGPT.endpoint,
        {
          messages: [...messages, { content: prompt, role: 'user' }],
          model: 'gpt-4o'
        },
        {
          headers: {
            'Authorization': `Bearer ${config.chatGPT.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (
        response.data &&
        response.data.choices &&
        response.data.choices.length > 0
      ) {
        return response.data.choices[0].message.content.trim();
      } else {
        throw new Error('Unexpected response format from OpenAI API');
      }
    } catch (error) {
      console.error('Error querying ChatGPT:', error);
      console.error('Prompt that caused error:', prompt);
      throw error;
    }
  }
}

export default ChatGPTService.getInstance();
