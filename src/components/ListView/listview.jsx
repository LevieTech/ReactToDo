import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Card } from '@mui/material';


function ListView() {
    const dispatch = useDispatch();
    const history = useHistory();
    const tasks = useSelector(store => store.savedTasks)

    console.log(tasks);

    useEffect(() => {
        dispatch({ type: 'FETCH_SAVED_TASKS' });
    }, []);

    // TODO FILTER STUFF BELOW
    const [taskFilter, setTaskFilter] = useState('');
    const [taskArray, setTaskArray] = useState([]);
    const [filteredTaskArray, setFilteredTaskArray] = useState([]);

    useEffect(() => {
        if (tasks.length > 0) {
            setTaskArray(tasks)
            setFilteredTaskArray(tasks)
        }
        console.log('First UseEffect', tasks)
    }, [])

    useEffect(() => {
        if (taskFilter !== '') {
            console.log('filled taskFilter', taskFilter)
            setFilteredTaskArray(taskArray.filter(task => task.prioritylevel === taskFilter))
            console.log('filtered task array', filteredTaskArray)
        } else {
            setTaskArray(tasks)
        }
        if (taskFilter === '') {
            setFilteredTaskArray(taskArray)
            console.log('taskFilter', taskFilter)
        } else {
            setTaskArray(tasks)
        }
    }, [taskFilter])

    const checkFilter = (task) => {
        setTaskFilter(task.prioritylevel)
    }

    const dateConversion = (oldDate) => {
        const date = new Date(oldDate).toLocaleDateString('en-EN')
        return `${date}`
    }

    const statusConversion = () => {
        if (tasks.completionstatus === false) {
            return 'Incomplete'
        } else if (tasks.completionstatus === true) {
            return 'Complete'
        }
    }

    return (
        <main>
            <center>
                {tasks.length === 0 ? (
                    <>
                        <div>
                            <h1>No new tasks!</h1>
                        </div>
                    </>
                ) : (
                    <div>
                        {tasks.map(task => {
                            return (
                                <div key={task.id} className="Priority Check">
                                    <button onClick={() => checkFilter(task)}>Sort By Priority</button>
                                </div>
                            )
                        })}
                        {filteredTaskArray.map(task => {
                            return (
                                <div>
                                    <br />
                                    <Card sx={{ maxWidth: '300px' }}>
                                        <h2>{task.taskname}</h2>
                                        <h3>{dateConversion(task.dateadded)}</h3>
                                        <h3>{dateConversion(task.duedate)}</h3>
                                        <h4>{task.prioritylevel}</h4>
                                        <h4>{statusConversion(task.completionstatus)}</h4>
                                        <p>{task.notes}</p>
                                    </Card>
                                </div>
                            )
                        })}
                    </div>
                )}
            </center>


        </main>
    )
}

export default ListView;