import React, { useState } from "react";

const QuizForm = ({
  question,
  options,
  correctAnswer,
  onAnswerSelected,
  onClose,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  const handleAnswerSelected = (option) => {
    setSelectedAnswer(option);
    if (option !== correctAnswer) {
      setShowCorrectAnswer(true);
    } else {
      setShowCorrectAnswer(false);
    }
    onAnswerSelected(option === correctAnswer);
  };

  return (
    <div className="flex items-center justify-center bg-opacity-75">
      <div className="bg-[#00000069] p-8 rounded-md shadow-lg absolute top-0 left-0 w-[100%]  h-full">
        <button
          className="absolute top-2 right-4 text-white text-lg font-bold"
          onClick={onClose}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
        <div className="flex flex-col h-full justify-around ">
          <h2 className="text-base font-bold mb-4 text-white">{question}</h2>
          <ul className="">
            {options.map((option, index) => {
              const isCorrect = option === correctAnswer;
              const isSelected = option === selectedAnswer;
              const shouldHighlight =
                (isSelected && !isCorrect) ||
                (showCorrectAnswer && isCorrect) ||
                (isCorrect && isSelected);
              const optionClass = shouldHighlight
                ? isCorrect
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
                : "bg-[#00000073]";
              return (
                <li
                  key={index}
                  className={`cursor-pointer my-1.5 p-2 text-white font-semibold  rounded text-sm ${optionClass}`}
                  onClick={() => handleAnswerSelected(option)}
                >
                  {isSelected && isCorrect && "✔ "}
                  {isSelected && !isCorrect && "✘ "}
                  {option}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default QuizForm;