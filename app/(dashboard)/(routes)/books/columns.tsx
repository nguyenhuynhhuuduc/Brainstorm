'use client';

import { ColumnDef } from '@tanstack/react-table';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Book = {
  id: string;
  nameBook: string;
  author: string;
  isbn: string;
  publisher: string;
  format: string;
};

export const columns: ColumnDef<Book>[] = [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'nameBook',
    header: 'Name',
  },
  {
    accessorKey: 'author',
    header: 'Author',
  },
  {
    accessorKey: 'isbn',
    header: 'ISBN',
  },
  {
    accessorKey: 'publisher',
    header: 'Publisher',
  },
  {
    accessorKey: 'format',
    header: 'Format',
  },
];
