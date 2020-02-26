const express = require('express')
const router = express.Router()
const Project = require('../models/Project')
const Bug = require('../models/Bug')

router.use('/', (req, res, next) => next())

// GET *READ* Multiple Projects

router.get('/', async (req, res) => {
  const projects = await Project.find()

  if (projects.length < 1) return res.sendStatus(404)

  res.send(projects)
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
  await project.remove()

  res.sendStatus(200)
})

// *** END

module.exports = router
