const Router = require('express-promise-router')
let moment = require("moment-timezone");
const db = require('../db')
const router = new Router()

module.exports = router
router.get('/students', async (req, res) => {
    const {rows} = await db.query('SELECT * FROM students;');
    res.send(rows)
})

router.get('/students/:id', async (req, res) => {
    const { id } = req.params;
    const {rows} = await db.query('SELECT * FROM students WHERE id = $1 ;', [id]);
   res.send(rows);
})


router.post('/students', async (req, res) => {
    const {rows} = await db.query('SELECT * FROM students;');
        let newStud = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        group: req.body.group,
        createdAt: moment()
            .tz("Europe/Moscow")
            .format("YYYY-MM-DD HH:mm:ss"), // дата создания
        updatedAt: moment()
            .tz("Europe/Moscow")
            .format("YYYY-MM-DD HH:mm:ss")
    };
        const insert= 'INSERT INTO students (first_name, last_name, group_name, created_at, updated_at) VALUES ($1 , $2 , $3 , $4 , $5);';
    db.query(insert,[newStud.firstName, newStud.lastName, newStud.group, newStud.createdAt, newStud.updatedAt]);
    res.send("Success ");
    res.end();
})


router.put('/students/:id', async (req, res) => {
    const {rows} = await db.query('SELECT * FROM students;');
    let newStud = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        group: req.body.group,
        updatedAt: moment()
            .tz("Europe/Moscow")
            .format("YYYY-MM-DD HH:mm:ss")
    };
    const {id}= req.params;
    const insert='UPDATE students SET first_name = $1 , last_name = $2 , group_name = $3 , updated_at = $4 WHERE id = $5 ;';
   db.query(insert,[newStud.firstName, newStud.lastName, newStud.group, newStud.updatedAt,id]);
    res.send("Success ");
    res.end();
})


router.delete('/students/:id', async (req, res) => {
    const { id } = req.params;
   const { rows } = await db.query('DELETE FROM students WHERE id = $1 ;', [id]);
    res.send("Success ");
})