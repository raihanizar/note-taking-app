"use client"

import { useState } from "react"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const NoteInput = ({ selectedNote, editMode, setEditMode }) => {
  const router = useRouter();
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [canSave, setCanSave] = useState(false);

  useEffect(() => {
    if (editMode) {
      setNoteTitle(selectedNote.title);
      setNoteContent(selectedNote.content);
    }
  }, [editMode, selectedNote]);

  // jika salah satu input kosong, tidak bisa submit
  useEffect(() => {
    if (noteTitle && noteContent) {
      setCanSave(true)
    } else {
      setCanSave(false)
    }
  }, [noteTitle, noteContent])

  function handleNoteChange(e, type) {
    if (type === "title") {
      setNoteTitle(e.target.value);
    }
    
    if (type === "content") {
      setNoteContent(e.target.value);
    }
  }

  function createNewNote() {
    // kembalikan ke mode create
    setEditMode(false);

    // kosongkan text area
    setNoteTitle("");
    setNoteContent("");
  }

  async function saveNoteData() {
    let method;
    let noteData;

    if (editMode) {
      method = "PUT";
      noteData = { "_id": selectedNote._id, "title": noteTitle, "content": noteContent };
    } else {
      method = "POST";
      noteData = [{ "title": noteTitle, "content": noteContent }];
    }

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

    // kosongkan text area
    setNoteTitle("");
    setNoteContent("");

    // refresh agar re-fetch setelah data berubah
    router.refresh();
  }

  async function deleteNote() {
    try {
      const res = await fetch("https://v1.appbackend.io/v1/rows/fGVoMpWXWu4c", {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([selectedNote._id]),
        cache: "no-store"
      });
      const resJson = await res.json();
      console.log(resJson);
    } catch (err) {
      console.error(resJson);
    }

    // kosongkan text area
    setNoteTitle("");
    setNoteContent("");

    // reset ke create mode
    createNewNote();

    // refresh agar re-fetch setelah data berubah
    router.refresh();
  }

  return (
    <div className="grow flex flex-col bg-stone-300 p-20 gap-y-2 items-end">
      <div className="grow flex flex-col gap-y-2 w-full">
        <textarea className="input-title h-16 bg-stone-300 rounded-md text-3xl font-bold resize-none outline-none" placeholder="Masukan judul notes di sini..." value={noteTitle} onInput={(e) => handleNoteChange(e, "title")}></textarea>
        <textarea className="input-content grow bg-stone-300 rounded-md resize-none outline-none" placeholder="Masukan teks notes di sini..." value={noteContent} onInput={(e) => handleNoteChange(e, "content")}></textarea>
      </div>
      <div className="flex flex-row gap-x-2">
        <button className="bg-stone-400 p-2 rounded-md" onClick={createNewNote}>Buat Note Baru +</button>
        <button className="bg-orange-400 p-2 rounded-md disabled:bg-orange-300 disabled:text-slate-700" disabled={!canSave} onClick={saveNoteData}>Simpan</button>
        {editMode
          ? <button className="bg-rose-600 text-white p-2 rounded-md" onClick={deleteNote}>Delete Note -</button>
          : null
        }
      </div>
    </div>
  )
}