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
        } else if (task.level === 'Low'){
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
                    {/* This needs to have some refinement added. I think this will loop through all tasks in the DB and create a Sort button for each task
                        Not each priority level */}
                    {priorities.map(priority => {
                        return (
                            <div key={priority.id} className="Priority Check">
                                <button onClick={() => sortTasks(priority.id)}>Sort By Priority: {priority.level}</button>
                            </div>
                        )
                    })}
                    {tasks.map(task => {
                        return (
                            <div key={task.id}>
                                <br />
                                <Card sx={{
                                    boxShadow: 9,
                                    maxWidth: '310px',
                                    maxHeight: 'fit-content',
                                    backgroundColor: changeColor(task),
                                    outlineStyle: "groove",
                                    outlineWidth: 3,
                                }}>
                                    <h2>{task.taskname}</h2>
                                    Date Added:<h3>{dateConversion(task.dateadded)}</h3>
                                    
                                    Date Due:<h3>{dateConversion(task.duedate)}</h3>
                                    
                                    <h4 style={{ color: colorizePriority(task) }}>{task.level}</h4>
                                    Status:<h4>{statusConversion(task)}</h4>
                                    
                                    Notes:
                                    <p>{task.notes}</p>
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