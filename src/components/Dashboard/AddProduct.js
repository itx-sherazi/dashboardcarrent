import { useState, useRef, useEffect } from "react";
import { X, Upload, Loader2 } from "lucide-react";

export default function AddProductModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    seat: "",
    category: "",
    year: "",
    speed: "",
    fuel: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true); // Initial loading state
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const API_ENDPOINT = "https://backenrent.vercel.app/api/cars/addcar";

  // Set loading to false once component is mounted
  useEffect(() => {
    // This simulates the component being ready
    // In a real app, this might be after data fetching
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Short timeout to simulate initial loading

    return () => clearTimeout(timer);
  }, []);

  const handleOpen = () => setIsOpen(true); // Fixed: changed from false to true
  const handleClose = () => {
    setIsOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      seat: "",
      category: "",
      year: "",
      speed: "",
      fuel: "",
    });
    setImagePreview(null);
    setImageFile(null);
    setError("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      setError("Please select an image");
      return;
    }

    setIsLoading(true); // Show form submission loader
    setError("");

    // Create FormData to send to the backend
    const submitData = new FormData();
    Object.keys(formData).forEach((key) => {
      submitData.append(key, formData[key]);
    });
    submitData.append("imageUrl", imageFile);

    try {
      // Call the actual API endpoint
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        body: submitData,
        // No Content-Type header is needed as the browser will set it automatically for FormData
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to add product");
      }

      // On success
      alert("Product added successfully!");
      handleClose();

      // Set main loading to true temporarily to show loader during page refresh
      setLoading(true);

      // Simulate page reload
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.error("Error adding product:", error);
      setError(error.message || "Failed to add product. Please try again.");
      setIsLoading(false); // Only turn off form submission loader, not main loader
    }
  };

  // Show error if there's any
  if (error && !isOpen) {
    return (
      <div className="text-red-500 p-4 bg-red-100 rounded-md">
        Error loading cars: {error}
      </div>
    );
  }

  return (
    <div className="font-sans">
      {/* Button to open modal */}
      <button
        onClick={handleOpen}
        className="px-4 py-2 bg-yellow-400 text-black font-medium rounded hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-300"
      >
        Add Product
      </button>

      {/* Modal overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/10 bg-opacity-50 flex items-center justify-center z-50">
          {/* Modal content */}
          <div className="bg-white rounded-lg w-full max-w-4xl mx-4 relative">
            {/* Modal header */}
            <div className="bg-yellow-400 text-black px-6 py-2 rounded-t-lg flex justify-between items-center">
              <h2 className="text-xl font-bold">Add New Product</h2>
              <button
                onClick={handleClose}
                className="text-black hover:text-gray-700 focus:outline-none"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal body */}
            <form
              onSubmit={handleSubmit}
              className="p-6 grid grid-cols-1 md:grid-cols-2 gap-1"
            >
              {error && (
                <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                {/* Product Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
              </div>

              {/* Seats */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Seats
                </label>
                <input
                  type="number"
                  name="seat"
                  value={formData.seat}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  <option value="">Select Category</option>
                  <option value="SUV">SUV</option>
                  <option value="Hatchback">Hatchback</option>
                  <option value="City">City</option>
                </select>
              </div>

              {/* Year */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Year
                </label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              {/* Speed */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
               Transmission
                </label>
                <input
                  type="text"
                  name="speed"
                  placeholder="e.g., 180 km/h"
                  value={formData.speed}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              {/* Fuel Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fuel Type
                </label>
                <select
                  name="fuel"
                  value={formData.fuel}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  <option value="">Select Fuel Type</option>
                  <option value="Gasoline">Gasoline</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              {/* Image Upload */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Image
                </label>
                <div
                  className="mt-1 flex justify-center px-6 p pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-yellow-400"
                  onClick={triggerFileInput}
                >
                  <div className="space-y- text-center">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="mx-auto h-32 w-auto object-contain"
                      />
                    ) : (
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    )}
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer rounded-md font-medium text-yellow-600 hover:text-yellow-500 focus-within:outline-none">
                        <span>Upload a file</span>
                        <input
                          ref={fileInputRef}
                          type="file"
                          name="image"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, JPEG up to 10MB
                    </p>
                  </div>
                </div>
              </div>
              {/* Submit Button */}
              <div className=" col-span-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700 flex justify-center items-center"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin mr-2" />
                      Saving...
                    </>
                  ) : (
                    "Save Product"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
