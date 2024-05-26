import { prisma } from '@/app/_utils/prisma';
import { getCurrentUser } from '@/app/_utils/supabase/getCurrentUser';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest, { params }: { params: { roomId: string } }) {
  try {
    const { data, error: getUserError } = await getCurrentUser(request);
    if (getUserError) return NextResponse.json({ error: getUserError.message, status: 401 });

    const roomId = params.roomId;
    const body = await request.json();
    const newChatMessage = await prisma.chatMessage.create({
      data: {
        id: body.id,
        chatRoomId: roomId,
        message: body.message,
        role: body.role, // "user" || "system"
      },
    });

    return NextResponse.json({ status: 'OK', newChatMessage }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) return NextResponse.json({ status: error.message }, { status: 400 });
  }
}
