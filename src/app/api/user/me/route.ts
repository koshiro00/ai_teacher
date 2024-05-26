import { prisma } from '@/app/_utils/prisma';
import { getCurrentUser } from '@/app/_utils/supabase/getCurrentUser';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { data, error: getUserError } = await getCurrentUser(request);
    if (getUserError) return NextResponse.json({ error: getUserError.message, status: 401 });

    const profile = await prisma.profile.findUnique({
      where: {
        id: data.user.id,
      },
    });

    if (!profile)
      return NextResponse.json({
        error: 'ユーザーが存在しません',
        status: 404,
      });

    return NextResponse.json({ status: 'OK', profile }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) return NextResponse.json({ status: error.message }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { data, error: getUserError } = await getCurrentUser(request);
    if (getUserError) return NextResponse.json({ error: getUserError.message, status: 401 });

    // すでに登録されていないか確認
    const isExistProfile = await prisma.profile.findUnique({
      where: {
        id: data.user.id,
      },
    });
    if (isExistProfile) return NextResponse.json({ error: '登録済み', status: 400 });

    // 新しく作成
    const newProfile = await prisma.profile.create({
      data: {
        id: data.user.id,
        mail: data.user.email,
      },
    });

    return NextResponse.json({ status: 'OK', newProfile }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) return NextResponse.json({ status: error.message }, { status: 400 });
  }
}
