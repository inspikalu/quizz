import { useState } from "react";
import quizData from "../quizzData";

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswer(e.target.value);
  };

  const handleNextQuestion = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedAnswer) {
      // Here i am Updating Score
      selectedAnswer ===
        quizData.quiz.questions[currentQuestion].correct_answer &&
        setScore((prevScore) => prevScore + 1);

      setIsAnswered(true);

      setTimeout(() => {
        // Move to the next question after a short delay
        if (currentQuestion < quizData.quiz.questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer("");
          setIsAnswered(false);
        } else {
          setQuizCompleted(true);
          alert("Quiz Completed!");
        }
      }, 2000);
    } else {
      alert("Please select an answer before proceeding.");
    }
  };

  const percentFinished =
    (currentQuestion / quizData.quiz.questions.length) * 100;

  if (!quizCompleted) {
    return (
      <div>
        <div className="w-full h-3 bg-light_green rounded-md my-3">
          <div
            style={{ width: `${percentFinished}%` }}
            className="h-full bg-light_green-300 rounded-md"
          ></div>
        </div>
        {quizData.quiz.questions.map(function (item, index) {
          return (
            <div
              key={index}
              className={`bg-white my-2 flex flex-col p-5 w-full rounded-lg overflow-y-auto ${
                index !== currentQuestion && "hidden"
              }`}
              style={{ maxHeight: "80vh" }} // Ensure the container doesn't exceed 80% of viewport height
            >
              <div className="mb-4 font-bold text-lg md:text-2xl">
                {item.question}
              </div>
              <form onSubmit={handleNextQuestion}>
                {item.options.map(function (option, idx) {
                  const isCorrectAnswer =
                    option === item.correct_answer && isAnswered;
                  const isSelectedAnswer =
                    option === selectedAnswer && isAnswered;
                  return (
                    <div
                      key={idx}
                      className={`mb-2 ${
                        isCorrectAnswer
                          ? "bg-green-200 border-green-400"
                          : isSelectedAnswer
                          ? "bg-red-200 border-red-400"
                          : "border"
                      } p-3 rounded-lg`}
                    >
                      <label className="flex items-center w-full">
                        <input
                          type="radio"
                          name={`question_${index}`}
                          value={option}
                          checked={selectedAnswer === option}
                          onChange={handleOptionChange}
                          className="mr-2"
                          disabled={isAnswered}
                        />
                        {option}
                      </label>
                    </div>
                  );
                })}
                {!isAnswered && (
                  <button
                    type="submit"
                    className="mt-4 bg-veronica text-white px-4 py-2 rounded-md w-full"
                  >
                    {currentQuestion < quizData.quiz.questions.length - 1
                      ? "Next Question"
                      : "Finish Quiz"}
                  </button>
                )}
              </form>
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <div className="w-full h-full my-3">
        <div className="bg-white w-full h-[50vh] max-h-screen rounded-lg p-5 flex flex-col items-center justify-center">
          <h2 className="font-bold text-2xl">Thanks For Playing</h2>
          <span>
            Your Score: {score}/<span>{quizData.quiz.questions.length}</span>
          </span>
          <br />
        </div>
      </div>
    );
  }
}

export default Quiz;
