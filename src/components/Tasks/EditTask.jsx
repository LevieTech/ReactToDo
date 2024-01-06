import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Button, TextField, MenuItem, Grid, Container, Typography } from '@mui/material';
import selectedTask from '../../redux/reducers/selectedTask.reducer';

//TODO This edit should show the existing task info. Currently is blank
// running into a lot of issues now!!!

function EditTask() {
    const history = useHistory();
    const { id } = useParams();
    const dispatch = useDispatch();
    const [selectedTaskHook, setSelectedTaskHook] = useState({});

    //! Fetch selected task
    useEffect(() => {
        dispatch({ type: 'FETCH_SELECTED_TASK', payload: id });
        if (Object.keys(selectedTask).length === 0) {
            setSelectedTaskHook(selectedTask)
        }
    }, []);

    //! Store selected task
    const selectedTask = useSelector((store) => store.selectedTask);

    //! States
    const [taskname, setTaskName] = useState(selectedTask.taskname);
    const [dateadded, setDateAdded] = useState(selectedTask.dateadded);
    const [duedate, setDueDate] = useState(selectedTask.duedate);
    const [prioritylvl, setPriorityLvl] = useState(selectedTask.prioritylvl);
    const [notes, setNotes] = useState(selectedTask.notes);
    const [taskId, setTaskId] = useState(selectedTask.taskId)

    //! original editedTask code 
    // const [editedTask, setEditedTask] = useState({
    //     taskname: '',
    //     dateadded: '',
    //     duedate: '',
    //     prioritylvl: '',
    //     notes: '',
    //     taskId: id,
    // });


    //! Handle changes- one for each value that can change
    // taskname, dateadded, duedate, prioritylvl, notes

    const handleTaskNameChange = (event) => {
        setTaskName(event.target.value)
    };

    const handleDateAddedChange = (event) => {
        setDateAdded(event.target.value)
    };

    const handleDueDateChange = (event) => {
        setDueDate(event.target.value)
    };

    const handlePriorityLvlChange = (event) => {
        setPriorityLvl(event.target.value)
    };

    const handleNotesChange = (event) => {
        setNotes(event.target.value)
    };


    //? Unsure if we will even keep this but, I changed this to selectedTask- formerly setEditedTask
    //! This was in every inputs handleChange
    // is converting the completion status from string to boolean

    // const handleInputChange = (event) => {
    //     const { name, value } = event.target;
    //     if (name === "completionstatus") {
    //         selectedTask(prevState => ({
    //             ...prevState,
    //             [name]: value === "true" // convert the string to boolean
    //         }));
    //     } else {
    //         selectedTask(prevState => ({
    //             ...prevState,
    //             [name]: value
    //         }));
    //     }
    // };


    //! Back
    const goBack = () => {
        history.goBack();
    }

    //! Submit 
    const handleEditSubmit = (event) => {
        event.preventDefault();
        dispatch({
            type: 'EDIT_TASK',
            payload: { taskname, dateadded, duedate, prioritylvl, notes, taskId }
        });
        history.push('/my_tasks');
    };

    //! What displays
    return (
        <Container maxWidth="md">
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
                                name="taskname"
                                value={selectedTask.taskname}
                                onChange={handleTaskNameChange}
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
                                value={selectedTask.dateadded}
                                onChange={handleDateAddedChange}
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
                                value={selectedTask.duedate}
                                onChange={handleDueDateChange}
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
                                value={selectedTask.prioritylvl}
                                onChange={handlePriorityLvlChange}
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
                                value={selectedTask.notes}
                                onChange={handleNotesChange}
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