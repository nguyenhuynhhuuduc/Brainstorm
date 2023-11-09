'use client';

import axios from 'axios';
import { useState } from 'react';
import { DialogTitle } from '@radix-ui/react-dialog';
import { Dialog, DialogContent, DialogFooter, DialogHeader } from './ui/dialog';
import { useBookReturnModal } from '@/stores/use-return-modal';
import { Badge } from './ui/badge';
import { LucideTrash, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const BookReturnModal = ({ userId }: { userId: string }) => {
  const bookReturnModal = useBookReturnModal();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onReturnBook = () => {
    setLoading(true);
    axios
      .patch(`api/borrows/${userId}/returns/${bookReturnModal.bookId}`)
      .then(() => {
        toast('Returning book successfully');
        bookReturnModal.onClose();
        router.refresh();
      })
      .catch(() => toast('Something went wrong. Please try again later'))
      .finally(() => {
        setLoading(false);
        bookReturnModal.refresh();
      });
  };
  return (
    <Dialog
      open={bookReturnModal.isOpen}
      onOpenChange={bookReturnModal.onClose}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 font-bold py-1">
              Are you sure to return this book?
              <Badge className="uppercase text-sm py-1" variant="default">
                Brainstorm
              </Badge>
            </div>
          </DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button
            disabled={loading}
            variant="premium"
            size="lg"
            className="w-full"
            onClick={onReturnBook}
          >
            Return <Zap className="ml-2" />
          </Button>
          <Button
            disabled={loading}
            variant="ghost"
            size="lg"
            className="w-full border"
            onClick={bookReturnModal.onClose}
          >
            Cancel <LucideTrash className="ml-2" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookReturnModal;
