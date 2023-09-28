import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextField, Typography, Container, Grid } from '@mui/material';
import { MenuItem } from '@mui/material';

function EditTask() {
  const tasks = useSelector(store => store.tasks) || [];
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);
  const [notification, setNotification] = useState(null);
  const [taskname, setTaskName] = useState('');
  const [dateadded, setDateAdded] = useState('');
  const [duedate, setDueDate] = useState('');
  const [prioritylevel, setPriorityLevel] = useState('');
  const [notes, setNotes] = useState('');
  const priorities = useSelector(store => store.priorities);

  console.log('Check priorities AddTask', priorities)

  // stores input values into the held states
  const changeTaskName = (event) => {
    console.log('changeTaskName called with value:', event.target.value);
    setTaskName(event.target.value);
  };
  const changeDateAdded = (event) => {
    console.log('changeDateAdded called with value:', event.target.value);
    setDateAdded(event.target.value);
  };
  const changeDueDate = (event) => {
    console.log('changeDueDate called with value:', event.target.value);

    setDueDate(event.target.value);
  };

  const changePriorityLevel = (event) => {
    console.log('changePriorityLevel called with value:', event.target.value);

    setPriorityLevel(event.target.value);
  };

  const changeNotes = (event) => {
    console.log('changeNotes called with value:', event.target.value);
    setNotes(event.target.value);
  };

  useEffect(() => {
    console.log('useEffect called');
    dispatch({ type: 'FETCH_PRIORITIES' });
  }, []);

  const refreshPage = () => {
    setTimeout(() => {
      window.location.reload(false);
    }, 10);
  }

  const handleSave = (event) => {
    event.preventDefault();

    if (!user || !user.id) {
      setNotification("User information is missing. Please log in again or contact support.");
      return;
    }

    const taskData = {
      userId: user.id,
      taskname,
      dateadded,
      duedate,
      prioritylevel,
      notes,
    };

    console.log('handleSave called with taskData:', taskData);

    dispatch({
        type: 'EDIT_THIS_TASK', 
        payload: { id: taskData, taskname, dateadded, duedate, prioritylevel, notes },  // Include the task ID in the payload
      });
    history.push('/my_tasks');
};



  const goBack = () => { history.goBack() };


  return (
    <div className="edittask">
      <Container maxWidth="md">
        <br /> <br />
        <div className="header">
          <Typography
            variant="h3"
            style={{
              fontFamily: "Georgia",
              fontStyle: "oblique",
              textDecoration: "underline",
              textShadow: '3px 1px 2px rgba(0, 0, 0, 0.3)',

              marginBottom: '20px', // Increased margin bottom for spacing
            }}
          >Edit Task
          </Typography>
          <br />
        </div>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                className="input-field input-border"
                label="Task Name"
                value={taskname}
                onChange={changeTaskName}
                fullWidth
                required
                style={{ fontFamily: "Georgia" }}
                InputProps={{
                  style: {
                    color: 'black',
                    fontFamily: "Georgia"
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: 'black',
                    fontFamily: "Georgia",
                    fontWeight: 'bold',
                    fontSize: '25px',
                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)'
                  },
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                className="input-field date-input input-border"
                label="Start Date"
                type="date"
                value={dateadded}
                onChange={changeDateAdded}
                required
                fullWidth
                margin="normal"
                InputProps={{
                  shrink: true,
                  style: {
                    color: 'black',
                    fontFamily: "Georgia",

                  },
                }}
                InputLabelProps={{
                  shrink: "true",
                  style: {
                    color: 'black',
                    fontFamily: "Georgia",
                    fontWeight: 'bolder',
                    fontSize: '25px',
                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)'
                  },
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                className="input-field date-input input border"
                label="Due Date"
                type="date"
                value={duedate}
                onChange={changeDueDate}
                required
                fullWidth
                style={{ fontFamily: "Georgia" }}
                InputProps={{
                  shrink: true,
                  style: {
                    color: 'black',
                    fontFamily: "Georgia",

                  },
                }}
                InputLabelProps={{
                  shrink: "true",
                  style: {
                    color: 'black',
                    fontFamily: "Georgia",
                    fontWeight: 'bolder',
                    fontSize: '25px',
                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)'
                  },
                }}
                margin="normal"
              />
            </Grid >

            <Grid item xs={6}>
            <TextField
    className="input-field date-input input-border"
    label="Priority Level"
    select
    value={prioritylevel}
    onChange={changePriorityLevel}
    required
    fullWidth
    style={{ fontFamily: "Georgia" }}
    InputProps={{
        style: {
            color: 'black',
            fontFamily: "Georgia",
        },
    }}
    InputLabelProps={{
        shrink: "true",
        style: {
            color: 'black',
            fontFamily: "Georgia",
            fontWeight: 'bolder',
            fontSize: '25px',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)'
        },
    }}
    margin="normal"
>
    {priorities.map((priority, index) => (
        <MenuItem key={index} value={priority.id}>{priority.level}</MenuItem>
    ))}
</TextField>




            </Grid>

            <Grid item xs={6}>
              <TextField
                className="input-field date-input input border"
                label="Notes"
                type="notes"
                value={notes}
                onChange={changeNotes}
                required
                fullWidth
                style={{ fontFamily: "Georgia" }}
                InputProps={{
                  shrink: true,
                  style: {
                    color: 'black',
                    fontFamily: "Georgia",

                  },
                }}
                InputLabelProps={{
                  shrink: "true",
                  style: {
                    color: 'black',
                    fontFamily: "Georgia",
                    fontWeight: 'bolder',
                    fontSize: '25px',
                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)'
                  },
                }}
                margin="normal"
              />
            </Grid >



          </Grid  >
          <br></br>
          <br></br>
          {notification && <div className="notification">{notification}</div>}

          <div className='bottomButtons'>
            <Button
              onClick={handleSave}
              type="submit"
              variant="contained"
              style={{
                backgroundColor: '#8ac34e',
                fontSize: 20,
                color: 'white',
                textShadow: '5px 5px 7px rgba(5, 5, 5, 5)',
                boxShadow: '5px 5px 10px rgba(3, 3, 3, 1)',
                fontFamily: "Georgia"
              }}>
              Save
            </Button>

            <Button
              onClick={goBack}
              variant="contained"
              style={{
                backgroundColor: 'red',
                fontSize: 20,
                color: 'white',
                marginLeft: 50,
                textShadow: '5px 5px 7px rgba(5, 5, 5, 5)',
                boxShadow: '5px 5px 10px rgba(3, 3, 3, 1)',
                fontFamily: "Georgia"
              }}>
              Back
            </Button>
          </div>
        </form>
      </Container>
      <div>
        {Array.isArray(tasks) && tasks.map(task => (
          <div key={task.id}>
            <p>{task.taskname}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default EditTask;


//!
// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useParams, Route, Link } from 'react-router-dom';
// import { Button, TextField, MenuItem, Grid, Container, Typography } from '@mui/material';
// import { useHistory } from 'react-router-dom';

// function EditTask() {
//     const history = useHistory();
//     const { id } = useParams();  
//     const dispatch = useDispatch();

//     const [editedTask, setEditedTask] = useState({
//         taskname: '',
//         dateadded: '',
//         duedate: '',
//         prioritylevel: '',
//         completionstatus: false,
//         notes: '',
//         id,
//     });

//     const handleInputChange = (event) => {
//         const { name, value } = event.target;
//         setEditedTask((prev) => ({ 
//             ...prev, 
//             [name]: name === 'completionstatus' ? value === 'true' : value 
//         }));
//     };

//     const goBack = () => {
//         history.goBack();
//     }


//   const handleEditTask = (id) => {
//     event.preventDefault();
//     dispatch({ type: "EDITED_TASKS", payload: id });
//   };

//   const handleEditSubmit = (e) => {
//     console.log('Event:', e); 
//     if(e) {
//         e.preventDefault();
//     } else {
//         console.error('Event object is undefined');
//     }
//     if (e) e.preventDefault(); // Check if e is defined and then prevent the default action
//     console.log('handleEditSubmit is called', e);
//     if (id) { // Check if id is defined
//         console.log('Dispatching with ID:', id);
//         dispatch({
//             type: 'EDIT_THIS_TASK',
//             payload: editedTask,  // Corrected this line to send the editedTask directly
//         });
//         history.push('/my_tasks');
//     } else {
//         console.error('Error: Task ID is undefined');
//     }
// };

  

// //     if (this.state.taskId) {
// //       this.props.dispatch({
// //         type: 'EDIT_THIS_TASK',
// //         payload: {
// //           id: this.state.taskId,  // Include the task ID here
// //           ...taskData
// //         }
// //       });
// //     } else {
// //       console.error('Error: Task ID is undefined');
// //     }
// console.log('Task ID from useParams:', id);   
// //   }
//     return (
//         <Container maxWidth="md">
//             <Typography variant="h3"
//                style={{
//                 fontFamily: "Georgia",
//                 fontStyle: "oblique",
//                 textDecoration: "underline",
//                 textShadow: '3px 1px 2px rgba(0, 0, 0, 0.3)',
  
//                 marginBottom: '20px', // Increased margin bottom for spacing
//               }}> Edit Task </Typography>
//             <form onSubmit={handleEditSubmit}>
//                 <Grid container spacing={2}>

//                     <Grid item xs={12}>
//                         <TextField
//                             label="Task Name"
//                             name="taskname"
//                             value={editedTask.taskname}
//                             onChange={handleInputChange}
//                             fullWidth
//                             required
//                             style={{ fontFamily: "Georgia" }}
//                             InputProps={{
//                                 style: {
//                                     color: 'black',
//                                     fontFamily: "Georgia"
//                                 },
//                             }}
//                             InputLabelProps={{
//                                 style: {
//                                     color: 'black',
//                                     fontFamily: "Georgia",
//                                     fontWeight: 'bolder',
//                                     fontSize: '25px',
//                                     textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)'
//                                 },
//                             }}
//                         />
//                     </Grid>

//                     <Grid item xs={6}>
//                         <TextField
//                             label="Start Date"
//                             type="date"
//                             name="dateadded"
//                             value={editedTask.dateadded}
//                             onChange={handleInputChange}
//                             required
//                             fullWidth
//                             InputProps={{
//                                 style: {
//                                     color: 'black',
//                                     fontFamily: "Georgia"
//                                 },
//                             }}
//                             InputLabelProps={{
//                                 style: {
//                                     color: 'black',
//                                     fontFamily: "Georgia",
//                                     fontWeight: 'bolder',
//                                     fontSize: '25px',
//                                     textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)'
//                                 },
//                             }}
//                         />
//                     </Grid>

//                     <Grid item xs={6}>
//                         <TextField
//                             label="Due Date"
//                             type="date"
//                             name="duedate"
//                             value={editedTask.duedate}
//                             onChange={handleInputChange}
//                             required
//                             fullWidth
//                             style={{ fontFamily: "Georgia" }}
//                             InputProps={{
//                                 shrink: true,
//                                 style: {
//                                     color: 'black',
//                                     fontFamily: "Georgia"
//                                 },
//                             }}
//                             InputLabelProps={{
//                                 shrink: true,
//                                 style: {
//                                     color: 'black',
//                                     fontFamily: "Georgia",
//                                     fontWeight: 'bolder',
//                                     fontSize: '25px',
//                                     textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)'
//                                 },
//                             }}
//                         />
//                     </Grid>

//                     <Grid item xs={6}>
//                         <TextField
//                             label="Priority Level"
//                             select
//                             name="prioritylevel"
//                             value={editedTask.prioritylevel}
//                             onChange={handleInputChange}
//                             required
//                             fullWidth
//                             style={{ fontFamily: "Georgia" }}
//                             InputProps={{
//                                 style: {
//                                     color: 'black',
//                                     fontFamily: "Georgia"
//                                 },
//                             }}
//                             InputLabelProps={{
//                                 style: {
//                                     color: 'black',
//                                     fontFamily: "Georgia",
//                                     fontWeight: 'bolder',
//                                     fontSize: '25px',
//                                     textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)'
//                                 },
//                             }}
//                         >
//                             <MenuItem value="high">High</MenuItem>
//                             <MenuItem value="medium">Medium</MenuItem>
//                             <MenuItem value="low">Low</MenuItem>
//                         </TextField>
//                     </Grid>

//                     <Grid item xs={6}>
//                         <TextField
//                             label="Completed"
//                             select
//                             name="completionstatus"
//                             value={editedTask.completionstatus.toString()}
//                             onChange={handleInputChange}
//                             required
//                             fullWidth
//                             style={{ fontFamily: "Georgia" }}
//                             InputProps={{
//                                 style: {
//                                     color: 'black',
//                                     fontFamily: "Georgia"
//                                 },
//                             }}
//                             InputLabelProps={{
//                                 style: {
//                                     color: 'black',
//                                     fontFamily: "Georgia",
//                                     fontWeight: 'bolder',
//                                     fontSize: '25px',
//                                     textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)'
//                                 },
//                             }}
//                         >
//                             <MenuItem value="true">True</MenuItem>
//                             <MenuItem value="false">False</MenuItem>
//                         </TextField>
//                     </Grid>

//                     <Grid item xs={12}>
//                         <TextField
//                             label="Notes"
//                             multiline
//                             name="notes"
//                             value={editedTask.notes}
//                             onChange={handleInputChange}
//                             fullWidth
//                             style={{ fontFamily: "Georgia" }}
//                             InputProps={{
//                                 style: {
//                                     color: 'black',
//                                     fontFamily: "Georgia"
//                                 },
//                             }}
//                             InputLabelProps={{
//                                 style: {
//                                     color: 'black',
//                                     fontFamily: "Georgia",
//                                     fontWeight: 'bolder',
//                                     fontSize: '25px',
//                                     textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)'
//                                 },
//                             }}
//                         />
//                     </Grid>
                    
//                     <Grid item xs={12}>
                    
//                         <Button
//                     onClick={(e) => handleEditSubmit(e)}  
                            
//                     type="submit"
//                             variant="contained"
//                             style={{
//                                 backgroundColor: '#8ac34e',
//                                 fontSize: 20,
//                                 color: 'white',
//                                 textShadow: '5px 5px 7px rgba(5, 5, 5, 5)',
//                                 boxShadow: '5px 5px 10px rgba(3, 3, 3, 1)',
//                                 fontFamily: "Georgia",
//                             }}> Save
//                         </Button>
//                         {/* <br/>
//                         <br/> */}
//                         <Button
//                             onClick={goBack}
//                             variant="contained" 
//                             style={{ 
//                                 backgroundColor: 'red',
//                                 fontSize: 20,
//                                 color: 'white',
//                                 textShadow: '5px 5px 7px rgba(5, 5, 5, 5)',
//                                 boxShadow: '5px 5px 10px rgba(3, 3, 3, 1)',
//                                 fontFamily: "Georgia",
//                                 marginLeft: 50,


//                         }}> Back
//                         </Button>
//                         <Route path="/edit-task/:id" component={EditTask} />
                       
//                         <Link to={`/edit-task/${id}`}>Edit Task</Link> {/* Fixed this line */}

//                     </Grid>

//                 </Grid>
//             </form>
//         </Container>
//     );
// }

// export default EditTask;


//!

// import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { useParams } from 'react-router-dom';


// function EditTask() {
  

//   const { taskId } = useParams();
//   const [editedTask, setEditedTask] = useState({
//     taskname: '',
//     dateadded: '',
//     duedate: '',
//     prioritylevel: '',
//     completionlevel: false,
//     notes: ''
   
//   });


//   const dispatch = useDispatch();

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     console.log(`Input ${name} changed to ${value}`);
//     setEditedTask(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleEditSubmit = (event) => {
//     console.log("Received event in handleEditTask:", event);
//     event.preventDefault();
//     console.log("handleEditSubmit triggered"); // Added log
//     console.log("Event type:", event.type); // Log the event type

//     if (event && event.preventDefault) {
//       event.preventDefault();
//     }else {
//       console.error("Event object or event.preventDefault missing!"); // Added error log
//     }

//     console.log('Submitting edited task:', editedTask);
//     dispatch({
//       type: 'EDIT_TASK',
//       payload: editedTask
//     });
    
//   };
//   //   // Dispatch the edit task action
//   //   console.log('Submitting edited task:', editedTask);
//   //   dispatch({
//   //     type: 'EDIT_TASK',
//   //     payload: editedTask
//   //   });
//   //   // Close the edit form after submitting the edit
//   //   onClose();
//   // };

//   return (
//     <div>
//       <h3>Edit Task</h3>
//       <form id="myForm" onSubmit={handleEditSubmit}>
//         <div>
//           <label>Task Name:</label>
//           <input
//             name="taskname"
//             value={editedTask.taskname}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div>
//           <label>Date Added:</label>
//           <input
//             type="date"
//             name="dateadded"
//             value={editedTask.dateadded}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div>
//           <label>Due Date:</label>
//           <input
//             type="date"
//             name="duedate"
//             value={editedTask.duedate}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div>
//           <label>Priority Level:</label>
//           <select
//             name="prioritylevel"
//             value={editedTask.prioritylevel}
//             onChange={handleInputChange}
//           >
//             <option value="low">Low</option>
//             <option value="medium">Medium</option>
//             <option value="high">High</option>
//           </select>
//         </div>
//         <div>
//           <label>Completion Status:</label>
//           <select
//             name="completionlevel"
//             value={editedTask.completionlevel}
//             onChange={handleInputChange}
//           >
//             <option value="true">True</option>
//             <option value="false">False</option>
           
//           </select>
//         </div>
//         <div>
//           <label>Notes:</label>
//           <select
//             name="notes"
//             value={editedTask.notes}
//             onChange={handleInputChange}
//           >
//             <option value=""></option>
           
//           </select>
//         </div>
//         {/* <button onClick={(event) => handleEditSubmit(event)}>Edit</button> */}

//         <button type="submit">Submit Edits</button>
//       </form>
//     </div>
//   );
// };

// export default EditTask;
