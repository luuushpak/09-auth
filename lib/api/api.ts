import axios, { AxiosError } from "axios";
import { NoteTag } from "@/types/note";
import { Note } from "@/types/note";

export type APIError = AxiosError<{ error: string }>;

const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";

export interface FetchNotesProps {
  query: string;
  page: number;
  tag?: NoteTag;
}

export interface ApiFetchNotes {
  notes: Note[];
  totalPages: number;
}

export interface CheckSessionRequest {
  success: boolean;
}

export const bffApi = axios.create({
  baseURL,
  withCredentials: true,
});
