import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/contacts";

function App() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const fetchContacts = async () => {
    try {
      const res = await axios.get(API);
      setContacts(res.data);
    } catch (err) {
      console.error("FETCH ERROR:", err.message);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API, form);
      setForm({ name: "", email: "", phone: "" });
      fetchContacts();
    } catch (err) {
      console.error("POST ERROR:", err.message);
    }
  };

  const deleteContact = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      fetchContacts();
    } catch (err) {
      console.error("DELETE ERROR:", err.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Contact Manager</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <input
          placeholder="Phone"
          value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })}
        />

        <button type="submit">Add</button>
      </form>

      <ul>
        {contacts.map(c => (
          <li key={c._id}>
            {c.name} - {c.email} - {c.phone}
            <button onClick={() => deleteContact(c._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;