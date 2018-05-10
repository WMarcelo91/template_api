const mongoose = require('mongoose')
const Users = mongoose.model('Users')

const hash = require('../../../../helpers/hash')

const register = async (ctx, next) => {
  const params = ctx.request.body
  // check if e-mail exists in DB
  const user = await Users.findOne({
    email: params.email
  })
  if (user) {
    return ctx.status = 404
  }
  //
  params.password = await hash.encrypt(params.password)
  const newUser = await Users.create(params)

  newUser['password'] = undefined

  ctx.body = newUser
  return ctx.status = 202

}


module.exports = {
  register
}
