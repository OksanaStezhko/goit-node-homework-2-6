const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const gravatar = require('gravatar')
const {
  constants: { subcriptionValue },
} = require('../utils')

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: [...subcriptionValue],
      default: 'starter',
    },
    avatarURL: {
      type: String,
      default: function () {
        return gravatar.url(this.email, { s: '250' }, true)
      },
    },
    token: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verifyToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  },
  { versionKey: false, timestamps: true }
)

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

const { SECRET_KEY } = process.env

userSchema.methods.createToken = function () {
  const payload = {
    _id: this._id,
  }
  return jwt.sign(payload, SECRET_KEY)
}

const User = model('user', userSchema)

module.exports = User
