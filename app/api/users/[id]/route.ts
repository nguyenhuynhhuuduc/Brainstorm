import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!params.id) {
      return new NextResponse('User Id is required', { status: 400 });
    }

    const users = await clerkClient.users.getUserList();
    const user = users.find((user) => user.id === params.id);

    if (!user) return new NextResponse('User not found', { status: 404 });

    return NextResponse.json(
      {
        userId: params.id,
        email: user.emailAddresses[0].emailAddress,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log('[USER_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
