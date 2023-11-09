'use client';

import Link from 'next/link';
import { Poppins } from 'next/font/google';
import Image from 'next/image';

import { MobileSidebar } from '@/components/mobile-sidebar';
import { routes } from '@/constants/route';
import { useEffect, useState } from 'react';
import { ModeToggle } from './mode-toggle';
import { UserButton } from '@clerk/nextjs';

const font = Poppins({ weight: '600', subsets: ['latin'] });

export const Navbar = () => {

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="fixed w-full z-50 flex justify-between items-center py-2 px-4 h-16 shadow-sm bg-white/10">
      <div className="flex items-center">
        <MobileSidebar />
        <Link href="/">
          <Image
            className="md:block hidden"
            height={40}
            width={40}
            alt="Brainstorm"
            src="/images/logo.jpg"
          />
        </Link>
        <div className="gap-3 ml-3 hidden md:flex items-center">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className="flex items-center gap-2"
            >
              <route.icon className="h-5 w-5 text-sky-400/100" />
              <span className="text-sm">{route.label}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center space-x-5">
        <ModeToggle />
        <UserButton />
      </div>
    </div>
  );
};
