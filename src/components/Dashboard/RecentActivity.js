import { Car, User, ShoppingBag } from 'lucide-react';

const iconMap = {
  car: <Car size={18} className="text-gold-400" />,
  user: <User size={18} className="text-gold-400" />,
  order: <ShoppingBag size={18} className="text-gold-400" />
};

export default function RecentActivity({ activities }) {
  if (!activities || activities.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
        <p className="text-gray-500">No recent activities found</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center">
            <div className="bg-gold-100 p-2 rounded-full">
              {iconMap[activity.type] || iconMap.order}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{activity.message}</p>
              <p className="text-xs text-gray-500">{activity.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}