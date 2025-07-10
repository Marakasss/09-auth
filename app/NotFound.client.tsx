"use client";
import css from "./NotFound.module.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const NotFoundClient = () => {
  const router = useRouter();

  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const timer = setTimeout(() => {
      router.push("/");
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [router]);

  return (
    <>
      <div className={css.container}></div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist. <br />
        You will be redirected to the homepage in {}
        {countdown > 0 ? countdown : 0} seconds.
      </p>
    </>
  );
};

export default NotFoundClient;
