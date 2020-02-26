const { model, Schema } = require('mongoose')

const userSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  email: {
    type: String,
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
    members: [userSchema]
  },
  { timestamps: true }
)

module.exports = model('Project', projectSchema)
