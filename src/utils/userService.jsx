export const createUser = async (user) => {
  // Get the authenticated user
  const userData = {
    email: user.email,
    name: user.displayName,
    score: 0,
  };

  try {
    const response = await fetch(
      `https://rejectiondb-default-rtdb.firebaseio.com/user/${user.uid}.json`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
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

//fetch user data
export const fetchUserData = async (userId) => {
  try {
    const response = await fetch(
      `https://rejectiondb-default-rtdb.firebaseio.com/user/${userId}.json`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

//write opponent to user data
export const writeOpponent = async (userId, opponentId) => {
  try {
    const response = await fetch(
      `https://rejectiondb-default-rtdb.firebaseio.com/user/${userId}/opponent.json`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(opponentId),
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

//fetch opponent data
export const fetchOpponentData = async (userId) => {
  try {
    const response = await fetch(
      `https://rejectiondb-default-rtdb.firebaseio.com/user/${userId}/opponent.json`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching opponent:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

//add to users score
export const addToScore = async (userId, score) => {
  try {
    const response = await fetch(
      `https://rejectiondb-default-rtdb.firebaseio.com/user/${userId}/score.json`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(score),
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
