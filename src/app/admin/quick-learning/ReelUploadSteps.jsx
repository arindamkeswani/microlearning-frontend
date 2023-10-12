import Steps from "rc-steps";
import React, { useState } from "react";
import "rc-steps/assets/index.css";
import "react-form-wizard-component/dist/style.css";
import FormWizard from "react-form-wizard-component";
import UploadReelForm from "./UploadReelForm";
import AddTranscriptForm from "./AddTranscriptForm";
import QuestionGenerationForm from "./QuestionGenerationForm";
import OtherInformationForm from "./OtherInformationForm";
import PreviewForm from "./PreviewForm";
import { useMutation } from "react-query";
import { publishContent } from "../../../api/reel-fetchers";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updateState } from "../../../slices/uploadReelsSlice";

const ReelUploadSteps = ({ onClose }) => {
  const state = useSelector((state) => state.uploadReel);
  const steps = [
    {
      title: "Upload Video",
      render: UploadReelForm,
      icon: <i className="fa-solid fa-video"></i>,
    },
    {
      title: "Transcript",
      render: AddTranscriptForm,
      icon: <i className="fa-solid fa-file-lines"></i>,
    },
    {
      title: "Question Gen.",
      render: QuestionGenerationForm,
      icon: <i className="fa-solid fa-paper-plane"></i>,
    },
    {
      title: "Other information",
      render: OtherInformationForm,
      icon: <i className="fa-solid fa-window-restore"></i>,
    },
    {
      title: "Preview",
      render: PreviewForm,
      icon: <i className="fa-solid fa-eye"></i>,
    },
  ];

  const [isTabsChanged, setIsTabsChanged] = useState(false);

  const dispatch = useDispatch();
  const {
    data,
    isLoading,
    mutate: publishMutate,
  } = useMutation(["publish-content"], publishContent, {
    onSuccess: () => {
      dispatch(updateState({}));
      toast.success("Content published");
    },
    onSettled: () => {
      onClose();
    },
    onError: (res) => {
      toast.error("Unable to publish content");
    },
  });

  const handlePublishContent = () => {
    const {
      _id: id,
      tags,
      language,
      transcript,
      question,
      correctOptionIdx,
      options,
      caption,
    } = state;
    publishMutate({
      payload: {
        id,
        tags: tags.map((obj) => obj.value),
        language: language.value,
        transcript,
        question,
        correctOptionIdx,
        options,
        caption,
      },
    });
  };

  return (
    <div className="w-full">
      <FormWizard
        stepSize="xs"
        color="#5d51d3"
        onTabChange={() => {
          setIsTabsChanged(true);
        }}
        finishButtonTemplate={(handleComplete) => (
          <div className="wizard-footer-right bg-primary rounded">
            <button className="wizard-btn" onClick={handleComplete}>
              {isLoading ? (
                <span>
                  Publishing{" "}
                  <i className="fa-solid fa-spin fa-spinner ml-1.5"></i>
                </span>
              ) : (
                "Publish"
              )}
            </button>
          </div>
          // <div class="wizard-footer-right" ><button class="wizard-btn" type="button">Next</button></div>
        )}
        onComplete={handlePublishContent}
      >
        {steps.map(({ title, render: Render, icon }, i) => (
          <FormWizard.TabContent title={title} icon={icon}>
            <Render isTabsChanged={isTabsChanged} />
          </FormWizard.TabContent>
        ))}
      </FormWizard>

      {/* Skip and next button */}
      <div></div>
    </div>
  );
};

export default ReelUploadSteps;
