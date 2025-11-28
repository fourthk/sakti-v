import { Menu, Bell, User } from "lucide-react";
import saktiLogo from "@/assets/sakti-logo.png";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6"
      style={{ 
        height: "80px", 
        backgroundColor: "#384E66"
      }}
    >
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="text-white hover:bg-white/10 p-2 rounded transition-colors"
        >
          <Menu size={24} />
        </button>
        <img 
          src={saktiLogo} 
          alt="SAKTI Logo" 
          className="h-12 object-contain"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="text-white hover:bg-white/10 p-2 rounded transition-colors">
          <Bell size={24} />
        </button>
        <button className="text-white hover:bg-white/10 p-2 rounded-full transition-colors">
          <User size={24} />
        </button>
      </div>
    </header>
  );
};

export default Header;
