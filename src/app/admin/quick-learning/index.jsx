import React, { useState } from "react";
import ReelUploadSteps from "./ReelUploadSteps";
import Button from "../../../lib/Button/Button";
import { useSelector } from "react-redux";

const QuickLearningScreen = () => {
  const state = useSelector((state) => state.uploadReel);
  return (
    <div className="h-full p-3">
      <div className="flex flex-col gap-4 pt-5 h-full">
        <ReelUploadSteps key={state.published} />
      </div>
    </div>
  );
};

export default QuickLearningScreen;
