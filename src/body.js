import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams } from "react-router-dom";

const Main = ({ activeNote, onUpdateNote, onDeleteNote }) => {
  const [editMode, setEditMode] = useState(true);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [lastModified, setLastModified] = useState(Date.now());

  useEffect(() => {
    setTitle((activeNote || {}).title || '');
    setBody((activeNote || {}).body || '');
    setLastModified((activeNote || {}).lastModified || Date.now());
  }, [activeNote]);

  const onEditField = (field, value) => {
    if (editMode) {
      if (field === 'title') {
        setTitle(value);
      } else if (field === 'body') {
        setBody(value);
      }
    }
  };

  const handleSaveClick = () => {
    onUpdateNote({
      ...(activeNote || {}),
      title,
      body,
      lastModified,
    });
    setEditMode(false);
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCalendarChange = (e) => {
    const date = new Date(e.target.value);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    setLastModified(new Date(year, month, day, hour, minute).toISOString());
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
          value={title}
          onChange={(e) => onEditField('title', e.target.value)}
          autoFocus
          disabled={!editMode}
        />
        <div className="note-meta">
          {editMode ? (
            <span class="time">
              <input
                type="datetime-local"
                value={new Date(lastModified).toISOString().slice(0, -8)}
                onChange={handleCalendarChange}
                disabled={!editMode}
              />
            </span>
          ) : (
            <span class="time">
              Last Modified:{' '}
              {new Date(lastModified).toLocaleDateString('en-GB', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          )}
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
        <div className="note-editor">
          <ReactQuill value={body} onChange={(value) => onEditField('body', value)} />
        </div>
      ) : (
        <div className="note-viewer">
          <ReactQuill value={body} readOnly />
        </div>
      )}
    </div>
  );
};

export default Main;
