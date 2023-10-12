import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPresignedUrl, uploadFileToS3 } from "../../../axios";
import { addContentEntry } from "../../../api/reel-fetchers";
import { updateState } from "../../../slices/uploadReelsSlice";
import { twMerge } from "tailwind-merge";
import { toast } from "react-toastify";

const UploadReelForm = () => {
  const inputRef = useRef(null);

  const progressDivRef = useRef(null);

  const { _id, file } = useSelector((store) => store.uploadReel);

  const [selectedFile, setSelectedFile] = useState(file || null);
  const [isUploaded, setIsUploaded] = useState(_id ? true : false);

  const dispatch = useDispatch();

  const uploadVideoToS3 = async (e) => {
    const file = e.target.files[0];

    setSelectedFile(file);

    const {
      data: { data },
    } = await addContentEntry({
      payload: {
        type: "video",
        uploadedBy: "65266ec72c2632fc260070a8",
      },
    });

    const key = `content/${data._id}.mp4`;

    const uploadUrl = await getPresignedUrl({ key, contentType: file.type });

    let per = 0;
    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        if (per != percent) {
          progressDivRef.current.style.width = `${percent}%`;
        }
        per = percent;
      },
    };

    const res = await uploadFileToS3(uploadUrl, file, file.type, options);

    if (res) {
      progressDivRef.current.style.width = "0%";
      setIsUploaded(true);
      toast.success("Video uploaded, click NEXT");
    }

    dispatch(updateState({ _id: data._id, file: file }));
  };

  return (
    <div className="w-[80%] flex flex-col items-center mx-auto my-8 gap-4">
      <div
        className={twMerge(
          "cursor-pointer relative w-full h-40 border-2 gap-4 border-dashed border-gray-400 bg-gray-200 flex flex-col justify-center items-center rounded",
          isUploaded && "border-green-500 border-solid"
        )}
        onClick={() =>
          !selectedFile && inputRef.current && inputRef.current.click()
        }
      >
        <input
          type="file"
          hidden
          ref={inputRef}
          accept=".mp4"
          onChange={(e) => uploadVideoToS3(e)}
        />
        <div className="flex flex-col items-center gap-2">
          <i
            className={twMerge(
              "fa-solid fa-cloud-arrow-up text-5xl",
              isUploaded && "text-green-500"
            )}
          ></i>
          <span className="text-sm">
            {isUploaded ? (
              <>
                Video uploaded{" "}
                <i className="fa-solid fa-circle-check ml-1 text-green-500"></i>
              </>
            ) : (
              "Browse your video"
            )}
          </span>
        </div>
        <div>
          {selectedFile && <span className="text-sm">{selectedFile.name}</span>}
        </div>
        <div
          ref={progressDivRef}
          className="absolute bottom-0 left-0 h-1 w-0 rounded bg-primary"
        ></div>
      </div>
    </div>
  );
};

export default UploadReelForm;
