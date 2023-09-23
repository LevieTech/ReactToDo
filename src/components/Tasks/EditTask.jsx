import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button, TextField, MenuItem, Grid, Container, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';

function EditTask() {
    const history = useHistory();
    const  id  = useParams();
    const dispatch = useDispatch();

    const [editedTask, setEditedTask] = useState({
        taskname: '',
        dateadded: '',
        duedate: '',
        prioritylevel: '',
        completionstatus: false,
        notes: '',
        taskId: id,
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === "completionstatus") {
            setEditedTask(prevState => ({
                ...prevState,
                [name]: value === "true" // convert the string to boolean
            }));
        } else {
            setEditedTask(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const goBack = () => {
        history.goBack();
    }


  const handleEditTask = (id) => {
    event.preventDefault();
    dispatch({ type: "EDITED_TASKS", payload: id });
  };

    const handleEditSubmit = () => {
        dispatch({
            type: 'EDIT_THIS_TASK',
            payload: editedTask,
        });
        history.push('/my_tasks');
    };

    return (
        <Container>
            <Typography variant="h3">Edit Task</Typography>
            <form onSubmit={handleEditSubmit}>
                <Grid container spacing={2}>

                    <Grid item xs={12}>
                        <TextField
                            label="Task Name"
                            name="taskname"
                            value={editedTask.taskname}
                            onChange={handleInputChange}
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
                                    fontWeight: 'bolder',
                                    fontSize: '25px',
                                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)'
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            label="Start Date"
                            type="date"
                            name="dateadded"
                            value={editedTask.dateadded}
                            onChange={handleInputChange}
                            required
                            fullWidth
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
                                    fontWeight: 'bolder',
                                    fontSize: '25px',
                                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)'
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            label="Due Date"
                            type="date"
                            name="duedate"
                            value={editedTask.duedate}
                            onChange={handleInputChange}
                            required
                            fullWidth
                            style={{ fontFamily: "Georgia" }}
                            InputProps={{
                                shrink: true,
                                style: {
                                    color: 'black',
                                    fontFamily: "Georgia"
                                },
                            }}
                            InputLabelProps={{
                                shrink: true,
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
                            label="Priority Level"
                            select
                            name="prioritylevel"
                            value={editedTask.prioritylevel}
                            onChange={handleInputChange}
                            required
                            fullWidth
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
                                    fontWeight: 'bolder',
                                    fontSize: '25px',
                                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)'
                                },
                            }}
                        >
                            <MenuItem value="high">High</MenuItem>
                            <MenuItem value="medium">Medium</MenuItem>
                            <MenuItem value="low">Low</MenuItem>
                        </TextField>
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            label="Completion Status"
                            select
                            name="completionstatus"
                            value={editedTask.completionstatus.toString()}
                            onChange={handleInputChange}
                            required
                            fullWidth
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
                                    fontWeight: 'bolder',
                                    fontSize: '25px',
                                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)'
                                },
                            }}
                        >
                            <MenuItem value="true">True</MenuItem>
                            <MenuItem value="false">False</MenuItem>
                        </TextField>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            label="Notes"
                            multiline
                            name="notes"
                            value={editedTask.notes}
                            onChange={handleInputChange}
                            fullWidth
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
                                    fontWeight: 'bolder',
                                    fontSize: '25px',
                                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)'
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                        onClick={() => handleEditSubmit()}
                            type="submit"
                            variant="contained"
                            style={{
                                backgroundColor: '#8bc34ec9',
                                color: 'white',
                                textShadow: '1px 10px 20px rgba(5, 5, 5, 5)',
                                boxShadow: '10px 10px 10px rgba(3, 3, 3, 1)',
                                fontFamily: "Georgia",
                                float: "left"
                            }}
                        >
                            Save
                        </Button>
                        {/* <br/>
                        <br/> */}
                        <Button
                            onClick={goBack}
                            variant="contained" 
                            style={{ 
                                backgroundColor: '#8bc34ec9',
                                color: 'white',
                                textShadow: '1px 10px 20px rgba(5, 5, 5, 5)',
                                boxShadow: '10px 10px 10px rgba(3, 3, 3, 1)',
                                fontFamily: "Georgia",
                                float: "right",

                        }} >Back</Button>
                    </Grid>

                </Grid>
            </form>
        </Container>
    );
}

export default EditTask;




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
