"use client"

import { NoteInput } from "@/components/NoteInput";
import { NoteList } from "@/components/NoteList";
import { useState } from "react";

export const NoteApp = ({ allNotes }) => {
  const [selectedNoteId, setSelectedNoteId] = useState(-1);
  const [editMode, setEditMode] = useState(false);

  let selectedNote = allNotes.find(note => note._id === selectedNoteId);

  return (
    <div className="h-full flex flex-row">
      <NoteList allNotes={allNotes} setSelectedNoteId={setSelectedNoteId} setEditMode={setEditMode}/>
      <NoteInput selectedNote={selectedNote} setEditMode={setEditMode} editMode={editMode} />
    </div>
  );
}
