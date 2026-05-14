import type { Note } from "@/types/note";
import type {
  FetchNotesProps,
  ApiFetchNotes,
  CheckSessionRequest,
} from "./api";
import { bffApi } from "./api";
import { cookies } from "next/headers";
import { User } from "@/types/user";

export async function fetchNotes({
  query: search,
  page,
  tag,
}: FetchNotesProps): Promise<ApiFetchNotes> {
  const cookieStore = await cookies();

  const response = await bffApi.get<ApiFetchNotes>("/notes", {
    params: {
      search,
      page,
      perPage: 12,
      tag,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const cookieStore = await cookies();

  const response = await bffApi.get<Note>(`/notes/${id}`, {
    headers: { Cookie: cookieStore.toString() },
  });

  return response.data;
}

export const checkSession = async () => {
  const cookieStore = await cookies();

  const res = await bffApi.get<CheckSessionRequest>("/auth/session", {
    headers: { Cookie: cookieStore.toString() },
  });

  return res;
};

export const getMe = async () => {
  const cookieStore = await cookies();

  const res = await bffApi.get<User>("/users/me", {
    headers: { Cookie: cookieStore.toString() },
  });

  return res.data;
};
