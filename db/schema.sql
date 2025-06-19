DROP DATABASE IF EXISTS fullstack_employees;
CREATE DATABASE fullstack_employees;

\c fullstack_employees;

DROP TABLE IF EXISTS employees;

CREATE TABLE employees(
    id serial PRIMARY KEY,
    name text NOT NULL,
    birthday DATE NOT NULL,
    salary INTEGER NOT NULL
);

