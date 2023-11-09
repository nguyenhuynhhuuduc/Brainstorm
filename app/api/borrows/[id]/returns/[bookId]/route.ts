import prismadb from '@/lib/prismadb';
import { clerkClient } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  { params }: { params: { id: string; bookId: string } }
) {
  const { id: userId, bookId } = params;

  try {
    if (!userId) {
      return new NextResponse('Missing attributes required', { status: 403 });
    }

    const userIds = await (
      await clerkClient.users.getUserList()
    ).map((user) => user.id);

    if (!userIds.includes(userId)) {
      return new NextResponse('Not found user', { status: 403 });
    }

    if (!bookId) {
      return new NextResponse('Book Id is required', { status: 400 });
    }

    const bookBorrowedByUser = await prisma?.borrow.findFirst({
      where: {
        bookId: bookId,
        userId: userId,
      }
    });

    if (!bookBorrowedByUser) {
      return new NextResponse('Not found', { status: 405 });
    }
    const borrow = await prismadb.borrow.findFirst({
      where: {
        userId: userId,
        bookId: bookId,
        isReturn: false
      },
      orderBy: {
        dateBorrow: 'asc',
      },
    });

    const updateReturned = await prismadb.borrow.update({
      where: {
        id: borrow?.id,
      },
      data: {
        isReturn: true,
      },
    });

    if (!updateReturned) {
      return new NextResponse('Returned Failed', { status: 500 });
    }

    return NextResponse.json(updateReturned, { status: 202 });
  } catch (error) {
    console.log('[BOOK_RETURNED]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
