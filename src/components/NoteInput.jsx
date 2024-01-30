"use client"

import { useState } from "react"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// next UI
import { Button } from "@nextui-org/react";
import { SaveIcon } from "./icons/SaveIcon";
import { DeleteIcon } from "./icons/DeleteIcon";
import { AddIcon } from "./icons/AddIcon";

// Toaster
import toast from 'react-hot-toast';

export const NoteInput = ({ selectedNote, editMode, setEditMode }) => {
  const router = useRouter();
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [canSave, setCanSave] = useState(false);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
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
    } catch (err) {
      console.error(resJson);
    }

    // kosongkan text area
    setNoteTitle("");
    setNoteContent("");

    // refresh agar re-fetch setelah data berubah
    router.refresh();

    toast.success('Note berhasil tersimpan!');
    setLoading(false);
  }

  async function deleteNote() {
    setLoading(true);
    try {
      const res = await fetch("https://v1.appbackend.io/v1/rows/fGVoMpWXWu4c", {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([selectedNote._id]),
        cache: "no-store"
      });
      const resJson = await res.json();
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

    toast.success('Note berhasil dihapus!')
    setLoading(false);
  }

  return (
    <div className="grow flex flex-col bg-stone-300 p-20 gap-y-2">
      <div className="grow flex flex-col gap-y-2 w-full">
        <textarea className="input-title h-16 bg-stone-300 rounded-md text-3xl font-bold resize-none outline-none" placeholder="Masukan judul notes di sini..." value={noteTitle} onInput={(e) => handleNoteChange(e, "title")}></textarea>
        <textarea className="input-content grow bg-stone-300 rounded-md resize-none outline-none" placeholder="Masukan teks notes di sini..." value={noteContent} onInput={(e) => handleNoteChange(e, "content")}></textarea>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-x-2">
          <Button startContent={<SaveIcon />} className="bg-orange-400 disabled:bg-orange-300 hover:bg-orange-500 hover:disabled:cursor-not-allowed disabled:text-slate-600 p-2 rounded-md" isLoading={loading} disabled={!canSave} onClick={saveNoteData}>
            <p>Simpan</p>
          </Button>
          {editMode
            ?
            <Button startContent={<DeleteIcon />} className="bg-rose-600 hover:bg-rose-700 p-2 rounded-md text-stone-900" onClick={deleteNote} isLoading={loading}>
              <p>Delete Note</p>
            </Button>
            : null
          }
        </div>

        {editMode
          ?
          <Button startContent={<AddIcon />} className="bg-stone-400 hover:bg-stone-500 p-2 rounded-md text-stone-900" isLoading={loading} onClick={createNewNote}>
            <p>Buat Note Baru</p>
          </Button>
          : null
        }
      </div>
    </div>
  )
}