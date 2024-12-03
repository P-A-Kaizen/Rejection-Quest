import {useAuth} from "./authService";


const fetchWheelData = async (endpoint) => {
  try {
    const response = await fetch("https://rejectiondb-default-rtdb.firebaseio.com/" + endpoint + ".json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return Object.values(data).filter((item) => item != null); // Ensure data is in the expected format

  } catch (error) {
    console.error("Error fetching wheel data:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

const writeWheelData = async (endpoint, newData) => {
  const id = Math.random().toString(36).substr(2, 9); // Generate a random ID
  const user = useAuth();
  try {
    const response = await fetch(
      `https://rejectiondb-default-rtdb.firebaseio.com/${endpoint}/${id}.json`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("Data written successfully:", data);
    return data;
  } catch (error) {
    console.error("Error writing data:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

export { fetchWheelData, writeWheelData };