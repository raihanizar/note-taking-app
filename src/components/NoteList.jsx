export const NoteList = ({ allNotes, setSelectedNoteId, setEditMode }) => {

  function handleNoteClick(note) {
    setSelectedNoteId(note._id);
    setEditMode(true);
  }

  return (
    <div className="bg-stone-400 p-4 w-52 flex flex-col gap-y-2">
      {allNotes.length > 0
        ? allNotes.map(note => (
          <div key={note._id} className="bg-stone-300 p-4 hover:outline hover:bg-stone-400 cursor-pointer" onClick={() => handleNoteClick(note)}>
            <h2 className="font-bold mb-2 truncate">{note.title}</h2>
            <p className="truncate">{note.content}</p>
          </div>
        ))
        : <div className="text-stone-600 italic">tidak ada notes!</div>}
    </div>
  )
}