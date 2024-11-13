"use client";

import React, { useRef, useEffect, memo, useState } from "react";
import { Wheel } from "spin-wheel";

const props = {
  items: [{ label: "one" }, { label: "two" }, { label: "three" }],
};

function WheelComponent() {
  const containerRef = useRef(null);
  const wheelRef = useRef(null);
  const [winnerArray, setWinnerArray] = useState([]);

  const spinDuration = 2000;

  const [randomIndex, setRandomIndex] = useState(0);

  useEffect(() => {
    if (containerRef.current && !wheelRef.current) {
      // Initialize the wheel
      wheelRef.current = new Wheel(containerRef.current, props);
    }
  }, []);

  const spinWheel = async () => {
    if (wheelRef.current) {
      // Choose a random item index to spin to
      const newIndex = Math.floor(Math.random() * props.items.length);
      setRandomIndex(newIndex);
      const easingFunction = "easeOutCubic"; // Easing function, as suggested by the library
      const rotations = 10; // Number of rotations to make the wheel spin faster

      // Spin to the randomly selected item with increased rotations
      wheelRef.current.spinToItem(
        newIndex,
        spinDuration,
        easingFunction,
        rotations
      );

      // Add the selected item to the winnerArray
      setWinnerArray((prevArray) => [
        ...prevArray,
        props.items[newIndex].label,
      ]);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-center">Wheel</h1>
      <div className="flex flex-col md:flex-row items-center w-full md:w-3/4">
        <div className="relative w-full md:w-1/2" style={{ height: "400px" }}>
          <div
            className="wheel-container"
            style={{ width: "100%", height: "100%" }}
            ref={containerRef}
          ></div>
          <img
            src="src/assets/images/pointer.png"
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
          <h1 className="text-center md:text-start">Challanges</h1>
          <ul className="overflow-y-scroll text-center md:text-start h-40">
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
    </div>
  );
}

export default memo(WheelComponent);
