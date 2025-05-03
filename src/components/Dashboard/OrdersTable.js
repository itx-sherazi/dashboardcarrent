import { useState, useEffect } from "react";
import {
  Calendar,
  CreditCard,
  MapPin,
  User,
  Mail,
  IdCard,
  Home,
  Phone,
  Clock,
} from "lucide-react";
import { fetchOrders, deleteBooking } from "../../services/api"; // Yeh aapka API function hai jo sare orders fetch karega

export default function OrdersDashboardView() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        const data = await fetchOrders(); // Fetch all orders
        setOrders(data);
      } catch (err) {
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatPaymentMethod = (method) => {
    return method
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div>Error loading orders: {error}</div>;

  return (
    <div className="space-y-8">
      {orders.map((orderData, index) => (
        <div
          key={orderData._id?.$oid || index}
          className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto"
        >
          {/* Order Header */}
          <div className="border-b pb-4 mb-6">
  <h1 className="text-2xl font-bold text-gray-800">Order Details</h1>
  <div className="flex items-center justify-between">
    <p className="text-gray-500">
      Order Name:{" "}
      <span className="font-bold">{orderData?.carName}</span>
    </p>
    <p className="text-gray-500 flex items-center">
      Order Image:{" "}
      <img
        src={orderData?.carImage}
        alt="Order Image"
        className="w-24 h-24 object-cover ml-2"
      />
    </p>
  </div>
</div>


          {/* Customer and Rental Info */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Customer Information */}
            <div className="bg-gray-50 rounded-lg p-4">
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
                    <p className="font-medium">{orderData.fullName}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail
                    className="text-blue-600 mr-2 flex-shrink-0"
                    size={18}
                  />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{orderData.email}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone
                    className="text-blue-600 mr-2 flex-shrink-0"
                    size={18}
                  />
                  <div>
                    <p className="text-sm text-gray-500">Phone Number</p>
                    <p className="font-medium">{orderData.phone}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <IdCard
                    className="text-blue-600 mr-2 flex-shrink-0"
                    size={18}
                  />
                  <div>
                    <p className="text-sm text-gray-500">Driver License</p>
                    <p className="font-medium">{orderData.driverLicense}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Home
                    className="text-blue-600 mr-2 flex-shrink-0"
                    size={18}
                  />
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium">{orderData.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Rental Information */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Rental Information
              </h2>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Calendar
                    className="text-green-600 mr-2 flex-shrink-0"
                    size={18}
                  />
                  <div>
                    <p className="text-sm text-gray-500">Pickup Date</p>
                    <p className="font-medium">
                      {formatDate(orderData.pickupDate)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar
                    className="text-red-600 mr-2 flex-shrink-0"
                    size={18}
                  />
                  <div>
                    <p className="text-sm text-gray-500">Return Date</p>
                    <p className="font-medium">
                      {formatDate(orderData.returnDate)}
                    </p>
                    {new Date(orderData.returnDate) <
                      new Date(orderData.pickupDate) && (
                      <p className="text-red-500 text-sm">
                        * Date error: Return date is before pickup date
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin
                    className="text-green-600 mr-2 flex-shrink-0"
                    size={18}
                  />
                  <div>
                    <p className="text-sm text-gray-500">Pickup Location</p>
                    <p className="font-medium">{orderData.pickupLocation}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin
                    className="text-red-600 mr-2 flex-shrink-0"
                    size={18}
                  />
                  <div>
                    <p className="text-sm text-gray-500">Return Location</p>
                    <p className="font-medium">{orderData.returnLocation}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="mt-6 bg-gray-50 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Payment Information
            </h2>
            <div className="flex items-center">
              <CreditCard className="text-purple-600 mr-2" size={18} />
              <div>
                <p className="text-sm text-gray-500">Payment Method</p>
                <p className="font-medium">
                  {formatPaymentMethod(orderData.paymentMethod)}
                </p>
              </div>
            </div>
          </div>
          {/* Booking Status */}
          <div className="mt-6 flex justify-between items-center">
            <div className="flex items-center">
              <Clock className="text-blue-600 mr-2" size={18} />
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                Booking Confirmed
              </span>
            </div>

            <button
              onClick={() => handleDelete(orderData._id)}
              className="bg-red-600 cursor-pointer hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium"
            >
              Delete Order
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
