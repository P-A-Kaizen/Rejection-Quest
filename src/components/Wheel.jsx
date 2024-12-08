import React, { useRef, useEffect, memo, useState } from "react";
import { Wheel } from "spin-wheel";
import {
  fetchWheelData,
  writeWheelData,
  fetchUserChallenges,
  addUserChallenge,
  deleteUserChallenge,
} from "../utils/wheelService.js";
import pointer from "../assets/images/pointer.png";
import { useAuth } from "../utils/auth";

function WheelComponent({ challengeType, title }) {
  const containerRef = useRef(null);
  const wheelRef = useRef(null);
  const [winnerArray, setWinnerArray] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newChallenge, setNewChallenge] = useState("");
  const user = useState(useAuth())[0];

  const spinDuration = 2000;

  const write = async () => {
    await writeWheelData({ label: newChallenge, type: challengeType }).then(
      () => {
        setChallenges((prevArray) => [...prevArray, { label: newChallenge }]);
        wheelRef.current.remove();

        wheelRef.current = new Wheel(containerRef.current, {
          items: [...challenges, { label: newChallenge }],
        });
      }
    );
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWheelData();
      setChallenges(
        Object.values(data).filter(
          (item) => item != null && item.type === challengeType
        )
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserChallenge = async () => {
    try {
      const userChallenges = await fetchUserChallenges(user.uid);
      setWinnerArray(
        Object.entries(userChallenges)
          .filter(([key, item]) => item.type === challengeType)
          .map(([key, item]) => ({ ...item, key }))
      );
    } catch (err) {
      console.error("Error fetching user challenges:", err);
    }
  };

  useEffect(() => {
    fetchData();

    if (user) {
      fetchUserChallenge();
    }
  }, [challengeType]);

  useEffect(() => {
    if (containerRef.current && !wheelRef.current && challenges.length > 0) {
      // Initialize the wheel
      wheelRef.current = new Wheel(containerRef.current, {
        items: challenges,
      });
    }
  }, [challenges]);

  const spinWheel = async () => {
    if (wheelRef.current) {
      // Choose a random item index to spin to
      const newIndex = Math.floor(Math.random() * challenges.length);
      const easingFunction = "easeOutCubic"; // Easing function, as suggested by the library
      const rotations = 10; // Number of rotations to make the wheel spin faster

      // Spin to the randomly selected item with increased rotations
      wheelRef.current.spinToItem(
        newIndex,
        spinDuration,
        easingFunction,
        rotations
      );

      setTimeout(() => {
        if (winnerArray.length > 4) {
          return;
        }
        // Remove the selected item from the challenges array
        const updatedChallenges = challenges.filter(
          (_, index) => index !== newIndex
        );
        setChallenges(updatedChallenges);

        // Remove the old wheel
        wheelRef.current.remove();

        // Reinitialize the wheel with the updated challenges
        wheelRef.current = new Wheel(containerRef.current, {
          items: updatedChallenges,
        });

        let winner = challenges[newIndex];
        if (user !== null) {
          addUserChallenge(user.uid, winner).then((key) => {
            winner = { ...winner, key: key.name };
          });
        } else {
          winner = { ...winner, key: Math.random().toString(36).substr(2, 9) };
        }

        // Add the selected item to the winnerArray
        setWinnerArray((prevArray) => [...prevArray, winner]);

        // Update the user's challenges
      }, spinDuration);
    }
  };

  const handleDeleteChallenge = async (key) => {
    user
      ? await deleteUserChallenge(user.uid, key).then(() => {
          setWinnerArray((prevArray) =>
            prevArray.filter((item) => item.key !== key)
          );
        })
      : setWinnerArray((prevArray) =>
          prevArray.filter((item) => item.key !== key)
        );
  };

  const handleAddChallenge = () => {
    if (newChallenge.trim() !== "") {
      write();
      setNewChallenge(""); // Clear the textarea
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col items-center w-full my-10">
      <h1 className="text-center">{title}</h1>
      <div className="flex flex-col md:flex-row items-center w-full md:w-3/4">
        <div className="relative w-full md:w-1/2" style={{ height: "400px" }}>
          <div
            className="wheel-container"
            style={{ width: "100%", height: "100%" }}
            ref={containerRef}
          ></div>
          <img
            src={pointer}
            alt="Pointer"
            className="absolute"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -100%)",
              width: "20px",
              height: "auto",
            }}
          />
        </div>
        <div className="w-full md:w-1/2 mt-4 md:mt-0 md:ml-4">
          <h1 className="text-center md:text-start">Challenges</h1>
          <ul
            className="overflow-y-scroll text-center md:text-start h-40"
            style={{
              msOverflowStyle: "none", // IE and Edge
              scrollbarWidth: "none", // Firefox
            }}
          >
            {winnerArray.map((item) => (
              <li
                key={item.key}
                className="text-primary flex justify-between items-center"
              >
                {item.label}
                <button
                  className="text-red-500 ml-2"
                  onClick={() => handleDeleteChallenge(item.key)}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button
        className="mt-4 bg-transparent hover:bg-primary text-accent font-semibold hover:text-white py-2 px-4 border border-accent hover:border-transparent rounded"
        onClick={spinWheel}
      >
        Spin the Wheel
      </button>
      <div className="w-full md:w-1/2 mt-4">
        <label
          htmlFor="newChallenge"
          className="block text-center md:text-start"
        >
          Add New Challenge
        </label>
        <textarea
          id="newChallenge"
          className="w-full p-2 border border-gray-300 rounded"
          value={newChallenge}
          onChange={(e) => setNewChallenge(e.target.value)}
        ></textarea>
        <button
          className=" bg-transparent hover:bg-primary text-accent font-semibold hover:text-white py-2 px-4 border border-accent hover:border-transparent rounded"
          onClick={handleAddChallenge}
        >
          Add Challenge
        </button>
      </div>
    </div>
  );
}

export default memo(WheelComponent);
