// src/Components/CrewmateForm.jsx
import React, { useState, useEffect } from 'react';

function CrewmateForm({ addCrewmate, editCrewmate, updateCrewmate, setEditCrewmate }) {
  const [name, setName] = useState('');
  const [attribute, setAttribute] = useState('strength');

  useEffect(() => {
    if (editCrewmate) {
      setName(editCrewmate.name);
      setAttribute(editCrewmate.attribute);
    }
  }, [editCrewmate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editCrewmate) {
      updateCrewmate(editCrewmate.id, name, attribute);
      setEditCrewmate(null);
    } else {
      addCrewmate(name, attribute);
    }
    setName('');
    setAttribute('strength');
  };

  return (
    <form onSubmit={handleSubmit} className="crewmate-form">
      <input
        type="text"
        placeholder="Crewmate Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="name-input"
      />
      <div className="attribute-buttons">
        <button
          type="button"
          className={`attribute-btn ${attribute === 'strength' ? 'selected' : ''}`}
          onClick={() => setAttribute('strength')}
        >
          Strength
        </button>
        <button
          type="button"
          className={`attribute-btn ${attribute === 'speed' ? 'selected' : ''}`}
          onClick={() => setAttribute('speed')}
        >
          Speed
        </button>
        <button
          type="button"
          className={`attribute-btn ${attribute === 'intelligence' ? 'selected' : ''}`}
          onClick={() => setAttribute('intelligence')}
        >
          Intelligence
        </button>
      </div>
      <div className="form-buttons">
        <button type="submit" className="submit-btn">
          {editCrewmate ? 'Update' : 'Add'} Crewmate
        </button>
        {editCrewmate && (
          <button type="button" className="cancel-btn" onClick={() => setEditCrewmate(null)}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default CrewmateForm;
