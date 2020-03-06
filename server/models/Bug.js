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

const bugSchema = new Schema(
  {
    _index: {
      type: Number,
      required: false
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false
    },
    createdBy: userSchema,
    projectId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'inProgress', 'forReview', 'done'],
      default: 'pending'
    },
    isClosed: {
      type: Boolean,
      required: true,
      default: false
    },
    closedBy: userSchema
  },
  { timestamps: true }
)

module.exports = model('Bug', bugSchema)
