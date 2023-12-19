import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// CUSTOM COMPONENTS
import LoginForm from '../LoginForm/LoginForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onRegister = (event) => {
    history.push('/registration');
  };

  return (

      <div >
        <center>
          <h1>{heading}</h1>
          <div className="textContent">
            <p>
              We know you're busy. We know you have a
              million tasks competing for your attention
              at any given moment. Wouldn't it be nice
              if you had an app to keep track of all those
              things on your to-do list? Forget the
              masses of sticky notes and memo pad
              lists, LevieTech has built just the app
              for you.
            </p>

            <p>
              So go ahead, create a new account or log in
              if you're a returning user. Jot down those
              pesky tasks, errands you've been avoiding, and
              other mundane chores. With this app, all of
              your responsibilities will be clearly displayed on
              your phone and at your fingertips. Users can set a start 
              and end date, edit the task in case deadlines change, mark as
              complete when you're finished it, or just delete.
              It's all up to you, the world is in your hands.
            </p>

            <p>
              Login or register below.
            </p>

          </div>
        </center>

        <hr />

        <div>
          <LoginForm />

          <center>
            <h4>New around here?</h4>
            <button className="btn btn_sizeSm" onClick={onRegister}>
              Register
            </button>
          </center>
        </div>
      </div>
  );
}

export default LandingPage;
