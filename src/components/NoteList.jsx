export const NoteList = ({ allNotes }) => {
  return (
    <div className="bg-stone-400 p-4 flex flex-col gap-y-2">
      {allNotes.map(note => (
        <div key={note._id} className="bg-stone-300 p-4">
          <h2 className="font-bold mb-2">{note.title}</h2>
          <p>{note.content}</p>
        </div>
      ))}
    </div>
  )
}