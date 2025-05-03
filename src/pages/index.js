import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { useState } from 'react';
import Header from '../components/Dashboard/Header';
import Sidebar from '../components/Dashboard/Sidebar';
import Overview from '../components/Dashboard/OverView';
import CarsTable from '../components/Dashboard/CarsTabel';
import UsersTable from '../components/Dashboard/UserTabel';
import OrdersTable from '../components/Dashboard/OrdersTable';
import ScooterTable from '@/components/Dashboard/ScooterTable';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview />;
      case 'cars':
        return <CarsTable />;
      case 'users':
        return <UsersTable />;
      case 'orders':
        return <OrdersTable />;
        case 'scooter':
          return <ScooterTable />;
      default:
        return <Overview />;
    }
  };
  return (
  
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        sidebarOpen={sidebarOpen} 
        toggleSidebar={toggleSidebar} 
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          {renderActiveTab()}
        </main>
      </div>
    </div>
  );

  
}
