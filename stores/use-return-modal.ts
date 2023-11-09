import { create } from 'zustand';

interface BookReturnModalStore {
  isOpen: boolean;
  bookId: string;
  onOpen: (bookId: string) => void;
  onClose: () => void;
  refresh: () => void;
}

export const useBookReturnModal = create<BookReturnModalStore>((set) => ({
  isOpen: false,
  bookId: '',
  onOpen: (bookId: string) => set({ isOpen: true, bookId: bookId }),
  onClose: () => set({ isOpen: false }),
  refresh: () => set({ bookId: '' }),
}));
