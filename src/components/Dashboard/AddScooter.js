import { useState, useRef, useEffect } from "react";
import { X, Upload, Loader2 } from "lucide-react";

export default function AddScooter() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    seat: "",
    year: "",
    speed: "",
    engine: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const API_ENDPOINT = "https://backenrent.vercel.app/api/scooter/addscooter";

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      seat: "",
      year: "",
      speed: "",
      engine: "",
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

    setIsLoading(true);
    setError("");

    const submitData = new FormData();
    Object.keys(formData).forEach((key) => {
      submitData.append(key, formData[key]);
    });
    submitData.append("imageUrl", imageFile);

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        body: submitData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to add scooter");
      }

      alert("Scooter added successfully!");
      handleClose();

      setLoading(true);

      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.error("Error adding scooter:", error);
      setError(error.message || "Failed to add scooter. Please try again.");
      setIsLoading(false);
    }
  };

  if (error && !isOpen) {
    return (
      <div className="text-red-500 p-4 bg-red-100 rounded-md">
        Error loading scooters: {error}
      </div>
    );
  }

  return (
    <div className="font-sans">
      <button
        onClick={handleOpen}
        className="px-4 py-2 bg-yellow-400 text-black font-medium rounded hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-300"
      >
        Add Scooter
      </button>

      {isOpen && (
  <div className="fixed inset-0 bg-black/10 bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg w-full max-w-xl mx-4 relative">
      <div className="bg-yellow-400 text-black px-6 py-2 rounded-t-lg flex justify-between items-center">
        <h2 className="text-xl font-bold">Add New Scooter</h2>
        <button
          onClick={handleClose}
          className="text-black hover:text-gray-700 focus:outline-none"
        >
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {error && (
          <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="col-span-1">
          {/* Scooter Name */}
          <label className="block text-sm font-medium text-gray-700">Scooter Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div className="col-span-1">
          {/* Seats */}
          <label className="block text-sm font-medium text-gray-700">Seats</label>
          <input
            type="number"
            name="seat"
            value={formData.seat}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div className="col-span-1">
          {/* Year */}
          <label className="block text-sm font-medium text-gray-700">Year</label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div className="col-span-1">
          {/* Speed */}
          <label className="block text-sm font-medium text-gray-700">Speed</label>
          <input
            type="text"
            name="speed"
            placeholder="e.g., 60 km/h"
            value={formData.speed}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div className="col-span-1">
          {/* Engine */}
          <label className="block text-sm font-medium text-gray-700">Engine</label>
          <input
            type="text"
            name="engine"
            placeholder="e.g., 125cc"
            value={formData.engine}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div className="col-span-2">
          {/* Image Upload */}
          <label className="block text-sm font-medium text-gray-700">Scooter Image</label>
          <div
            className="flex justify-center px-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-yellow-400"
            onClick={triggerFileInput}
          >
            <div className="text-center">
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
        <div className="mt-4 col-span-2">
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
              "Save Scooter"
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