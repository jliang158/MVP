require("dotenv").config();
const express = require("express");
const path = require("path");
var cors = require('cors')

// Establishes connection to the database on server start
const db = require("./db");
const app = express();

app.use(express.json())
app.use(cors());

app.use(cors(), function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:8080"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get('/', (req, res) => {
  res.send(req.body)
})
app.post('/login', async (req, res) => {
  let result
  console.log(req.body)
  try {
    result = await db.query(`SELECT * FROM login WHERE username = '${req.body.username}'`)
    if (result.rows[0].username !== req.body.username) {
      res.send('wrong username')
      return
    }
    if (result.rows[0].password !== req.body.password) {
      res.send('wrong password')
      return
    }

    res.send('success!')

  } catch (err) {
    res.send('no info')
  }
})

app.post('/submit', async (req, res) => {
  let result;
  try {
    result = await db.query(`SELECT * FROM login WHERE username = '${req.body.username}'`)
    if (result.rows.length === 0) {
      throw new Error('user doesnt exists')
    }
    res.send('user already exists')
  } catch (err) {
    let maxVal = 0;
    db.query(`SELECT * FROM login WHERE id=(SELECT max(id) FROM login)`)
    .then(result => {
        for (let i = 0; i < result.rows.length; i++) {
          console.log(result.rows[i].id)
          maxVal += result.rows[i].id
          maxVal += 1
        }
        console.log('THDSFJPIDSJ', maxVal)
        db.query(`INSERT INTO login(id, username, password) VALUES(${maxVal}, '${req.body.username}', '${req.body.password}') RETURNING *`)
          .then(resst => res.status(201).json(resst.rows))
        })
  }
})

app.listen(process.env.SERVER_PORT);
console.log(`Listening at http://localhost:${process.env.SERVER_PORT}`);