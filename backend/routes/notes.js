const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, query, validationResult } = require("express-validator");

//ROUTE 1 : Get all the notes using GET : "/api/notes/fetchallnotes". Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Enter Valid/Unique data");
  }
});

//ROUTE 2 : Add a new note using POST : "/api/notes/addnote". Login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a proper title").isLength({ min: 3 }),
    body("description", "Enter a proper description").isLength({ min: 10 }),
  ],
  async (req, res) => {
    try {
      // This line extracts the title, description and tag from
      // the data the user send (Request body) known as object desctruction
      // and stores them in these variables
      const { title, description, tag } = req.body;

      // If error occurs then show the error msg
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      let note = new Notes({
        user: req.user.id,
        title,
        description,
        tag,
      });

      // If you want to display your saved note then store in a variable (not needed later)
      const savedNotes = await note.save();

      res.json(savedNotes);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Enter Valid/Unique data");
    }
  }
);

//ROUTE 3 : Updating an existing note using PUT : "/api/notes/updatenote/:id". Login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  try {
    // Create a newNote object
    const newNote = {};

    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // Find the note to be updated and update it
    //(req.params.id) in this it is getting the notes id
    let note = await Notes.findById(req.params.id);

    if (!note) {
      return res.status(404).send("Note not found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

//ROUTE 4 : Deleting an existing note using DEL : "/api/notes/deletenote/:id". Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // Find the note to be deleted and delete it
    //(req.params.id) in this it is getting the notes id
    let note = await Notes.findById(req.params.id);

    if (!note) {
      return res.status(404).send("Note not found");
    }
    // Allow deletion only if user owns this note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});
//In postman : Whenever your adding data to the Database you add the header of content-type : application/json

module.exports = router;
