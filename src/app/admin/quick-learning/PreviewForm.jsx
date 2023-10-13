import { Badge, Textarea } from "flowbite-react";
import React, { useState } from "react";
import { CLOUDFRONT_BASE_URL } from "../../../axios";
import { useSelector } from "react-redux";
import Select from "../../../lib/Select/Select";
import { options } from "./AddTranscriptForm";
import Button from "../../../lib/Button/Button";
import { questionOptions } from "./QuestionGenerationForm";
import { twMerge } from "tailwind-merge";

const PreviewForm = () => {
  const state = useSelector((state) => state.uploadReel);

  const [selectedLanguage, setSelectedLanguage] = useState(
    state.language || {}
  );

  return (
    <div className="p-3 h-96 overflow-auto overflow-y-auto my-3">
      <div className="flex flex-col p-2 gap-5">
        <div className="flex w-full gap-6">
          <div className="relative cursor-pointer w-[180px]">
            <div className="h-full bg-black opacity-30 absolute"></div>
            <video
              src={`${CLOUDFRONT_BASE_URL}/content/${state._id}.mp4`}
              className="h-[20rem] rounded object-fill shadow-lg"
            ></video>

            <div className="absolute bg-white text-red-600 p-.5 px-1 rounded-t-lg rounded-b-lg top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
              <i className="fa-brands fa-youtube text-2xl"></i>
            </div>
          </div>

          <div className="flex flex-col w-[calc(100%-180px)] gap-4">
            <div>
              <Textarea
                disabled
                className="w-full rounded disabled:cursor-default"
                rows={2}
                defaultValue={state.caption || ""}
              />
            </div>

            <div className="flex items-center gap-2">
              {(state.tags || []).map(({ label }) => (
                <Badge color={"purple"}>{label}</Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <div className="flex gap-6 items-center justify-center w-full">
            <label>Language:</label>
            <Select
              options={options.filter((obj) =>
                Object.keys(state.question || {}).includes(obj.value)
              )}
              isSearchable={false}
              className="w-[15rem]"
              onChange={(value) => {
                setSelectedLanguage(value);
              }}
              {...(Object.keys(selectedLanguage).length > 0
                ? { value: selectedLanguage }
                : { placeholder: "Select" })}
            />
          </div>

          <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-col items-start gap-2.5">
              <label className="font-semibold">Question</label>
              <Textarea
                className="focus:ring-primary rounded disabled:cursor-default"
                rows={3}
                disabled
                value={state.question?.[selectedLanguage?.value] || ""}
                placeholder="Type question"
              />
            </div>

            <div className="flex flex-col gap-2 items-start">
              <h4 className="font-semibold">Options</h4>
              <div className="grid grid-cols-2 grid-rows-2 text-sm gap-5 w-full">
                {questionOptions.map(({ label }, i) => (
                  <div className="flex gap-5 items-center w-full">
                    <label>{label}.</label>
                    <Button
                      className={twMerge(
                        "w-full bg-white border text-black",
                        parseInt(
                          state.correctOptionIdx?.[selectedLanguage?.value]
                        ) === i && "bg-green-100 text-green-800"
                      )}
                    >
                      {state.options?.[selectedLanguage?.value]?.[i] || ""}
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2 items-start">
              <h4 className="">Transcript</h4>
              <Textarea
                className="focus:ring-primary disabled:cursor-default"
                rows={5}
                value={state.transcript?.[state?.language?.value] || ""}
                disabled
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewForm;
