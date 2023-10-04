import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button, TextField, MenuItem, Grid, Container, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';

function EditTask() {
    const history = useHistory();
    const{ id } = useParams();
    console.log("Received ID:", id);
    const dispatch = useDispatch();

    const [ editedTask, setEditedTask] = useState({
      id: id,  
      taskname: '',
        dateadded: '',
        duedate: '',
        prioritylevel: '',
        notes: '',
       
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

    const handleSave = (event) => {
      event.preventDefault();
      console.log('Edited Task Payload:', editedTask);
      dispatch({
          type: 'EDIT_TASK',
          payload: editedTask, 
      });
      history.push('/my_tasks');
  }
  

    const goBack = () => {
        history.goBack();
    }
    const handleEditSubmit = (event) => {
        event.preventDefault();
        dispatch({
            type: 'EDIT_TASK',
            payload: editedTask,
            taskId: editedTask.taskId 
        });
        history.push('/my_tasks');
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h3"
               style={{
                fontFamily: "Georgia",
                fontStyle: "oblique",
                textDecoration: "underline",
                textShadow: '3px 1px 2px rgba(0, 0, 0, 0.3)',
  
                marginBottom: '20px', // Increased margin bottom for spacing
              }}> Edit Task </Typography>
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
                            type="button"
                            onClick={handleSave}
                            variant="contained"
                            style={{
                                backgroundColor: '#8ac34e',
                                fontSize: 20,
                                color: 'white',
                                textShadow: '5px 5px 7px rgba(5, 5, 5, 5)',
                                boxShadow: '5px 5px 10px rgba(3, 3, 3, 1)',
                                fontFamily: "Georgia",
                            }}> Save
                        </Button>
                        {/* <br/>
                        <br/> */}
                        <Button
                            onClick={goBack}
                            variant="contained" 
                            style={{ 
                                backgroundColor: 'red',
                                fontSize: 20,
                                color: 'white',
                                textShadow: '5px 5px 7px rgba(5, 5, 5, 5)',
                                boxShadow: '5px 5px 10px rgba(3, 3, 3, 1)',
                                fontFamily: "Georgia",
                                marginLeft: 50,


                        }}> Back
                        </Button>
                    </Grid>

                </Grid>
            </form>
        </Container>
    );
}

export default EditTask;

