"use client";

import { useState } from "react";
import css from "./App.module.css";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/clientApi";
import Pagination from "@/components/Pagination/Pagination";
import { useDebounce } from "use-debounce";
import Logo from "@/components/Logo/Logo";
import type { FetchNotesResponse } from "@/lib/api/clientApi";
import { Tag } from "@/types/note";
import Link from "next/link";

interface NotesClientProps {
  initialNotesData: FetchNotesResponse;
  tag?: Tag;
}

export default function NotesClient({
  initialNotesData,
  tag,
}: NotesClientProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  //FETCHING & SEARCHING NOTES
  const [debouncedInputValue] = useDebounce(inputValue, 500);

  const notes = useQuery({
    queryKey: ["notes", debouncedInputValue, currentPage, tag],
    queryFn: () => fetchNotes(debouncedInputValue, currentPage, tag),
    placeholderData: keepPreviousData,
    initialData:
      !debouncedInputValue && currentPage === 1 ? initialNotesData : undefined,
  });

  const totalPages = notes.data?.totalPages ?? 0;

  const handleSearchChange = (newSearch: string) => {
    setInputValue(newSearch);
    setCurrentPage(1);
  };

  return (
    <>
      <div className={css.app}>
        {/* -------HEADER ELEMENTS--------- */}

        <div className={css.toolbar}>
          <div>
            <SearchBox value={inputValue} onSearch={handleSearchChange} />
          </div>
          <Logo />

          {/* -------BTN CREATE NOTE--------- */}

          <Link href={"/notes/action/create"} className={css.addbutton}>
            Create note +
          </Link>
        </div>

        {/* -------NOTELIST--------- */}

        <NoteList notes={notes.data?.notes ?? []} />
        {totalPages > 0 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </>
  );
}
