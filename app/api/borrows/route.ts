import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { bookId, userId, dateReturn, isReturn } = body;

    console.log(body);

    if (!bookId || !userId) {
      return new NextResponse('Missing required parameters', { status: 404 });
    }

    let newDateReturn = null;
    if (!dateReturn) {
      newDateReturn = new Date();
      newDateReturn.setDate(newDateReturn.getDate() + 7);
    }

    const borrow = await prismadb.borrow.create({
      data: {
        bookId: bookId,
        userId: userId,
        dateReturn: dateReturn ? dateReturn : newDateReturn,
        isReturn: isReturn,
      },
    });

    return NextResponse.json(borrow, {status:200});
  } catch (err) {
    console.log('POST failed :', err);
    return new NextResponse('Internal server error', { status: 500 });
  }
}
// Get-all
export async function GET() {
  try {
    const borrow = await prismadb.borrow.findMany();
    return NextResponse.json(borrow);
  } catch (error) {
    console.log('BOOK_GET', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
