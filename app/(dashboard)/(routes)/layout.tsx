import { Navbar } from '@/components/navbar';

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {

  return (
    <main className="h-full flex flex-col">
      <Navbar />
      {children}
    </main>
  );
};

export default DashboardLayout;
