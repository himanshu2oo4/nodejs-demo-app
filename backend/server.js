const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 5432),
  user: process.env.DB_USER || 'appuser',
  password: process.env.DB_PASSWORD || 'changeme',
  database: process.env.DB_NAME || 'tasksdb',
});

// Liveness: process is up. Readiness: DB is reachable.
app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.get('/ready', async (_req, res) => {
  try { await pool.query('SELECT 1'); res.json({ status: 'ready' }); }
  catch (e) { res.status(503).json({ status: 'db-unavailable' }); }
});

app.get('/api/tasks', async (_req, res, next) => {
  try { const { rows } = await pool.query('SELECT * FROM tasks ORDER BY id'); res.json(rows); }
  catch (e) { next(e); }
});

app.post('/api/tasks', async (req, res, next) => {
  try {
    const title = (req.body.title || '').trim();
    if (!title) return res.status(400).json({ error: 'title required' });
    const { rows } = await pool.query('INSERT INTO tasks (title) VALUES ($1) RETURNING *', [title]);
    res.status(201).json(rows[0]);
  } catch (e) { next(e); }
});

app.put('/api/tasks/:id', async (req, res, next) => {
  try {
    const { rows } = await pool.query('UPDATE tasks SET done = NOT done WHERE id = $1 RETURNING *', [req.params.id]);
    rows[0] ? res.json(rows[0]) : res.status(404).json({ error: 'not found' });
  } catch (e) { next(e); }
});

app.delete('/api/tasks/:id', async (req, res, next) => {
  try { await pool.query('DELETE FROM tasks WHERE id = $1', [req.params.id]); res.status(204).end(); }
  catch (e) { next(e); }
});

app.use((err, _req, res, _next) => { console.error(err); res.status(500).json({ error: 'internal error' }); });

if (require.main === module) {
  const port = Number(process.env.PORT || 5000);
  const server = app.listen(port, () => console.log(`backend listening on ${port}`));
  process.on('SIGTERM', () => server.close(() => pool.end()));
}
module.exports = app;
