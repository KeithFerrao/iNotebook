import React, { useContext, useState } from "react";
import noteContext from "../Context/notes/noteContext";

const AddNote = () => {
  const context = useContext(noteContext);
  const {addNote } = context;

  const [note, setnote] = useState({title: "", description:"", tag:""});

  const handleclick = (event) =>{
    event.preventDefault();
    console.log("Added a new note"); 
    addNote(note.title, note.description, note.tag);
  }

  const onChange = (event) =>{
    setnote({... note, [event.target.name]: event.target.value});
  }
  return (
    <div>
      <div className="container my-3">
        <h1>Add a Note</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
             Title
            </label>
            <input
              type="text"
              name="title"
              className="form-control"
              id="title"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              name="description"
              className="form-control"
              id="description"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
             Tag
            </label>
            <input
              type="text"
              name="tag"
              className="form-control"
              id="tag"
              onChange={onChange}
            />
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleclick}>
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
