import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";

  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  // Get all notes
  const getAllNotes = async () => {
    // API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg3MGMxYTE1Y2Y5MTRhZjQ0MjlmOTcyIn0sImlhdCI6MTc1MjQwODQ2Nn0.Z0gUS4N9AiDCWOgr5RceOYf2vPEnQHQfZtYOgRWsft8",
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  // Add a note
  const addNote = async (title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg3MGMxYTE1Y2Y5MTRhZjQ0MjlmOTcyIn0sImlhdCI6MTc1MjQwODQ2Nn0.Z0gUS4N9AiDCWOgr5RceOYf2vPEnQHQfZtYOgRWsft8",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const json = await response.json();
    setNotes(notes.concat(json));
  };

  // Delete a note
  const deleteNote = async (id) => {
    // API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg3MGMxYTE1Y2Y5MTRhZjQ0MjlmOTcyIn0sImlhdCI6MTc1MjQwODQ2Nn0.Z0gUS4N9AiDCWOgr5RceOYf2vPEnQHQfZtYOgRWsft8",
      },
    });
    const json = response.json();
    console.log(json);  

    console.log("Note is deleting based on the id " + id);
    const deletingNote = notes.filter((item) => {
      return item._id !== id;
    });
    setNotes(deletingNote);
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg3MGMxYTE1Y2Y5MTRhZjQ0MjlmOTcyIn0sImlhdCI6MTc1MjQwODQ2Nn0.Z0gUS4N9AiDCWOgr5RceOYf2vPEnQHQfZtYOgRWsft8",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);

    // Logic to edit a note
    let newNote = JSON.parse(JSON.stringify(notes));
    for (let i = 0; i < newNote.length; i++) {
      const element = newNote[i];
      if (element._id === id) {
        newNote[i].title = title;
        newNote[i].description = description;
        newNote[i].tag = tag;
        break;
      }
    }
    setNotes(newNote);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getAllNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
