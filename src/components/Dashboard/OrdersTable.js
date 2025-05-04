import { useState, useEffect } from "react";
import { User, Mail, Phone, ShoppingBag, MessageSquare } from "lucide-react";
import { fetchOrders, deleteBooking } from "../../services/api"; // Your API function to fetch orders

export default function OrdersDashboardView() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        const data = await fetchOrders(); // Fetch all orders
        if (!Array.isArray(data)) throw new Error("Invalid orders data");
        setOrders(data);
      } catch (err) {
        setError(err.message || "Failed to load orders");

        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);
  
  const handleDelete = async (id) => {
    try {
      await deleteBooking(id);
      setOrders(orders.filter((order) => order._id !== id));
    } catch (error) {
      console.error("Delete Error:", error);
      alert(error.message || "Failed to delete booking");
    }
  };

  // Custom Gold Loading Spinner
  const GoldLoader = () => (
    <div className="flex flex-col justify-center items-center h-screen w-full">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-yellow-100 rounded-full"></div>
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-t-yellow-400 border-r-yellow-400 rounded-full animate-spin"></div>
      </div>
      <p className="mt-4 text-yellow-600 font-medium">Loading orders...</p>
    </div>
  );

  // No Orders Available Component
  const NoOrders = () => (
    <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
      <ShoppingBag size={64} className="text-gray-300 mb-4" />
      <h2 className="text-2xl font-bold text-gray-500">No Orders Available</h2>
      <p className="text-gray-400 mt-2">There are currently no bookings in the system</p>
    </div>
  );

  if (loading) return <GoldLoader />;
  if (error) return <div className="text-center text-red-500 p-4">Error loading orders: {error}</div>;
  if (orders.length === 0) return <NoOrders />;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 my-6">Orders Dashboard</h1>
      
      {orders?.map((orderData, index) => (
        <div
          key={orderData?._id || index}
          className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto"
        >
          {/* Order Header */}
          <div className="border-b pb-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Order Details</h2>
          </div>

          {/* Customer Information */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Customer Information
            </h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <User
                  className="text-blue-600 mr-2 flex-shrink-0"
                  size={18}
                />
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium">{orderData?.name || "N/A"}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Mail
                  className="text-blue-600 mr-2 flex-shrink-0"
                  size={18}
                />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{orderData?.email || "N/A"}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone
                  className="text-blue-600 mr-2 flex-shrink-0"
                  size={18}
                />
                <div>
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p className="font-medium">{orderData?.phone || "N/A"}</p>
                </div>
              </div>
              {orderData?.note && (
                <div className="flex items-center">
                  <MessageSquare
                    className="text-blue-600 mr-2 flex-shrink-0"
                    size={18}
                  />
                  <div>
                    <p className="text-sm text-gray-500">Note</p>
                    <p className="font-medium">{orderData?.note || "N/A"}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Delete Button */}
          <div className="flex justify-end">
            <button
              onClick={() => handleDelete(orderData?._id)}
              className="bg-red-600 cursor-pointer hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition duration-300"
            >
              Delete Order
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}