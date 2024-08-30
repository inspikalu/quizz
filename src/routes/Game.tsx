import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import { QuizzInterface, QuestionType } from "../types";
import NewQuestion from "../components/NewQuestion";

const Game = () => {
  const [questions, setQuestions] = useState<QuizzInterface[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [newQuestionOptions, setNewQuestionOptions] = useState<string[]>([]);
  const [newQuestion, setNewQuestion] = useState<QuizzInterface>({
    id: questions.length + 1,
    question: "",
    options: [],
    correct_answer: "",
    type: QuestionType.MultipleChoice,
  });

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const addQuestion = () => {
    setModalOpen(true);
  };

  const handleToggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewQuestion({ ...newQuestion, question: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuestions([
      ...questions,
      { ...newQuestion, options: newQuestionOptions },
    ]);

    setNewQuestion({
      id: questions.length + 1,
      question: "",
      options: [],
      correct_answer: "",
      type: QuestionType.MultipleChoice,
    });
    setNewQuestionOptions([]);

    setModalOpen(false);
  };

  const saveGame = () => {
    const currentGame = {
      id,
      questions,
    };

    // Save the current game state to localStorage
    localStorage.setItem(`quiz-${id}`, JSON.stringify(currentGame));

    // Redirect to the CreateQuiz page
    navigate("/create");
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-white">Game ID: {id}</h1>
      {questions.length > 0 &&
        questions.map((item, index) => (
          <div
            key={index}
            className="bg-white m-3 min-h-[10rem] w-[90%] p-5 rounded-lg shadow-lg"
          >
            <span className="flex gap-3 border-b-2 pb-2">
              <span className="font-bold">Question {index + 1}:</span>
              <span>{item.question}</span>
            </span>
            <span className="block my-2">
              Type:{" "}
              {item.type === QuestionType.MultipleChoice
                ? "Multiple Choice"
                : "True or False"}
            </span>
            <span className="block my-2">
              Options:
              <ul className="mt-2 space-y-2">
                {item.options.map((option: string, idx: number) => (
                  <li
                    key={idx}
                    className={`p-2 rounded-lg text-white ${
                      option === item.correct_answer
                        ? "bg-green-500 border border-green-700"
                        : "bg-gray-300 border border-gray-400 text-black"
                    }`}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </span>
          </div>
        ))}
      <section className="flex flex-row items-center justify-around gap-2 w-full">
        <button
          className="bg-light_green-300 text-white py-3 px-6 rounded-lg hover:bg-secondary mb-8"
          style={{
            boxShadow: "0px 5px 2px #1d7822",
          }}
          onClick={addQuestion}
        >
          Add Question
        </button>
        <button
          className="bg-light_green-300 text-white py-3 px-6 rounded-lg hover:bg-secondary mb-8"
          style={{
            boxShadow: "0px 5px 2px #1d7822",
          }}
          onClick={saveGame}
        >
          Save Game
        </button>
      </section>
      <Modal isModalOpen={isModalOpen} setModalOpen={setModalOpen}>
        <NewQuestion
          handleQuestionChange={handleQuestionChange}
          handleSubmit={handleSubmit}
          handleToggleModal={handleToggleModal}
          newQuestion={newQuestion}
          newQuestionOptions={newQuestionOptions}
          setNewQuestionOptions={setNewQuestionOptions}
          setNewQuestion={setNewQuestion}
        />
      </Modal>
    </div>
  );
};

export default Game;
