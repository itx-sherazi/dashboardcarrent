
const API_BASE_URL = 'https://backenrent.vercel.app/api';
import axios from 'axios';

export const fetchDashboardData = async () => {
  const response = await fetch(`${API_BASE_URL}/dashboard`);
  return await response.json();
};



export const updateCar = async (carId, formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/cars/${carId}`, {
      method: 'PUT',
      body: formData, // FormData for multipart/form-data (file upload)

    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update car');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating car:', error);
    throw error;
  }
};
export const updateScooter = async (scooterId, formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/scooter/${scooterId}`, {
      method: 'PUT',
      body: formData, // FormData for multipart/form-data (file upload)

    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update scooter');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating car:', error);
    throw error;
  }
};

// Delete a car
export const deleteCar = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/cars/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return true;
  } catch (error) {
    console.error("Error deleting car:", error);
    throw error;
  }
};
export const deleteScooter = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/scooter/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return true;
  } catch (error) {
    console.error("Error deleting car:", error);
    throw error;
  }
};

export const fetchCars = async () => {
  const response = await fetch(`${API_BASE_URL}/cars/all`);
  return await response.json();
};
export const fetchScooters = async () => {
  const response = await fetch(`${API_BASE_URL}/scooter/all`);
  return await response.json();
};

export const fetchUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/v1/user/all-users`);
  return await response.json();
};

export const fetchOrders = async () => {
  const response = await fetch(`${API_BASE_URL}/AllBook`);
  return await response.json();
};
export const deleteBooking = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/booking/${id}`);
  if (response.status === 200) {
    alert(response.data.message);
  } else {
    throw new Error(response.data.message || "Error deleting booking");
  }
};
export const fetchChartData = async () => {
  const response = await fetch(`${API_BASE_URL}/charts`);
  return await response.json();
};
export const deleteUser = async (id) => {
  const response = await fetch(`${API_BASE_URL}/v1/user/${id}`, {
    method: 'DELETE',
  });
  return await response.json();
};
export const updateUser = async (id, updatedData) => {  // ✅ both id and updatedData
  const response = await fetch(`${API_BASE_URL}/v1/user/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  });
  return await response.json();
};



