const Pusher = require('pusher')

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  useTLS: process.env.PUSHER_APP_SECURE,
  cluster: process.env.PUSHER_APP_CLUSTER
})

module.exports = pusher
