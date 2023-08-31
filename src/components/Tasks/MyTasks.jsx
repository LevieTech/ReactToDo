import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route } from 'react-router-dom';
import { Button } from "@mui/material";
import EachTask from "../Tasks/EachTask";
import AddTask from "./AddTask";

function MyTasks() {
    const dispatch = useDispatch();
    const { task } = useSelector(store => store.task);
    const user = useSelector(store => store.user);

    useEffect(() => {
        dispatch({ type: "FETCH_TASK" });
    }, [dispatch, user.id]);

    const handleDeleteTask = (event, taskID) => {
        event.preventDefault();
        dispatch({ type: "DELETE_TASK", payload: { user, taskID } });
    };

    const handleEditTask = (event, editedTask, index) => {
        event.preventDefault();
        dispatch({ type: "EDIT_TASK", payload: { task: editedTask, index } });
    };

    if (!task) {
        return (
            <div>
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
                <p>No tasks to show...yet!</p>
            </div>
        );
    }

    return (
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

            {task.length === 0 ? (
                <p>No saved tasks to show...yet!</p>
            ) : (
                task.map((task, i) => (
                    <EachTask
                        key={i}
                        task={{
                            id: task.id,
                            taskname: task.taskname,
                            dateadded: task.dateadded,
                            prioritylevel: task.prioritylevel,
                            completionstatus: task.completionstatus,
                        }}
                        handleEditTask={handleEditTask}
                        handleDeleteTask={() => handleDeleteTask(null, task.id)}
                        savedTasks={task}
                        style={{
                            fontFamily: "Georgia",
                            fontWeight: "bolder",
                            textShadow: '4px 1px 2px rgba(0, 0, 0, 0.8)',
                            fontSize: '30px',
                        }}
                    />
                ))
            )}

            <Route path="/add_task/:taskId" component={AddTask} />
        </div>
    );
}

export default MyTasks;
