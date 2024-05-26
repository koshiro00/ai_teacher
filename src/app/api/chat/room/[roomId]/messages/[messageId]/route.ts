import { prisma } from '@/app/_utils/prisma';
import { getCurrentUser } from '@/app/_utils/supabase/getCurrentUser';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(request: NextRequest, { params }: { params: { messageId: string } }) {
  try {
    const { data, error: getUserError } = await getCurrentUser(request);
    if (getUserError) return NextResponse.json({ error: getUserError.message, status: 401 });

    const messageId = params.messageId;
    await prisma.chatMessage.delete({
      where: {
        id: messageId,
        chatRoom: {
          profileId: data.user.id,
        },
      },
    });

    return NextResponse.json({ status: 'OK' }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) return NextResponse.json({ status: error.message }, { status: 400 });
  }
}
