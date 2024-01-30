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
    <div className="grow flex flex-col bg-stone-300 p-20 gap-y-2">
      <div className="grow flex flex-col gap-y-2 w-full">
        <textarea className="input-title h-16 bg-stone-300 rounded-md text-3xl font-bold resize-none outline-none" placeholder="Masukan judul notes di sini..." value={noteTitle} onInput={(e) => handleNoteChange(e, "title")}></textarea>
        <textarea className="input-content grow bg-stone-300 rounded-md resize-none outline-none" placeholder="Masukan teks notes di sini..." value={noteContent} onInput={(e) => handleNoteChange(e, "content")}></textarea>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-x-2">
          <button className="bg-orange-400 disabled:bg-orange-300 hover:bg-orange-500 hover:disabled:cursor-not-allowed p-2 rounded-md disabled:text-slate-600" disabled={!canSave} onClick={saveNoteData}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 448 512"><path fill="currentColor" d="m433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941M224 416c-35.346 0-64-28.654-64-64c0-35.346 28.654-64 64-64s64 28.654 64 64c0 35.346-28.654 64-64 64m96-304.52V212c0 6.627-5.373 12-12 12H76c-6.627 0-12-5.373-12-12V108c0-6.627 5.373-12 12-12h228.52c3.183 0 6.235 1.264 8.485 3.515l3.48 3.48A11.996 11.996 0 0 1 320 111.48" /></svg>
            <p>Simpan</p>
          </button>
          {editMode
            ? <button className="bg-rose-600 hover:bg-rose-700 p-2 rounded-md text-stone-900" onClick={deleteNote}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 448 512"><path fill="currentColor" d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16M53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z" /></svg>
              <p>Delete Note</p>
            </button>
            : null
          }
        </div>

        {editMode
          ? <button className="bg-stone-400 hover:bg-stone-500 p-2 rounded-md text-stone-900" onClick={createNewNote}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 448 512"><path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32"/></svg>
            <p>Buat Note Baru</p>
          </button>
          : null
        }
      </div>
    </div>
  )
}