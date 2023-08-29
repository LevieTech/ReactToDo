import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextField, Typography, Container, Grid } from '@mui/material';


function AddTask() {
    const history = useHistory();
    const dispatch = useDispatch();
    const { user } = useSelector((store) => store);

    const [taskName, setTaskName] = useState('');
    const [dateAdded, setDateAdded] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priorityLevel, setPriorityLevel] = useState('');
    const [completionStatus, setCompletionStatus] = useState('');
    const [notes, setNotes] = useState('');
  
    // stores input values into the held states
    const changeTaskName= (event) => {
      setTaskName(event.target.value);
    };
    const changeDateAdded = (event) => {
      setDateAdded(event.target.value);
    };
    const changeDueDate = (event) => {
      setDueDate(event.target.value);
    };
    const changePriorityLevel = (event) => {
        setPriorityLevel(event.target.value);
      };
      const changecompletionStatus = (event) => {
        setCompletionStatus(event.target.value);
      };
      const changeNotes = (event) => {
        setNotes(event.target.value);
      };

    useEffect(() => {
      dispatch({ type: 'GET_SAVED_TASKS' });
    }, []);
  
    const handleSave = (event) => {
      event.preventDefault();
  
      const taskData = {
        userId: user.id,
        taskName,
        dateAdded,
        dueDate,
        priorityLevel,
        completionStatus,
        notes,
      };
  
      dispatch({
        type: 'ADD_TASK',
        payload: taskData,
      });
  
      history.push('/my_tasks');
    };
  
    return (
      <div className ="addtask">
      <Container maxWidth="sm">
      <div className="header">
        <Typography 
        variant="h2" 
        style={{ 
        fontFamily: "Georgia", 
        fontWeight: "bolder",
        fontSize: '70px',
        textShadow: '3px 1px 2px rgba(0, 0, 0, 0.8)',
     
        marginBottom: '20px', // Increased margin bottom for spacing
      }}
        >Create A New Task
        </Typography>
        </div>
        <form onSubmit={handleSave}>
          <Grid container spacing={2}>
          <Grid item xs={12}>
              <TextField
              className="input-field input-border"
                label="Task Name"
                value={taskName}
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
                    fontWeight: 'bolder',
                    fontSize: '25px',
                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)'
                  },
                }}
              />
          </Grid>
          <Grid item xs={6}>
              <TextField
              className="input-field date-input input-border"
                label="Start Date"
                type="date"
                value={dateAdded}
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
              className="input-field date-input input border"
                label="   Due Date"
                type="date"
                value={dueDate}
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
                  shrink: true,
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
              className="input-field date-input input border"
                label="   Priority Level"
                value={priorityLevel}
                onChange={changePriorityLevel}
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
                  shrink: true,
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
              className="input-field date-input input border"
                label="   Completion Status"
                type="completionStatus"
                value={completionStatus}
                onChange={changecompletionStatus}
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
                  shrink: true,
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
              className="input-field date-input input border"
                label="   Notes"
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
                  shrink: true,
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
          <Button 
          type="submit" 
          variant="contained" 
          style={{ 
            backgroundColor: 'hsl(94, 82%, 60%)', 
            color: 'white', 
            textShadow: '1px 10px 20px rgba(5, 5, 5, 5)',
              boxShadow: '10px 10px 10px rgba(3, 3, 3, 1)',
              fontFamily: "Georgia"
            }}>
          
          
            Save
          </Button>
        </form>
      </Container>
      </div>
    );
  }
  
  export default AddTask;
  