import { useEffect, useState } from 'react';
import { getTasks, addTask, toggleTask, deleteTask } from './api.js';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const run = async (fn) => {
    try {
      setError('');
      await fn();
      setTasks(await getTasks());
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { run(async () => {}); }, []);

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    run(() => addTask(title.trim()));
    setTitle('');
  };

  const visible = tasks.filter((t) =>
    filter === 'all' ? true : filter === 'done' ? t.done : !t.done
  );
  const doneCount = tasks.filter((t) => t.done).length;

  return (
    <main className="card">
      <h1>DevOps Task Tracker</h1>
      <p className="sub">React + Node/Express + PostgreSQL</p>

      <form onSubmit={submit}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Add a new task..." />
        <button type="submit">Add</button>
      </form>

      <div className="filters">
        {['all', 'open', 'done'].map((f) => (
          <button key={f} className={filter === f ? 'active' : ''} onClick={() => setFilter(f)}>
            {f}
          </button>
        ))}
        <span className="count">{doneCount}/{tasks.length} done</span>
      </div>

      {error && <div className="error">{error}</div>}
      {loading && <p>Loading...</p>}

      <ul>
        {visible.map((t) => (
          <li key={t.id} className={t.done ? 'done' : ''}>
            <span onClick={() => run(() => toggleTask(t.id))}>{t.title}</span>
            <button className="del" onClick={() => run(() => deleteTask(t.id))}>Delete</button>
          </li>
        ))}
        {!loading && visible.length === 0 && <li className="empty">No tasks here.</li>}
      </ul>
    </main>
  );
}
