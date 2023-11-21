import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from '@mui/icons-material/Check';
import { Button, Card } from "@mui/material";


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

  const handleEditTask = (id) => {
    history.push(`/edit_task/${id}`)
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

  const priorityConversion = () => {
    if (task.prioritylvl === 1) {
      return "Low"
    } else if (task.prioritylvl === 2) {
      return 'Medium'
    } else if (task.prioritylvl === 3) {
      return 'High'
    }
  }

  const changeColor = () => {
    if (task.completionstatus === true) {
      return '#d8ffb0'
    } else {
      return 'white'
    }
  }

  const colorizePriority = () => {
    if (task.prioritylvl === 3) {
      return '#c71212'
    } else if (task.prioritylvl === 2) {
      return '#eb7c1c'
    } else if (task.prioritylvl === 1) {
      return '#72ab16'
    }
  }

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
        <p style={{ color: colorizePriority() }}>Priority: {priorityConversion(task.prioritylvl)}</p>
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
          <Button
            onClick={() => handleEditTask(task.id)}
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
          <Button onClick={() => updateCompletion(task.id)} style={{ color: 'black' }}><CheckIcon /></Button>
        </div>
      </Card>
      <br />
    </div>
  );
}

export default EachTask;
