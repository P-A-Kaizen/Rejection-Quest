// src/components/HomePage.jsx

import React from "react";
import { Link } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import WheelComponent from "../components/Wheel";
import Logo from "../assets/images/RejectionQuest logo.png";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "1:165068198440:web:aab09f0fc1b3fa320d9b1d",
  measurementId: "G-QPJ9L4V5CH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/login">
        <button className="fixed mt-2 bg-transparent hover:bg-primary text-accent font-semibold hover:text-white py-2 px-4 border border-accent hover:border-transparent rounded">
          Login
        </button>
      </Link>
      <img className="mx-auto h-36" src={Logo} alt="Logo" />
      <div className="flex flex-col md:flex-row">
        <WheelComponent endpoint="weekly" title="Weekly Challenges" />
        <WheelComponent endpoint="monthly" title="Monthly Challenges" />
      </div>
    </div>
  );
}

export default HomePage;
