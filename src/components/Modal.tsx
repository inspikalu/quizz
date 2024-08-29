import React from "react";

interface IModalProps {
  isModalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}
const Modal: React.FC<IModalProps> = function ({
  isModalOpen,
  setModalOpen,
  children,
}) {
  const handleToggleModal = function () {
    setModalOpen(!isModalOpen);
  };
  const modalParent = document.getElementById("modalParent");
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" || event.key === "Esc") {
      isModalOpen && handleToggleModal();
    }
  });

  return (
    <>
      <section
        id="modalParent"
        className={`fixed w-full h-full bg-[#19191a91] top-0 left-0 ${
          !isModalOpen && "hidden"
        }`}
        onClick={(e) => e.target === modalParent && handleToggleModal()}
      >
        {children}
      </section>
    </>
  );
};

export default Modal;
