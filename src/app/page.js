import { NoteApp } from "@/components/NoteApp";

async function getAllNotes() {
  const res = await fetch("https://v1.appbackend.io/v1/rows/fGVoMpWXWu4c", { cache: 'no-store' });
  const allNotes = await res.json();
  return allNotes;
}

export default async function Home() {
  const { data } = await getAllNotes();

  return (
    <div className="grow flex flex-col gap-y-2">
      <NoteApp allNotes={data} />
    </div>
  );
}
