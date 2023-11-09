'use client';

import TypewriterComponent from 'typewriter-effect';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PlainUser } from '@/types';

interface CardInfoProps {
  plainUser: PlainUser;
}

const CardInfo: React.FC<CardInfoProps> = ({ plainUser }) => {
  return (
    <div className="rounded-lg shadow-lg border p-5 w-full flex flex-col bg-transparent">
      <h1 className="text-5xl font-extrabold text-primary mb-5">Welcome</h1>
      <div className="text-4xl font-semibold text-primary mb-5 pl-2">
        <TypewriterComponent
          options={{
            strings: [
              'to Brainstorm Library',
              'to everything you need!',
              `${plainUser.firstname}`,
            ],
            autoStart: true,
            loop: true,
          }}
        />
      </div>
      <div className="mt-5">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Customer Information</CardTitle>
            <CardDescription className="text-sm">
              In Brainstorm Database
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-2">
              <span className="font-semibold text-primary">ID:</span>{' '}
              {plainUser.id}
            </p>
            <p className="mb-2">
              <span className="font-semibold text-primary">First Name: </span>
              {plainUser.firstname}
            </p>
            <p className="mb-2">
              <span className="font-semibold text-primary">Last Name: </span>
              {plainUser.lastname}
            </p>
            <p className="mb-2">
              <span className="font-semibold text-primary">Birthday: </span>
              {plainUser.birthday ? plainUser.birthday : 'Không xác định'}
            </p>
            <p className="mb-2">
              <span className="font-semibold text-primary">Gender: </span>
              {plainUser.gender ? plainUser.gender : 'Không xác định'}
            </p>
          </CardContent>
          <CardFooter>
            <p className="mb-2">
              <span className="font-semibold text-primary">Phone: </span>
              {plainUser.phoneNumbers
                ? plainUser.phoneNumbers
                : 'Không xác định'}
            </p>
            <hr />
            <p className="mb-2 pl-2">
              <span className="font-semibold text-primary">Email: </span>
              {plainUser.email}
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default CardInfo;
