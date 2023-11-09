'use client';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { QrCode } from 'lucide-react';

const CardQr = () => {
  return (
    <Card className="w-full flex mt-10">
      <CardHeader>
        <CardTitle className="flex item-center text-center text-3xl text-sky-500/100">
          Your QR Code
          <QrCode className="pl-2 text-sky-500/100" size={35} />
        </CardTitle>
        <CardDescription className="text-transparent text-sm bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Using to access brainstorm library
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default CardQr;
