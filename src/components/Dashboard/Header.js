import { Search, Bell, ChevronDown } from 'lucide-react';

export default function Header({ sidebarOpen, toggleSidebar }) {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 flex-1 max-w-md">
          <Search size={20} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="ml-2 outline-none flex-1"
          />
        </div>
        
        <div className="flex items-center space-x-4 ml-6">
          <button className="relative p-1">
            <Bell size={24} className="text-gray-700" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-gold-400 rounded-full"></span>
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gold-400 flex items-center justify-center text-black font-bold">
              AD
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-gray-500">admin@goldride.com</p>
            </div>
            <ChevronDown size={16} className="text-gray-500" />
          </div>
        </div>
      </div>
    </header>
  );
}