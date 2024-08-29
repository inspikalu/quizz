import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { QuizzInterface, QuestionType } from "../types";

interface iNewQuestion {
  handleToggleModal: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleQuestionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setNewQuestionOptions: React.Dispatch<React.SetStateAction<string[]>>;
  setNewQuestion: React.Dispatch<React.SetStateAction<QuizzInterface>>;
  newQuestion: QuizzInterface;
  newQuestionOptions: string[];
}

function NewQuestion({
  handleToggleModal,
  handleSubmit,
  handleQuestionChange,
  newQuestion,
  setNewQuestionOptions,
  newQuestionOptions,
  setNewQuestion,
}: iNewQuestion) {
  const handleAddOption = () => {
    setNewQuestionOptions([...newQuestionOptions, ""]);
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...newQuestionOptions];
    updatedOptions[index] = value;
    setNewQuestionOptions(updatedOptions);
  };

  const handleQuestionTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedType = parseInt(e.target.value) as QuestionType;
    setNewQuestion({ ...newQuestion, type: selectedType, correct_answer: "" });

    if (selectedType === QuestionType.TrueOrFalse) {
      setNewQuestionOptions(["True", "False"]);
    } else {
      setNewQuestionOptions([]);
    }
  };

  const handleCorrectAnswerChangeSelect = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setNewQuestion({ ...newQuestion, correct_answer: e.target.value });
  };

  return (
    <>
      <section className="w-[90%] max-h-[90vh] overflow-y-auto mx-auto mt-[5vh] bg-ghost_white rounded-md">
        <section className="p-[2rem] flex justify-end">
          <FontAwesomeIcon
            icon={faX}
            size="1x"
            className="cursor-pointer font-black"
            onClick={handleToggleModal}
          />
        </section>
        <section className="px-[2rem] pb-[2rem]">
          <h2 className="text-2xl font-bold mb-5">Create New Question</h2>
          <form onSubmit={handleSubmit}>
            {/* Question Title */}
            <label className="flex flex-col w-full gap-2 mb-5">
              <span className="font-bold">Question</span>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Enter your question here"
                value={newQuestion.question}
                onChange={handleQuestionChange}
                className="p-3 border-2 rounded-md"
                required
              />
            </label>

            {/* Question Type */}
            <label className="flex flex-col w-full gap-2 mb-5">
              <span className="font-bold">Question Type</span>
              <select
                name="questionType"
                id="questionType"
                value={newQuestion.type}
                onChange={handleQuestionTypeChange}
                className="p-3 border-2 rounded-md"
              >
                <option value={QuestionType.MultipleChoice}>
                  Multiple Choice
                </option>
                <option value={QuestionType.TrueOrFalse}>True/False</option>
              </select>
            </label>

            {/* Options Input for Multiple Choice */}
            {newQuestion.type === QuestionType.MultipleChoice && (
              <label className="flex flex-col w-full gap-2 mb-5">
                <span className="font-bold">Options</span>
                {newQuestionOptions.map((option, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(index, e.target.value)
                      }
                      placeholder={`Option ${index + 1}`}
                      className="p-3 border-2 rounded-md flex-1"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updatedOptions = newQuestionOptions.filter(
                          (_, idx) => idx !== index
                        );
                        setNewQuestionOptions(updatedOptions);
                        if (newQuestion.correct_answer === option) {
                          setNewQuestion({ ...newQuestion, correct_answer: "" });
                        }
                      }}
                      className="text-red-500 hover:text-red-700"
                      title="Remove Option"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="bg-light_green-300 text-white py-2 px-4 rounded-lg hover:bg-secondary mt-2"
                  style={{
                    boxShadow: "0px 5px 2px #1d7822",
                  }}
                  onClick={handleAddOption}
                >
                  Add Option
                </button>
              </label>
            )}

            {/* Correct Answer Selection */}
            <label className="flex flex-col w-full gap-2 mb-5">
              <span className="font-bold">Correct Answer</span>
              <select
                className="p-3 border-2 rounded-md"
                name="correct_answer"
                id="correct_answer"
                value={newQuestion.correct_answer}
                onChange={handleCorrectAnswerChangeSelect}
                required
              >
                <option value="" disabled>
                  Select Correct Answer
                </option>
                {newQuestionOptions.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-light_green-300 text-white py-3 px-6 rounded-lg hover:bg-secondary"
              style={{
                boxShadow: "0px 5px 2px #1d7822",
              }}
            >
              Save Question
            </button>
          </form>
        </section>
      </section>
    </>
  );
}

export default NewQuestion;
