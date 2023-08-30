

import EachTask from "../Tasks/EachTask";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button } from "@mui/material";
import { Link, Route } from 'react-router-dom';
import AddTask from "./AddTask";
// import EditTask from "../Task/EditTask";
//import './Styles.css';



function MyTasks ({}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { userTask, savedTasks } = useSelector((store) => store.task);
    const user = useSelector((store) => store.user);
    // const categories = useSelector((state) => state.categories);

    useEffect(() => {
     dispatch({ type: "FETCH_TASK" });
     dispatch({ type: "GET_SAVED_TASKS", payload: user.id }); 
  }, [dispatch, user.id]);

  const handleDeleteTask = (taskID,event) => {
    event.preventDefault();
    dispatch({ type: "DELETE_TASK", payload: { user, taskID } });

  };

  
  const handleEditTask = (editedTask, index,event) => {
    event.preventDefault();
    dispatch({ type: "EDIT_TASK", payload: { task: editedTask, index } });
    history.push(`/edit_task/${editedTask.id}`);
  };

  
  if (!userTask) {
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
            fontSize: '23px', fontWeight: 'bold',
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
      <div 
      className="my-tasks-container"
      >
        <h2 className="solid"> {user.username} Lets Get Started!</h2>
        
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      <Button 
     
        component={Link} to="/add_task"
        className="addtaskbutton"
        variant="contained"
        style={{ 
        backgroundColor: 'hsl(94, 82%, 60%)', 
        color: 'white', 
        fontFamily: "Georgia", 
        textShadow: '4px 1px 2px rgba(0, 0, 0, 0.8)', 
        fontSize: '23px', fontWeight: 'bold',  }}
       
        >Add a Task
      </Button>

        <h2 className="saved"
         style={{ 
          fontFamily: "Georgia", textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)', 
          fontSize: '40px', 
          fontWeight: 'bold',  textShadow: "2px 2px 3px white"
        }}
        
        >Saved Tasks:</h2>
         {savedTasks.length === 0 ? (
        <p>No saved tasks to show...yet!</p>
          ) : (

            <>
            {savedTasks.map((task, i) => {
              const dateAdded = new Date(task.date_added);
              const dueDate = new Date(task.due_date);
        
              return (
                <EachTask
                  key={i}
                  task={{
                    id: task.id,
                    taskname: task.taskname,
                    dateadded: task.dateadded,
                    // dueDate: dueDate.toISOString(),
                    // priorityLevel: priorityLevel.toISOString(),
                     duedate: task.duedate,
                    prioritylevel: task.prioritylevel,
                    completionstatus: task.completionstatus,

                  }}
                  handleEditTask={handleEditTask}
                  handleDeleteTask={() => handleDeleteTask(task.id)}
                  savedTasks={savedTasks}
                  style={{
                    fontFamily: "Georgia",
                    fontWeight: "bolder",
                    textShadow: '4px 1px 2px rgba(0, 0, 0, 0.8)',
                    fontSize: '30px',
                  }}
                  
                />
              );
            })}
          </>
        )}

     <Route 
     path="/add_task/:taskId" 
    //  component={EditTask} 
      component={AddTask} 
     style={{ fontFamily: "Georgia" }}
     />

      </div>
      
    );
  }

export default MyTasks;