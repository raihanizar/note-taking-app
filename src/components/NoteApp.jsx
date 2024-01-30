"use client"

import { NoteInput } from "@/components/NoteInput";
import { NoteList } from "@/components/NoteList";

export const NoteApp = ({ allNotes }) => {
  return (
    <div className="h-full flex flex-row gap-x-2">
      <NoteList allNotes={allNotes} />
      <NoteInput allNotes={allNotes} />
    </div>
  );
}
