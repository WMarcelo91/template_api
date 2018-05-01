const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema

const UsersSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  resetPassword: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
  },
  cellphone: {
    type: String
  },
  birthday: {
    type: Date
  },
  gender: {
    type: String,
  },
  photo: {
    type: String
  },
  push: {
    type: String
  },
}, {
  timestamps: {}
})

UsersSchema.methods.generateHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
UsersSchema.methods.validPassword = (hash, password) => bcrypt.compareSync(password, hash)

mongoose.model('Users', UsersSchema)
