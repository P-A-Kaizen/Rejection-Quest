// src/components/HomePage.jsx

import React, { useState } from "react";
import { Link } from "react-router-dom";
import WheelComponent from "../components/Wheel";
import Logo from "../assets/images/RejectionQuest logo.png";
import { useAuth } from "../utils/auth";

function HomePage() {
  const user = useState(useAuth());

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-accent mb-4 place-self-end">
        {user[0].user.displayName ? user[0].user.displayName : "Guest"}
      </h1>
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
