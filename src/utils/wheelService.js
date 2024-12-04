const fetchWheelData = async () => {
  try {
    const response = await fetch("https://rejectiondb-default-rtdb.firebaseio.com/challanges.json");
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

const writeWheelData = async ( newData) => {
  const id = Math.random().toString(36).substr(2, 9); // Generate a random ID
  try {
    const response = await fetch(
      `https://rejectiondb-default-rtdb.firebaseio.com/challanges/${id}.json`,
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

const fetchUserChallenges = async (userId) => {
  try {
    const response = await fetch(
      `https://rejectiondb-default-rtdb.firebaseio.com/user/${userId}/challenges.json`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user challenges:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

const addUserChallenge = async (userId, challenge) => {
  try {
    const response = await fetch(
      `https://rejectiondb-default-rtdb.firebaseio.com/user/${userId}/challenges.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(challenge),
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("Challenge added successfully:", data);
    return data;
  } catch (error) {
    console.error("Error adding challenge:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

const deleteUserChallenge = async (userId, challengeId) => {
  try {
    const response = await fetch(
      `https://rejectiondb-default-rtdb.firebaseio.com/user/${userId}/challenges/${challengeId}.json`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    console.log("Challenge deleted successfully");
  } catch (error) {
    console.error("Error deleting challenge:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

const deleteWheelChallenge = async (challengeId) => {
  try {
    const response = await fetch(
      `https://rejectiondb-default-rtdb.firebaseio.com/weekly/${challengeId}.json`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    console.log("Challenge deleted from wheel successfully");
  } catch (error) {
    console.error("Error deleting challenge from wheel:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

export {
  fetchWheelData,
  writeWheelData,
  fetchUserChallenges,
  addUserChallenge,
  deleteUserChallenge,
  deleteWheelChallenge,
};