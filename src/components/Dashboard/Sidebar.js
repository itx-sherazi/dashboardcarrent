import { BarChart3, Car, User, ShoppingBag, Menu, X } from 'lucide-react';
import { RiMotorbikeFill } from "react-icons/ri"; 

export default function Sidebar({ activeTab, setActiveTab, sidebarOpen, toggleSidebar }) {
  return (
    <div className={`${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 bg-black text-white flex flex-col`}>
      <div className="flex items-center justify-between p-4">
        <h1 className={`text-xl font-bold text-gold-400 ${!sidebarOpen && 'hidden'}`}>Narenos Company</h1>
        <button onClick={toggleSidebar} className="text-white">
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      <div className="flex flex-col mt-6 space-y-2">
        <button 
          className={`flex items-center p-4 ${activeTab === 'overview' ? 'text-white' : 'text-white hover:bg-gray-800'}`}
          onClick={() => setActiveTab('overview')}
        >
          <BarChart3 size={20} />
          {sidebarOpen && <span className="ml-3">Overview</span>}
        </button>
        
        <button 
          className={`flex items-center p-4 ${activeTab === 'cars' ? 'bg-gold-400 text-white' : 'text-white hover:bg-gray-800'}`} 
          onClick={() => setActiveTab('cars')}
        >
          <Car size={20} />
          {sidebarOpen && <span className="ml-3">Cars</span>}
        </button>
        <button 
          className={`flex items-center p-4 ${activeTab === 'scooter' ? 'bg-gold-400 text-white' : 'text-white hover:bg-gray-800'}`} 
          onClick={() => setActiveTab('scooter')}
        >
          <RiMotorbikeFill size={20} />
          {sidebarOpen && <span className="ml-3">Scooters</span>}
        </button>
        
        <button 
          className={`flex items-center p-4 ${activeTab === 'users' ? 'bg-gold-400 text-white' : 'text-white hover:bg-gray-800'}`}
          onClick={() => setActiveTab('users')}
        >
          <User size={20} />
          {sidebarOpen && <span className="ml-3">Users</span>}
        </button>
        
        <button 
          className={`flex items-center p-4 ${activeTab === 'orders' ? 'bg-gold-400 text-white' : 'text-white hover:bg-gray-800'}`}
          onClick={() => setActiveTab('orders')}
        >
          <ShoppingBag size={20} />
          {sidebarOpen && <span className="ml-3">Orders</span>}
        </button>
      </div>
    </div>
  );
}