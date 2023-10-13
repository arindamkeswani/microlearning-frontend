// VideoList.js
import React, { useRef, useState } from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetFeeds } from "../../../api/hooks/useGetFeeds";
import { useGetProducts } from "../../../api/hooks/useGetProducts";
import Loader from "../../../lib/Loader/Loader";
import Card from "../common/Card";
import VideoCard from "./VideoCard";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const VideoList = () => {
  const { user } = useSelector((store) => store.user) || {};

  const {
    data: { data },
    isLoading,
  } = useGetFeeds({
    params: {
      user: user[0]._id,
      page: 1,
      limit: 25,
    },
  });

  const {
    data: { data: productData },
    isLoading: isFetching,
  } = useGetProducts({
    params: {
      type: "store",
      page: 1,
      limit: 10,
      userId: user[0]._id,
    },
    route: "/items/recommended",
  });

  const mergedData = useMemo(() => {
    const mergedArray = [];
    const maxInterval = 6;
    const minInterval = 3;

    let smallerArrayIndex = 0;
    let largerArrayIndex = 0;

    while (largerArrayIndex < data.length) {
      // Calculate a random interval between 5 and 10
      const interval = getRandomInt(minInterval, maxInterval);

      // Add elements from the larger array with the calculated interval
      for (let i = 0; i < interval && largerArrayIndex < data.length; i++) {
        mergedArray.push(data[largerArrayIndex]);
        largerArrayIndex++;
      }

      // Add an element from the smaller array if it's available
      if (smallerArrayIndex < productData.length) {
        mergedArray.push({
          ...productData[smallerArrayIndex],
          isProduct: true,
        });
        smallerArrayIndex++;
      }
    }

    return mergedArray;
  }, [data, productData]);

  const [forceRender, setForceRender] = useState(true);

  useEffect(() => {}, [forceRender]);

  const listRef = useRef(null);
  return (
    <div className="h-full overflow-hidden">
      <div
        id="video-list"
        className="flex flex-col gap-2 h-[calc(100%-1px)] overflow-y-auto relative "
        ref={listRef}
      >
        {isLoading && isFetching && <Loader />}
        {mergedData?.map((video, i) => (
          <div>
            {!video.isProduct ? (
              <VideoCard
                key={video._id}
                videoId={video._id}
                videoUrl={`https://d3lf1ujcjce6zc.cloudfront.net/content/${video._id}.mp4`}
                avatarUrl={
                  "data:image/jpeg;base64,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"
                }
                username={video?.uploadedBy?.username || "Yash"}
                likes={"100k"}
                comments={"50k"}
                tags={video?.tags}
                caption={video?.caption}
                language={video?.language}
                question={video?.question}
                options={video?.options}
                correctOption={video?.correctOptionIdx}
                transcript={video?.transcript}
                listRef={listRef?.current}
                setForceRender={setForceRender}
                interestLevel={video?.interestLevel}
              />
            ) : (
              <Card
                data={mergedData[i]}
                customClass={"mx-auto "}
                key={video._id}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoList;
