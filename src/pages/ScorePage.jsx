import React, { useState, useEffect } from "react";
import { useAuth } from "../utils/auth";
import { fetchUserChallenges } from "../utils/wheelService.js";
import { Link } from "react-router-dom";
import Opponent from "../components/Opponent";
import { fetchUserData, fetchOpponentData } from "../utils/userService";

export default function ScorePage() {
  const [timeLeft, setTimeLeft] = useState("");
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useState(useAuth())[0];
  const [userData, setUserData] = useState(null);
  const [opponent, setOpponent] = useState(null);
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
        if (user) {
          const userChallenges = await fetchUserChallenges(user.uid);
          if (userChallenges !== null) {
            setChallenges(Object.values(userChallenges));
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
    getUserData(user);
  }, []);

  const getUserData = async (user) => {
    fetchUserData(user.uid).then((data) => {
      setUserData(data);
      if (data.opponent) {
        fetchUserData(data.opponent).then((opponentData) => {
          setOpponent(opponentData);
        });
      }
    });
  };

  const handleOpponentEntered = (uid) => {
    setUserData({ ...userData, opponent: uid });
    fetchOpponentData(uid).then((data) => {
      setOpponent(data);
    });
  };

  return (
    <>
      <Link to="/">
        <button className="fixed mt-2 bg-transparent hover:bg-primary text-accent font-semibold hover:text-white py-2 px-4 border border-accent hover:border-transparent rounded">
          Back
        </button>
      </Link>

      {user ? (
        opponent ? (
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
                <h2 className="text-2xl font-semibold">{opponent.name}</h2>
                <div className="text-3xl font-bold">{opponent.score}</div>
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-semibold">{userData.name}</h2>
                <div className="text-3xl font-bold">{userData.score}</div>
              </div>
            </div>
            <div className="w-full max-w-2xl">
              <h2 className="text-2xl font-semibold mb-4">
                Current Challenges
              </h2>
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : challenges.length > 0 ? (
                <ul className="list-disc list-inside">
                  {challenges.map((challenge, index) => (
                    <li key={index}>{challenge.label}</li>
                  ))}
                </ul>
              ) : (
                <p>No current challenges.</p>
              )}
            </div>
          </div>
        ) : (
          <Opponent onOpponentEntered={handleOpponentEntered} />
        )
      ) : (
        <h1> please login</h1>
      )}
    </>
  );
}
