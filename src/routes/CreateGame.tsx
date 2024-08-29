import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateQuiz = () => {
  const [quizes, setQuizes] = useState<string[]>([]); // Assume Quizes are represented by IDs
  const navigate = useNavigate();

  // Simulate fetching Quizes from an API or local storage
  const fetchQuizes = () => {
    // Example: fetch from an API or localStorage
    const existingQuizes = JSON.parse(localStorage.getItem("Quizes") || "[]");
    return existingQuizes;
  };

  // Simulate creating a new Quiz
  const createNewQuiz = () => {
    const newquizId = `quiz-${Date.now()}`; // Generate a unique Quiz ID
    const updatedQuizes = [...quizes, newquizId];
    localStorage.setItem("Quizes", JSON.stringify(updatedQuizes));
    return newquizId;
  };

  const handleNewQuiz = function () {
    const newGameId = createNewQuiz();
    navigate(`/game/${newGameId}`);
  };

  useEffect(() => {
    const existingQuizes = fetchQuizes();
    if (existingQuizes.length > 0) {
      setQuizes(existingQuizes);
    }
  }, []);

  const handleQuizClick = (quizId: string) => {
    navigate(`/game/${quizId}`);
  };

  return (
    <div className="text-white">
      {quizes.length > 0 ? (
        <>
          <h1>Your Quizes</h1>
          <ul>
            {quizes.map((quizId) => (
              <li
                key={quizId}
                onClick={() => handleQuizClick(quizId)}
                className="cursor-pointer underline text-blue-500"
              >
                {quizId}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="text-2xl m-3">
          Aww Snap no Quiz. You can always create one
        </p>
      )}
      <button
        className="float-left bg-light_green-300 text-white py-3 px-6 rounded-lg hover:bg-secondary"
        style={{
          boxShadow: "0px 5px 2px #1d7822",
        }}
        onClick={handleNewQuiz}
      >
        Create Quiz
      </button>
    </div>
  );
};

export default CreateQuiz;
