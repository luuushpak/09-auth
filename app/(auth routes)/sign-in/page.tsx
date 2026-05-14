"use client";
import { useState } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import type { APIError } from "@/lib/api/api";
import css from "./SignIn.module.css";
import { login } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
export default function SignIn() {
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
      const user = await login({ email, password });

      if (user) {
        setUser(user);
        form.reset();
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
      <div className={css.card}>
        <div className={css.header}>
          <span className={css.badge}>Welcome back</span>
          <h1 className={css.formTitle}>Sign in</h1>
          <p className={css.subtitle}>
            Sign in to your NoteHub account and continue managing your notes.
          </p>
        </div>

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
            <button
              type="submit"
              className={css.submitButton}
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>

          {error && <p className={css.error}>{error}</p>}
        </form>
      </div>
    </main>
  );
}
