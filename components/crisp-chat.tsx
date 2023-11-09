'use client';

import { useEffect } from 'react';
import { Crisp } from 'crisp-sdk-web';

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure('f5a6f230-6b89-4ca4-b294-40f7f18f6a2a');
  }, []);

  return null;
};
