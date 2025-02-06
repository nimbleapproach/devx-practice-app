-- CREATE DATABASE app_database; - Not needed with POSTGRES_DB stored in docker-compose.yaml

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(80) UNIQUE NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    password VARCHAR(164) NOT NULL
);

CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    amount FLOAT NOT NULL,
    description VARCHAR(200),
    FOREIGN KEY (user_id) REFERENCES users (id)
);