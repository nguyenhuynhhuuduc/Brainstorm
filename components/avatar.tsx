import { User } from '@clerk/nextjs/server';
import Image from 'next/image';

interface AvatarProps {
  user: User;
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {
  return (
    <div className="rounded-lg shadow-md border p-5 w-full flex flex-col justify-center">
      <div className="flex flex-col items-center justify-center">
        <div className="rounded-full overflow-hidden transition hover:scale-110">
          <Image src={user.imageUrl} alt="Avatar" width={300} height={300} />
        </div>
        <div className="text-center text-sky-400/100 hover:text-sky-500">
          <p className="text-4xl font-semibold m-3">{user.firstName}</p>
          <p className="text-4xl font-semibold">{user.lastName}</p>
        </div>
      </div>
    </div>
  );
};

export default Avatar;
