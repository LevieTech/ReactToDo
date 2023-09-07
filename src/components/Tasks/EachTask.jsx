import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";


function EachTask({ task, handleEditTask, handleDeleteTask }) {
  return (
    <div>
      <h2>{task.taskname}</h2>
      <p>Date Added: {task.dateadded}</p>
      <p>Due Date: {task.duedate}</p>
      <p>Priority: {task.prioritylevel}</p>
      <p>Status: {task.completionstatus}</p>
      <p>Notes: {task.notes}</p>
      <div style={{ display: "flex" }}>
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
        <Link to={`/task/${task.id}/edit`}>
          <Button
            onClick={() => handleEditTask(task)}
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
    </div>
  );
}

export default EachTask;
