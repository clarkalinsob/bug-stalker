const express = require('express')
const router = express.Router()

const checkJwt = require('../auth/checkJwt')
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

module.exports = router
