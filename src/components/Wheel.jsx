import React, { useRef, useEffect, memo, useState } from "react";
import { Wheel } from "spin-wheel";
import pointer from "../assets/images/pointer.png";

function WheelComponent() {
  const containerRef = useRef(null);
  const wheelRef = useRef(null);
  const [winnerArray, setWinnerArray] = useState([]);
  const [weeklyChallanges, setWeeklyChallanges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newChallenge, setNewChallenge] = useState("");

  const spinDuration = 2000;

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://rejectiondb-default-rtdb.firebaseio.com/weekly.json"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setWeeklyChallanges(Object.values(data).filter((item) => item != null));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const writeData = async (newData) => {
    const id = Math.random().toString(36).substr(2, 9); // Generate a random ID
    try {
      const response = await fetch(
        `https://rejectiondb-default-rtdb.firebaseio.com/weekly/${id}.json`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newData),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Data written successfully:", data);
      // Update the weeklyChallanges state with the new challenge
      setWeeklyChallanges((prevArray) => [
        ...prevArray,
        { label: newData.label },
      ]);
    } catch (err) {
      console.error("Error writing data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (
      containerRef.current &&
      !wheelRef.current &&
      weeklyChallanges.length > 0
    ) {
      // Initialize the wheel
      wheelRef.current = new Wheel(containerRef.current, {
        items: weeklyChallanges,
      });
    }
  }, [weeklyChallanges]);

  const spinWheel = async () => {
    if (wheelRef.current) {
      // Choose a random item index to spin to
      const newIndex = Math.floor(Math.random() * weeklyChallanges.length);
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
        // Remove the selected item from the weeklyChallanges array
        const updatedChallenges = weeklyChallanges.filter(
          (_, index) => index !== newIndex
        );
        setWeeklyChallanges(updatedChallenges);

        // Remove the old wheel
        wheelRef.current.remove();

        // Reinitialize the wheel with the updated challenges
        wheelRef.current = new Wheel(containerRef.current, {
          items: updatedChallenges,
        });

        // Add the selected item to the winnerArray
        setWinnerArray((prevArray) => [
          ...prevArray,
          weeklyChallanges[newIndex].label,
        ]);
      }, spinDuration);
    }
  };

  const handleAddChallenge = () => {
    if (newChallenge.trim() !== "") {
      writeData({ label: newChallenge });
      setNewChallenge(""); // Clear the textarea
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-center">Weekly</h1>
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
          <h1 className="text-center md:text-start">Weekly Challanges</h1>
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
          className="mt-2 bg-transparent hover:bg-primary text-accent font-semibold hover:text-white py-2 px-4 border border-accent hover:border-transparent rounded"
          onClick={handleAddChallenge}
        >
          Add Challenge
        </button>
      </div>
    </div>
  );
}

export default memo(WheelComponent);
