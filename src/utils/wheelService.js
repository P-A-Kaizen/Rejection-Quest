const fetchWheelData = async () => {
    
      const response = await fetch(
        "https://rejectiondb-default-rtdb.firebaseio.com/weekly.json"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
   
  };

  const writeWheelData = async (newData) => {
    const id = Math.random().toString(36).substr(2, 9); // Generate a random ID
    try {
      const response = await fetch(
        `https://rejectiondb-default-rtdb.firebaseio.com/weekly/${id}.json`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newData),
        }
      );
      debugger;
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
      
    } catch (err) {
      console.error("Error writing data:", err);
    }
  };

  export { fetchWheelData, writeWheelData };