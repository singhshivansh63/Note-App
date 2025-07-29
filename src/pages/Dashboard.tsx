import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css'; // ✅ Import the external CSS

interface Note {
  _id: string;
  text: string;
}

function Dashboard() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [noteText, setNoteText] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/notes', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotes(res.data.notes);
      } catch (err) {
        console.error('Error fetching notes:', err);
      }
    };

    fetchNotes();
  }, [token]);

  const handleAddNote = async () => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/notes',
        { text: noteText },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setNotes([...notes, res.data.note]);
      setNoteText('');
    } catch (err) {
      console.error('Error adding note:', err);
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 200) {
        setNotes(notes.filter((note) => note._id !== id));
      }
    } catch (err) {
      console.error('Error deleting note:', err);
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Welcome to Notes</h2>
      <input
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        placeholder="Write note..."
        className="note-input"
      />
      <button onClick={handleAddNote} className="add-note-button">
        Add Note
      </button>
      <ul className="note-list">
        {notes.map((note) => (
          <li key={note._id} className="note-item">
            {note.text}
            <button
              onClick={() => handleDeleteNote(note._id)}
              className="delete-button"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;


