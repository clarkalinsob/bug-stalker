const express = require('express')
const router = express.Router()

const checkJwt = require('../auth/checkJwt')
const pusher = require('../pusher/config')

const Bug = require('../models/Bug')

// router.use(checkJwt(process.env.AUTH0_API_AUDIENCE))
// router.use((err, _, res, next) => {
//   if (err.name === 'UnauthorizedError') {
//     res.status(err.status).send(err.message)
//     return
//   }
//   next()
// })

// POST *POST* Drag-Drop arrays

router.post('/:projectId/drag-drop', async (req, res) => {
  pusher.trigger('realtime-bugs', 'drag-drop', {
    event: 'drag-drop',
    projectId: req.params.projectId,
    pending: req.body.pending,
    inProgress: req.body.inProgress,
    forReview: req.body.forReview,
    done: req.body.done
  })

  res.status(200).send({ message: 'Successfully updated.', status: 200 })
})

// *** END

// GET *READ* Multiple Bugs

router.get('/:projectId/', async (req, res) => {
  const bugs = await Bug.find({ projectId: req.params.projectId })

  if (bugs.length > 0) res.send(bugs)
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

    pusher.trigger('realtime-bugs', 'create', {
      event: 'create',
      projectId: req.params.projectId,
      bug: result
    })

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
    bug.projectId = req.params.projectId
    Object.keys(req.body).forEach(key => (bug[key] = req.body[key]))

    const result = await bug.save()

    pusher.trigger('realtime-bugs', 'update', {
      event: 'update',
      projectId: req.params.projectId,
      bug: result
    })

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

  pusher.trigger('realtime-bugs', 'delete', {
    event: 'delete',
    projectId: req.params.projectId,
    bug
  })

  await bug.remove()

  res.send()
})

// *** END

module.exports = router
