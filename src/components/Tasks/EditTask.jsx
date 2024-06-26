import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Button, TextField, MenuItem, Grid, Container, Typography } from '@mui/material';
import selectedTask from '../../redux/reducers/selectedTask.reducer';


function EditTask() {
    const history = useHistory();
    const { id } = useParams();
    const dispatch = useDispatch();
    const [selectedTaskHook, setSelectedTaskHook] = useState({});


    //! Store selected task
    const selectedTask = useSelector((store) => store.selectedTask);

    console.log('Checking selectedTask in component', selectedTask);

 useEffect(() => {
        dispatch({ type: 'FETCH_SELECTED_TASK', payload: id });
      
    }, [id]);

    useEffect(() => {
        if (selectedTask.id === parseInt(id)) { // Ensure selectedTask is fetched and matches the current id
            setTaskName(selectedTask.taskname);
            setDateAdded(selectedTask.dateadded);
            setDueDate(selectedTask.duedate);
            setPriorityLvl(selectedTask.prioritylvl);
            setNotes(selectedTask.notes);
        }
    }, [selectedTask, id]);
    


    //! States
    const [taskname, setTaskName] = useState(selectedTask.taskname);
    const [dateadded, setDateAdded] = useState(selectedTask.dateadded);
    const [duedate, setDueDate] = useState(selectedTask.duedate);
    const [prioritylvl, setPriorityLvl] = useState(selectedTask.prioritylvl);
    const [notes, setNotes] = useState(selectedTask.notes);
  
    console.log('Check ID', id);

    //! Back
    const goBack = () => {
        history.goBack();
    }

    //! Submit 
    const handleEditSubmit = (event) => {
        event.preventDefault();
        dispatch({
            type: 'EDIT_THIS_TASK',
            payload: {
                taskname: taskname,
                dateadded: dateadded,
                duedate: duedate,
                prioritylvl: prioritylvl,
                notes: notes,
                id: id
            }
        });
        history.push('/my_tasks');
    };

    //! What displays
    return (
        <Container maxWidth="md">
            <br />
            <center>
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
                                multiline
                                name="taskname"
                                defaultValue={selectedTask.taskname}
                                value={taskname}
                                onChange={(event) => setTaskName(event.target.value)}
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
                                label="Start Date"
                                type="date"
                                name="dateadded"
                                defaultValue={selectedTask.dateadded}
                                value={dateadded}
                                onChange={(event) => setDateAdded(event.target.value)}
                                required
                                fullWidth
                                InputProps={{
                                    shrink: "true",
                                    style: {
                                        color: 'black',
                                        fontFamily: "Georgia"
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
                                label="Due Date"
                                type="date"
                                name="duedate"
                                defaultValue={selectedTask.duedate}
                                value={duedate}
                                onChange={(event) => setDueDate(event.target.value)}
                                required
                                fullWidth
                                style={{ fontFamily: "Georgia" }}
                                InputProps={{
                                    shrink: "true",
                                    style: {
                                        color: 'black',
                                        fontFamily: "Georgia"
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

                        <Grid item xs={12}>
                            <TextField
                                label="Priority Level"
                                select
                                name="prioritylvl"
                                defaultValue={selectedTask.prioritylvl}
                                value={prioritylvl}
                                onChange={(event) => setPriorityLvl(event.target.value)}
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
                                    shrink: "true",
                                    style: {
                                        color: 'black',
                                        fontFamily: "Georgia",
                                        fontWeight: 'bolder',
                                        fontSize: '25px',
                                        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)'
                                    },
                                }}
                            >
                                <MenuItem value={3}>High</MenuItem>
                                <MenuItem value={2}>Medium</MenuItem>
                                <MenuItem value={1}>Low</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Notes"
                                multiline
                                name="notes"
                                defaultValue={selectedTask.notes}
                                value={notes}
                                onChange={(event) => setNotes(event.target.value)}
                                fullWidth
                                style={{ fontFamily: "Georgia" }}
                                InputProps={{

                                    style: {
                                        color: 'black',
                                        fontFamily: "Georgia"
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

                        <Grid item xs={12}>
                            <Button
                                type="submit"
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
            </center>
        </Container>
    );
}

export default EditTask;