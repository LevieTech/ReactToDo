import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <>
    <div className="nav">
      <center>
      <Link to="/home">
        <img src="./react-to-do-banner.png" className="navImg" alt="React To-Do" width="50%" height="50%" style={{maxWidth: 1100,}}  />
      </Link>
      </center>
    </div>

<center>
    <div className="linkDiv">
        {/* If no user is logged in, show these links */}
        {user.id === null &&
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        }

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
           <Link className="navLink" to="/my_tasks">
              Tasks
            </Link>
            <Link className="navLink" to="/taskList">
              List View</Link>
            <Link className="navLink" to="/info">
              Info 
            </Link>
            <LogOutButton className="navLink" />

          
          </>
        )}

      </div>
      </center>

    </>
    

  );
}

export default Nav;
