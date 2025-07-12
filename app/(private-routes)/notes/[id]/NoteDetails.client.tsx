"use client";
import css from "./NoteDetails.module.css";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/clientApi";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";

const NoteDetailsClient = () => {
  const { id } = useParams();

  const {
    data: note,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(String(id)),
    refetchOnMount: false,
  });

  if (isLoading) return <Loader />;

  if (isError) return <ErrorMessage />;

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
  );
};
export default NoteDetailsClient;
