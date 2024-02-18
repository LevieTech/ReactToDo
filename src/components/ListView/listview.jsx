import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Card, FormControl, MenuItem, Select, InputLabel } from '@mui/material';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from '@mui/icons-material/Check';


function ListView() {
    const dispatch = useDispatch();
    const history = useHistory();
    const tasks = useSelector(store => store.sortedTasks);
    const priorities = useSelector(store => store.priorities);


    useEffect(() => {
        dispatch({ type: 'FETCH_PRIORITIES' });
    }, []);

    const sortTasks = (id) => {
        dispatch({ type: 'FETCH_SORTED_TASKS', payload: id });
    }

    const dateConversion = (oldDate) => {
        const date = new Date(oldDate).toLocaleDateString('en-EN')
        return `${date}`
    }

    const statusConversion = (task) => {
        if (task.completionstatus === false) {
            return 'Incomplete'
        } else if (task.completionstatus === true) {
            return 'Complete'
        }
    }

    const colorizePriority = (task) => {
        if (task.level === 'High') {
            return '#c71212'
        } else if (task.level === 'Medium') {
            return '#eb7c1c'
        } else if (task.level === 'Low') {
            return '#72ab16'
        }
    }
    const changeColor = (task) => {
        if (task.completionstatus === true) {
            return '#d8ffb0'
        } else {
            return 'white'
        }
    }

    const handleDeleteTask = (id) => {
        dispatch({ type: "DELETE_TASK", payload: id });
        refreshPage();
    };

    const handleEditTask = (id) => {
        history.push(`/edit_task/${id}`)
    };

    const refreshPage = () => {
        setTimeout(() => {
            window.location.reload(false);
        }, 200);
    }

    const updateCompletion = (task) => {
        console.log('Check the task id', task.id);
        if (task.completionstatus === false) {
            dispatch({ type: 'SET_COMP_STATUS', payload: task.id });
        } else if (task.completionstatus === true) {
            dispatch({ type: 'SET_INCOMP_STATUS', payload: task.id });
        }
        refreshPage();
    }


    return (
        <main>
            <center>
                <div maxWidth="200px">
                    <h3>View your tasks by priority level, or all of your previously completed tasks!</h3>
                    <FormControl fullWidth>
                        <InputLabel>View Tasks</InputLabel>
                        <Select>
                            {priorities.map(priority => {
                                return (
                                    <div key={priority.id} className="Priority Check">
                                        <br />
                                        <MenuItem className="btn" onClick={() => sortTasks(priority.id)}>{priority.level}</MenuItem>
                                    </div>
                                )
                            })}
                        </Select>
                    </FormControl>


                    {
                        tasks.length === 0 ? (
                            <h4>There are no tasks to show, please select an option.</h4>
                        ) : (
                            tasks.map(task => {
                                return (
                                    <div key={task.id} style={{ width: '100%' }}>
                                        <br />
                                        <Card sx={{
                                            boxShadow: 9,
                                            maxWidth: '310px',
                                            fontSize: 18,
                                            backgroundColor: changeColor(task),
                                            outlineStyle: "groove",
                                            outlineWidth: 3,
                                        }}>
                                            <h2 style={{ textDecoration: "underline" }}> {task.taskname} </h2>
                                            <p>Date Added: {dateConversion(task.dateadded)}</p>
                                            <p>Due Date: {dateConversion(task.duedate)}</p>
                                            <p style={{ color: colorizePriority(task) }}>Priority: {task.level}</p>
                                            <p>Status: {statusConversion(task)}</p>
                                            <p>Notes: {task.notes}</p>
                                            <div className="buttons" style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                backgroundColor: "#e8eaed",
                                                outlineStyle: "groove",
                                            }}>
                                                <Button
                                                    onClick={() => handleDeleteTask(task.id)}
                                                    style={{
                                                        fontFamily: "Georgia",
                                                        color: "black",
                                                        fontWeight: "bold",
                                                        fontSize: "20px",
                                                        textShadow: "1px 1px 2px rgba(0, 0, 0, 0.8)",
                                                    }}
                                                >
                                                    <DeleteIcon style={{ color: "#4e3055" }} />
                                                </Button>
                                                <Button
                                                    onClick={() => handleEditTask(task.id)}
                                                    style={{
                                                        fontFamily: "Georgia",
                                                        color: "black",
                                                        fontWeight: "bolder",
                                                        fontSize: "20px",
                                                        textShadow: "1px 1px 2px rgba(0, 0, 0, 0.8)",
                                                    }}
                                                >
                                                    <EditIcon sx={{ color: "#4e3055" }} />
                                                </Button>
                                                <Button onClick={() => updateCompletion(task)} style={{ color: 'black' }}><CheckIcon /></Button>
                                            </div>
                                        </Card>

                                    </div>
                                )
                            }
                            )
                        )}
                </div>
            </center>
        </main>
    )
}

export default ListView;