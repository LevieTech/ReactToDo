import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route } from 'react-router-dom';
import { Button } from "@mui/material";
import EachTask from "../Tasks/EachTask";
import AddTask from "./AddTask";
import EditTask from "./EditTask";


function MyTasks() {
    const dispatch = useDispatch();
    const myTasks = useSelector(store => store.savedTasks);
    const user = useSelector(store => store.user);
    const [ search, setSearch] = useState('');

    useEffect(() => {
        dispatch({ type: "FETCH_SAVED_TASKS" });
    }, []);

    console.log('Check for tasks', myTasks);


    if (!myTasks) {
        return (
            <div>
                <center>
                    <Button
                        component={Link} to="/add_task"
                        className="addtaskbutton"
                        variant="contained"
                        style={{
                            backgroundColor: 'hsl(94, 82%, 60%)',
                            color: 'white',
                            fontFamily: "Georgia",
                            textShadow: '4px 1px 2px rgba(0, 0, 0, 0.8)',
                            fontSize: '23px',
                            fontWeight: 'bold',
                        }}
                    >Add a Task
                    </Button>
                    <h2 className="welcome">Welcome, {user.username} lets start!</h2>
                    <p>My Tasks:</p>
                </center>
            </div>
        );
    }

    return (
        <center>
            <div className="my-tasks-container">
                <h2 className="solid">Hey {user.username}! Lets Get Started!</h2>
                <Button
                    component={Link} to="/add_task"
                    className="addtaskbutton"
                    variant="contained"
                    style={{
                        backgroundColor: 'hsl(94, 82%, 60%)',
                        color: 'white',
                        fontFamily: "Georgia",
                        textShadow: '4px 1px 2px rgba(0, 0, 0, 0.8)',
                        fontSize: '23px',
                        fontWeight: 'bold',
                    }}
                >Add a Task
                </Button>

                <h2 className="saved"
                    style={{
                        fontFamily: "Georgia",
                        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8) 2px 2px 3px white',
                        fontSize: '40px',
                        fontWeight: 'bold',
                    }}
                >Saved Tasks:</h2>

                {myTasks.length === 0 ? (
                    <p>No saved tasks to show...yet!</p>
                ) : (
                    myTasks.map((task, i) => {
                        return (
                             <EachTask
                            key={i}
                            task={{
                                id: task.id,
                                taskname: task.taskname,
                                dateadded: task.dateadded,
                                duedate: task.duedate,
                                prioritylevel: task.prioritylevel,
                                completionstatus: task.completionstatus,
                                notes: task.notes,
                            }}
                            // handleEditTask={handleEditTask}
                            // handleDeleteTask={(event) => handleDeleteTask(task.id)}
                            // savedTasks={task}
                            style={{
                                fontFamily: "Georgia",
                                fontWeight: "bolder",
                                textShadow: '4px 1px 2px rgba(0, 0, 0, 0.8)',
                                fontSize: '30px',
                            }}
                        />
                        )
                       
                        })
                )}

                <Route path="/add_task/:taskId" component={AddTask} />
            </div>
        </center>
    );
}

export default MyTasks;
