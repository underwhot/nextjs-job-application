import Header from "@/components/header";
import Navbar from "@/components/navbar";

export default function DashboardLayout({children}: { children: React.ReactNode }) {
  return (
    <main className="pt-[80px]">
      <div className="fixed left-0 right-0 top-0 h-[80px] bg-muted flex items-center justify-between px-4">
        <Header />
      </div>
      <div className="flex">
        <div className="w-[300px] bg-muted fixed h-[calc(100vh-80px)] p-4">
          <Navbar />
        </div>
        <div className="flex-grow p-4 ml-[300px]">
          <div className="h-[3000px]">{children}</div>
        </div>
      </div>
    </main>
  );
}
