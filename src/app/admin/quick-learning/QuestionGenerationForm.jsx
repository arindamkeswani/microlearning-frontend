import React, { useMemo, useState } from "react";
import { options } from "./AddTranscriptForm";
import { getGeneratedQuestion } from "../../../api/reel-fetchers";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import { TextInput, Textarea } from "flowbite-react";
import Button from "../../../lib/Button/Button";
import { updateState } from "../../../slices/uploadReelsSlice";
import useIsClient from "../../../api/hooks/useClient";
import { toast } from "react-toastify";
import Select from "../../../lib/Select/Select";

export const questionOptions = [
  { label: "A", value: "0" },
  { label: "B", value: "1" },
  { label: "C", value: "2" },
  { label: "D", value: "3" },
];

const QuestionGenerationForm = () => {
  const state = useSelector((state) => state.uploadReel);

  const [selectedLanguage, setSelectedLanguage] = useState(
    state.language || {}
  );

  const [isGenerateQuestion, setIsGenerateQuestion] = useState(false);

  const dispatch = useDispatch();

  const { isLoading: generateQuestionLoading } = useQuery(
    ["generate-question", isGenerateQuestion],
    () =>
      getGeneratedQuestion({
        contentId: state._id,
        language: selectedLanguage.value,
      }),
    {
      enabled: isGenerateQuestion,
      onSuccess: (data) => {
        dispatch(
          updateState({
            ...state,
            question: {
              ...(state.question || {}),
              [selectedLanguage.value]:
                data[`question`][selectedLanguage.value],
            },
            correctOptionIdx: {
              ...(state.correctOptionIdx || {}),
              [selectedLanguage.value]:
                data[`correctOptionIdx`][selectedLanguage.value],
            },
            options: {
              ...(state.options || {}),
              [selectedLanguage.value]: data[`options`][selectedLanguage.value],
            },
          })
        );
        setIsGenerateQuestion(false);
      },
      onError: (res) => {
        setIsGenerateQuestion(false);
        toast.error(res.message);
      },
    }
  );

  return (
    <div className="p-3 h-96 overflow-auto my-3">
      <div className="flex flex-col gap-4">
        <div className="flex gap-10 justify-center items-center">
          <div className="flex gap-6 items-center">
            <label>Language:</label>
            <Select
              options={options}
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

          <Button
            onClick={() => setIsGenerateQuestion(true)}
            className="bg-slate-600 px-4 py-1.5"
          >
            {generateQuestionLoading && isGenerateQuestion ? (
              <span>
                Generating{" "}
                <i className="fa-solid fa-spin fa-spinner ml-1.5"></i>{" "}
              </span>
            ) : (
              "Generate"
            )}
          </Button>
        </div>

        <div className="flex flex-col gap-6 w-full">
          <div className="flex flex-col items-start gap-2.5">
            <label className="font-semibold">Question</label>
            <Textarea
              className="focus:ring-primary rounded"
              rows={3}
              value={state.question?.[selectedLanguage?.value] || ""}
              onChange={(e) => {
                dispatch(
                  updateState({
                    ...state,
                    question: {
                      ...(state.question || {}),
                      [state?.language?.value]: e.target.value,
                    },
                  })
                );
              }}
              placeholder="Type question"
            />
          </div>

          <div className="flex flex-col gap-2 items-start">
            <h4 className="font-semibold">Options</h4>
            <div className="grid grid-cols-2 grid-rows-2 text-sm gap-5 w-full">
              {questionOptions.map(({ label }, i) => (
                <div className="flex gap-5 items-center w-full">
                  <label>{label}.</label>
                  <TextInput
                    className="w-full"
                    value={state.options?.[selectedLanguage?.value]?.[i] || ""}
                    onChange={(e) => {
                      const optionArray = [
                        ...(state?.options?.[selectedLanguage?.value] || []),
                      ];
                      optionArray[i] = e.target.value;
                      dispatch(
                        updateState({
                          ...state,
                          options: {
                            ...(state.options || {}),
                            [selectedLanguage?.value]: [...optionArray],
                          },
                        })
                      );
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-6 items-center">
            <label>Correct Options:</label>
            <Select
              options={questionOptions}
              isSearchable={false}
              className="w-[15rem]"
              onChange={(value) => {
                dispatch(
                  updateState({
                    ...state,
                    correctOptionIdx: {
                      ...(state.correctOptionIdx || {}),
                      [selectedLanguage?.value]: value.value,
                    },
                  })
                );
              }}
              {...(Object.keys(state.correctOptionIdx || {}).length > 0
                ? {
                    value:
                      questionOptions?.[
                        state.correctOptionIdx?.[selectedLanguage.value]
                      ],
                  }
                : { placeholder: "Select" })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionGenerationForm;
