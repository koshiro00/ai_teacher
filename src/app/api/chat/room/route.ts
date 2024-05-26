import { prisma } from '@/app/_utils/prisma';
import { getCurrentUser } from '@/app/_utils/supabase/getCurrentUser';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { data, error: getUserError } = await getCurrentUser(request);
    if (getUserError) return NextResponse.json({ error: getUserError.message, status: 401 });

    const chatRooms = await prisma.chatRoom.findMany({
      where: {
        profileId: data.user.id,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return NextResponse.json({ status: 'OK', chatRooms }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { data, error: getUserError } = await getCurrentUser(request);
    if (getUserError) return NextResponse.json({ error: getUserError.message, status: 401 });

    const body = await request.json();

    // 新しく作成
    const newChatRoom = await prisma.chatRoom.create({
      data: {
        profileId: data.user.id,
        title: body.message.slice(0, 10),
      },
    });

    //最初のメッセージを設定
    const firstMessage = await prisma.chatMessage.create({
      data: {
        chatRoomId: newChatRoom.id,
        message: body.message,
        role: 'user', // 最初なのでuserで固定
      },
    });

    return NextResponse.json({ status: 'OK', firstMessage }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) return NextResponse.json({ status: error.message }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { data, error: getUserError } = await getCurrentUser(request);
    if (getUserError) return NextResponse.json({ error: getUserError.message, status: 401 });

    await prisma.chatRoom.deleteMany({
      where: {
        profileId: data.user.id,
      },
    });

    return NextResponse.json({ status: 'OK' }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) return NextResponse.json({ status: error.message }, { status: 400 });
  }
}
