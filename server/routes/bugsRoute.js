const express = require('express')
const router = express.Router()

const checkJwt = require('../auth/checkJwt')
const Bug = require('../models/Bug')

router.use(checkJwt(process.env.AUTH0_API_AUDIENCE))
router.use((err, _, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(err.status).send(err.message)
    return
  }
  next()
})

// GET *READ* Multiple Bugs

router.get('/:projectId/', async (req, res) => {
  const bugs = await Bug.find({ projectId: req.params.projectId })

  if (bugs.length < 1) return res.sendStatus(404)

  res.send(bugs)
})

// *** END

// GET *READ* Single Bug

router.get('/:projectId/:bugId', async (req, res) => {
  const bug = await Bug.findById(req.params.bugId)

  if (!bug) return res.sendStatus(404)

  res.send(bug)
})

// *** END

// POST *CREATE* Single Bug

router.post('/:projectId/', async (req, res) => {
  const bug = new Bug()

  try {
    bug.projectId = req.params.projectId
    Object.keys(req.body).forEach(key => (bug[key] = req.body[key]))

    const result = await bug.save()

    res.send(result)
  } catch (e) {
    res.send(e.message)
  }
})

// *** END

// PATCH *UPDATE* Single Bug

router.patch('/:projectId/:bugId', async (req, res) => {
  const bug = await Bug.findById(req.params.bugId)

  if (!bug) return res.sendStatus(404)

  try {
    Object.keys(req.body).forEach(key => (bug[key] = req.body[key]))

    const result = await bug.save()

    res.send(result)
  } catch (e) {
    res.send(e.message)
  }
})

// *** END

// DELETE *DELETE* Single Bug

router.delete('/:projectId/:bugId', async (req, res) => {
  const bug = await Bug.findById(req.params.bugId)

  if (!bug) return res.sendStatus(404)

  await bug.remove()

  res.sendStatus(200)
})

// *** END

module.exports = router
