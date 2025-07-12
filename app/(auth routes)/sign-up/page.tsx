"use client";

import React, { useState } from "react";
import css from "./SignUp.module.css";
import { useRouter } from "next/navigation";
import { register, RegisterRequest } from "@/lib/api/clientApi";

const SignUpPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues: RegisterRequest = {
        email: String(formData.get("email")),
        password: String(formData.get("password")),
      };
      await register(formValues);
      router.push("/profile");
    } catch (err) {
      console.error("error", err);
      setError("Invalid email or password");
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form action={handleSubmit} className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>

        <p className={css.error}>{error && <p>{error}</p>}</p>
      </form>
    </main>
  );
};

export default SignUpPage;
