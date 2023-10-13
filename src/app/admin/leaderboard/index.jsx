import React from "react";
import { useGetLeaderBoard } from "../../../api/hooks/useGetLeaderBoard";
import Loader from "../../../lib/Loader/Loader";
const LeaderboardScreen = () => {
  const {
    data: { data },
    isLoading,
  } = useGetLeaderBoard({
    params: {
      type: "admin",
    },
  });
  return (
    <div className="container w-[60%] mx-auto mt-8 shadow-lg min-h-48 shadow-slate-300">
      {isLoading && <Loader />}
      <ul className="divide-y divide-gray-200 ">
        {data.map((student, index) => (
          <li
            key={student._id}
            className={`py-2 flex items-center justify-between px-4 ${
              index === 0 ? "bg-[#5A4BDA] text-white rounded" : ""
            }`}
          >
            <div>
              <span className="text-xl mr-5 font-semibold">{index + 1}.</span>
              <span className="text-lg font-medium">
                {student?.user?.username}
              </span>
            </div>
            <span className="text-xl font-semibold flex item-center gap-2 ">
              {student?.rewardPoints}
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
