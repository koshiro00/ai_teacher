import type { NextApiRequest, NextApiResponse } from 'next';
import type { Socket as NetSocket } from 'net';
import type { Server as HttpServer } from 'http';
import { Server as SocketServer } from 'socket.io';
import { GPTMessages, OpenAiService } from '@/app/_services/OpenAiService';

export type ReseponseWebSocket = NextApiResponse & {
  socket: NetSocket & { server: HttpServer & { io?: SocketServer } };
};

export default async function SocketHandler(req: NextApiRequest, res: ReseponseWebSocket) {
  if (req.method !== 'POST') return res.status(405).end();
  if (res.socket.server.io) return res.send('既にwebSocketサーバーへ接続されています');

  /* socketが未設定の場合、インスタンス化 */
  const io = new SocketServer(res.socket.server, { addTrailingSlash: false });

  // 接続
  io.on('connection', (socket) => {
    const clientId = socket.id;

    // メッセージ受信
    socket.on('message', async (chatMessages: GPTMessages) => {
      // openAIへ接続し、AIの応答をクライアントに送信
      await OpenAiService.getGPTAnswer(chatMessages, io, clientId);
    });

    // 切断
    socket.on('disconnect', () => {
      // console.log('webSocketサーバーから切断されました。');
    });
  });

  res.socket.server.io = io;
  res.send('初回接続: webSocketサーバーの設定完了');
}
