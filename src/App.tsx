import { useState } from "react";
import Modal from "./components/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [gamePin, setGamePin] = useState("");

  const handleJoinGame = function () {
    setModalOpen(true);
  };
  const handleEnterPin = function (
    e: React.MouseEvent<HTMLFormElement, MouseEvent>
  ) {
    e.preventDefault();
    if (gamePin.length > 0) {
      const pinNumber = Number(gamePin);
      Number.isNaN(pinNumber) && console.log("Enter a number");
      Number.isNaN(pinNumber) && alert("Enter an actual number");
      return navigate("/join");
    }
  };
  const handleToggleModal = function () {
    setModalOpen(!isModalOpen);
  };
  return (
    <>
      <Modal isModalOpen={isModalOpen} setModalOpen={setModalOpen}>
        <section className="w-[90%] h-[50%] md:h-[40%] mx-auto mt-[5vh] bg-ghost_white rounded-md">
          <section className="p-[2rem] flex justify-end">
            <FontAwesomeIcon
              icon={faX}
              size="1x"
              className="cursor-pointer font-black"
              onClick={handleToggleModal}
            />
          </section>
          <form
            className="flex flex-col w-[90%] mx-auto"
            onClick={(e) => handleEnterPin(e)}
          >
            <span className="text-2xl font-bold">Join Game</span>
            <div className="w-full flex rounded-md">
              <input
                type="text"
                value={gamePin}
                onChange={(e) => setGamePin(e.target.value)}
                placeholder="Enter Game Pin"
                className="w-full p-3 border-2 border-[#7c7c7c] focus:outline-none focus:border-[#474747] rounded-tl-md rounded-bl-md"
              />
              <button className="bg-veronica w-[30%] rounded-br-md rounded-tr-md">
                Enter
              </button>
            </div>
          </form>
        </section>
      </Modal>
      <section className="h-full flex flex-row mt-auto items-center justify-center gap-3">
        <button
          className=" bg-light_green-300 text-white py-3 px-6 rounded-lg hover:bg-secondary"
          style={{
            boxShadow: "0px 5px 2px #1d7822",
          }}
          onClick={handleJoinGame}
        >
          Join Quiz
        </button>
        <Link
          to={"/create"}
          className="bg-light_green-300 text-white py-3 px-6 rounded-lg hover:bg-secondary"
          style={{
            boxShadow: "0px 5px 2px #1d7822",
          }}
        >
          Create Quiz
        </Link>
      </section>
    </>
  );
}

export default App;
