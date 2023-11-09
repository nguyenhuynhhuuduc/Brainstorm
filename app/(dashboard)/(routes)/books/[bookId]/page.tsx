import QrImage from '@/components/QrImage';
import prismadb from '@/lib/prismadb';
import React from 'react';

const BookDetailsPage = async ({ params }: { params: { bookId: string } }) => {
  const { bookId } = params;

  const book = await prismadb.book.findFirst({
    where: {
      id: bookId,
    },
    include: {
      qrCode: true,
    },
  });

  return (
    <div className="mt-20 mx-10 flex justify-center items-center h-full">
      <QrImage qrCodeUrl={book?.qrCode.imageUrl!} />
      <div className="max-w-sm rounded overflow-hidden shadow-lg h-[75%]">
        {/* <img className="w-full" src="/img/card-top.jpg" alt="Sunset in the mountains"> */}
        <div className="px-6 py-4">
          <h1 className="font-bold text-6xl mb-2">{book?.nameBook}</h1>
          <p className="text-gray-700 text-base">{book?.isbn}</p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #{book?.author}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #{book?.format}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #{book?.publisher}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            Scan book to get more information
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;
