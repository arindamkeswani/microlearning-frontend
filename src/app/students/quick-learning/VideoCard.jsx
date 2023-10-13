// VideoCard.js
import React, { useState, useRef, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import cn from "clsx";
import QuizForm from "./QuizForm";
import { debounce } from "../../../utils";
import { useRecordActivity } from "../../../api/hooks/useRecordActivity";
import { useSelector } from "react-redux";
import { Badge } from "flowbite-react";

const VideoCard = ({
  videoUrl,
  videoId,
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
  tags,
  interestLevel,
}) => {
  const { user } = useSelector((store) => store.user) || {};
  const { recordActivityFetcher } = useRecordActivity();
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    const video = videoRef?.current;
    video.muted = !video?.muted;
    setIsMuted(video?.muted);
  };
  const replayVideo = () => {
    const video = videoRef?.current;
    setTimeout(function () {
      !(
        video?.currentTime > 0 &&
        !video?.paused &&
        !video?.ended &&
        video?.readyState > video?.HAVE_CURRENT_DATA
      ) && video?.play();
    }, 150);
  };
  const [showQuiz, setShowQuiz] = useState(false);
  const [showTransScript, setShowTransScript] = useState(false);
  const [alreadyAns, setAlreadyAns] = useState(false);

  const handleVideoEnd = () => {
    setShowQuiz(true);
  };

  const handleAnswerSelected = async (isCorrect) => {
    const payload = {
      contentId: videoId,
      user: user[0]._id,
      attention: 100,
    };
    recordActivityFetcher(
      {
        payload,
        route: "/quick-learning/record-activity",
      },
      {
        onSuccess: () => {
          recordActivityFetcher(
            {
              payload: { ...payload, language, selectedOptionIdx: isCorrect },
              route: "/quick-learning/check",
            },
            {
              onSuccess: () => {
                setTimeout(() => {
                  const boundingClientRect =
                    containerRef?.current?.getBoundingClientRect();
                  listRef.scrollTo({
                    top:
                      containerRef?.current?.offsetTop +
                      boundingClientRect?.height,
                    behavior: "smooth",
                  });
                  setShowQuiz(false);
                }, 1000);
              },
              onError: (res) => {
                setAlreadyAns(true);
                setTimeout(() => {
                  const boundingClientRect =
                    containerRef?.current?.getBoundingClientRect();
                  listRef.scrollTo({
                    top:
                      containerRef?.current?.offsetTop +
                      boundingClientRect?.height,
                    behavior: "smooth",
                  });
                  setShowQuiz(false);
                }, 1000);
              },
            }
          );
        },
      }
    );
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
      observer &&
        containerRef?.current &&
        observer.unobserve(containerRef.current);
    };
  }, [listRef]);

  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        debounce(() => {
          try {
            listRef?.scrollTo({
              top: containerRef?.current?.offsetTop - 10,
              behavior: "smooth",
            });
            const video = videoRef.current;
            setTimeout(function () {
              !(
                video?.currentTime > 0 &&
                !video?.paused &&
                !video?.ended &&
                video?.readyState > video?.HAVE_CURRENT_DATA
              ) && videoRef?.current?.play();
            }, 150);

            setIsMuted(!isMuted);
          } catch (error) {
            console.log("erro is", error);
          }
        }, 800)();
      } else {
        videoRef?.current?.pause();
        setShowQuiz(false);
      }
    });
  };
  const recordAfterScroll = (totalDuration, watchedTime) => {
    const attention = (watchedTime / totalDuration) * 100;

    const payload = {
      contentId: videoId,
      user: user[0]._id,
      attention: parseFloat(attention.toFixed(1)),
    };
    recordActivityFetcher({
      payload,
      route: "/quick-learning/record-activity",
    });
  };
  return (
    <div
      name="scroll-to-element"
      className="scroll-to-element w-[26rem] mx-auto bg-white mb-2 relative h-[75vh] flex z-10"
      ref={containerRef}
    >
      <div className="relative w-full overflow-hidden">
        <div className="absolute z-10 left-0 top-0 h-12 w-12">
          <div
            className={twMerge(
              cn(
                "absolute transform rounded -rotate-45 bg-purple-500 text-center text-white font-semibold left-[-34px] top-[32px] w-[170px]",
                {
                  "bg-green-500": interestLevel === "MEDIUM",
                  "bg-yellow-400": interestLevel === "LOW",
                }
              )
            )}
          >
            {interestLevel}
          </div>
        </div>
      </div>
      <div className="z-10 absolute bg-[rgba(0,0,0,0.4)] w-[80%] bottom-[1rem] flex flex-col gap-2 py-2 px-4">
        <div className="flex gap-3 items-center">
          <img src={avatarUrl} alt="Avatar" className="h-8 w-8 rounded-full" />
          <span className="text-base font-semibold text-white">{username}</span>
        </div>
        <p className="text-white w-full text-xs">{caption}</p>
        <div className="flex flex-wrap gap-1">
          {tags.map((data) => (
            <Badge color="purple" key={data._id}>
              {data.name}
            </Badge>
          ))}
        </div>
      </div>
      <div className="absolute top-0 left-0 w-[80%]  h-full">
        <video
          muted={true}
          ref={videoRef}
          onEnded={handleVideoEnd}
          controls
          onPause={() => {
            if (videoRef.current) {
              recordAfterScroll(
                videoRef.current.duration,
                videoRef.current.currentTime
              );
            }
          }}
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
              correctOption.en || correctOption.en === 0
                ? options?.en[correctOption.en]
                : options?.hi[correctOption.hi]
            }
            onAnswerSelected={handleAnswerSelected}
            alreadyAnswered={alreadyAns}
            onClose={() => {
              const boundingClientRect =
                containerRef?.current?.getBoundingClientRect();
              listRef.scrollTo({
                top:
                  containerRef?.current?.offsetTop + boundingClientRect?.height,
                behavior: "smooth",
              });
              setTimeout(() => {
                setShowQuiz(false);
              }, 1000);
            }}
          />
        )}
      </div>
      <div className="absolute top-2 z-10 left-2 flex items-center space-x-2">
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
        <div className="w-[400px] bg-gray-200 shadow-md right-[-20rem] z-20 bottom-0 max-h-[380px] min-h-[240px] overflow-auto px-3 absolute justify-around rounded-md transition-all duration-300">
          <div className="flex flex-col h-full  relative divide-solid divide-y-2">
            <button
              className="absolute top-2 right-4 text-black text-lg font-bold"
              onClick={() => setShowTransScript(false)}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
            <div className="flex gap-2 items-center my-5">
              <button
                className={`py-2 px-4 rounded-t-lg border-b-2 ${
                  activeTab === "english"
                    ? "border-[#5A4BDA]"
                    : "border-transparent"
                }`}
                onClick={() => handleTabChange("english")}
              >
                English
              </button>
              <button
                className={`py-2 px-4 rounded-t-lg border-b-2 ${
                  activeTab === "hindi"
                    ? "border-[#5A4BDA]"
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
