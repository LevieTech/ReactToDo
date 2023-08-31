import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { TableCell, TableRow } from "@mui/material";
import { Link } from "react-router-dom";
import AssignmentSharpIcon from '@mui/icons-material/AssignmentSharp';


function EachTask({ task, handleEditTask, date }) {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isHoveredEdit, setIsHoveredEdit] = useState(false);
  const [isHoveredDelete, setIsHoveredDelete] = useState(false);
  const handleDeleteTask = (taskID) => {
    dispatch({ type: "DELETE_TASK", payload: taskID });
  };

  const handleEditClick = () => {
    if (task && task.taskid) {
      handleEditTask(task);
    }
  };

  useEffect(() => {
    dispatch({ type: "GET_SAVED_TASKS" });
  }, []);
 

  return (
    <TableRow 
    style={{ 
      borderBottom: "none",
      width: '100%' 
    }}>
      <TableCell 
      style={{ 
        fontFamily: "Georgia", borderBottom: "none", 
        display: "flex", 
        justifyContent: "space-between",
        width: '100%' 
      }}>
        <div 
        style={{ 
          fontSize: "20px", 
          color: "black", 
          fontFamily: "Georgia", 
          borderBottom: "none", 
          fontWeight: "bold", 
          marginRight: "10px",
          textShadow: "2px 2px 3px white"
        }}>
          {task && new Date(task.dateAdded).toLocaleDateString(undefined, { dateStyle: "short" })}
          {" - "}
          {task && new Date(task.dueDate).toLocaleDateString(undefined, { dateStyle: "short" })}
        </div>

      
        <div
          style={{
            fontSize: "30px",
            color: "black",
            fontFamily: "Georgia",
            borderBottom: "none",
            fontWeight: "bolder",
            textShadow: "2px 2px 3px white"
          }}
        >
          {task && task.taskname}
        </div>
      
        <div style={{ display: "flex" }}>
          <Button
            onClick={() => handleDeleteTask(task.id)}
            className={`${isHoveredDelete ? "delete-hovered" : ""} delete-container`}
            onMouseEnter={() => setIsHoveredDelete(true)}
            onMouseLeave={() => setIsHoveredDelete(false)}
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
            key={task.id}
            task={task}
            onClick={handleEditClick}
            component={Link}
            to={`/task/${task.id}/edit`}
            className={`${isHoveredEdit ? "edit-hovered" : ""} edit-container`}
            onMouseEnter={() => setIsHoveredEdit(true)}
            onMouseLeave={() => setIsHoveredEdit(false)}
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
      </TableCell>

 
    </TableRow>
  );
}

export default EachTask;