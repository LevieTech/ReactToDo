const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();


//  */GET /: Retrieves the user's tasks from the database based on the user ID. It returns an array of tasks ordered by their IDs in descending order.
router.get("/", (req, res) => {
  const userID = req.user.id;
   // Check if the userID exists
   if (!userID) {
    return res.status(400).send('User ID not provided');
  }
  const queryText = `
  SELECT * FROM "tasklist" AS t
  WHERE t."user_id" = $1
  ORDER BY t."id" DESC;
`;
  // ! Don't need to set the query params to the userID
  //! const queryParams = [userID]; 

  pool
    .query(queryText, [userID])
    .then((result) => {
    
     res.send(result.rows);
     console.log("Tasks route check for tasks", result.rows)
    })
    .catch((error) => {
      console.log("Error getting tasks in taskrouter:", error);
      res.sendStatus(500);
    });
});



//* GET /task/:id: Retrieves a specific task along with its associated save ID. It performs a join operation between the "tasklist" and "save" tables to get the task information. The save ID is returned as "saved" in the response.
 router.get("/task/:id", (req, res) => {
    const taskID = req.params.id; // Retrieve the user ID from the request parameter
    const queryText = `
      SELECT 
        t.*
      FROM 
        "tasklist" t
   WHERE 
        t."id" = $1;
    `;
  
    pool
      .query(queryText, [taskID])
      .then((result) => {
        console.log('Fetched tasklist:', result.rows);
        const task = result.rows;
        res.send(task);
      })
      .catch((error) => {
        console.log("Error getting saved tasks:", error);
        res.sendStatus(500);
      });
  });

 



  //* POST /: Creates a new task in the database.
router.post('/', async (req, res) => { 
  // Data from the client (form)
  const task = req.body;
  try {
      const insertTaskQuery = 
      `INSERT INTO "tasklist" 
      ("user_id",   
      "taskname",
      "dateadded",
      "duedate",
      "prioritylevel",
      "notes") 
  VALUES ($1, $2, $3, $4, $5, $6);`
      
      await pool.query(insertTaskQuery,[
        req.user.id, // the logged in user
        task.taskname,
        task.dateadded,
        task.duedate,
        task.prioritylevel,
        task.notes,
      ]);
  
      console.log('Inserted task:', task);
      
      res.sendStatus(200);
  } catch (error) {
      console.log(error);
      console.log('Error inserting task:', error);
      res.sendStatus(500);
  }
});

// ? Is this being used for anything right now?
// router.post('/allSave', (req, res) => {
//     // Access the tasks and user ID from the request body
//     const { tasks, userId } = req.body;

//     if (!Array.isArray(tasks)) {
//       return res.status(400).send('Expected an array of tasks');
//   }

//   try {
//       for (const task of tasks) {
//           // Logic to save each task in the database
//           // e.g., using pool.query to insert each task
//       }
//       res.sendStatus(200);
//   } catch (error) {
//       console.log('Error saving tasks:', error);
//       res.sendStatus(500);
//   }
// });
    

//*PUT /edit: Updates a task in the database. It expects the updated task data in the request body and performs an update query on the "tasklist" table using the provided information.
router.put('/edit/:id', (req, res) => {
  console.log('In PUT request');
  const updatedTasks = req.body;
  console.log('Updated task:', updatedTasks);
  console.log('params', req.params)
  // Query to update Trip

  let updateQuery = 
  `UPDATE "taskList" 
   SET 
     "taskname" = $1,
      "dateadded" = $2,
      "duedate" =$3,
      "prioritylevel" = $4,
      "completionstatus"= $5,
      "notes" = $6
  
   WHERE 
    "id" = $7;`;

  pool.query(updateQuery,
    [
    updatedTasks.taskname,
    updatedTasks.dateadded,
    updatedTasks.duedate,
    updatedTasks.prioritylevel,
    updatedTasks.completionstatus,
    updatedTasks.notes,
    req.params.id

    ])
    .then(() => { 
    console.log("Task updated successfully");
    res.sendStatus(200);
  })
    .catch((error) => {
    console.log('Error in PUT on task.router', error);
    res.sendStatus(500);
    });
});

// PUT ROUTE to update completion status of specific tasks
router.put('/complete/:id', (req, res) => {
  const queryText = `UPDATE tasklist SET completionstatus = TRUE WHERE id= $1;`;
  pool.query(queryText, [req.params.id]).then((result) => {
    console.log(`Completion Status updated successfully!`)
    res.sendStatus(200);
  }).catch((error) => {
    console.log(`Error in updating Completion Status! ${error}`)
    res.sendStatus(500);
  })
})

router.put('/incomplete/:id', (req, res) => {
  const queryText = `UPDATE tasklist SET completionstatus = FALSE WHERE id= $1;`;
  pool.query(queryText, [req.params.id]).then((result) => {
    console.log(`Completion Status updated successfully!`)
    res.sendStatus(200);
  }).catch((error) => {
    console.log(`Error in updating Completion Status! ${error}`)
    res.sendStatus(500);
  })
})

// DELETE /:id: Deletes a task from the database based on the trip ID provided in the URL parameter.
  router.delete('/:id', (req, res) => {
    const deleteId = req.params.id;
    const queryText = `DELETE FROM "tasklist" WHERE "id" = $1;`;
    
    pool.query(queryText, [deleteId])
    .then((result) => {
      console.log("Task deleted successfully",result.rowCount);
      res.sendStatus(200);
    })
    .catch((error) => {
        console.log(`Error in DELETE ${error}`);
        res.sendStatus(500);
    });
});


module.exports = router;
