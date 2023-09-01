import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';


function ListView() {
    const dispatch = useDispatch();
    const history = useHistory();
    const tasks = useSelector(store => store.taskList)

    console.log(tasks);

    useEffect(() => {
        dispatch({ type: 'FETCH_TASKS'});
    }, []);

    return (
        <main>
            {tasks.length === 0 ? (
                <>
                <div>
                <h1>No new tasks!</h1>
                </div>
                </>
            ) : (
                <div key={tasks.id}>
                    {tasks.map(task => {
                        return (
                            <div>
                                <h2>{task.taskname}</h2>
                                <h3>{task.dateadded}</h3>
                                <h3>{task.duedate}</h3>
                                <h5>{task.prioritylevel}</h5>
                                <h5>{task.completionstatus}</h5>
                                <p>{task.notes}</p>
                            </div>
                        )
                    })}
                </div>
            )}
        
        </main>
    )
}

export default ListView;