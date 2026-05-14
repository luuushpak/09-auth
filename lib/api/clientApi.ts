import type { Note, NoteTag } from "@/types/note.ts";
import type {
  FetchNotesProps,
  ApiFetchNotes,
  CheckSessionRequest,
} from "./api";
import type { User } from "@/types/user";
import { bffApi } from "./api";

interface CreateNoteProps {
  title: string;
  content: string;
  tag: NoteTag;
}

interface RegisterRequest {
  email: string;
  password: string;
}

interface UpdateMeProps {
  username: string;
}

export async function fetchNotes({
  query: search,
  page,
  tag,
}: FetchNotesProps): Promise<ApiFetchNotes> {
  const response = await bffApi.get<ApiFetchNotes>("/notes", {
    params: {
      search,
      page,
      perPage: 12,
      tag,
    },
  });

  return response.data;
}

export async function createNote(newNote: CreateNoteProps): Promise<Note> {
  const response = await bffApi.post<Note>("/notes", newNote);

  return response.data;
}
export async function deleteNote(id: string): Promise<Note> {
  const response = await bffApi.delete<Note>(`/notes/${id}`);

  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await bffApi.get<Note>(`/notes/${id}`);

  return response.data;
}

export const register = async (data: RegisterRequest) => {
  const res = await bffApi.post<User>("/auth/register", data);
  return res.data;
};

export const login = async (data: RegisterRequest) => {
  const res = await bffApi.post<User>("/auth/login", data);
  return res.data;
};

export const logout = async () => {
  const res = await bffApi.post<User>("/auth/logout");

  return res.data;
};

export const checkSession = async () => {
  const res = await bffApi.get<CheckSessionRequest>("/auth/session");

  return res.data.success;
};

export const getMe = async () => {
  const res = await bffApi.get<User>("/users/me");

  return res.data;
};

export const updateMe = async (data: UpdateMeProps) => {
  const res = await bffApi.patch<User>("/users/me", data);

  return res.data;
};
