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

export const signOutUser = async () => {
  const auth = getAuth();
  window.location.reload();
  try {
    await signOut(auth);
    console.log("User signed out successfully");
  } catch (error) {
    console.error("Error signing out:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};
