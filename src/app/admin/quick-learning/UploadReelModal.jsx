import { Modal } from "flowbite-react";
import React from "react";
import ReelUploadSteps from "./ReelUploadSteps";

const UploadReelModal = ({ onClose }) => {
  return (
    <Modal show onClose={onClose} size="6xl" root={document.body}>
      <Modal.Header>
        <p className="text-base font-bold">Upload Video</p>
      </Modal.Header>
      <Modal.Body>
        <div className="flex h-[35rem] overflow-auto">
          <ReelUploadSteps onClose={onClose} />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default UploadReelModal;
