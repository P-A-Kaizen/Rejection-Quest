// src/components/HomePage.jsx

import React from "react";
import { Tab } from "@headlessui/react";
import WheelComponent from "./Wheel";

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
  // const sections = [
  //   {
  //     title: "Goal",
  //     content: "End fear of Rejection, be more social",
  //   },
  //   {
  //     title: "Means",
  //     content: "Points System — Most points wins!",
  //   },
  //   {
  //     title: "Accountability",
  //     content: (
  //       <>
  //         <p>
  //           <strong>Doing it:</strong> Other player must see it live OR see
  //           video evidence in order to award points.
  //         </p>
  //         <p>
  //           <strong>Not Doing it:</strong> Appeal (to change difficulty or
  //           remove challenge) with other player first, then third party.
  //         </p>
  //         <p>
  //           <strong>Fail fair challenge:</strong> Lose points (2, 1, 0) and
  //           other player has opportunity to steal.
  //         </p>
  //       </>
  //     ),
  //   },
  //   {
  //     title: "Monthly Reset",
  //     content:
  //       "Reset points at the end of each month. Winner gets to choose one prize/punishment from 4 options (randomly drawn from large pool, depending on points difference (<5, ≥5)).",
  //   },
  //   {
  //     title: "Points System",
  //     content: (
  //       <>
  //         <ul className="list-disc ml-5">
  //           <li>Start at 0 points.</li>
  //           <li>Completing Tasks earns points.</li>
  //           <li>
  //             Outcome of task doesn’t matter* (yes or no is still a win) *(some
  //             exceptions apply).
  //           </li>
  //           <li>
  //             Completing tasks while intoxicated = only 50% of the points
  //             earned.
  //           </li>
  //           <li>
  //             Different difficulties of tasks offer different amounts of points:
  //             <ul className="list-disc ml-5">
  //               <li>Starter = 2 pts</li>
  //               <li>Challenger = 4 pts</li>
  //               <li>Conqueror = 10 pts</li>
  //             </ul>
  //           </li>
  //           <li>Difficulty is decided by consensus/third party.</li>
  //           <li>
  //             Hybrid challenges are like parlays (multiple challenges to
  //             complete at once, but offer more points than the sum of individual
  //             challenges).
  //           </li>
  //         </ul>
  //       </>
  //     ),
  //   },
  //   {
  //     title: "Task Delegation",
  //     content: (
  //       <>
  //         <p>
  //           Each player gets 5 weekly tasks (same quantity of each difficulty
  //           for each player for no points imbalance). These are chosen from a
  //           large pool of tasks randomly by a computer.
  //         </p>
  //         <p>
  //           <strong>"Spur of the moment tasks":</strong> Players can offer each
  //           other additional tasks live based on the present situation.
  //         </p>
  //         <p>2 task debt limit (past the limit, points are delayed).</p>
  //         <p>
  //           <strong>Monthly Shared Tasks (minimum 1):</strong>
  //         </p>
  //         <ul className="list-disc ml-5">
  //           <li>
  //             Each player, before seeing the task, bets between 1-5 points
  //             (anonymously).
  //           </li>
  //           <li>
  //             If both players complete the task, they earn the number of points
  //             bet.
  //           </li>
  //           <li>
  //             If one player chickens out, the other instantly earns the total
  //             number of points bet by both players.
  //           </li>
  //           <li>
  //             Any player who chickens out forfeits the number of points they
  //             bet.
  //           </li>
  //         </ul>
  //       </>
  //     ),
  //   },
  //   {
  //     title: "Special Abilities",
  //     content: (
  //       <>
  //         <p>All special abilities are reset monthly (no stacking).</p>
  //         <ul className="list-disc ml-5">
  //           <li>
  //             <strong>Veto (1/month):</strong> Refuse to take a task, with no
  //             punishment for failing.
  //           </li>
  //           <li>
  //             <strong>Reverse (2/month):</strong> Return task to sender.
  //           </li>
  //           <li>
  //             <strong>Absolutes (2/month):</strong> Refusing costs 10 points.
  //             Can only be used for “Starter” tasks.
  //           </li>
  //         </ul>
  //       </>
  //     ),
  //   },
  //   {
  //     title: "Difficulty Criteria/Examples",
  //     content: (
  //       <>
  //         <p>
  //           <strong>Starter:</strong>
  //         </p>
  //         <ul className="list-disc ml-5">
  //           <li>Giving compliments</li>
  //           <li>Offering free stuff*</li>
  //           <li>1-on-1 conversation</li>
  //           <li>Asking for free stuff (but getting rejected)</li>
  //         </ul>
  //         <p>
  //           <strong>Challenger:</strong>
  //         </p>
  //         <ul className="list-disc ml-5">
  //           <li>Approaching a group</li>
  //           <li>Asking someone for their number</li>
  //           <li>Getting someone to do something with you (not just talk)</li>
  //           <li>Asking for free stuff (and actually getting it)</li>
  //         </ul>
  //         <p>
  //           <strong>Conqueror:</strong>
  //         </p>
  //         <ul className="list-disc ml-5">
  //           <li>
  //             Secure a date with a stranger after one conversation. Stranger
  //             must be approved by the other player.
  //           </li>
  //           <li>Hybrid challenges (parlay)</li>
  //         </ul>
  //       </>
  //     ),
  //   },
  // ];

  return (
    <div className="container mx-auto px-4 py-8">
      <img
        className="mx-auto h-36"
        src="src\assets\images\RejectionQuest logo.png"
      ></img>

      <WheelComponent />
      {/* <Tab.Group>
        <Tab.List className="flex overflow-x-auto">
          {sections.map((section) => (
            <Tab
              key={section.title}
              className={({ selected }) =>
                `py-2 px-4 text-sm font-medium focus:outline-none ${
                  selected
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : "text-gray-500 hover:text-blue-500"
                }`
              }
            >
              {section.title}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-6">
          {sections.map((section) => (
            <Tab.Panel key={section.title} className="prose max-w-none">
              {section.content}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group> */}
    </div>
  );
}

export default HomePage;
