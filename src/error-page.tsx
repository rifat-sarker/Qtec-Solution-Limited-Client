import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>
          {(() => {
            if (typeof error === "object" && error !== null) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              return (error as any).statusText || (error as any).message;
            }
            return String(error);
          })()}
        </i>
      </p>
    </div>
  );
}
