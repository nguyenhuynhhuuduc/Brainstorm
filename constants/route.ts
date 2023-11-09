import { Book, Home, QrCode, Receipt, SparkleIcon } from 'lucide-react';

export const routes = [
  {
    icon: Home,
    href: '/',
    label: 'Home',
  },
  {
    icon: QrCode,
    href: '/qrcode',
    label: 'QR Code',
  },
  {
    icon: Receipt,
    href: '/borrows',
    label: 'Borrrowed',
  },
  {
    icon: Book,
    href: '/books',
    label: 'Books',
  },
];
