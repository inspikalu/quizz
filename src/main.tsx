import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import ErrorPage from "./error-page.tsx";
import Root from "./routes/root.tsx";
import WaitingRoom from "./routes/WaitingRoom.tsx";
import Quiz from "./routes/Quiz.tsx";
import CreateGame from "./routes/CreateGame.tsx";
import Game from "./routes/Game.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/hello",
        element: <div>Wagwan my bro</div>,
      },
      {
        path: "/join",
        element: <WaitingRoom />,
      },
      {
        path: "/quizz",
        element: <Quiz />,
      },
      {
        path: "/create",
        element: <CreateGame />,
      },
      {
        path: "/game/:id",
        element: <Game />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
