const express = require('express')
const request = require('request')
const router = express.Router()

const checkJwt = require('../auth/checkJwt')
const pusher = require('../pusher/config')

const Project = require('../models/Project')
const Bug = require('../models/Bug')

router.use(checkJwt(process.env.AUTH0_API_AUDIENCE))
router.use((err, _, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(err.status).send(err.message)
    return
  }
  next()
})

// GET *READ* Multiple Projects

router.get('/', async (req, res) => {
  const projects = await Project.find().sort({ updatedAt: -1 })

  if (projects.length > 0) res.send(projects)
})

// *** END

// GET *READ* Single Project

router.get('/:projectId', async (req, res) => {
  const project = await Project.findById(req.params.projectId)

  if (!project) return res.sendStatus(404)

  res.send(project)
})

// *** END

// POST *CREATE* Single Project

router.post('/', async (req, res) => {
  const project = new Project()

  try {
    Object.keys(req.body).forEach(key => (project[key] = req.body[key]))

    const result = await project.save()

    res.send(result)
  } catch (e) {
    res.send(e.message)
  }
})

// *** END

// PATCH *UPDATE* Single Project

router.patch('/:projectId', async (req, res) => {
  const project = await Project.findById(req.params.projectId)

  if (!project) return res.sendStatus(404)

  try {
    Object.keys(req.body).forEach(key => (project[key] = req.body[key]))

    const result = await project.save()

    res.send(result)
  } catch (e) {
    res.send(e.message)
  }
})

// *** END

// DELETE *DELETE* Single Project

router.delete('/:projectId', async (req, res) => {
  const project = await Project.findById(req.params.projectId)

  if (!project) return res.sendStatus(404)

  await Bug.deleteMany({ projectId: req.params.projectId })
  await project.deleteOne()

  res.send()
})

// *** END

// PATCH *UPDATE* Project Logs

router.patch('/:projectId/logs', async (req, res) => {
  const project = await Project.findById(req.params.projectId)

  if (!project) return res.sendStatus(404)

  try {
    project.logs.push(req.body.log)

    const result = await project.save()

    pusher.trigger('realtime-projects', 'logs', {
      event: 'logs',
      projectId: req.params.projectId,
      log: req.body.log
    })

    res.send(result)
  } catch (e) {
    res.send(e.message)
  }
})

// *** END

// GET *READ* Oauth Token

router.use('/:projectId/members', (req, res, next) => {
  const options = {
    method: 'POST',
    url: `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
    headers: { 'content-type': 'application/json' },
    form: {
      client_id: process.env.AUTH0_M2M_CLIENT_ID,
      client_secret: process.env.AUTH0_M2M_CLIENT_SECRET,
      audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
      grant_type: 'client_credentials'
    }
  }

  request(options, function (error, response, body) {
    if (error) throw new Error(error)

    const parsedToken = JSON.parse(body)
    req.user.access_token = parsedToken.access_token
    next()
  })
})

// *** END

// GET *READ* Project Members

router.get('/:projectId/members', (req, res) => {
  const options = {
    method: 'GET',
    url: `https://${process.env.AUTH0_DOMAIN}/api/v2/users`,
    headers: { authorization: `Bearer ${req.user.access_token}` },
    json: true
  }

  request(options, function (error, response, body) {
    if (error) throw new Error(error)

    res.send({ users: body })
  })
})

// *** END

// PATCH *UPDATE* Project Members

router.patch('/:projectId/members', async (req, res) => {
  console.log('members')
  const project = await Project.findById(req.params.projectId)

  if (!project) return res.sendStatus(404)

  try {
    console.log('req.body', req.body)
    project.members = req.body

    const result = await project.save()

    console.log(result.members)
    res.send(result.members)
  } catch (e) {
    res.send(e.message)
  }
})

// *** END

module.exports = router
