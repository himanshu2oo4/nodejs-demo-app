CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  done BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
INSERT INTO tasks (title) VALUES ('Containerize the app'), ('Set up CI/CD pipeline'), ('Deploy to Kubernetes');
