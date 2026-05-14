import css from "@/app/Home.module.css";
import Link from "next/link";
function Home() {
  return (
    <main className={css.main}>
      <section className={css.hero}>
        <div className={css.heroCard}>
          <span className={css.heroBadge}>Your productivity hub</span>
          <h1 className={css.title}>Welcome to NoteHub</h1>
          <p className={css.description}>
            NoteHub is a modern note application built for capturing ideas,
            organizing tasks, and staying focused. Everything you need for a
            smarter workflow is in one easy-to-use space.
          </p>
          <div className={css.heroActions}>
            <Link href="/notes/filter/all" className={css.ctaButton}>
              Explore notes
            </Link>
            <Link href="/notes/action/create" className={css.secondaryButton}>
              Create a note
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
