const express = require('express')
const dotenv = require('dotenv')

dotenv.config();
const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, 'client/build'), {index: false}));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
