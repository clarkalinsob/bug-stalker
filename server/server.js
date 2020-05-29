const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const app = express()
const port = process.env.PORT || 5001

const projectsRoute = require('./routes/projectsRoute')
const bugsRoute = require('./routes/bugsRoute')

app.use(cors())
app.use(bodyParser.json())

app.get('/api', (req, res) => res.send({ msg: 'API listening at /api' }))

app.use('/api/v1/projects', projectsRoute)
app.use('/api/v1/bugs', bugsRoute)

mongoose
  .connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB')
    return app.listen(port, () => console.log(`API listening on PORT ${port}`))
  })
  .catch(err => console.log(err))
