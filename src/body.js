import ReactMarkdown from "react-markdown";

const Main = ({ activeNote, onUpdateNote, onDeleteNote }) => {
  const onEditField = (field, value) => {
    onUpdateNote({
      ...activeNote,
      [field]: value,
      lastModified: Date.now(),
    });
  };

  if (!activeNote) return <div className="no-active-note">No Active Note</div>;

  const handleDeleteClick = () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
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
          onChange={(e) => onEditField("title", e.target.value)}
          autoFocus
        />
        <div className="note-meta">
          <span>
            Last Modified:{" "}
            {new Date(activeNote.lastModified).toLocaleDateString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
        <div className="note-buttons">
          <button>Save</button>
          <button class = "delete-button" onlick = {handleDeleteClick}>Delete</button>
        </div>
      </div>
      <div class = "text-editing">
        <button>Bold</button>
      </div>
      <div className="app-main-note-edit">
        <textarea
          id="body"
          placeholder="Write your note here..."
          value={activeNote.body}
          onChange={(e) => onEditField("body", e.target.value)}
        />
      </div>
      <div className="app-main-note-preview">
        <h1 className="preview-title">{activeNote.title}</h1>
        <ReactMarkdown className="markdown-preview">
          {activeNote.body}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Main;
