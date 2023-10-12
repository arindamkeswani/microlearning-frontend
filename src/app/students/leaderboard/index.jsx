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
    <div className="container w-[80%] mx-auto mt-8 shadow-lg shadow-slate-300">
      <ul className="divide-y divide-gray-200 ">
        {sortedStudents.map((student, index) => (
          <li
            key={student.id}
            className={`py-4 flex items-center justify-between px-4 ${
              index === 0 ? "bg-[#5A4BDA] text-white rounded" : ""
            }`}
          >
            <div>
              <span className="text-2xl mr-5 font-bold">{index + 1}.</span>
              <span className="text-xl font-semibold">{student.name}</span>
            </div>
            <span className="text-xl font-semibold flex item-center gap-2 ">
              {student.creditScore}
              {index === 0 ? (
                <i className="fa-solid text-lg fa-trophy text-yellow-300"></i>
              ) : index === 1 ? (
                <i className="fa-solid text-lg fa-trophy text-slate-400"></i>
              ) : index === 2 ? (
                <i className="fa-solid text-lg fa-trophy text-[#d97706]"></i>
              ) : (
                false
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeaderboardScreen;
