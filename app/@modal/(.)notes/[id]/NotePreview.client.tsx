"use client";
import css from "../../../(private routes)/notes/[id]/NoteDetails.module.css";
import { useParams, useRouter } from "next/navigation";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/clientApi";
import Modal from "@/components/Modal/Modal";
import { useCallback } from "react";

const NotePreviewClient = () => {
  const { id } = useParams();

  const { data: note } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(String(id)),
    refetchOnMount: false,
    placeholderData: keepPreviousData,
  });

  const router = useRouter();
  const onClose = useCallback(() => {
    router.back();
  }, [router]);

  if (!note) return <p>Note not found</p>;

  const date = new Date(note.createdAt);
  const formattedDate = date.toLocaleString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Modal onClose={onClose}>
      <div className={css.container}>
        <p>{note.tag}</p>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
            <button className={css.editBtn}>Edit note</button>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{formattedDate}</p>
        </div>
      </div>
    </Modal>
  );
};

export default NotePreviewClient;
