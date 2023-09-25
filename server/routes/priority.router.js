const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// This route *should* return the logged in users pets
router.get('/priority', (req, res) => {
    const queryText = `SELECT * FROM priority;`
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('Error in GET for priority', error)
        res.sendStatus(400);
    })
});

module.exports = router;