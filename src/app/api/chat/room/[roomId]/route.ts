import { prisma } from '@/app/_utils/prisma';
import { getCurrentUser } from '@/app/_utils/supabase/getCurrentUser';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { roomId: string } }) {
  try {
    const { data, error: getUserError } = await getCurrentUser(request);
    if (getUserError) return NextResponse.json({ error: getUserError.message, status: 401 });

    const roomId = params.roomId;
    const chatRoom = await prisma.chatRoom.findUnique({
      where: {
        id: roomId,
        profileId: data.user.id,
      },
      include: {
        chatMessage: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });

    return NextResponse.json({ status: 'OK', chatRoom }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) return NextResponse.json({ status: error.message }, { status: 400 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { roomId: string } }) {
  try {
    const { data, error: getUserError } = await getCurrentUser(request);
    if (getUserError) return NextResponse.json({ error: getUserError.message, status: 401 });

    const roomId = params.roomId;
    const body = await request.json();

    const newChatRoom = await prisma.chatRoom.update({
      where: {
        id: roomId,
        profileId: data.user.id,
      },
      data: {
        title: body.newTitle,
      },
    });

    return NextResponse.json({ status: 'OK', newChatRoom: newChatRoom }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) return NextResponse.json({ status: error.message }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { roomId: string } }) {
  try {
    const { data, error: getUserError } = await getCurrentUser(request);
    if (getUserError) return NextResponse.json({ error: getUserError.message, status: 401 });

    const roomId = params.roomId;
    await prisma.chatRoom.delete({
      where: {
        id: roomId,
        profileId: data.user.id,
      },
    });

    return NextResponse.json({ status: 'OK' }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) return NextResponse.json({ status: error.message }, { status: 400 });
  }
}
