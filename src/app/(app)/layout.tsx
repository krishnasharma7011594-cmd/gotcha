import BottomNav from '@/components/layout/BottomNav';
import Sidebar from '@/components/layout/Sidebar';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background">
      <div className="hidden md:flex">
        <Sidebar />
      </div>
      <div className="flex flex-1 flex-col">
        <main className="flex-1 overflow-y-auto md:pb-0 pb-20">{children}</main>
        <div className="md:hidden">
          <BottomNav />
        </div>
      </div>
    </div>
  );
}
