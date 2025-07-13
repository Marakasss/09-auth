import { cookies } from "next/headers";
import { FetchNotesParams, FetchNotesResponse } from "./clientApi";
import { Note } from "@/types/note";
import nextServer from "./api";
import { User } from "@/types/user";

//Fetch notes with server-side cookies
export async function fetchNotesServer(
  query: string,
  page: number,
  tag: string | undefined = undefined
): Promise<FetchNotesResponse> {
  const params: FetchNotesParams = {
    ...(query.trim() !== "" && { search: query.trim() }),
    page: page,
    perPage: 12,
    tag,
  };
  const cookieStore = await cookies();
  const response = await nextServer.get<FetchNotesResponse>("/notes", {
    params,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
}

//Fetch note by ID with server-side cookies
export async function fetchNoteByIdServer(noteId: string): Promise<Note> {
  const cookieStore = await cookies();
  const response = await nextServer.get<Note>(`/notes/${noteId}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
}

export async function checkServerSession() {
  const cookieStore = await cookies();
  const res = await nextServer.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
}

export const getMeServer = async () => {
  const cookieStore = await cookies();
  const responce = await nextServer.get<User>("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return responce.data;
};
