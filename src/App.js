import { useEffect, useState } from "react"; // import React hooks that allow us to use state and lifecycle methods
import uuid from "react-uuid";               // import library that generates UUIDs
import "./index.css";                        // import global styles
import Main from "./body";                   // import Main component from body.js
import Sidebar from "./sidebar";             // import Sidebar component from sidebar.js
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

function App() {                                             // create App component
  const [notes, setNotes] = useState(
    localStorage.notes ? JSON.parse(localStorage.notes) : [] // create state for notes, initialize it with data from localStorage or an empty array
  );
  const [activeNote, setActiveNote] = useState(false);       // create state for active note, initialize it as false

  useEffect(() => {                                          // create a side effect to update localStorage when notes change
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const onAddNote = () => {                                  // function to add a new note
    const newNote = {
      id: uuid(),                                            // generate a unique ID for the new note
      title: "Untitled Note",                                // initialize the new note's title as "Untitled Note"
      body: "",                                              // initialize the new note's body as an empty string
      lastModified: Date.now(),                              // initialize the new note's lastModified property with the current timestamp
    };

    setNotes([newNote, ...notes]);                           // add the new note to the notes array
    setActiveNote(newNote.id);                               // set the new note as the active note
  };

  const onDeleteNote = (noteId) => {                         // function to delete a note
    setNotes(notes.filter(({ id }) => id !== noteId));       // filter out the note with the given ID from the notes array
  };

  const onUpdateNote = (updatedNote) => {                    // function to update a note
    const updatedNotesArr = notes.map((note) => {
      if (note.id === updatedNote.id) {                      // if the ID of the current note matches the ID of the updated note
        return updatedNote;                                  // replace the current note with the updated note
      }

      return note;                                           // otherwise, keep the current note
    });

    setNotes(updatedNotesArr);                               // update the notes array
  };

  const getActiveNote = () => {                             // function to get the currently active note
    return notes.find(({ id }) => id === activeNote);       // find the note with the same ID as the activeNote state
  };

  const [sidebarVisible, setSidebarVisible] = useState(true);     // create state for whether the sidebar is visible, initialize it as true
  const toggleSidebar = () => {                                   // function to toggle the sidebar visibility
    setSidebarVisible(!sidebarVisible);                           // toggle the sidebarVisible state
  };

  return (
    <div className="App"> 
      <div className = "head"> 
        <button onClick={toggleSidebar}>&#9776;</button>
        <div>
        <h1>Lotion</h1>
        <p>Like Notion, but worse.</p>
      </div>
      </div>
      {sidebarVisible && (// conditionally render Sidebar component if sidebarVisible state is true
        <Sidebar
          notes={notes}
          onAddNote={onAddNote}
          activeNote={activeNote}
          setActiveNote={setActiveNote}
        />
      )}
      <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} onDeleteNote = {onDeleteNote} />
      </div>
  );
}

export default App;
