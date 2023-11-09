import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!params.id) return new NextResponse('Missing params');

    const book = await prismadb.book.findUnique({
      where: {
        id: params.id,
      },
      include: {
        qrCode: true,
      },
    });
    if (book) {
      return NextResponse.json(book, { status: 200 });
    }
    return new NextResponse('Not found', { status: 404 });
  } catch (error) {
    console.log('[COURSE_ID_DELETE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!params.id) {
      return new NextResponse('Missing params');
    }
    const book = await prismadb.book.delete({
      where: {
        id: params.id,
      },
    });

    const qrCode = await prismadb.qrCode.delete({
      where: {
        id: book.id,
        bookId: params.id,
      },
    });

    return new NextResponse('Delete successfully', { status: 200 });
  } catch (error) {
    console.log('[BOOK_DELETE]', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}
