"use client"

import { useState } from "react"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const NoteInput = ({ selectedNote, editMode, setEditMode }) => {
  const router = useRouter();
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");

  useEffect(() => {
    if (editMode) {
      setNoteTitle(selectedNote.title);
      setNoteContent(selectedNote.content);
    }
  }, [editMode, selectedNote]);

  async function saveNoteData() {
    const method = editMode ? "PUT" : "POST";
    const noteData = editMode
      ? { "_id": selectedNote._id, "title": noteTitle, "content": noteContent }
      : [{ "title": noteTitle, "content": noteContent }]

    try {
      const res = await fetch("https://v1.appbackend.io/v1/rows/fGVoMpWXWu4c", {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(noteData),
        cache: "no-store"
      });
      const resJson = await res.json();
      console.log(resJson);
    } catch (err) {
      console.error(resJson);
    }

    // refresh agar re-fetch setelah post data
    router.refresh();

    // kosongkan text area
    setNoteTitle("");
    setNoteContent("");
  }

  function createNewNote() {
    // kembalikan ke mode create
    setEditMode(false);

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
      <div className="flex flex-row gap-x-2">
        <button className="bg-orange-400 p-2 rounded-md" onClick={saveNoteData}>Simpan</button>
        <button className="bg-stone-400 p-2 rounded-md" onClick={createNewNote}>Buat Note Baru +</button>
      </div>
    </div>
  )
}