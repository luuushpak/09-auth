"use client";

import css from "./SingUp.module.css";
import { useRouter } from "next/navigation";
import { register } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useState } from "react";
import { APIError } from "@/lib/api/api";

export default function SingUp() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (form: HTMLFormElement) => {
    const formData = new FormData(form);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    setError("");
    setLoading(true);

    try {
      const user = await register({ email, password });

      if (user) {
        setUser(user);
        router.push("/profile");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError(
        (error as APIError).response?.data?.error ??
          (error as APIError).message ??
          "Oops... something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form
        className={css.form}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e.currentTarget);
        }}
      >
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
          <button type="submit" className={css.submitButton} disabled={loading}>
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}
