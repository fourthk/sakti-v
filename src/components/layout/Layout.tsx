import { ReactNode, useState } from "react";
import Header from "./Header";
import AppSidebar from "./AppSidebar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen w-full bg-background">
      <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="flex w-full" style={{ marginTop: "80px" }}>
        <AppSidebar isOpen={isSidebarOpen} />
        <main className={`flex-1 p-6 overflow-auto transition-all duration-300 ${isSidebarOpen ? 'ml-[270px]' : 'ml-0'}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
