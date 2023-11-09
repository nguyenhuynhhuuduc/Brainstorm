'use client';

import { ColumnDef } from '@tanstack/react-table';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Borrow = {
  id: string;
  bookId: string;
  nameBook: string;
  isbn: string;
  dateBorrow: string;
  dateReturn: string;
  isReturn: string;
};

export const columns: ColumnDef<Borrow>[] = [
  {
    accessorKey: 'id',
    header: 'Borrow Id',
  },
  {
    accessorKey: 'bookId',
    header: 'Book ID',
  },
  {
    accessorKey: 'nameBook',
    header: 'Name',
  },
  {
    accessorKey: 'isbn',
    header: 'ISBN',
  },
  {
    accessorKey: 'dateBorrow',
    header: 'Day start',
  },
  {
    accessorKey: 'dateReturn',
    header: 'Day end',
  },
  {
    accessorKey: 'isReturn',
    header: 'Status',
  },
];
