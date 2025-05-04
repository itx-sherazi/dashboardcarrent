import { useState, useEffect } from "react";
import { Car, Users, DollarSign, TrendingUp } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { RiMotorbikeFill } from "react-icons/ri";

export default function Overview() {
  const [stats, setStats] = useState({
    totalCars: 0,
    totalUsers: 0,
    revenue: 0,
    availableCars: 0,
    totalScooters: 0, // 👈 added here too
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [carTypesData, setCarTypesData] = useState([]);

  const API_BASE_URL = "https://backenrent.vercel.app/api";

  // Colors for charts
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  // Sample data for demonstration (replace with actual API data)
  const revenueData = [
    { name: "Jan", revenue: 4000 },
    { name: "Feb", revenue: 3000 },
    { name: "Mar", revenue: 5000 },
    { name: "Apr", revenue: 2780 },
    { name: "May", revenue: 1890 },
    { name: "Jun", revenue: 2390 },
  ];

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Cars API Call
        const carsResponse = await fetch(`${API_BASE_URL}/cars/all`);
        if (!carsResponse.ok) throw new Error("Failed to fetch cars");
        const carsData = await carsResponse.json();
        const totalCars = carsData.length;
        const availableCars = carsData.filter(
          (car) => car.status === "available"
        ).length;

        // Users API Call
        const usersResponse = await fetch(`${API_BASE_URL}/v1/user/all-users`);
        if (!usersResponse.ok) throw new Error("Failed to fetch users");
        const usersData = await usersResponse.json();
        const totalUsers = usersData?.users?.length || 0;
        // Scooters API Call
        const scooterResponse = await fetch(`${API_BASE_URL}/AllBook`);
        if (!scooterResponse.ok) throw new Error("Failed to fetch scooters");
        const scooterData = await scooterResponse.json();
        const totalScooters = scooterData.length;

        // Car types distribution
        const carTypes = {};
        carsData.forEach((car) => {
          carTypes[car.type] = (carTypes[car.type] || 0) + 1;
        });
        const carTypesChartData = Object.keys(carTypes).map((type) => ({
          name: type,
          value: carTypes[type],
        }));

        setStats({
          totalCars,
          totalUsers,
          availableCars,
          totalScooters, // 👈 new value added
        });

        setCarTypesData(carTypesChartData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Welcome back, Admin!
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Total Cars Card */}
        <div className="bg-white rounded-lg shadow p-6 border-t-4 border-blue-500 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Car size={24} className="text-blue-500" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm text-gray-500 font-medium">Total Cars</h3>
              <p className="text-2xl font-bold">{stats.totalCars}</p>
              <p className="text-xs text-gray-400 mt-1">
                {stats.availableCars} available
              </p>
            </div>
          </div>
        </div>

        {/* Total Users Card */}
        <div className="bg-white rounded-lg shadow p-6 border-t-4 border-green-500 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg">
              <Users size={24} className="text-green-500" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm text-gray-500 font-medium">Total Users</h3>
              <p className="text-2xl font-bold">{stats.totalUsers}</p>
            </div>
          </div>
        </div>
        {/* Total Scooters Card */}
        <div className="bg-white rounded-lg shadow p-6 border-t-4 border-yellow-500 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <RiMotorbikeFill size={24} className="text-yellow-500" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm text-gray-500 font-medium">
                Total Booking
              </h3>
              <p className="text-2xl font-bold">{stats.totalScooters}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Monthly Revenue
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#8884d8" name="Revenue ($)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Car Types Distribution */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Car Types Distribution
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={carTypesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {carTypesData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

// // Scooter API Call
// const ScootersResponse = await fetch(`${API_BASE_URL}/scooter/all`);
// if (!carsResponse.ok) throw new Error('Failed to fetch scooter');
// const scootersData = await carsResponse.json();
// const totalScooters = scootersData.length;
// const scootersCars = scootersData.filter(scooter => scooter.status === 'available').length;
