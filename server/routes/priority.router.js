const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// This route *should* return the logged in users pets
router.get('/', (req, res) => {
    const queryText = `SELECT * FROM priority;`
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('Error in GET for priority', error)
        res.sendStatus(400);
    })
});

router.get('/:id', (req, res) => {
    console.log('Checking req.params.id', req.params.id);
    if (req.params.id === 4) {
        const queryText1 = `SELECT * FROM "tasklist" AS t
                            WHERE t."user_id" = $1
                            ORDER BY t."id" DESC;`;
    } else {
        const queryText2 = `SELECT * FROM priority
                            JOIN tasklist ON tasklist.prioritylvl = priority.id
                            WHERE priority.id = $1;`;
    }
    pool.query((queryText1 || queryText2), [req.params.id]).then((result => {
        res.send(result.rows);
    })).catch((error) => {
        console.log(`Error in GET for tasks based on Priority Level ${error}`);
        res.sendStatus(500);
    })
})

module.exports = router;