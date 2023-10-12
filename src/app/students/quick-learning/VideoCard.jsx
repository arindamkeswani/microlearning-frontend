// VideoCard.js
import React, { useState, useRef } from "react";
import { twMerge } from "tailwind-merge";
import cn from "clsx";
import QuizForm from "./QuizForm";

const VideoCard = ({
  videoUrl,
  avatarUrl,
  username,
  likes,
  comments,
  caption,
}) => {
  const videoRef = useRef(null);
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

  const handleVideoEnd = () => {
    setShowQuiz(true);
  };

  const handleAnswerSelected = (isCorrect) => {
    setIsCorrectAnswer(isCorrect);
  };
  return (
    <div
      name="scroll-to-element"
      className="scroll-to-element w-[26rem] mx-auto bg-white mb-2 relative h-[75vh] flex"
    >
      <div className="z-10 absolute bottom-[1rem] flex flex-col w-full gap-2 px-4">
        <div className="flex gap-3 items-center">
          <img src={avatarUrl} alt="Avatar" className="h-8 w-8 rounded-full" />
          <span className="font-light text-base text-white">{username}</span>
        </div>
        <p className="text-white w-full text-xs">{caption}</p>
      </div>
      <div className="absolute top-0 left-0 w-[80%]  h-full">
        <video
          autoPlay
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
            question="What is the correct answer What is the correct answer  ?"
            options={["Option A", "Option B", "Option C", "Option D"]}
            correctAnswer="Option A"
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
            <i class="fa-solid fa-volume-xmark text-xs text-white p-1"></i>
          ) : (
            <i class="fa-solid fa-volume-high text-xs text-white p-1"></i>
          )}
        </button>
      </div>
      <div className="p-4 z-20 absolute right-0 bottom-0">
        <div className="flex flex-col gap-5 items-center">
          <button className="flex items-center flex-col cursor-pointer">
            <i class="fa-regular fa-heart text-xl"></i>
            <span className="text-sm font-light">{likes}</span>
          </button>
          <button className="flex items-center flex-col cursor-pointer">
            <i class="fa-regular fa-comment text-xl"></i>
            <span className="text-sm font-light">{comments}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
