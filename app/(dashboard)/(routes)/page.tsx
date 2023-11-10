import Avatar from '@/components/avatar';
import CardInfo from '@/components/card-info';
import { currentUser } from '@clerk/nextjs';


const Page = async () => {
  const user = await currentUser();
  cron.schedule("40 20 * * *", async () => {
    await sendEmailEveryday();
  })  
  return (
    <div className="mt-40 mx-10 grid sm:grid-cols-1 md:grid-cols-2 gap-5">
      <Avatar user={user!} />
      <CardInfo
        plainUser={{
          username: user?.username!,
          firstname: user?.firstName!,
          lastname: user?.lastName!,
          id: user?.id,
          email: user?.emailAddresses[0].emailAddress,
          birthday: user?.birthday!,
          gender: user?.gender,
          phoneNumbers: user?.phoneNumbers.at(0)?.phoneNumber,
        }}
      />
    </div>
  );
};

export default Page;
