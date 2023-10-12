// VideoCard.js
import React, { useState, useRef, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import cn from "clsx";
import QuizForm from "./QuizForm";
import { debounce } from "../../../utils";

const VideoCard = ({
  videoUrl,
  avatarUrl,
  username,
  likes,
  comments,
  caption,
  language,
  question,
  options,
  correctOption,
  transcript,
  listRef,
  setForceRender,
}) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    const video = videoRef.current;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };
  const replayVideo = () => {
    const video = videoRef.current;
    video.play();
  };
  const [showQuiz, setShowQuiz] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(null);
  const [showTransScript, setShowTransScript] = useState(false);

  const handleVideoEnd = () => {
    setShowQuiz(true);
  };

  const handleAnswerSelected = (isCorrect) => {
    setIsCorrectAnswer(isCorrect);
  };
  const [activeTab, setActiveTab] = useState("english");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // Change this value as needed
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    observer.observe(containerRef.current);
    setForceRender(false);
    return () => {
      observer.unobserve(containerRef.current);
    };
  }, [listRef]);

  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        debounce(() => {
          listRef?.scrollTo({
            top: containerRef?.current?.offsetTop - 10,
            behavior: "smooth",
          });
          videoRef.current.play();
        }, 500)();
      } else {
        videoRef.current.pause();
      }
    });
  };

  return (
    <div
      name="scroll-to-element"
      className="scroll-to-element w-[26rem] mx-auto bg-white mb-2 relative h-[75vh] flex z-1 "
      ref={containerRef}
    >
      <div className="z-10 absolute bottom-[1rem] flex flex-col w-full gap-2 px-4">
        <div className="flex gap-3 items-center">
          <img src={avatarUrl} alt="Avatar" className="h-8 w-8 rounded-full" />
          <span className="font-light text-base text-white">{username}</span>
        </div>
        <p className="text-white w-[80%] text-xs">{caption}</p>
      </div>
      <div className="absolute top-0 left-0 w-[80%]  h-full">
        <video
          muted
          controls
          ref={videoRef}
          onEnded={handleVideoEnd}
          className={twMerge(
            cn(`w-full h-full object-cover rounded-lg z-10`, {
              "opacity-[0.8]": showQuiz,
            })
          )}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {showQuiz && (
          <QuizForm
            question={question?.en ? question?.en : question?.hi}
            options={options?.en ? options?.en : options?.hi}
            correctAnswer={
              correctOption.en
                ? options?.en[correctOption.en]
                : options?.hi[correctOption.hi]
            }
            onAnswerSelected={handleAnswerSelected}
            onClose={() => {
              setShowQuiz(false);
              replayVideo();
            }}
          />
        )}
      </div>
      <div className="absolute top-2 left-2 flex items-center space-x-2">
        <button className="bg-gray-600 rounded-full" onClick={toggleMute}>
          {isMuted ? (
            <i className="fa-solid fa-volume-xmark text-xs text-white p-1"></i>
          ) : (
            <i className="fa-solid fa-volume-high text-xs text-white p-1"></i>
          )}
        </button>
      </div>
      <div className="p-4 z-20 absolute right-0 bottom-0">
        <div className="flex flex-col gap-5 items-center">
          <button
            onClick={() => setShowTransScript(!showTransScript)}
            className="flex items-center flex-col cursor-pointer"
          >
            <i class="fa-regular fa-eye text-xl"></i>
          </button>
          <button className="flex items-center flex-col cursor-pointer">
            <i class="fa-regular fa-heart text-xl"></i>
            <span className="text-sm font-normal">{likes}</span>
          </button>
          <button className="flex items-center flex-col cursor-pointer">
            <i class="fa-regular fa-comment text-xl"></i>
            <span className="text-sm font-normal">{comments}</span>
          </button>
        </div>
      </div>
      {showTransScript && (
        <div className="w-[400px] bg-gray-200 shadow-md right-[-20rem] z-20 bottom-0 h-[380px] px-3 absolute justify-around rounded-md transition-all duration-300">
          <div className="flex flex-col h-full justify-around relative">
            <button
              className="absolute top-2 right-4 text-black text-lg font-bold"
              onClick={() => setShowTransScript(false)}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
            <div className="flex gap-2 items-center">
              <button
                className={`py-2 px-4 rounded-t-lg border-b-2 ${
                  activeTab === "english"
                    ? "border-blue-500"
                    : "border-transparent"
                }`}
                onClick={() => handleTabChange("english")}
              >
                English
              </button>
              <button
                className={`py-2 px-4 rounded-t-lg border-b-2 ${
                  activeTab === "hindi"
                    ? "border-blue-500"
                    : "border-transparent"
                }`}
                onClick={() => handleTabChange("hindi")}
              >
                Hindi
              </button>
            </div>
            {/* Content based on activeTab */}
            {activeTab === "english" && (
              <div>
                {" "}
                <p> {transcript.en}</p>
              </div>
            )}
            {activeTab === "hindi" && (
              <div>
                {" "}
                <p> {transcript.hi}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCard;
