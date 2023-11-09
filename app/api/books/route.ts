import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

import prismadb from '@/lib/prismadb';
import { generateQrCode } from '@/lib/utils';

cloudinary.config({
  cloud_name: 'dvivu9mvj',
  secure: false,
  api_key: '871896899478877',
  api_secret: 'ygfsWKyBBOCS6MIUywKx5kSlRDM',
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { nameBook, author, isbn, publisher, format } = body;

    if (!nameBook || !author || !isbn || !publisher || !format)
      return new NextResponse('Missing required attributes', { status: 404 });

    const bookExist = await prismadb.book.findFirst({
      where: {
        isbn: isbn,
      },
    });

    if (bookExist)
      return new NextResponse('Book is already existed', { status: 400 });

    const book = await prismadb.book.create({
      data: {
        nameBook,
        author,
        isbn,
        publisher,
        format,
        qrCodeId: '',
      },
    });

    const qrCodeUrl = await generateQrCode(book.id);

    const response = await cloudinary.uploader.upload(qrCodeUrl);
    const qrCodedb = await prismadb.qrCode.create({
      data: {
        imageUrl: response.url,
        bookId: book.id,
      },
    });

    const bookCreated = await prismadb.book.update({
      where: {
        id: book.id,
      },
      data: {
        qrCodeId: qrCodedb.id,
      },
    });

    return NextResponse.json(bookCreated);
  } catch (error) {
    console.log('[BOOK_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

//Get-all
export async function GET() {
  try {
    const book = await prismadb.book.findMany({
      include : {
        qrCode : true
      }
    });
    return NextResponse.json(book);
  } catch (error) {
    console.log('BOOK_GET', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
