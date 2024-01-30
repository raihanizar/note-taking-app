export const NoteList = ({ allNotes, setSelectedNoteId, setEditMode }) => {

  function handleNoteClick(note) {
    setSelectedNoteId(note._id);
    setEditMode(true);
  }

  return (
    <div className="bg-stone-400 p-4 w-52 border-solid border-r border-stone-600 flex flex-col gap-y-2">
      {allNotes.length > 0
        ? allNotes.map(note => (
          <div key={note._id} className="bg-stone-300 p-2 rounded-md hover:border hover:border-solid hover:border-stone-600 hover:bg-stone-400 cursor-pointer" onClick={() => handleNoteClick(note)}>
            <h2 className="font-bold mb-2 truncate">{note.title}</h2>
            <p className="truncate">{note.content}</p>
          </div>
        ))
        : <div className="text-stone-500 italic underline flex justify-center items-center h-full">tidak ada notes!</div>}
    </div>
  )
}