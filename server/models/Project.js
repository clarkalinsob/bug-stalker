const { model, Schema } = require('mongoose')

const userSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    required: true
  }
})

const logSchema = new Schema({
  subject: userSchema,
  predicate: {
    verb: {
      type: String,
      required: true,
      enum: ['created', 'updated', 'deleted']
    },
    object: {
      type: String,
      required: true
    }
  },
  date: {
    type: Date,
    required: true
  }
})

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false
    },
    createdBy: userSchema,
    members: [userSchema],
    logs: [logSchema]
  },
  { timestamps: true }
)

module.exports = model('Project', projectSchema)
