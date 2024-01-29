import { NoteInput } from "@/components/NoteInput";
import { NoteList } from "@/components/NoteList";

async function getAllNotes() {
  const res = await fetch("https://v1.appbackend.io/v1/rows/rz4KwC0FcIUZ");
  const allNotes = await res.json();
  return allNotes;
}

export default async function Home() {
  const { data } = await getAllNotes();

  return (
    <div className="grow flex flex-row gap-x-2">
      <NoteList allNotes={data}/>
      <NoteInput />
    </div>
  );
}
