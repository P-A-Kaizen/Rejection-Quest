import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { FaCopy } from "react-icons/fa";
import { writeOpponent } from "../utils/userService";

export default function Opponent({ onOpponentEntered }) {
  const [opponentUid, setOpponentUid] = useState("");
  const [copied, setCopied] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;

  const handleCopy = () => {
    navigator.clipboard.writeText(user.uid);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000); // Hide the message after 2 seconds
  };

  const handleOpponentEntered = () => {
    writeOpponent(user.uid, opponentUid);
    onOpponentEntered(opponentUid); // Send the opponent UID back to the parent component
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2">No Opponent Selected</h2>
        <p className="text-lg">
          You haven't selected an opponent for the month yet. Get your friend's
          UID or share your UID with them.
        </p>
      </div>
      <h1 className="text-4xl font-bold mb-4">Enter Opponent's UID</h1>
      <input
        type="text"
        placeholder="Opponent's UID"
        value={opponentUid}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleOpponentEntered();
          }
        }}
        onChange={(e) => setOpponentUid(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
      />
      <div className="flex items-center mt-4">
        <span className="mr-2">Your UID:</span>
        <span className="mr-2">{user.uid}</span>
        <button onClick={handleCopy} className="text-primary hover:text-light">
          <FaCopy />
        </button>
      </div>
      <div
        className={`mt-2 text-green-500 transition-opacity duration-1000 ease-out ${
          copied ? "opacity-100" : "opacity-0"
        }`}
      >
        Copied to clipboard!
      </div>
    </div>
  );
}
