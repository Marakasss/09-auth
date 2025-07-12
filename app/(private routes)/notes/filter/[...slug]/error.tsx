"use client";

import css from "./Error.module.css";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

const Error = ({ error, reset }: ErrorProps) => {
  console.error("Error message:", error.message);
  return (
    <>
      <div className={css.wrp}>
        <p className={css.text}>There was an error, please try again...</p>
      </div>
      <button className={css.button} onClick={() => reset()}>
        Try again ⟳
      </button>
    </>
  );
};
export default Error;
