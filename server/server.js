const express = require('express');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const priorityRouter = require('./routes/priority.router');
const taskRouter = require('./routes/task.router');


// Body parser middleware
app.use(express.json());

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/priority', priorityRouter);
app.use('/api/task', taskRouter);
//! added this put 


// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5999;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
