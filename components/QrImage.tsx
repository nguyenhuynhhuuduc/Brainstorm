'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

const QrImage = ({ id, qrCodeUrl }: { id?: string; qrCodeUrl: string }) => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col gap-2">
      <div className="hover:scale-110 transition">
        <Image
          src={qrCodeUrl ? qrCodeUrl : '/images/placeholder.jpg'}
          width={300}
          height={300}
          alt="QrCode"
        />
      </div>
      <div className="font-semibold mt-10 text-transparent text-sm bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        {!pathname.includes("books") && "Dont share your QR Code Keep using alone"}
      </div>
    </div>
  );
};

export default QrImage;
