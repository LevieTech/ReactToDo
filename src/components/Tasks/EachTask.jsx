import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from 'react-router-dom';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
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

  const handleEditTask = (id) => {
    event.preventDefault();
    dispatch({ type: "EDIT_TASK", payload: id });
  };

  const dateConversion = (oldDate) => {
    const date = new Date(oldDate).toLocaleDateString('en-EN')
    return `${date}`
  }

  return (
    <div>
      <Card sx={{maxWidth: '300px'}}>
        <h2>{task.taskname}</h2>
        <p>Date Added: {dateConversion(task.dateadded)}</p>
        <p>Due Date: {dateConversion(task.duedate)}</p>
        <p>Priority: {task.prioritylevel}</p>
        <p>Status: {task.completionstatus}</p>
        <p>Notes: {task.notes}</p>
        <div className="buttons" style={{ display: "flex", justifyContent: "center" }}>
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
            <DeleteIcon style={{ color: "purple" }} />
          </Button>
          <Link to={`/task/${task.id}/edit_task`}>
            <Button
              onClick={(event) => handleEditTask(task.id)}
              style={{
                fontFamily: "Georgia",
                color: "black",
                fontWeight: "bolder",
                fontSize: "20px",
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.8)",
              }}
            >
              <EditIcon sx={{ color: "purple" }} />
            </Button>
          </Link>
        </div>
      </Card>
      <br/>
    </div>
  );
}

export default EachTask;
