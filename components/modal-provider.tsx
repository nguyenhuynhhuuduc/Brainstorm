'use client';

import { useEffect, useState } from 'react';
import BookReturnModal from './book-return-modal';

const ModalProvider = ({ userId }: { userId: string }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <>
      <BookReturnModal userId={userId} />
    </>
  );
};

export default ModalProvider;
