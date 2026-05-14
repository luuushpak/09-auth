"use client";

import css from "./NotePreview.module.css";
import { fetchNoteById } from "@/lib/api/clientApi";
import { useQuery } from "@tanstack/react-query";
import Modal from "@/components/Modal/Modal";
import { useRouter } from "next/navigation";

interface NotePreviewClientProps {
  id: string;
}

function NotePreviewClient({ id }: NotePreviewClientProps) {
  const router = useRouter();

  function closeModal() {
    router.back();
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !data) return <p>Something went wrong.</p>;

  return (
    <Modal handleCloseModal={closeModal}>
      <div className={css.container}>
        <button
          type="button"
          onClick={closeModal}
          className={css.backBtn}
          aria-label="Close modal"
        >
          ← Back to Notes
        </button>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{data.title}</h2>
            <span className={css.tag}>{data.tag}</span>
          </div>
          <p className={css.content}>{data.content}</p>
          <p className={css.date}>
            Created: {new Date(data.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </Modal>
  );
}

export default NotePreviewClient;
