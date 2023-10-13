import React, { useState } from "react";
import Select from "react-select";
import Button from "../../../lib/Button/Button";
import { getGeneratedTranscript } from "../../../api/reel-fetchers";
import { useDispatch, useSelector } from "react-redux";
import { updateState } from "../../../slices/uploadReelsSlice";
import { useQuery } from "react-query";
import { Textarea } from "flowbite-react";

export const options = [
  { label: "English", value: "en" },
  { label: "Hindi", value: "hi" },
];

const AddTranscriptForm = () => {
  const state = useSelector((state) => state.uploadReel);

  const [selectedOriginalLangugae, setSelectedOriginalLanguage] = useState(
    state.language || {}
  );

  const [selectedTranslatedLanguage, setSelectedTranslatedLanguage] = useState(
    state.translatedLanguage || {}
  );

  const [isGenerateTranscript, setIsGenerateTranscript] = useState(false);

  const [isGenerateTranslation, setIsGenerateTranslation] = useState(false);

  const dispatch = useDispatch();

  const { isLoading: generateTranscriptLoading } = useQuery(
    ["generate-transcript", isGenerateTranscript, isGenerateTranslation],
    () =>
      getGeneratedTranscript({
        contentId: state._id,
        language: isGenerateTranscript
          ? selectedOriginalLangugae.value
          : selectedTranslatedLanguage.value,
      }),
    {
      enabled: isGenerateTranscript || isGenerateTranslation,
      onSuccess: (data) => {
        dispatch(
          updateState({
            ...state,
            transcript: {
              ...(state.transcript || {}),
              [isGenerateTranscript
                ? selectedOriginalLangugae.value
                : selectedTranslatedLanguage.value]:
                data.data?.transcript || "",
            },
            ...(isGenerateTranscript
              ? { language: selectedOriginalLangugae }
              : { translatedLanguage: selectedTranslatedLanguage }),
          })
        );
        setIsGenerateTranscript(false);
        setIsGenerateTranslation(false);
      },
    }
  );

  return (
    <div className="p-3 h-auto overflow-auto overflow-y-auto mt-6">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-5">
          <div className="flex gap-10 justify-center items-center">
            <div className="flex gap-6 items-center">
              <label>Original Language:</label>
              <Select
                options={options}
                isSearchable={false}
                className="w-[15rem]"
                onChange={(value) => {
                  setSelectedOriginalLanguage(value);
                  dispatch(
                    updateState({
                      ...state,
                      translatedLanguage: value,
                    })
                  );
                }}
                {...(Object.keys(selectedOriginalLangugae).length > 0
                  ? { value: selectedOriginalLangugae }
                  : { placeholder: "Select" })}
              />
            </div>

            <Button
              onClick={() => setIsGenerateTranscript(true)}
              className="bg-slate-600 px-4 py-1.5"
            >
              {generateTranscriptLoading && isGenerateTranscript ? (
                <span>
                  Generating{" "}
                  <i className="fa-solid fa-spin fa-spinner ml-1.5"></i>{" "}
                </span>
              ) : (
                "Generate"
              )}
            </Button>
          </div>

          <div>
            <Textarea
              className="focus:ring-primary"
              rows={5}
              value={state.transcript?.[state?.language?.value] || ""}
              onChange={(e) => {
                dispatch(
                  updateState({
                    ...state,
                    transcript: {
                      ...(state.transcript || {}),
                      [state?.language?.value]: e.target.value,
                    },
                  })
                );
              }}
              placeholder="Type transcript"
            />
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <h4 className="underline font-semibold">
            Translate transcript to other language{" "}
          </h4>
          <div className="flex gap-10 justify-center items-center">
            <div className="flex gap-6 items-center">
              <label>Language</label>
              <Select
                options={options.filter(
                  (obj) => obj.value !== selectedOriginalLangugae.value
                )}
                isSearchable={false}
                className="w-[15rem]"
                onChange={(value) => {
                  setSelectedTranslatedLanguage(value);
                  dispatch(
                    updateState({
                      ...state,
                      translatedLanguage: value,
                    })
                  );
                }}
                {...(Object.keys(selectedTranslatedLanguage).length > 0
                  ? { value: selectedTranslatedLanguage }
                  : { placeholder: "Select" })}
              />
            </div>

            <Button
              onClick={() => setIsGenerateTranslation(true)}
              className="bg-slate-600 px-4 py-1.5"
            >
              {generateTranscriptLoading && isGenerateTranslation ? (
                <span>
                  Generating{" "}
                  <i className="fa-solid fa-spin fa-spinner ml-1.5"></i>{" "}
                </span>
              ) : (
                "Generate"
              )}
            </Button>
          </div>

          <div>
            <Textarea
              className="focus:ring-primary"
              rows={5}
              value={
                state.transcript?.[selectedTranslatedLanguage?.value] || ""
              }
              onChange={(e) => {
                dispatch(
                  updateState({
                    ...state,
                    transcript: {
                      ...(state.transcript || {}),
                      [state?.translatedLanguage?.value]: e.target.value,
                    },
                  })
                );
              }}
              placeholder="Type transcript"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTranscriptForm;
