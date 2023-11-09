import CardQr from '@/components/card-qr';
import QrImage from '@/components/QrImage';
import { generateQrCode } from '@/lib/utils';
import { currentUser } from '@clerk/nextjs/server';
import prismadb from '@/lib/prismadb';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME!,
  secure: false,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_SERECT_KEY!,
});

const QrCodePage = async () => {
  const user = await currentUser();
  const qrCodeUrl = await generateQrCode(user?.id!);

  const qrCode = await prismadb.qrCode.findFirst({
    where: {
      userId: user?.id,
    },
  });

  if (!qrCode) {
    const response = await cloudinary.uploader.upload(qrCodeUrl);
    await prismadb.qrCode.create({
      data: {
        userId: user?.id!,
        imageUrl: response.url,
      },
    });
  }

  return (
    <div className="mt-20 mx-10 flex flex-col justify-center items-center gap-20">
      <CardQr />
      <QrImage id={user?.id!} qrCodeUrl={qrCodeUrl} />
    </div>
  );
};

export default QrCodePage;
