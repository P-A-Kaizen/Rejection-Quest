import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { fetchUserChallenges } from "../utils/wheelService.js";
import { Link } from "react-router-dom";

export default function ScorePage() {
  const [timeLeft, setTimeLeft] = useState("");
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(getAuth());
  debugger;
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      const difference = endOfMonth - now;

      let timeLeft = {};

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }

      return timeLeft;
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchChallenges = async () => {
      setLoading(true);
      setError(null);
      try {
        const user = auth.currentUser;
        if (user) {
          const userChallenges = await fetchUserChallenges(user.uid);
          setChallenges(Object.values(userChallenges));
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  return (
    <>
      <Link to="/">
        <button className="fixed mt-2 bg-transparent hover:bg-primary text-accent font-semibold hover:text-white py-2 px-4 border border-accent hover:border-transparent rounded">
          Back
        </button>
      </Link>
      {user.currentUser ? (
        <h1></h1>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen  text-white">
          <h1 className="text-4xl font-bold mb-4">Scoreboard</h1>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold">Time Left This Month</h2>
            <div className="text-3xl font-bold">
              {timeLeft.days} days {timeLeft.hours}h {timeLeft.minutes}m{" "}
              {timeLeft.seconds}s
            </div>
          </div>
          <div className="flex justify-between w-full max-w-2xl mb-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold">Pablo</h2>
              <div className="text-3xl font-bold">0</div>
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-semibold">Andres</h2>
              <div className="text-3xl font-bold">0</div>
            </div>
          </div>
          <div className="w-full max-w-2xl">
            <h2 className="text-2xl font-semibold mb-4">Current Challenges</h2>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <ul className="list-disc list-inside">
                {challenges.map((challenge, index) => (
                  <li key={index}>{challenge.label}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  );
}
