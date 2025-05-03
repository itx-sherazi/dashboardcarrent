import { useState, useEffect, useRef } from "react";
import { deleteScooter, fetchScooters, updateScooter} from "../../services/api"; // Added updateCar
import { Edit, Trash2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import AddScooter from "./AddScooter";

export default function ScooterTable() {
  const [scooters, setScooters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCar, setCurrentCar] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    seat: "",
    engine: "",
    year: "",
    speed: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const fileInputRef = useRef(null);

  // Fetch existing cars from the database
  useEffect(() => {
    const loadScooter = async () => {
      try {
        setLoading(true);
        const data = await fetchScooters();
        setScooters(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadScooter();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-400"></div>
      </div>
    );

  if (error)
    return (
      <div className="text-red-500 p-4 bg-red-100 rounded-md">
        Error loading cars: {error}
      </div>
    );

//   Handle delete car
  const handleDelete = async (scooterId) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      try {
        await deleteScooter(scooterId);
        setScooters(scooters.filter((scooter) => scooter._id !== scooterId));
        toast.success("scooter deleted successfully");
      } catch (err) {
        toast.error("Failed to delete scooter");
        console.error("Delete error:", err);
      }
    }
  };
  const handleEditClick = (scooter) => {
    setCurrentCar(scooter);
    setFormData({
      _id: scooter._id,
      name: scooter.name,
      seat: scooter.seat || "",
      engine: scooter.engine || "",
      year: scooter.year || "",
      speed: scooter.speed || "",
    });
    setImagePreview(scooter.imageUrl);
    setIsModalOpen(true);
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  
 

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const formDataToSend = new FormData();
  
      Object.keys(formData).forEach((key) => {
        if (key !== "_id" && formData[key]) {
          formDataToSend.append(key, formData[key]);
        }
      });
  
      if (selectedImage) {
        formDataToSend.append("image", selectedImage);
      }
  
      const updatedScooter = await updateScooter(currentCar._id, formDataToSend);
  
      setScooters(
        scooters.map((scooter) =>
          scooter._id === currentCar._id ? updatedScooter.scooter : scooter
        )
      );
  
      setIsModalOpen(false);
      setCurrentCar(null);
      setSelectedImage(null);
      setImagePreview("");
  
      toast.success("Scooter updated successfully");
    } catch (err) {
      toast.error("Failed to update scooter");
      console.error("Update error:", err);
    }
  };
  

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Scooter</h1>

      <AddScooter/>
      </div>

      {/* Scooters table */}
<div className="bg-white rounded-lg shadow overflow-hidden">
  <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          ID
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Image
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Name
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Year
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Seat
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Speed
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Engine
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Actions
        </th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {scooters.length > 0 ? (
        scooters.map((scooter, index) => (
          <tr key={scooter._id || index}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {index + 1}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">
              <img
                src={scooter.imageUrl}
                alt={scooter.name}
                className="w-24 h-16 object-cover rounded"
              />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {scooter.name}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {scooter.year}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {scooter.seat}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {scooter.speed}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {scooter.engine}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {/* <button
                onClick={() => handleEditClick(scooter)}
                className="text-blue-500 hover:text-blue-700 mr-3"
              >
                <Edit size={18} />
              </button> */}
              <button
                onClick={() => handleDelete(scooter._id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
            No scooters found. Add your first scooter!
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>

{/* edit modal */}
{isModalOpen && (
  <div className="fixed inset-0 bg-black/10 bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-3xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Edit Scooter Details</h2>
        <button
          onClick={() => setIsModalOpen(false)}
          className="text-gray-500 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          {/* Left Column */}
          <div>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-bold mb-2 text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="seat" className="block text-sm font-bold mb-2 text-gray-700">
                Seats
              </label>
              <input
                type="number"
                id="seat"
                name="seat"
                value={formData.seat}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="engine" className="block text-sm font-bold mb-2 text-gray-700">
                Engine
              </label>
              <input
                type="text"
                id="engine"
                name="engine"
                value={formData.engine}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* Right Column */}
          <div>
            <div className="mb-4">
              <label htmlFor="year" className="block text-sm font-bold mb-2 text-gray-700">
                Year
              </label>
              <input
                type="number"
                id="year"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="speed" className="block text-sm font-bold mb-2 text-gray-700">
                Speed
              </label>
              <input
                type="text"
                id="speed"
                name="speed"
                value={formData.speed}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="image" className="block text-sm font-bold mb-2 text-gray-700">
                Image
              </label>
              <div className="flex items-center space-x-4">
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Scooter preview"
                    className="w-24 h-16 object-cover rounded"
                  />
                )}
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Update Scooter
          </button>
        </div>
      </form>
    </div>
  </div>
)}
      <Toaster position="top-right" />
    </div>
  );
}
