import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextField, Typography, Container, Grid } from '@mui/material';
import { MenuItem } from '@mui/material';

function AddTask() {
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
    if (!user || !user.id) {
      console.error("User is not defined or does not have an ID!");
      return;
    }

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
      type: 'ADD_TASK',
      payload: taskData,
    });
    setNotification("Task added successfully!");
    history.push('/my_tasks');
    refreshPage();
  };


  const goBack = () => { history.goBack() };


  return (
    <div className="addtask">
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
          >Create A New Task
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
                {priorities.map(priority => {
                  return (
                    <MenuItem value={priority.id}>{priority.level}</MenuItem>
                  )
                })}
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

export default AddTask;
