"use client"

import { useState } from "react"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const NoteInput = ({ selectedNote, editMode }) => {
  const router = useRouter();
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");

  const noteData = [{ "title": noteTitle, "content": noteContent }]

  useEffect(() => {
    if (editMode) {
      setNoteTitle(selectedNote.title);
      setNoteContent(selectedNote.content);
    }
  }, [editMode, selectedNote]);

  async function postNoteData() {
    const res = await fetch("https://v1.appbackend.io/v1/rows/rz4KwC0FcIUZ", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(noteData)
    });
    const resJson = await res.json();

    // refresh agar re-fetch setelah post data
    router.refresh();

    // kosongkan text area
    setNoteTitle("");
    setNoteContent("");
  }

  return (
    <div className="grow flex flex-col bg-stone-300 p-20 gap-y-2 items-end">
      <div className="grow flex flex-col gap-y-2 w-full">
        <textarea className="input-title h-16 bg-stone-300 rounded-md text-3xl font-bold resize-none outline-none" placeholder="Masukan judul catatan di sini..." value={noteTitle} onChange={(e) => setNoteTitle(e.target.value)}></textarea>
        <textarea className="input-content grow bg-stone-300 rounded-md resize-none outline-none" placeholder="Masukan teks catatan di sini..." value={noteContent} onChange={(e) => setNoteContent(e.target.value)}></textarea>
      </div>
      <button className="bg-orange-400 p-2 rounded-md" onClick={postNoteData}>Simpan</button>
    </div>
  )
}