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
