import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import CrewmateForm from './Components/CrewmateForm';
import './App.css'

// Initialize Supabase client
const supabase = createClient(
  import.meta.env.supaseUrl,
  import.meta.env.supabaseKey
);

function App() {
  const [crewmates, setCrewmates] = useState([]);
  const [editCrewmate, setEditCrewmate] = useState(null);

  // Fetch all crewmates from Supabase
  useEffect(() => {
    fetchCrewmates();
  }, []);

  const fetchCrewmates = async () => {
    const { data, error } = await supabase.from('crewmates').select('*');
    if (error) console.error("Error fetching crewmates:", error);
    else setCrewmates(data);
  };

  const addCrewmate = async (name, attribute) => {
    const { data, error } = await supabase
      .from('crewmates')
      .insert([{ name, attribute }]);
    if (error) console.error("Error adding crewmate:", error);
    else fetchCrewmates();
  };

  const updateCrewmate = async (id, name, attribute) => {
    const { data, error } = await supabase
      .from('crewmates')
      .update({ name, attribute })
      .eq('id', id);
    if (error) console.error("Error updating crewmate:", error);
    else fetchCrewmates();
  };

  const deleteCrewmate = async (id) => {
    const { error } = await supabase.from('crewmates').delete().eq('id', id);
    if (error) console.error("Error deleting crewmate:", error);
    else fetchCrewmates();
  };

  return (
    <div className="App">
      <h1>Among Us Crewmate Manager</h1>
      <CrewmateForm 
        addCrewmate={addCrewmate} 
        editCrewmate={editCrewmate} 
        updateCrewmate={updateCrewmate}
        setEditCrewmate={setEditCrewmate}
      />
      <h2>Crewmate List</h2>
      <ul>
        {crewmates.map(crewmate => (
          <li key={crewmate.id}>
            {crewmate.name} - {crewmate.attribute}
            <button onClick={() => setEditCrewmate(crewmate)}>Edit</button>
            <button onClick={() => deleteCrewmate(crewmate.id)}>Delete</button>
            <a href={`/crewmate/${crewmate.id}`}>View Details</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
