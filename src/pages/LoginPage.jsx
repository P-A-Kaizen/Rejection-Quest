import React, { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { useAuth, createUser } from "../utils/auth";
import { Link, useNavigate } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyCJqvqij6xjykJHGq0x4m3JJAqGRwDIhOI",
  authDomain: "rejectiondb.firebaseapp.com",
  databaseURL: "https://rejectiondb-default-rtdb.firebaseio.com",
  projectId: "rejectiondb",
  storageBucket: "rejectiondb.firebasestorage.app",
  messagingSenderId: "165068198440",
  appId: "1:165068198440:web:aab09f0fc1b3fa320d9b1d",
  measurementId: "G-QPJ9L4V5CH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [user, setUserDetails] = useState(useAuth());

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Example of form validation
    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }

    // Firebase Authentication with Email and Password
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("Login successful:", user);

      // Redirect or update UI after successful login
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);

    // Firebase Authentication with Google
    try {
      const result = await signInWithPopup(auth, provider);
      const isNewUser =
        result.user.metadata.creationTime ===
        result.user.metadata.lastSignInTime;
      if (isNewUser) {
        // Create user in Firebase Database
        createUser();
      }
      setUserDetails(result.user);
      navigate("/");
      // Redirect or update UI after successful login
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Link to="/">
        <button className="fixed mt-2 bg-transparent hover:bg-primary text-accent font-semibold hover:text-white py-2 px-4 border border-accent hover:border-transparent rounded">
          Back
        </button>
      </Link>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold text-accent mb-4">Login</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow-md w-full max-w-sm"
        >
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="mb-4">
            <label htmlFor="email" className="block text-primary">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-primary">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-accent text-white p-2 rounded hover:bg-primary"
          >
            Login
          </button>
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="mt-3 w-full bg-accent text-white p-2 rounded hover:bg-primary"
          >
            Sign in with Google
          </button>
        </form>
      </div>
    </>
  );
}
