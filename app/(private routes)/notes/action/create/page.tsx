import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";
import React from "react";
import { Metadata } from "next";

//Metadata----------------------------------------

export const metadata: Metadata = {
  title: "Create Note",
  description: "Create a new note in NoteHub",
  openGraph: {
    title: "Create Note",
    description: "Create a new note in NoteHub",
    url: "https://09-auth-cyan.vercel.app/notes/action/create",
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub App",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Create Note",
    description: "Create a new note in NoteHub",
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
};

//Component----------------------------------------

const CreateNote = () => {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
};

export default CreateNote;
