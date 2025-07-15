import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import NoteState from "./Context/notes/NotesState";

function App() {
  return (
    <>
    <NoteState>
    <Router>
      <Navbar />
        <Routes>
          <Route exact path="/Home" element={<Home />} />
          <Route exact path="/About" element={<About />} />
        </Routes>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
