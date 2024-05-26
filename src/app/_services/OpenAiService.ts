import { gptCharacter, gptModel } from '@/app/_constants/openAi';
import { Server as SocketServer } from 'socket.io';
import OpenAI from 'openai';

export type GPTMessages = {
  role: 'assistant' | 'user' | 'system';
  content: string;
}[];

export class OpenAiService {
  /** GPTからの解答を取得 */
  static async getGPTAnswer(
    messages: GPTMessages,
    io: SocketServer,
    clientId: string
  ): Promise<string | undefined> {
    try {
      if (messages.length === 0) return '';

      const openai = new OpenAI({ apiKey: process.env.OPENAI_SECRET_KEY });
      const stream = openai.beta.chat.completions.stream({
        model: gptModel,
        messages: [{ role: 'system', content: gptCharacter }, ...messages],
        stream: true,
        temperature: 0.5,
      });

      // 非同期でAIからの一文字ずつの回答が繰り返し返却されるので for + async で対応
      const getAnswer = async () => {
        for await (const message of stream) {
          io.to(clientId).emit('message', message.choices[0].delta.content);
        }
      };

      await getAnswer();
      io.to(clientId).emit('message', 'end');
      return;
    } catch (error) {
      if (error instanceof Error) {
        // OpenAIのエラーコード
        const message = error.message;
        if (message.includes('Rate limit exceeded')) {
          return '利用上限に達しました';
        } else if (message.includes('Model not found')) {
          return '指定されたモデルが見つかりません';
        } else if (message.includes('Invalid request')) {
          return '無効なリクエストです';
        } else {
          // その他のエラー
          return `予期せぬエラーが発生しました: ${message}`;
        }
      } else {
        return '予期せぬエラーが発生しました';
      }
    }
  }
}
