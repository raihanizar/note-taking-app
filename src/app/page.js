import { NoteInput } from "@/components/NoteInput";
import { NoteList } from "@/components/NoteList";
import Image from "next/image";

export default function Home() {
  return (
    <div className="grow flex flex-row gap-x-2">
      <NoteList />
      <NoteInput />
    </div>
  );
}
