import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";

  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

// Get all notes
  const getAllNotes = async () => {
    // TODO: API call
    // API Call
    const response = await fetch(
      `${host}/api/notes/fetchallnotes`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg3MGMxYTE1Y2Y5MTRhZjQ0MjlmOTcyIn0sImlhdCI6MTc1MjQwODQ2Nn0.Z0gUS4N9AiDCWOgr5RceOYf2vPEnQHQfZtYOgRWsft8",
        }
      }
    );
    const json = await response.json();
    setNotes(json);
  };



  // Add a note
  const addNote = async (title, description, tag) => {
    // TODO: API call
    // API Call
    const response = await fetch(
      `${host}/api/notes/addnote`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg3MGMxYTE1Y2Y5MTRhZjQ0MjlmOTcyIn0sImlhdCI6MTc1MjQwODQ2Nn0.Z0gUS4N9AiDCWOgr5RceOYf2vPEnQHQfZtYOgRWsft8",
        },
        body: JSON.stringify({title, description, tag}),
      }
    );

    let note = {
      _id: "6874a7973ec83428b29f2f8fh512",
      user: "6870c1a15cf914af4429f972",
      title: title,
      description: description,
      tag: tag,
      date: "2025-07-14T06:45:43.597Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  // Delete a note
  const deleteNote = (id) => {
    // TODO: API call
    console.log("Note is deleting based on the id " + id);
    const deletingNote = notes.filter((item) => {
      return item._id !== id;
    });
    setNotes(deletingNote);
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    // API Call
      const response = await fetch(
        `${host}/api/notes/updatenote/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg3MGMxYTE1Y2Y5MTRhZjQ0MjlmOTcyIn0sImlhdCI6MTc1MjQwODQ2Nn0.Z0gUS4N9AiDCWOgr5RceOYf2vPEnQHQfZtYOgRWsft8",
          },
          body: JSON.stringify({title,description,tag}),
        }
      );
      const json =  response.json();

    // Logic to edit a note
    for (let i = 0; i < notes.length; i++) {
      const element = notes[i];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getAllNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
