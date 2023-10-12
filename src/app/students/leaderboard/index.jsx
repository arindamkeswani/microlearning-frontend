import React from "react";
const students = [
  { id: 1, name: "Alice", creditScore: 95 },
  { id: 2, name: "Bob", creditScore: 90 },
  { id: 3, name: "Charlie", creditScore: 85 },
  { id: 2, name: "Bob", creditScore: 90 },
  { id: 3, name: "Charlie", creditScore: 85 },
  { id: 2, name: "Bob", creditScore: 90 },
  { id: 3, name: "Charlie", creditScore: 85 },
  { id: 2, name: "Bob", creditScore: 90 },
  { id: 3, name: "Charlie", creditScore: 85 },
  // ...more students
];
const LeaderboardScreen = ({}) => {
  // Sort students by credit score in descending order
  const sortedStudents = students.sort((a, b) => b.creditScore - a.creditScore);

  return (
    <div className="container w-[80%] mx-auto py-4 pt-5">
      <ul className="divide-y divide-gray-200 ">
        {sortedStudents.map((student, index) => (
          <li
            key={student.id}
            className={`py-4 flex items-center justify-between px-4 ${
              index === 0 ? "bg-[#5664ff] text-white" : ""
            }`}
          >
            <div>
              <span className="text-2xl mr-5 font-bold">{index + 1}.</span>
              <span className="text-xl font-semibold">{student.name}</span>
            </div>
            <span className="text-xl font-semibold flex item-center">
              {student.creditScore}
              {index === 0 && (
                <img
                  src="https://github.com/malunaridev/Challenges-iCodeThis/blob/master/4-leaderboard/assets/gold-medal.png?raw=true"
                  alt="gold medal"
                />
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeaderboardScreen;
