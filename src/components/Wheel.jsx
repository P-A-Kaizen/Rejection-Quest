import React, { useRef, useEffect, memo, useState } from "react";
import { Wheel } from "spin-wheel";
import pointer from "../assets/images/pointer.png";
import { fetchWheelData, writeWheelData } from "../utils/wheelService.js";

function WheelComponent({ endpoint, title }) {
  const containerRef = useRef(null);
  const wheelRef = useRef(null);
  const [winnerArray, setWinnerArray] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newChallenge, setNewChallenge] = useState("");

  const spinDuration = 2000;

  const write = async () =>
    await writeWheelData(endpoint, { label: newChallenge }).then(() => {
      setChallenges((prevArray) => [...prevArray, { label: newChallenge }]);
      wheelRef.current.remove();

      wheelRef.current = new Wheel(containerRef.current, {
        items: [...challenges, { label: newChallenge }],
      });
    });

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWheelData(endpoint);
      setChallenges(Object.values(data).filter((item) => item != null));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);

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

        // Add the selected item to the winnerArray
        setWinnerArray((prevArray) => [
          ...prevArray,
          challenges[newIndex].label,
        ]);
      }, spinDuration);
    }
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
            {winnerArray.map((item, index) => (
              <li key={index} className="text-primary">
                {item}
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
