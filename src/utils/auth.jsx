import React, { createContext, useContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"; // Import Firebase Auth

// Create the context
const AuthContext = createContext(null);

// Custom hook for consuming the context
export const useAuth = () => useContext(AuthContext);

// Auth Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Holds the user information
  const [loading, setLoading] = useState(true); // Tracks if Firebase is initializing

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update user information
      setLoading(false); // Loading complete
    });

    return unsubscribe; // Cleanup the listener
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading && children}{" "}
      {/* Only render children once loading is complete */}
    </AuthContext.Provider>
  );
};

export const createUser = async () => {
  // Get the authenticated user
  const user = useAuth();
  const userData = {
    email: user[0].user.email,
    name: user[0].user.displayName,
    weekly: null,
    monthly: null,
  };

  try {
    const response = await fetch(
      `https://rejectiondb-default-rtdb.firebaseio.com/user/${user[0].user.uid}.json`,
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

export const signOutUser = async () => {
  const auth = getAuth();
  try {
    await signOut(auth);
    console.log("User signed out successfully");
  } catch (error) {
    console.error("Error signing out:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};
