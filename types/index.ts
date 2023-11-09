import { PhoneNumber } from '@clerk/nextjs/server';

export type PlainUser = {
  id?: string;
  username?: string;
  gender?: string;
  birthday?: string;
  email?: string;
  lastname?: string;
  firstname?: string;
  phoneNumbers?: string;
};
