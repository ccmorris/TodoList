const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const _ = require('lodash')

dotenv.config();
const { Client } = require('pg')
const db = new Client({
  connectionString: process.env.DATABASE_URL
})
db.connect()

const app = express()
const port = process.env.PORT || 3001
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build'), {index: false}));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/lists', async (req, res) => {
  const result = await db.query('SELECT * FROM list ORDER BY weight ASC')
  return res.status(200).json(result.rows)
})

app.post('/api/lists', async (req, res) => {
  const list = req.body
  list.cards = '[]'
  await db.query('INSERT INTO list (id, title, weight) VALUES ($1, $2, $3)', [list.id, list.title, list.weight])
  return res.status(200).json({
    status: 'ok'
  })
})

app.patch('/api/lists/:id', async (req, res) => {
  const list = req.body
  const id = req.params.id
  const result = await db.query('UPDATE list SET title=$2, cards=$3, weight=$4 WHERE id=$1', [id, list.title, JSON.stringify(list.cards), list.weight])
  return res.status(200).json({
    status: result ? 'ok' : 'error'
  })
})

app.delete('/api/lists/:id', async (req, res) => {
  const id = req.params.id
  const result = await db.query('DELETE FROM list WHERE id=$1', [id])
  return res.status(200).json({
    status: result ? 'ok' : 'error'
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
