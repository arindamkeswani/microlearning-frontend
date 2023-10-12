import React, { useState } from "react";
import Table from "../../../lib/Table/Table";
import UploadReelModal from "./UploadReelModal";

const QuickLearningScreen = () => {
  const [showUploadReelModal, setShowUploadReelModal] = useState(false);
  return (
    <div className="h-full p-3">
      <div className="flex flex-col gap-4 p-5">
        <button
          className="flex justify-end text-xl"
          onClick={() => setShowUploadReelModal(true)}
        >
          <i className="fa-solid fa-square-plus"></i>
        </button>
        <div>
          {/* <Table
                columns={}
                data={[]}
            /> */}
        </div>
      </div>

      {showUploadReelModal && (
        <UploadReelModal onClose={() => setShowUploadReelModal(false)} />
      )}
    </div>
  );
};

export default QuickLearningScreen;
