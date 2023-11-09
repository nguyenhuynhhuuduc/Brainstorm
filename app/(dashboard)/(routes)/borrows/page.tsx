import React from 'react';

import { Borrow, columns } from './columns'; // Make sure to use the correct import path for your columns component
import { DataTable } from './data-table'; // Make sure to use the correct import path for your data-table component
import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { formatNiceDate } from '@/lib/utils';

async function getData(): Promise<Borrow[]> {
  const { userId } = auth();
  
  const borrowdb = await prismadb.borrow.findMany({
    where: {
      userId: userId!,
    },
    include: {
      book: true,
    },
  });

  if (!borrowdb) {
    return [];
  }

  const borrows: Borrow[] = borrowdb.map((borrow) => ({
    id: borrow.id,
    bookId: borrow.bookId,
    nameBook: borrow.book.nameBook,
    isbn: borrow.book?.isbn || '', // Use optional chaining for book
    dateBorrow: formatNiceDate(borrow.dateBorrow),
    dateReturn: formatNiceDate(borrow.dateReturn), // Ensure you use the correct date field
    isReturn: String(borrow.isReturn).toUpperCase(),
  }));

  return borrows;
}

const BooksPage = async () => {
  const data = await getData();

  return (
    <div className="mt-20 mx-10">
      <h2 className="font-semibold text-3xl text-indigo-400">Books Borrowed</h2>

      <div className="mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default BooksPage;
