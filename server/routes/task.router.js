const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req, res) => {
    console.log ('/task GET route');
    // GET ROUTE CODE HERE YUHHHHH
    console.log('is authenticated?', req.isAuthenticated());
    if (req.isAuthenticated()) {
        console.log('user', req.user);
        let queryText = `SELECT * FROM "tasklist" WHERE "user_id" = $1;`
    pool.query(queryText, [req.user.id]).then((result) => {
        console.log(result.rows)
        res.send(result.rows);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;