import { useRouteError } from "react-router-dom";

interface RouteError {
  statusText?: string;
  message?: string;
}
export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  const typedError = error as RouteError;
  return (
    <div
      id="error-page"
      className="w-full items-center flex flex-col justify-center "
    >
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{typedError.statusText || typedError.message}</i>
      </p>
    </div>
  );
}
