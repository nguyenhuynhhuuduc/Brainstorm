import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import QRCode from 'qrcode';
// import { v2 as cloudinary } from 'cloudinary';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateQrCode = async (id: string) => {
  const qrCode = await QRCode.toDataURL(id);
  return qrCode;
};

// export const cloudinaryInstance = cloudinary.config({
//   cloud_name: 'dvivu9mvj',
//   secure: false,
//   api_key: '871896899478877',
//   api_secret: 'ygfsWKyBBOCS6MIUywKx5kSlRDM',
// });

export function formatNiceDate(inputDate: Date): string {
  const day = inputDate.getDate();
  const month = inputDate.toLocaleString('en-US', { month: 'short' });
  const year = inputDate.getFullYear();

  return `${day} ${month} ${year}`;
}
