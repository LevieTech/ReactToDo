import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from 'react-router-dom';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from '@mui/icons-material/Check';
import { Button, Card } from "@mui/material";
import { Link } from "react-router-dom";


function EachTask({ task }) {

  const dispatch = useDispatch();
  const history = useHistory();

  const refreshPage = () => {
    setTimeout(() => {
      window.location.reload(false);
    }, 200);
  }

  const handleDeleteTask = (id) => {
    dispatch({ type: "DELETE_TASK", payload: id });
    refreshPage();
  };

  const dateConversion = (oldDate) => {
    const date = new Date(oldDate).toLocaleDateString('en-EN')
    return `${date}`
  }

  const statusConversion = () => {
    if (task.completionstatus === false) {
      return 'Incomplete'
    } else if (task.completionstatus === true) {
      return 'Complete'
    }
  }

  const updateCompletion = (id) => {
    if (task.completionstatus === false) {
      dispatch({ type: 'SET_COMP_STATUS', payload: id });
    } else if (task.completionstatus === true) {
      dispatch({ type: 'SET_INCOMP_STATUS', payload: id });
    }
    refreshPage();
  }

  //! This will change the background color of the card depending on completion status
  const changeColor = () => {
    if (task.completionstatus === true) {
      return '#d8ffb0'
    } else {
      return 'white'
    }
  } //end changeColor()

  //! This will change the background color of the card depending on completion status
  const colorizePriority = () => {
    if (task.prioritylevel === 'High') {
      return '#c71212'
    } else if (task.prioritylevel === 'Medium') {
      return '#eb7c1c'
    } else if (task.prioritylevel === 'Low'){
      return '#72ab16'
    }
  } //end changeColor()

  return (
    <div style={{ width: '100%', }}>
      <Card sx={{
        boxShadow: 9,
        backgroundColor: changeColor(),
        maxWidth: '310px',
        fontSize: 18,
        outlineStyle: "groove",
        outlineWidth: 3,
      }}>
        <h2 style={{ textDecoration: "underline" }}> {task.taskname} </h2>
        <p>Date Added: {dateConversion(task.dateadded)}</p>
        <p>Due Date: {dateConversion(task.duedate)}</p>
        <p style={{ color: colorizePriority() }}>Priority: {task.prioritylevel}</p>
        <p>Status: {statusConversion(task.completionstatus)}</p>
        <p>Notes: {task.notes}</p>

        <div className="buttons" style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#e8eaed",
          outlineStyle: "groove",
        }}>
          <Button
            onClick={() => handleDeleteTask(task.id)}
            style={{
              fontFamily: "Georgia",
              color: "black",
              fontWeight: "bold",
              fontSize: "20px",
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.8)",
            }}
          >
            <DeleteIcon style={{ color: "#4e3055" }} />
          </Button>
          <Link to={`/task/${task.id}/edit_task`}>
            <Button
              style={{
                fontFamily: "Georgia",
                color: "black",
                fontWeight: "bolder",
                fontSize: "20px",
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.8)",
              }}
            >
              <EditIcon sx={{ color: "#4e3055" }} />
            </Button>
          </Link>
          <Button onClick={() => updateCompletion(task.id)} style={{ color: 'black' }}><CheckIcon /></Button>
        </div>
      </Card>
      <br />
    </div>
  );
}

export default EachTask;
