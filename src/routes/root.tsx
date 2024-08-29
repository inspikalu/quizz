import React, { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";

const Root: React.FC = function () {
  //
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  let header = "";
  if (pathname === "/") {
    header = "QUEEZ";
  } else if (pathname === "/join") {
    header = "Waiting Room";
  } else if (pathname === "/create") {
    header = "Create Game";
  } else {
    header = "QUEEZ";
  }
  return (
    <section className="w-full h-screen flex flex-col p-6 bg-veronica overflow-y-auto">
      <div className="flex flex-row justify-between">
        <Link
          to={"/"}
          className="flex items-center justify-center bg-[#ffffff9f] p-3 rounded-full"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <p className="text-white font-bold text-2xl">{header}</p>
        <Link
          to={"/create"}
          className={`flex items-center justify-center bg-[#ffffff9f] p-3 rounded-full ${
            pathname !== "/" && "invisible"
          }`}
        >
          {pathname === "/" ? <FontAwesomeIcon icon={faPlus} /> : " "}
        </Link>
      </div>
      <div className="w-full h-full">
        <Outlet />
      </div>
    </section>
  );
};

export default Root;
