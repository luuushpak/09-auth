import Link from "next/link";
import css from "./Home.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NoteHub - Page Not Found",
  description: "This page does not exist",
  openGraph: {
    title: "NoteHub - Page Not Found",
    description: "The page you are looking for does not exist",
    url: `${process.env.NEXT_PUBLIC_API_URL}/not-found`,
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: "1200",
        height: "630",
        alt: "NoteHub - Page Not Found",
      },
    ],
  },
};

export default function NotFound() {
  return (
    <main className={css.main}>
      <div className={css.heroCard}>
        <span className={css.heroBadge}>404 error</span>
        <h1 className={css.title}>Page not found</h1>
        <p className={css.description}>
          Sorry, the page you are looking for does not exist. Use the button
          below to return to the dashboard.
        </p>
        <Link href="/" className={css.ctaButton}>
          Go to home
        </Link>
      </div>
    </main>
  );
}
