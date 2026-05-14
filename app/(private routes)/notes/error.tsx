"use client";

import css from "@/components/ErrorMessage/ErrorMessage.module.css";

interface ErrorProps {
  error: Error;
}

export default function Error({ error }: ErrorProps) {
  return (
    <div className={css.text}>
      <h1>Could not fetch notes</h1>
      <p>{error.message}</p>
    </div>
  );
}
