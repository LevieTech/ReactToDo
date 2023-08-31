-- database name = react-to-do

CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "access_level" INT DEFAULT 0
);
-- register a user before proceeding

-- (task name, date added, due date, priority level, notes, completion status )
CREATE TABLE tasklist (
    "id" serial PRIMARY KEY,
    "user_id" INT REFERENCES users,
    "taskname" VARCHAR (400) NOT NULL,
    "dateadded" VARCHAR (50),
    "duedate" VARCHAR (50),
	"prioritylevel" VARCHAR (10),
    "completionstatus" BOOLEAN DEFAULT FALSE,
    "notes" VARCHAR (2000)
);

INSERT INTO "tasklist" ("id", "user_id", "taskname", "dateadded", "duedate", "prioritylevel", "completionstatus", "notes")

VALUES ('1', '1', 'Schedule appointment', '7/19/2023', '8/12/2023', 'medium', 'FALSE', 'Try to get an appointment after lunch'),
('2', '1', 'Call Grandma', '7/26/2023', '8/1/2023', 'high', 'FALSE', 'She has been waiting for me to call'),
('3', '1', 'Drop off returns', '8/2/2023', '9/25/2023', 'low', 'FALSE', 'Make sure you bring the receipt'),
('4', '1', 'Order new product', '8/13/2023', '8/25/2023', 'medium', 'TRUE', 'Order before it sells out!'),
('5', '1', 'Do laundrey', '8/20/2023', '8/23/2023', 'high', 'TRUE', 'Separate colors')
;

-- need to add sample alert messages and table









-- just changed a few things 
-- database name = react-to-do

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
    "dateadded" DATE,
    "duedate" DATE,
    "prioritylevel" VARCHAR (10),
    "completionstatus" BOOLEAN DEFAULT FALSE,
    "notes" VARCHAR (2000)
);


-- Insert a user with ID 1 in the "users" table
INSERT INTO "users" ("username", "password", "access_level") 
VALUES ('your_username', 'your_password', 0);


INSERT INTO "tasklist" ("user_id", "taskname", "dateadded", "duedate", "prioritylevel", "completionstatus", "notes")
VALUES 
('1', 'Schedule appointment', '2023-07-19', '2023-08-12', 'medium', FALSE, 'Try to get an appointment after lunch'),
('1', 'Call Grandma', '2023-07-26', '2023-08-01', 'high', FALSE, 'She has been waiting for me to call'),
('1', 'Drop off returns', '2023-08-02', '2023-09-25', 'low', FALSE, 'Make sure you bring the receipt'),
('1', 'Order new product', '2023-08-13', '2023-08-25', 'medium', TRUE, 'Order before it sells out!'),
('1', 'Do laundry', '2023-08-20', '2023-08-23', 'high', TRUE, 'Separate colors');
