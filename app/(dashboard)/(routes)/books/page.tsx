import React from 'react';

import { Book, columns } from './columns';
import { DataTable } from './data-table';
import prismadb from '@/lib/prismadb';

async function getData(): Promise<Book[]> {
  const booksDb = await prismadb.book.findMany();
  const books: Book[] = booksDb.map((book) => ({
    id: book.id,
    nameBook: book.nameBook,
    author: book.author,
    isbn: book.isbn,
    publisher: book.publisher,
    format: book.format,
  }));

  return books;
}

const BooksPage = async () => {
  const data = await getData();

  return (
    <div className="mt-20 mx-10">
      <h2 className="font-semibold text-3xl text-indigo-400">
        Books Existed In Database
      </h2>

      <div className="mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default BooksPage;
