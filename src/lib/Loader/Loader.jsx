import React from "react";

const Loader = () => {
  return (
    <div className="flex w-full justify-center items-center h-32">
      <div className="rounded-full border-t-4 border-[#5664ff] border-solid h-12 w-12 animate-spin"></div>
    </div>
  );
};

export default Loader;
