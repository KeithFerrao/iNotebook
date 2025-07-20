import React, { useContext, useEffect } from "react";
import noteContext from "../Context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getAllNotes} = context;
  useEffect(()=>{
    getAllNotes();
  },[])

  return (
    <> 
      <AddNote />
      <div className="row my-3">
        <h1>Your Note</h1>
        {notes.map((note) => {
          return <NoteItem key={note._id} note={note} />;
        })}
      </div>
    </>
  );
};

export default Notes;
