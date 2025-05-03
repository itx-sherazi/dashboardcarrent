import { Car, Calendar, CheckCircle } from 'lucide-react';

export default function StatsCards({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow p-6 border-t-4 border-gold-400">
        <div className="flex items-center">
          <div className="bg-gold-100 p-3 rounded-lg">
            <Car size={24} className="text-gold-400" />
          </div>
          <div className="ml-4">
            <h3 className="text-sm text-gray-500 font-medium">Total Cars</h3>
            <p className="text-2xl font-bold">{stats?.totalCars || 0}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6 border-t-4 border-gold-400">
        <div className="flex items-center">
          <div className="bg-gold-100 p-3 rounded-lg">
            <Calendar size={24} className="text-gold-400" />
          </div>
          <div className="ml-4">
            <h3 className="text-sm text-gray-500 font-medium">Upcoming Reservations</h3>
            <p className="text-2xl font-bold">{stats?.upcomingReservations || 0}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6 border-t-4 border-gold-400">
        <div className="flex items-center">
          <div className="bg-gold-100 p-3 rounded-lg">
            <CheckCircle size={24} className="text-gold-400" />
          </div>
          <div className="ml-4">
            <h3 className="text-sm text-gray-500 font-medium">Total Users</h3>
            <p className="text-2xl font-bold">{stats?.totalUsers || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
}