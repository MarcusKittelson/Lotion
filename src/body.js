import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Main = ({ activeNote, onUpdateNote, onDeleteNote }) => {
  const [editMode, setEditMode] = useState(true);

  const onEditField = (field, value) => {
    onUpdateNote({
      ...activeNote,
      [field]: value,
      lastModified: Date.now(),
    });
  };

  const handleSaveClick = () => {
    setEditMode(false);
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  if (!activeNote) return <div className="no-active-note">No Active Note</div>;

  const handleDeleteClick = () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      onDeleteNote(activeNote.id);
    }
  };

  return (
    <div className="app-main">
      <div className="note-header">
        <input
          type="text"
          id="title"
          placeholder="Note Title"
          value={activeNote.title}
          onChange={(e) => onEditField('title', e.target.value)}
          autoFocus
        />
        <div className= "note-meta">
          <span class = "time">
            Last Modified:{' '}
            {new Date(activeNote.lastModified).toLocaleDateString('en-GB', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>
        <div className="note-buttons">
          {editMode ? (
            <button onClick={handleSaveClick}>Save</button>
          ) : (
            <button onClick={handleEditClick}>Edit</button>
          )}
          <button className="delete-button" onClick={handleDeleteClick}>
            Delete
          </button>
        </div>
      </div>
      {editMode ? (
        <div className="app-main-note-edit">
          <ReactQuill
            value={activeNote.body}
            onChange={(value) => onEditField('body', value)}
          />
        </div>
      ) : (
        <div className="app-main-note-display">
          <div className="ql-editor" dangerouslySetInnerHTML={{ __html: activeNote.body }}></div>
        </div>
      )}
    </div>
  );
};

export default Main;
