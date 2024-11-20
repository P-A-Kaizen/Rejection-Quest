// src/components/HomePage.jsx

import React from "react";
import WheelComponent from "./Wheel";
import Logo from "../assets/images/RejectionQuest logo.png";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCJqvqij6xjykJHGq0x4m3JJAqGRwDIhOI",
  authDomain: "rejectiondb.firebaseapp.com",
  projectId: "rejectiondb",
  storageBucket: "rejectiondb.appspot.com",
  messagingSenderId: "165068198440",
  appId: "1:165068198440:web:aab09f0fc1b3fa320d9b1d",
  measurementId: "G-QPJ9L4V5CH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <button className="fixed mt-2 bg-transparent hover:bg-primary text-accent font-semibold hover:text-white py-2 px-4 border border-accent hover:border-transparent rounded">
        Login
      </button>
      <img className="mx-auto h-36" src={Logo}></img>
      <div className="flex flex-col md:flex-row ">
        <WheelComponent endpoint="weekly" title="Weekly Challenges" />
        <WheelComponent endpoint="monthly" title="Monthly Challenges" />
      </div>
    </div>
  );
}

export default HomePage;
