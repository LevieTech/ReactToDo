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
    const [search, setSearch] = useState('');

    useEffect(() => {
        dispatch({ type: "FETCH_SAVED_TASKS" });
    }, []);

    if (!myTasks) {
        return (
            <div>
                <center>
                    <div className="newTaskBtn">
                        <Button
                            component={Link} to="/add_task"
                            className="newTaskBtn"
                        >Add a Task
                        </Button>
                    </div>
                    <div>
                        <h2 className="welcome">Welcome, {user.username} lets start!</h2>
                    </div>
                    <p>My Tasks:</p>
                </center>
            </div>
        );
    }

    return (
        <center>
            <div className="my-tasks-container">
                <br />
                <h2 className="solid">Welcome, {user.username}! </h2>
                <br />
                <div className="newTaskBtn">
                    <Button
                        component={Link} to="/add_task"
                        className="newTaskBtn"
                        variant="contained"
                        style={{
                            backgroundColor: '#8ac34e',
                            color: 'white',
                            fontFamily: "Georgia",
                            textShadow: '4px 1px 2px rgba(0, 0, 0, 0.8)',
                            fontSize: '23px',
                            fontWeight: 'bold',

                        }}
                    >Add New Task
                    </Button>
                </div>

                <br /> <br />
                <hr style={{
                    width: 800,
                    height: 3,
                    backgroundColor: "#4e3055"
                }} />

                <h2 className="saved"
                    style={{
                        fontFamily: "Georgia",
                        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8) 2px 2px 3px white',
                        fontSize: '40px',
                        fontWeight: 'bold',
                    }}
                >Current Tasks:</h2>

                {myTasks.length === 0 ? (
                    <p>No tasks to show...yet!</p>
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
                                    prioritylvl: task.prioritylvl,
                                    completionstatus: task.completionstatus,
                                    notes: task.notes,
                                }}
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