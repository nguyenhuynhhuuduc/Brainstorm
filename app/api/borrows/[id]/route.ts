import prismadb from '@/lib/prismadb';
import { clerkClient } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  if (!id) return new NextResponse('Missing attributes', { status: 404 });

  const userIds = await (
    await clerkClient.users.getUserList()
  ).map((user) => user.id);

  if (!userIds.includes(id)) {
    return new NextResponse('Not found user', { status: 403 });
  }

  try {
    const book = await prismadb.borrow.findMany({
      where: {
        userId: id,
      },
    });

    return NextResponse.json(book, {status: 200});
  } catch (error) {
    console.log('BOOK_GET', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
