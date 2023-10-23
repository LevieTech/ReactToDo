CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "access_level" INT DEFAULT 0
);

-- (task name, date added, due date, priority level, notes, completion status )
CREATE TABLE tasklist (
    "id" serial PRIMARY KEY,
    "user_id" INT REFERENCES users,
    "taskname" VARCHAR (400) NOT NULL,
    "dateadded" VARCHAR (50),
    "duedate" VARCHAR (50),
	"prioritylvl" INT REFERENCES priority,
    "completionstatus" BOOLEAN DEFAULT FALSE,
    "notes" VARCHAR (2000)
);

CREATE TABLE priority (
	"id" SERIAL PRIMARY KEY,
	"level" VARCHAR (2000)
);

INSERT INTO priority ("level") VALUES ('Low'), ('Medium'), ('High');


INSERT INTO "tasklist" ("user_id", "taskname", "dateadded", "duedate", "prioritylvl", "completionstatus", "notes")
VALUES 
('1', 'Schedule appointment', '2023-07-19', '2023-08-12', 2, FALSE, 'Try to get an appointment after lunch'),
('1', 'Call Grandma', '2023-07-26', '2023-08-01', 3, FALSE, 'She has been waiting for me to call'),
('1', 'Drop off returns', '2023-08-02', '2023-09-25', 1, FALSE, 'Make sure you bring the receipt'),
('1', 'Order new product', '2023-08-13', '2023-08-25', 2, TRUE, 'Order before it sells out!'),
('1', 'Do laundry', '2023-08-20', '2023-08-23', 3, TRUE, 'Separate colors');

