import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Card } from '@mui/material';


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

    return (
        <main>
            <center>
                <div>
                    {priorities.map(priority => {
                        return (
                            <div key={priority.id} className="Priority Check">
                                <br />
                                <button className="btn" onClick={() => sortTasks(priority.id)}>View By Priority: {priority.level}</button>
                            </div>
                        )
                    })}
                    {tasks.map(task => {
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
                                </Card>
                            </div>
                        )
                    })}
                </div>
            </center>
        </main>
    )
}

export default ListView;