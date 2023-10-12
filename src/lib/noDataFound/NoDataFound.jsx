import React from "react";

const NoDataFound = () => {
  return (
    <div className="flex flex-col w-full h-48 justify-center items-center gap-2">
      <img src="/NoDataFound.svg" alt="calendar" width={80} height={80} />
      No Data Found
    </div>
  );
};

export default NoDataFound;
