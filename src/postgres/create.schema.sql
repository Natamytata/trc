CREATE TABLE feedback(
    id serial PRIMARY KEY,
    email TEXT NOT NULL,
    feedback TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
)