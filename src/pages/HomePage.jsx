// src/components/HomePage.jsx

import React, { useState } from "react";
import { Link } from "react-router-dom";
import WheelComponent from "../components/Wheel";
import Logo from "../assets/images/RejectionQuest logo.png";
import { useAuth, signOutUser } from "../utils/auth";

function HomePage() {
  const user = useState(useAuth())[0].user;

  return (
    <>
      {!user ? (
        <Link to="/login">
          <button className="fixed mt-2 bg-transparent hover:bg-primary text-accent font-semibold hover:text-white py-2 px-4 border border-accent hover:border-transparent rounded">
            Login
          </button>
        </Link>
      ) : (
        <button
          className="fixed mt-2 bg-transparent hover:bg-primary text-accent font-semibold hover:text-white py-2 px-4 border border-accent hover:border-transparent rounded"
          onClick={signOutUser}
        >
          Logout
        </button>
      )}
      <h1 className="text-4xl font-bold text-accent mt-2 place-self-end">
        {user ? user.displayName : "Guest"}
      </h1>
      <Link to="/score">
        <button className="fixed mt-3 bg-transparent hover:bg-primary text-accent font-semibold hover:text-white py-2 px-4 border border-accent hover:border-transparent rounded">
          Score
        </button>
      </Link>
      <div className="container mx-auto px-4 py-8">
        <img className="mx-auto h-36" src={Logo} alt="Logo" />
        <div className="flex flex-col md:flex-row">
          <WheelComponent challengeType="weekly" title="Weekly Challenges" />
          <WheelComponent challengeType="monthly" title="Monthly Challenges" />
        </div>
      </div>
    </>
  );
}

export default HomePage;
