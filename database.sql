-- CREATE DATABASE "react-to-do"

-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "access_level" INT DEFAULT 0
);

-- (task name, date added, due date, priority level, notes, completion status )

CREATE TABLE tasklist (
    "id" serial PRIMARY KEY,
    "taskname" VARCHAR (400) NOT NULL,
    "dateadded" VARCHAR (50),
    "duedate" VARCHAR (50),
    "completionstatus" BOOLEAN DEFAULT FALSE
    "prioritylevel" VARCHAR (10)
    "notes" VARCHAR (2000)
);

-- need to add sample data and sample alert messages 